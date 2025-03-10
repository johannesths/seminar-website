from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
import os
from database import SessionLocal
import crud
from schemas import SeminarCreate, SeminarOut
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend url
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load API Key
ADMIN_API_KEY = os.getenv("API_KEY")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized: access denied.")

@app.get("/seminars/", response_model=List[SeminarOut])
def read_seminars(db: Session = Depends(get_db)):
    """
    Returns a list of all seminars.
    No API Key required.
    """
    return crud.get_seminars(db)

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