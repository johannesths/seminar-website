from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy.sql import func
from fastapi import HTTPException
import uuid
from models import Seminar, Location, Participant
from schemas import SeminarCreate, LocationCreate, ParticipantAdd, SeminarOut, LocationOut


# ---------------------------------------------------------------------------- #
#                                SEMINAR ACTIONS                               #
# ---------------------------------------------------------------------------- #

def get_seminars(db: Session, limit: int = 10, offset: int = 0):
    """
    Returns a list of seminars.

    Args:
        db (Session): SQLAlchemy database session
        limit (int, optional): Maximum number of seminars to return. Defaults to 10.
        offset (int, optional): Number of seminars to skip. Defaults to 0.

    Returns:
        List[SeminarOut]: List of seminars, including LocationOut and number of participants registered.
    """
    
    # Subquery to count participants
    participant_count_subquery = (
        db.query(
            Participant.seminar_id,
            func.count(Participant.participant_id).label("participants_count")
        )
        .group_by(Participant.seminar_id)
        .subquery()
    )
    
    # Fetch seminars with offset and limit, ordered by date (descending)
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
            price=seminar.price,
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

def get_seminar_by_id(db: Session, seminar_id: int):
    """
    Fetch a single seminar by its id.

    Args:
        db (Session): SQLAlchemy database session.
        seminar_id (int): ID of the seminar.

    Raises:
        HTTPException 404: When an invalid ID is given. 

    Returns:
        SeminarOut: information about the seminar, including LocationOut and number of participants.
    """
    
    # Subquery to count participants
    participant_count_subquery = (
        db.query(
            Participant.seminar_id,
            func.count(Participant.participant_id).label("participants_count")
        )
        .group_by(Participant.seminar_id)
        .subquery()
    )

    result = (
        db.query(
            Seminar,
            func.coalesce(participant_count_subquery.c.participants_count, 0).label("participants_count")
        )
        .outerjoin(participant_count_subquery, Seminar.seminar_id == participant_count_subquery.c.seminar_id)
        .options(selectinload(Seminar.location))
        .filter(Seminar.seminar_id == seminar_id)
        .first()
    )

    if not result:
        raise HTTPException(status_code=404, detail=f"Seminar with id={seminar_id} not found.")

    seminar, participants_count = result

    return SeminarOut(
        seminar_id=seminar.seminar_id,
        title=seminar.title,
        description=seminar.description,
        date=seminar.date,
        time=seminar.time,
        url=seminar.url,
        max_participants=seminar.max_participants,
        price=seminar.price,
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
    
def create_seminar(db: Session, seminar: SeminarCreate):
    """
    Add a new seminar to the database.

    Args:
        db (Session): SQLAlchemy database session.
        seminar (SeminarCreate): Pydantic scheme with all the necessary information.

    Returns:
        SeminarCreate: returns the seminar.
    """
    seminar = Seminar(**seminar.dict())
    db.add(seminar)
    db.commit()
    db.refresh(seminar)
    return seminar

def update_seminar(db: Session, seminar_id: int, updated_seminar: SeminarCreate):
    """
    Update an existing seminar.

    Args:
        db (Session): SQLAlchemy database session.
        seminar_id (int): ID of the seminar to update.
        updated_seminar (SeminarCreate): Updated seminar.

    Raises:
        HTTPException 404: When the ID is invalid. 

    Returns:
        SeminarCreate: the updated seminar.
    """
    seminar = db.query(Seminar).filter(Seminar.seminar_id == seminar_id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={seminar_id} not found. Update failed.")
    
    # Update all fields of the seminar
    seminar.title = updated_seminar.title
    seminar.description = updated_seminar.description
    seminar.date = updated_seminar.date
    seminar.time = updated_seminar.time
    seminar.url = updated_seminar.url
    seminar.max_participants = updated_seminar.max_participants
    seminar.image_name = updated_seminar.image_name
    seminar.price = updated_seminar.price
    seminar.location_id = updated_seminar.location_id

    db.commit()
    db.refresh(seminar)

    return seminar

def delete_seminar(db: Session, seminar_id: int):
    """
    Delete a single seminar in the database.

    Args:
        db (Session): SQLAlchemy database session.
        seminar_id (int): The ID of the seminar to delete.

    Raises:
        HTTPException 404: If the ID is invalid.

    Returns:
        dict: Message that the deletion was successful.
    """
    seminar = db.query(Seminar).filter(Seminar.seminar_id == seminar_id).first()

    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with id={seminar_id} does not exist, deletion failed.")

    db.delete(seminar)
    db.commit()
    return {"message": f"Seminar with id={seminar_id} and title={seminar.title} deleted successfully."}


# ---------------------------------------------------------------------------- #
#                               LOCATION ACTIONS                               #
# ---------------------------------------------------------------------------- #
def add_location(db: Session, location: LocationCreate):
    """
    Add a location to the database.

    Args:
        db (Session): SQLAlchemy database session.
        location (LocationCreate): Location with necessary information.

    Returns:
        LocationCreate: The created location.
    """
    location = Location(**location.dict())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location

def get_location_by_id(db: Session, location_id: int):
    """
    Returns a single location by its ID.

    Args:
        db (Session): SQLAlchemy database session.
        location_id (int): The ID of the location.
        
    Raises:
        HTTPException 404: If the ID is invalid.

    Returns:
        LocationOut: The found location.
    """
    location = db.query(Location).filter(Location.location_id == location_id).first()
    
    if not location:
        raise HTTPException(status_code=404, detail=f"Location with id={location_id} not found.")
    
    return location

def get_locations(db: Session, limit: int = 10):
    """
    Retrieve a list of locations.

    Args:
        db (Session): SQLAlchemy database session.
        limit (int, optional): Maximum number of locations in the list. Defaults to 10.

    Returns:
        List[LocationOut]: List of locations with metadata.
    """
    return (db.query(Location).limit(limit).all())

def update_location(db: Session, location_id: int, updated_location: LocationOut):
    """
    Update an exisiting location.

    Args:
        db (Session): SQLAlchemy database session.
        location_id (int): ID of the location to update.
        updated_location (LocationOut): The updated location with metadata.

    Raises:
        HTTPException 404: If an invalid ID is given.

    Returns:
        LocationOut: The updated location with metadata.
    """
    location = db.query(Location).filter(Location.location_id == location_id).first()

    if not location:
        raise HTTPException(status_code=404, detail=f"Location with id={location_id} not found. Update failed.")
    
    # Update all fields of the location
    location.name = updated_location.name
    location.city = updated_location.city
    location.zip_code = updated_location.zip_code
    location.street = updated_location.street
    location.house_number = updated_location.house_number
    location.remarks = updated_location.remarks
    location.maps_url = updated_location.maps_url

    db.commit()
    db.refresh(location)

    return location

def delete_location(db: Session, location_id: int):
    """
    Delete a location by its ID.

    Args:
        db (Session): SQLAlchemy database session.
        location_id (int): ID of the location to delete.

    Raises:
        HTTPException 404: If an invalid ID is given.

    Returns:
        dict: Success message.
    """
    location = db.query(Location).filter(Location.location_id == location_id).first()

    if not location:
        raise HTTPException(status_code=404, detail=f"Location with id={location_id} not found.")

    db.delete(location)
    db.commit()

    return {"message": f"Location with id={location_id} deleted successfully."}


# ---------------------------------------------------------------------------- #
#                              PARTICIPANT ACTIONS                             #
# ---------------------------------------------------------------------------- #
def add_participant(db: Session, participant: ParticipantAdd):
    """
    Add a participant with the associated seminar_id to the database.

    Args:
        db (Session): SQLAlchemy database session.
        participant (ParticipantAdd): Participant to add.
        
    Returns:
        ParticipantAdd: The added participant.
    """
    token = str(uuid.uuid4())
    participant = Participant(
    firstname=participant.firstname,
    lastname=participant.lastname,
    email=participant.email,
    remarks=participant.remarks,
    seminar_id=participant.seminar_id,
    token=token
)
    db.add(participant)
    db.commit()
    db.refresh(participant)
    return participant

def get_participants(db: Session, seminar_id: int):
    """
    Retrieve all participants of a single seminar.

    Args:
        db (Session): SQLAlchemy database session.
        seminar_id (int): ID of the seminar that the participants registered for.
        
    Raises:
        HTTPException 404: If an invalid seminar_id is given.

    Returns:
        List[ParticipantOut]: List of participants.
    """
    seminar = db.query(Seminar).filter(Seminar.seminar_id == seminar_id).first()
    if not seminar:
        raise HTTPException(status_code=404, detail=f"Seminar with the id={id} does not exist. Failed to retrieve participants.")
    
    return (
        db.query(Participant)
        .filter(Participant.seminar_id == seminar_id)
        .order_by(Participant.firstname)
        .all()
    )

def unregister_participant(db: Session, token: str):
    """
    Unregister (delete) a participant using the participants token.

    Args:
        db (Session): SQLAlchemy database session.
        token (str): Token of the participant to delete.

    Raises:
        HTTPException 404: If the token does not exist in the database.

    Returns:
        str: Success message in German.
    """
    participant = db.query(Participant).filter_by(token=token).first()

    if not participant:
        raise HTTPException(status_code=404, detail="Ungültiger Link oder Teilnehmer bereits abgemeldet.")
    
    db.delete(participant)
    db.commit()
    
    return "Sie wurden erfolgreich vom Seminar abgemeldet."