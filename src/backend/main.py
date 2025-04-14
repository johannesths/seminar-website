from fastapi import FastAPI, Depends, HTTPException, Header, Body, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import crud
import email_functions
from database import SessionLocal
from schemas import SeminarCreate, SeminarOut, ContactForm, LocationCreate, LocationOut, ParticipantAdd, SeminarRegistrationForm, LoginData, ParticipantOut
from auth import authenticate_admin, create_access_token, check_admin_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173", "https://localhost:8000", "127.0.0.1"],  # Frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

# Load environment variables
load_dotenv()

ADMIN_API_KEY = os.getenv("API_KEY")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Method for verifying the API Key used in request
def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized: access denied.")

# ---------------------------------------------------------------------------- #
#                            ENDPOINTS FOR SEMINARS                            #
# ---------------------------------------------------------------------------- #
@app.get("/seminars/", response_model=List[SeminarOut])
def read_seminars(limit: int = 10, offset: int = 0, db: Session = Depends(get_db)):
    """
    Returns a list of all seminars.
    No API Key required.
    """
    return crud.get_seminars(db, limit, offset)

@app.get("/seminar/{id}", response_model=SeminarOut)
def read_seminars(id: int, db: Session = Depends(get_db)):
    """
    Returns a single seminar.
    No API Key required.
    """
    return crud.get_seminar_by_id(db, id)

@app.post("/seminars/", response_model=SeminarCreate, dependencies=[Depends(verify_api_key)])
def add_seminar(seminar: SeminarCreate, db: Session = Depends(get_db)):
    """
    Creates a new seminar.
    Requires API key.
    """
    return crud.create_seminar(db, seminar)

@app.put("/seminars/{id}", response_model=SeminarCreate, dependencies=[Depends(verify_api_key)])
def update_seminar(id: int, seminar: SeminarCreate, db: Session = Depends(get_db)):
    """
    Updates an existing seminar by ID.
    Requires API key.
    """
    return crud.update_seminar(db, id, seminar)

@app.delete("/seminars/{id}", dependencies=[Depends(verify_api_key)])
def delete_seminar(id: int, db: Session = Depends(get_db)):
    """
    Deletes a seminar by ID.
    Requires API key.
    """
    return crud.delete_seminar(db, id)

# ---------------------------------------------------------------------------- #
#                            ENDPOINTS FOR LOCATIONS                           #
# ---------------------------------------------------------------------------- #
@app.post("/locations/", dependencies=[Depends(verify_api_key)])
def add_location(location: LocationCreate, db: Session = Depends(get_db)):
    return crud.add_location(db, location)

@app.get("/locations/", response_model=List[LocationOut])
def get_locations(limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_locations(db, limit)

# ---------------------------------------------------------------------------- #
#                           ENDPOINTS FOR PARTCIPANTS                          #
# ---------------------------------------------------------------------------- #
@app.get("/seminars/{seminar_id}/participants", response_model=List[ParticipantOut], dependencies=[Depends(verify_api_key)])
def get_participants_of_seminar(seminar_id: int, db: Session = Depends(get_db)):
    return crud.get_participants(db, seminar_id)

@app.delete("/seminars/{seminar_id}/unregister")
def unregister_participant(token: str, db: Session = Depends(get_db)):
    return crud.unregister_participant(db, token)

# ---------------------------------------------------------------------------- #
#                              FORM PROCESSING                                 #
# ---------------------------------------------------------------------------- #
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
@app.post("/kontakt/")
async def send_form(form: ContactForm):
    """ Route for sending contact form, form data is send to an email address

    Args:
        form (ContactForm): Includes name: str, email: EmailStr, subject: str (optional), message:str
    """
    email_functions.send_form(form)

# ---------------------------------------------------------------------------- #
#                             SEMINAR REGISTRATION                             #
# ---------------------------------------------------------------------------- #
@app.post("/seminars/{seminar_id}/register")
async def register_for_seminar(
    seminar_id: int,
    data: SeminarRegistrationForm = Body(...),
    db: Session = Depends(get_db)
):
    """
    Route for registering for a seminar. Sends a confirmation email to the user and an info email to the business owner.

    Args:
        seminar_id (int): The ID of the seminar to register for.
        data (ParticipantAdd): The participant’s registration info.
        db (Session): SQLAlchemy DB session.
    """
    print(data)
    # Fetch seminar using the database session
    seminar = crud.get_seminar(db, seminar_id)
    
    # Check if seminar exists
    if not seminar:
        raise HTTPException(status_code=404, detail="Seminar not found.")
    
    # Check if seminar isnt in the past
    seminar_datetime = datetime.combine(seminar.date, seminar.time)
    diff = seminar_datetime - datetime.now()
    if diff < timedelta(hours=1):
        raise HTTPException(status_code=403, detail="Seminar registration is closed.")

    participant = ParticipantAdd(firstname=data.firstname,
                                 lastname=data.lastname,
                                 email=data.email,
                                 remarks=data.remarks,
                                 seminar_id=seminar_id)
    participant_registered = crud.add_participant(db, participant)
    unregister_url = f"https://localhost:8000/seminars/{seminar.seminar_id}/unregister?token={participant_registered.token}"
    
    # Confirmation email to user
    email_functions.send_confirmation(data, seminar, unregister_url)
    
    participants = crud.get_participants(db, seminar_id)
    
    # Email to inform admin about registration
    email_functions.send_registration_info(data, seminar, participants)


# ---------------------------------------------------------------------------- #
#                                     ADMIN                                    #
# ---------------------------------------------------------------------------- #
@app.post("/admin/token")
def login_admin(
    response: Response,
    data: LoginData
):
    user = authenticate_admin(data.username, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=120)
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none", # set to strict after testing
        max_age=60 * 60,
        path="/"
    )

    return {"message": "Login successful"}

@app.post("/admin/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "success"}

@app.get("/admin/check")
def check_admin(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="access denied")
    return check_admin_token(token)

