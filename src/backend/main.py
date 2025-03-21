from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
from email.message import EmailMessage
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import crud
from email_functions import send_email
from database import SessionLocal
from schemas import SeminarCreate, SeminarOut, ContactForm, SeminarRegistrationForm, LocationCreate, LocationOut, ParticipantAdd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend url
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

@app.post("/seminars/", response_model=SeminarCreate, dependencies=[Depends(verify_api_key)])
def add_seminar(seminar: SeminarCreate, db: Session = Depends(get_db)):
    """
    Creates a new seminar.
    Requires API key.
    """
    return crud.create_seminar(db, seminar)

@app.put("/seminars/{id}", response_model=SeminarOut, dependencies=[Depends(verify_api_key)])
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
@app.post("/participants/", dependencies=[Depends(verify_api_key)])
def add_participant(participant: ParticipantAdd, db: Session = Depends(get_db)):
    return crud.add_participant(db, participant)

@app.get("/seminars/{seminar_id}/participants", dependencies=[Depends(verify_api_key)])
def get_participants_of_seminar(seminar_id: int, db: Session = Depends(get_db)):
    return crud.get_participants(db, seminar_id)

# ---------------------------------------------------------------------------- #
#                       FORM PROCESSING                                        #
# ---------------------------------------------------------------------------- #
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
@app.post("/kontakt/")
async def send_form(form: ContactForm):
    """ Route for sending contact form, form data is send to an email address

    Args:
        form (ContactForm): Includes name: str, email: EmailStr, subject: str (optional), message:str
    """    
    message = EmailMessage()
    message["From"] = EMAIL_USERNAME
    message["To"] = EMAIL_USERNAME
    message["Subject"] = "Neue Nachricht von der Webseite über Kontaktformular!"

    # Set email content to form data
    message.set_content(
        f"""
Das Formular wurde am {datetime.now().strftime('%d.%m.%Y, %H:%M Uhr')} gesendet, das Formular enthält die folgenen Daten:
Name: {form.name}
Email-Adresse: {form.email}
Betreff: {form.subject}

Nachricht: 
{form.message}
"""
    )
    send_email(message)


# ---------------------------------------------------------------------------- #
#                             SEMINAR REGISTRATION                             #
# ---------------------------------------------------------------------------- #
@app.post("/seminars/{seminar_id}/register")
async def register_for_seminar(
    data: SeminarRegistrationForm,
    seminar_id: int,
    db: Session = Depends(get_db)
):
    """ Route for registering for a seminar. Sends a confirmation email to the user and an info email to the business owner.

    Args:
        data (SeminarRegistrationForm): name (str), email (EmailStr), remarks (str), seminar_id (int)
    """    

    # Fetch seminar using the database session
    seminar = crud.get_seminar(db, seminar_id)
    
    # Check if seminar exists
    if not seminar:
        raise HTTPException(status_code=404, detail="Seminar not found.")
    
    # Check if seminar isnt in the past
    seminar_datetime = datetime.combine(seminar.date, seminar.time)
    diff = seminar_datetime - datetime.now()
    if diff < timedelta(hours=2):
        raise HTTPException(status_code=403, detail="Seminar registration is closed.")

    # Confirmation email to user
    confirmation_msg = EmailMessage()
    confirmation_msg["From"] = EMAIL_USERNAME
    confirmation_msg["To"] = data.email
    confirmation_msg["Subject"] = f"Bestätigung Ihrer Anmeldung zum Seminar"

    confirmation_msg.set_content(
        f"""Hiermit ist Ihre Anmeldung zum Seminar '{seminar.title}' von Ursula Trahasch bestätigt.
        
Das Seminar findet am {seminar.date} um {seminar.time} Uhr an folgender Adresse statt:
{seminar.location.name}
{seminar.location.street} {seminar.location.house_number}
{seminar.location.zip_code} {seminar.location.city}
Anmerkungen: {seminar.location.remarks}
In Google Maps öffnen: {seminar.location.maps_url}
        """
    )
    send_email(confirmation_msg)
    
    participants = crud.get_participants(db, seminar_id)
    
    # Email to inform business owner about registration
    info_msg = EmailMessage()
    info_msg["From"] = EMAIL_USERNAME
    info_msg["To"] = EMAIL_USERNAME
    info_msg["Subject"] = f"Neue Anmeldung zu einem Seminar"

    info_msg.set_content(
        f"""
Folgende Person hat sich zum Seminar "{seminar.title}" am {seminar.date} um {seminar.time} angemeldet:
Name: {data.firstname} {data.lastname}
Email: {data.email}
Anmerkungen: {data.remarks}


-----------------------------------------------
Bisher haben sich folgende Teilnehmer angemeldet:
    {participants}
        """
    )
    send_email(info_msg)

    return {"message": "registration successful"}