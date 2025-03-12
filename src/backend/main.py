from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
from smtplib import SMTP_SSL
import ssl
import crud

from database import SessionLocal
from schemas import SeminarCreate, SeminarOut, ContactForm


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

@app.get("/seminars/", response_model=List[SeminarOut])
def read_seminars(limit: int =10, offset: int = 10, db: Session = Depends(get_db)):
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

@app.get("/seminars/latest/{amount}", response_model=List[SeminarOut])
def get_latest_seminars(amount: int, db: Session = Depends(get_db)):
    """
    Returns the latest #amount seminars.
    No API Key required.
    """
    return crud.get_latest_seminars(db, amount)


# ---------------------------------------------------------------------------- #
#                       FORM PROCESSING AND SENDING EMAIl                      #
# ---------------------------------------------------------------------------- #
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

@app.post("/kontakt/")
async def send_email(form: ContactForm):
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

    # Try sending the email
    try:
        context = ssl.create_default_context()
        with SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.send_message(message)
        return {"message": "success"}
    except Exception as e:
        print(f"Failed to send email. ERROR: {e}")
        raise HTTPException(status_code=500, detail=f"Email konnte nicht gesendet werden, Exception: {e}")

