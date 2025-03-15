from dotenv import load_dotenv
from email.message import EmailMessage
from smtplib import SMTP_SSL
from fastapi import HTTPException
import os
import ssl

load_dotenv()

# Environment variables
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

async def send_email(message: EmailMessage):
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