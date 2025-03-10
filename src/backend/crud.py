from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Seminar
from schemas import SeminarCreate

# Fetch all seminars
def get_seminars(db: Session):
    return db.query(Seminar).all()

# Create a new seminar
def create_seminar(db: Session, seminar: SeminarCreate):
    seminar = Seminar(**seminar.dict())
    db.add(seminar)
    db.commit()
    db.refresh(seminar)
    return seminar

# Update a seminar using the seminar_id
def update_seminar(db: Session, id: int, updated_seminar: SeminarCreate):
    seminar = db.query(Seminar).filter(Seminar.id == id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={id} not found. Update failed.")
    
    # Update all fields of the seminar
    seminar.title = updated_seminar.title
    seminar.description = updated_seminar.description
    seminar.date = updated_seminar.date
    seminar.time = updated_seminar.time
    seminar.category = updated_seminar.category
    seminar.location = updated_seminar.location
    seminar.url = updated_seminar.url

    db.commit()
    db.refresh(seminar)

    return seminar

# Delete a seminar using seminar_id
def delete_seminar(db: Session, id: int):
    seminar = db.query(Seminar).filter(Seminar.id == id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={id} does not exist, deletion failed.")

    db.delete(seminar)
    db.commit()
    return {"message": f"Seminar with id={id} and title={seminar.title} deleted successfully."}