from datetime import datetime
from dotenv import load_dotenv
from email.message import EmailMessage
from smtplib import SMTP_SSL
from fastapi import HTTPException
from typing import List
import os
import ssl
from schemas import SeminarOut, ParticipantAdd, ContactForm

load_dotenv()

# Environment variables
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_email(message: EmailMessage):
    """Send an email using SMTP with SSL.

    Args:
        message (EmailMessage): The email content and headers.

    Returns:
        dict: Success message or raises an HTTPException on error.
    """   

    # Try sending the email
    try:
        context = ssl.create_default_context()
        with SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.send_message(message)
        return {"message": "success"}
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail=f"Email konnte nicht gesendet werden, Exception: {e}")

# Function to send a confirmation email for a participant in a seminar
def send_confirmation(data: ParticipantAdd, seminar: SeminarOut, unregister_url: str):
    confirmation_msg = EmailMessage()
    confirmation_msg["From"] = EMAIL_USERNAME
    confirmation_msg["To"] = data.email
    confirmation_msg["Subject"] = f"Anmeldebestätigung"

    confirmation_msg.set_content(
        f"""Hiermit ist Ihre Anmeldung zum Seminar '{seminar.title}' von Ursula Trahasch bestätigt.
        
Das Seminar findet am {seminar.date} um {seminar.time} Uhr an folgender Adresse statt:
{seminar.location.name}
{seminar.location.street} {seminar.location.house_number}
{seminar.location.zip_code} {seminar.location.city}
Anmerkungen: {seminar.location.remarks}
In Google Maps öffnen: {seminar.location.maps_url}

Sie können sich unter folgendem Link vom Seminar abmelden. Bitte beachten Sie, dass eine Abmeldung nur bis 24 Stunden vor dem Seminar möglich ist.
    {unregister_url}
        """
    )
    send_email(confirmation_msg)


# Function to send an info email to the business owner
def send_registration_info(data: ParticipantAdd, seminar: SeminarOut, participants: List[ParticipantAdd]):
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
    {'\n'.join([f"- {p.firstname} {p.lastname} ({p.email}), Anmerkungen: {p.remarks}" for p in participants])}
        """
    )
    send_email(info_msg)

# Function to send contact form via Email
def send_form(form: ContactForm):
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