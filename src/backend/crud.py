from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Seminar
from schemas import SeminarCreate


def get_seminars(db: Session):
    return db.query(Seminar).all()

def create_seminar(db: Session, seminar: SeminarCreate):
    seminar = Seminar(**seminar.dict())
    db.add(seminar)
    db.commit()
    db.refresh(seminar)
    return seminar

def delete_seminar(db: Session, id: int):
    seminar = db.query(Seminar).filter(Seminar.id == id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={id} does not exist, deletion failed.")

    db.delete(seminar)
    db.commit()
    return {"message": f"Seminar with id={id} and title={seminar.title} deleted successfully."}