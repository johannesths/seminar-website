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
    allow_origins=["http://localhost:5173"],  # front end port
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
    return crud.get_seminars(db)

@app.post("/seminars/", response_model=SeminarOut, dependencies=[Depends(verify_api_key)])
def add_seminar(seminar: SeminarCreate, db: Session = Depends(get_db)):
    return crud.create_seminar(db, seminar)

@app.put("/seminars/{id}", response_model=SeminarOut, dependencies=[Depends(verify_api_key)])
def update_seminar(id: int, seminar: SeminarCreate, db: Session = Depends(get_db)):
    return crud.update_seminar(db, id, seminar)

@app.delete("/seminars/{id}", dependencies=[Depends(verify_api_key)])
def delete_seminar(id: int, db: Session = Depends(get_db)):
    return crud.delete_seminar(db, id)
