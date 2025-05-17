"""
main.py

This is the entry point for the FastAPI application.
It sets up routes, middlewares, and application configuration.
"""

from fastapi import FastAPI, Depends, HTTPException, Body, Response, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
import crud
import email_functions
from database import SessionLocal
from schemas import SeminarCreate, SeminarOut, ContactForm, LocationCreate, LocationOut, ParticipantAdd, SeminarRegistrationForm, LoginData, ParticipantOut
from auth import authenticate_admin, create_access_token, check_admin_token
from fastapi.responses import StreamingResponse
from pdf_utils import generate_participants_list_pdf

app = FastAPI()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(SlowAPIMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173", "https://localhost:8000", "127.0.0.1"],  # Frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Verfiy admin session
def verify_admin_session(request: Request):
    token = request.cookies.get("access_token")
    if not token or not check_admin_token(token):
        raise HTTPException(status_code=401)


# ---------------------------------------------------------------------------- #
#                            ENDPOINTS FOR SEMINARS                            #
# ---------------------------------------------------------------------------- #
@app.get("/seminars/", response_model=List[SeminarOut])
def read_seminars(limit: int = 10, offset: int = 0, db: Session = Depends(get_db)):
    """
    Retrieve a list of seminars.

    Args:
        limit (int, optional): Maximum number of seminars in the list. Defaults to 10.
        offset (int, optional): Number of seminars to skip (for pagination). Defaults to 0.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        List[SeminarOut]: A list of seminar objects with their metadata.
    """
    return crud.get_seminars(db, limit, offset)

@app.get("/seminar/{id}", response_model=SeminarOut)
def read_seminars(id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single seminar by its id.

    Args:
        id (int): ID of the seminar to retrieve.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        SeminarOut: A seminar with its metadata.
    """
    return crud.get_seminar_by_id(db, id)

@app.get("/seminars/count")
def count_seminars(db: Session = Depends(get_db)) -> int:
    """
    Retrieve the number of seminars in the database.

    Args:
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        int: Number of seminars.
    """
    return crud.count_seminars(db)

@app.post("/seminars/", response_model=SeminarCreate, dependencies=[Depends(verify_admin_session)])
def add_seminar(seminar: SeminarCreate, db: Session = Depends(get_db)):
    """
    Add a new seminar.

    Args:
        seminar (SeminarCreate): Seminar object with metadata.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        SeminarCreate: The created seminar.
    """
    return crud.create_seminar(db, seminar)

@app.put("/seminars/{id}", response_model=SeminarCreate, dependencies=[Depends(verify_admin_session)])
def update_seminar(id: int, seminar: SeminarOut, db: Session = Depends(get_db)):
    """
    Update a seminar by its ID.

    Args:
        id (int): ID of the seminar to update.
        seminar (SeminarCreate): Updated seminar object with metadata.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        SeminarCreate: The updated seminar.
    """
    return crud.update_seminar(db, id, seminar)

@app.delete("/seminars/delete/{id}", dependencies=[Depends(verify_admin_session)])
def delete_seminar(id: int, db: Session = Depends(get_db)) -> dict:
    """
    Delete a seminar by its ID.

    Args:
        id (int): ID of the seminar to delete.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        dict: Dictionary with "message" key and success message.
    """
    return crud.delete_seminar(db, id)

# ---------------------------------------------------------------------------- #
#                            ENDPOINTS FOR LOCATIONS                           #
# ---------------------------------------------------------------------------- #
@app.post("/locations/", response_model=LocationCreate, dependencies=[Depends(verify_admin_session)])
def add_location(location: LocationCreate, db: Session = Depends(get_db)):
    """
    Create a new location.

    Args:
        location (LocationCreate): Location object with metadata.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        LocationCreate: The created location.
    """
    return crud.add_location(db, location)

@app.get("/locations/", response_model=List[LocationOut])
def get_locations(limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve a list of locations with limit.

    Args:
        limit (int, optional): Maximum number of locations in the list. Defaults to 10.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        List[LocationOut]: A list of locations with their metadata.
    """
    return crud.get_locations(db, limit)

@app.get("/location/{id}", response_model=LocationOut)
def get_location(id: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve a single location by its ID.

    Args:
        id (int, optional): ID of the location to retrieve. Defaults to 10.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        LocationOut: The retrieved location object.
    """
    return crud.get_location_by_id(db, id)

@app.delete("/locations/delete/{id}", dependencies=[Depends(verify_admin_session)])
def delete_location(id: int, db: Session = Depends(get_db)) -> dict:
    """
    Delete a location by its ID.

    Args:
        id (int): ID of the location to delete.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        dict: Dictionary with "message" key and success message.
    """
    return crud.delete_location(db, id)

@app.put("/locations/{id}", response_model=LocationOut, dependencies=[Depends(verify_admin_session)])
def update_location(id: int, location: LocationCreate, db: Session = Depends(get_db)):
    """
    Update a location based on its ID.

    Args:
        id (int): ID of the location to update.
        location (LocationCreate): Location object with metadata.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        LocationOut: The updated location object.
    """
    return crud.update_location(db, id, location)

# ---------------------------------------------------------------------------- #
#                           ENDPOINTS FOR PARTCIPANTS                          #
# ---------------------------------------------------------------------------- #
@app.get("/seminars/{seminar_id}/participants", response_model=List[ParticipantOut], dependencies=[Depends(verify_admin_session)])
def get_participants_of_seminar(seminar_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a list of the participants of a seminar based on the seminar_id.

    Args:
        seminar_id (int): ID of the seminar that the participants registered for.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        List[ParticipantOut]: A list of participant objects with their metadata.
    """
    return crud.get_participants(db, seminar_id)

@app.get("/seminars/{seminar_id}/unregister")
def unregister_participant(token: str, db: Session = Depends(get_db)) -> str:
    """
    Unregister a participant from a seminar.

    Args:
        token (str): Token of the participant.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        str: A string with a success/error message in German.
    """
    return crud.unregister_participant(db, token)

# ---------------------------------------------------------------------------- #
#                              FORM PROCESSING                                 #
# ---------------------------------------------------------------------------- #
@app.post("/kontakt/")
async def send_form(form: ContactForm):
    """
    Send the contact form to the admin email address.

    Args:
        form (ContactForm): The form data with contact information.
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
    Register a participant for a seminar.

    Args:
        seminar_id (int): TID of the seminar the participant wants to register for.
        data (SeminarRegistrationForm): The participant's registration data.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Raises:
        HTTPException 404: If the seminar does not exist.
        HTTPException 403: If registration is closed (i.e., the seminar is in the past or no free places left).
        
    """
    # Fetch seminar using the database session
    seminar = crud.get_seminar_by_id(db, seminar_id)
    
    if not seminar:
        raise HTTPException(status_code=404, detail="Seminar not found.")
    
    # Check if seminar isn't in the past
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
@limiter.limit("3/hour")
async def login_admin(request: Request, response: Response, data: LoginData) -> dict:
    """
    Authenticate an admin and set a secure session cookie.

    Verifies the provided login credentials and, if valid, issues a JWT access token
    stored in a secure HTTP-only session cookie. Rate limited to 3 requests per hour.

    Args:
        response (Response): The response object used to set the session cookie.
        data (LoginData): The login credentials submitted by the admin.

    Raises:
        HTTPException 401: If authentication fails (invalid credentials).

    Returns:
        dict: A message indicating whether login was successful.
    """
    user = authenticate_admin(data.username, data.password)
    
    if not user:
        raise HTTPException(status_code=401)

    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=180)
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none", #TODO: set to strict after testing
        max_age=60 * 60,
        path="/"
    )

    return {"message": "Login successful"}

@app.post("/admin/logout", dependencies=[Depends(verify_admin_session)])
def logout(response: Response) -> dict:
    """
    Delete the session cookie of an admin.

    Args:
        response (Response): The response object used to delete the session cookie.

    Returns:
        dict: A success message.
    """
    response.delete_cookie(
        key="access_token",
        path="/",
        httponly=True,
        secure=True,
        samesite="none" #TODO: set to strict after testing
    )
    return {"message": "success"}

@app.get("/admin/check")
def check_admin(request: Request) -> dict:
    """
    Check for a valid session cookie.

    Args:
        request (Request): Request object used to get the session cookie.

    Raises:
        HTTPException 401: If session cookie does not exist. 

    Returns:
        dict: A dictionary with "status" key indicating wether the cookie is valid.
    """
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="access denied")
    return check_admin_token(token)

# ---------------------------------------------------------------------------- #
#                                 PDF Download                                 #
# ---------------------------------------------------------------------------- #
@app.get("/admin/seminars/{seminar_id}/participants/pdf", dependencies=[Depends(verify_admin_session)])
def download_participants_pdf(seminar_id: int, db: Session = Depends(get_db)) -> StreamingResponse:
    """
    Creates a pdf containing information about the seminar and a table with the names
    of the participants and field for signatures.

    Args:
        seminar_id (int): ID of the seminar.
        db (Session, optional): SQLAlchemy database session, automatically provided by dependency injection.

    Returns:
        StreamingResponse: PDF file as a downloadable stream.
    """
    seminar = crud.get_seminar_by_id(db, seminar_id)
    participants = crud.get_participants(db, seminar_id)
    
    pdf_file = generate_participants_list_pdf(seminar, participants)

    return StreamingResponse(pdf_file, media_type="application/pdf", headers={
        "Content-Disposition": f"attachment; filename=Teilnehmerliste_{seminar_id}.pdf"
    })
