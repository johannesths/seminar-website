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
    location_id: int

class LocationOut(BaseModel):
    location_id: int
    name: str
    street: str
    house_number: int
    zip_code: int
    city: str
    remarks: Optional[str]

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
    location: LocationOut

    class Config:
        orm_mode = True

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class SeminarRegistrationForm(BaseModel):
    name: str
    email: EmailStr
    remarks: str
    seminar: SeminarCreate

class LocationCreate(BaseModel):
    name: str
    street: str
    house_number: int
    zip_code: int
    city: str
    remarks: str



