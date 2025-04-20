"""
email_functions.py

Handles all email-related functionality for the FastAPI application.

Functions:
- send_email: Low-level helper to send email via SMTP with SSL.
- send_confirmation: Sends registration confirmation to the participant.
- send_registration_info: Notifies admin with a list of current participants.
- send_form: Sends the contact form content to the admin.
"""

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
    """
    Send an email via SSL.

    Args:
        message (EmailMessage): A message with content and headers.

    Raises:
        HTTPException 500: If email can't be send. 

    Returns:
        dict: Sucess message.
    """
    try:
        context = ssl.create_default_context()
        with SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.send_message(message)
        return {"message": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email konnte nicht gesendet werden, Exception: {e}")


def send_confirmation(data: ParticipantAdd, seminar: SeminarOut, unregister_url: str):
    """
    Send a confirmation email to a participant when he/she successfully registers for a seminar.
    Calls 'send_email'.
    
    Raises:
        HTTPException 500: If email can't be send. 

    Returns:
        dict: Sucess message.
    """
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
    return send_email(confirmation_msg)


def send_registration_info(data: ParticipantAdd, seminar: SeminarOut, participants: List[ParticipantAdd]):
    """
    Send an info email to the admin when a new participant registers. The email also contains a list
    of all other participant registered for the specific seminar at that point in time.
    
    Raises:
        HTTPException 500: If email can't be send. 

    Returns:
        dict: Sucess message.
    """
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
    return send_email(info_msg)


def send_form(form: ContactForm):
    """
    Sends the contact form data as an email to the admin.
        
    Raises:
        HTTPException 500: If email can't be send. 

    Returns:
        dict: Sucess message.
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
    return send_email(message)