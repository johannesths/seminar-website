from pydantic import BaseModel, EmailStr
from datetime import date, time

class SeminarCreate(BaseModel):
    title: str
    description: str
    date: date
    time: time
    category: str
    location: str
    url:str

class SeminarOut(SeminarCreate):
    id: int

    class Config:
        orm_mode = True

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

