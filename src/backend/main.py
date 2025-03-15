from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import crud
from email_functions import send_email
from database import SessionLocal
from schemas import SeminarCreate, SeminarOut, ContactForm, SeminarRegistrationForm, LocationCreate, LocationOut

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

@app.post("/seminars/", response_model=SeminarOut, dependencies=[Depends(verify_api_key)])
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

# Can be merged with other get endpoint
@app.get("/seminars/latest/{amount}", response_model=List[SeminarOut])
def get_latest_seminars(amount: int, db: Session = Depends(get_db)):
    """
    Returns the latest #amount seminars.
    No API Key required.
    """
    return crud.get_latest_seminars(db, amount)

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
async def register_for_seminar(data: SeminarRegistrationForm):
    """ Route for registering for a seminar. Sends an confirmation email to the user and a info email to the business owner.

    Args:
        data (SeminarRegistrationForm): name (str), email: (EmailStr), remarks (str), seminar (SeminarCreate)
    """    
    message = EmailMessage()
    message["From"] = EMAIL_USERNAME
    message["To"] = data.email
    message["Subject"] = f"Bestätigung Ihrer Anmeldung zum Seminar"

    # Set email content to form data
    message.set_content(
        f"""Hiermit ist Ihre Anmeldung zum Seminar '{data.seminar.title}' von Ursula Trahasch bestätigt.
        Das Seminar findet am {data.seminar.date} um {data.seminar.time} Uhr an folgender Adresse statt:
        ...
        """
    )
    send_email(message)