from sqlalchemy.orm import Session, joinedload
from sqlalchemy.sql import func
from fastapi import HTTPException
import uuid
from models import Seminar, Location, Participant
from schemas import SeminarCreate, LocationCreate, ParticipantAdd, SeminarOut, LocationOut

# ---------------------------------------------------------------------------- #
#                                SEMINAR ACTIONS                               #
# ---------------------------------------------------------------------------- #

def get_seminars(db: Session, limit: int = 10, offset: int = 0):
    participant_count_subquery = (
        db.query(
            Participant.seminar_id,
            func.count(Participant.participant_id).label("participants_count")
        )
        .group_by(Participant.seminar_id)
        .subquery()
    )

    seminars = (
        db.query(
            Seminar,
            func.coalesce(participant_count_subquery.c.participants_count, 0).label("participants_count")
        )
        .outerjoin(participant_count_subquery, Seminar.seminar_id == participant_count_subquery.c.seminar_id)
        .options(joinedload(Seminar.location))
        .order_by(Seminar.date.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    # Convert SQLAlchemy objects to Pydantic schemas
    seminar_list = [
        SeminarOut(
            seminar_id=seminar.seminar_id,
            title=seminar.title,
            description=seminar.description,
            date=seminar.date,
            time=seminar.time,
            url=seminar.url,
            max_participants=seminar.max_participants,
            image_name=seminar.image_name,
            participants_count=participants_count,
            location=LocationOut(
                location_id=seminar.location.location_id,
                name=seminar.location.name,
                street=seminar.location.street,
                house_number=seminar.location.house_number,
                zip_code=seminar.location.zip_code,
                city=seminar.location.city,
                remarks=seminar.location.remarks,
                maps_url=seminar.location.maps_url,
            ) if seminar.location else None
        )
        for seminar, participants_count in seminars
    ]

    return seminar_list

# Get a single Seminar by seminar_id
def get_seminar(db: Session, seminar_id: int):
    return (db.query(Seminar)
            .filter(Seminar.seminar_id == seminar_id)
            .first())

# Create a new seminar
def create_seminar(db: Session, seminar: SeminarCreate):
    seminar = Seminar(**seminar.dict())
    db.add(seminar)
    db.commit()
    db.refresh(seminar)
    return seminar

# Update a seminar using the seminar_id
def update_seminar(db: Session, seminar_id: int, updated_seminar: SeminarCreate):
    seminar = db.query(Seminar).filter(Seminar.seminar_id == seminar_id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={seminar_id} not found. Update failed.")
    
    # Update all fields of the seminar
    seminar.title = updated_seminar.title
    seminar.description = updated_seminar.description
    seminar.date = updated_seminar.date
    seminar.time = updated_seminar.time
    seminar.location = updated_seminar.location_id
    seminar.url = updated_seminar.url

    db.commit()
    db.refresh(seminar)

    return seminar

# Delete a seminar using seminar_id
def delete_seminar(db: Session, seminar_id: int):
    seminar = db.query(Seminar).filter(Seminar.seminar_id == seminar_id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={seminar_id} does not exist, deletion failed.")

    db.delete(seminar)
    db.commit()
    return {"message": f"Seminar with id={seminar_id} and title={seminar.title} deleted successfully."}


# ---------------------------------------------------------------------------- #
#                               LOCATION ACTIONS                               #
# ---------------------------------------------------------------------------- #
# Add a Location
def add_location(db: Session, location: LocationCreate):
    location = Location(**location.dict())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location

# Get a single Location by its location_id
def get_location(db: Session, location_id: int):
    return db.query(Location).filter(Location.location_id == location_id).first()

# Get Locations
def get_locations(db: Session, limit: int = 10):
    return (db.query(Location).limit(limit).all())


# ---------------------------------------------------------------------------- #
#                              PARTICIPANT ACTIONS                             #
# ---------------------------------------------------------------------------- #
# Add a Participant
def add_participant(db: Session, participant: ParticipantAdd):
    token = str(uuid.uuid4())
    participant = Participant(
    firstname=participant.firstname,
    lastname=participant.lastname,
    email=participant.email,
    seminar_id=participant.seminar_id,
    token=token
)
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return participant

# Get all Participants for a Seminar
def get_participants(db: Session, seminar_id: int):
    return (
        db.query(Participant)
        .filter(Participant.seminar_id == seminar_id)
        .order_by(Participant.firstname)
        .all()
    )

# Unregister participant from a seminar by using the token
def unregister_participant(db: Session, token: str):
    participant = db.query(Participant).filter_by(token=token).first()

    if not participant:
        raise HTTPException(status_code=404, detail="Ungültiger Link oder Teilnehmer bereits abgemeldet.")
    
    db.delete(participant)
    db.commit()
    
    return "Sie wurden erfolgreich vom Seminar abgemeldet."