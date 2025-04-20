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
    return pwd_context.verify(password, hash)

def authenticate_admin(username: str, password: str) -> dict | None:
    if username == ADMIN_USERNAME and verify_password(password=password, hash=ADMIN_PASSWORD_HASH):
        return {"username": ADMIN_USERNAME}
    return None

def create_access_token(data: dict, expires_delta: timedelta | None = 15) -> str:
    to_encode = data.copy()
    expires = datetime.now() + expires_delta
    to_encode.update({"exp": expires})
    return jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)

# Check for session cookie
def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="access denied")

    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise HTTPException(status_code=403, detail="access denied")
        return {"username": username}
    except JWTError:
        raise HTTPException(status_code=401, detail="access denied")
    
def check_admin_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        if payload.get("sub") != ADMIN_USERNAME:
            raise HTTPException(status_code=403)
    except:
        raise HTTPException(status_code=401, detail="access denied")
    return {"status": "ok"}