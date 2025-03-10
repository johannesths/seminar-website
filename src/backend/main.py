from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List
from database import SessionLocal
import crud
from schemas import SeminarCreate, SeminarOut

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/seminars/", response_model=List[SeminarOut])
def read_seminars(db: Session = Depends(get_db)):
    return crud.get_seminars(db)

@app.post("/seminars/", response_model=SeminarOut)
def add_seminar(seminar: SeminarCreate, db: Session = Depends(get_db)):
    return crud.create_seminar(db, seminar)

@app.delete("/seminars/{id}")
def delete_seminar(id: int, db: Session = Depends(get_db)):
    return crud.delete_seminar(db, id)
