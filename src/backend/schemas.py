"""
schemas.py

Defines the Pydantic models used for data validation, serialization, and deserialization 
between the frontend, backend and database ORM models.

Models:
- SeminarCreate / SeminarOut: Represent incoming and outgoing seminar data.
- LocationCreate / LocationOut: Represent incoming and outgoing location data.
- ParticipantAdd / ParticipantOut: Handle participant registration and output data.
- ContactForm: Defines the structure of the contact form.
- SeminarRegistrationForm: Handles registration form data for seminars.
- LoginData: Validates admin login credentials.

Notes:
- 'SeminarOut', 'LocationOut', and 'ParticipantOut' include 'Config.orm_mode = True' 
  to allow direct conversion from ORM SQLAlchemy objects.
- Some values are optional.
"""

from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date, time

class SeminarCreate(BaseModel):
    title: str
    description: str
    date: date
    time: time
    url: Optional[str]
    max_participants: Optional[int]
    image_name: Optional[str]
    price: Optional[float]
    location_id: int

class LocationOut(BaseModel):
    location_id: int
    name: str
    street: str
    house_number: int
    zip_code: int
    city: str
    remarks: Optional[str]
    maps_url: Optional[str]
    class Config:
        orm_mode = True

class SeminarOut(BaseModel):
    seminar_id: int
    title: str
    description: str
    date: date
    time: time
    url: Optional[str]
    max_participants: Optional[int]
    image_name: Optional[str]
    participants_count: Optional[int]
    price: Optional[float]
    location: LocationOut
    class Config:
        orm_mode = True

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    
class SeminarRegistrationForm(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    remarks: str

class LocationCreate(BaseModel):
    name: str
    street: str
    house_number: int
    zip_code: int
    city: str
    remarks: Optional[str]
    maps_url: Optional[str]
    
class ParticipantAdd(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    remarks: Optional[str]
    seminar_id: int
    
class ParticipantOut(BaseModel):
    participant_id: int
    firstname: str
    lastname: str
    email: EmailStr
    remarks: Optional[str]
    token: str
    class Config:
        orm_mode = True

class LoginData(BaseModel):
    username: str
    password: str

