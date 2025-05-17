"""
auth.py

This module handles authentication and session management for the FastAPI backend.
It is specifically designed to secure the admin area of the application.

Functions:
- verify_password: Verifies a plain password against a hashed password.
- authenticate_admin: Authenticates an admin user based on credentials.
- create_access_token: Generates a signed JWT token with expiration time.
- get_current_admin: Validates the access token from the request's cookie and returns the username.
- check_admin_token: Validator to confirm admin status from a token.
"""

from fastapi import HTTPException, Request
from datetime import datetime, timedelta
from jose import JWTError, jwt
from crypt import pwd_context
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration
ALGORITHM = os.getenv('ALGORITHM')
SECRET = os.getenv('SECRET_KEY')

# Admin Login
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME')
ADMIN_PASSWORD_HASH = os.getenv('ADMIN_PASSWORD_HASH')

def verify_password(password: str, hash: str) -> bool:
    """
    Verfiy a plain password against a password hash.

    Args:
        password (str): Plain password.
        hash (str): Password hash.

    Returns:
        bool: True if the passwords match.
    """
    return pwd_context.verify(password, hash)

def authenticate_admin(username: str, password: str) -> dict | None:
    """
    Validates the login credentials.

    Args:
        username (str): Username.
        password (str): Plain password.

    Returns:
        dict | None: Dict with username if successful, else None.
    """
    if username == ADMIN_USERNAME and verify_password(password=password, hash=ADMIN_PASSWORD_HASH):
        return {"username": ADMIN_USERNAME}
    return None

def create_access_token(data: dict, expires_delta: timedelta = 120) -> str:
    """
    Creates a JWT access token with an experiration.

    Args:
        data (dict): Contains the username.
        expires_delta (timedelta, optional): Experiation time.

    Returns:
        str: The JWT access token.
    """
    to_encode = data.copy()
    expires = datetime.now() + expires_delta
    to_encode.update({"exp": expires})
    return jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)

def get_current_admin(request: Request) -> dict:
    """
    Validates the admin session based on the access token in the cookie.

    Args:
        request (Request): Incoming HTTP request containing the cookies.

    Raises:
        HTTPException 401: If the cookie can't be found, the access token is invalid or the
        subject doesn't match the admin username.

    Returns:
        dict: Containing the admin's username.
    """
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401)

    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise HTTPException(status_code=401)
        return {"username": username}
    except JWTError:
        raise HTTPException(status_code=401)
    
def check_admin_token(token: str) -> dict:
    """
    Validates an access token.

    Args:
        token (str): The access token.

    Raises:
        HTTPException 401: If the token is invalid or the subject doesn't
        match the admin's username. 

    Returns:
        dict: Containing a status ('ok').
    """
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        if payload.get("sub") != ADMIN_USERNAME:
            raise HTTPException(status_code=401)
    except:
        raise HTTPException(status_code=401)
    return {"status": "ok"}