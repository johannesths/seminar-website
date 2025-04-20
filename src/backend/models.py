"""
models.py

Defines the SQLAlchemy ORM models for the application's database.

Tables:
- Seminar: Represents individual seminars including metadata, scheduling, and linked location.
- Location: Represents physical locations where seminars take place.
- Participant: Represents users registering for seminars, linked to a specific seminar.

Relationships:
- A Seminar is optionally linked to one Location (many-to-one).
- A Location can host multiple Seminars (one-to-many).
- A Seminar can have many Participants (one-to-many).
- A Participant is linked to one Seminar (many-to-one).

Notes:
- The participant - seminar relationship is modeled as many-to-one instead of many-to-many for simplicity, 
  since participants do not create accounts and their data is not stored long-term.
- Cascade rules are used to automatically handle deletions.
"""

from sqlalchemy import Column, Integer, String, Text, Date, Time, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base

# ------------------- Seminar Table -------------------
class Seminar(Base):
    __tablename__ = "seminars"

    seminar_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    url = Column(String(255), nullable=True)
    max_participants = Column(Integer, nullable=True)
    price = Column(Float, nullable=True)
    image_name = Column(String(63), nullable=True)

    # Foreign key to Location
    location_id = Column(Integer, ForeignKey("locations.location_id", ondelete="SET NULL", onupdate="CASCADE"), nullable=True)

    # Many-to-one relationship to Location
    location = relationship("Location", back_populates="seminars", passive_deletes=True)

    # One-to-many relationship with Participant
    participants = relationship("Participant", back_populates="seminar", cascade="all, delete-orphan", passive_deletes=True)

# ------------------- Location Table -------------------
class Location(Base):
    __tablename__ = "locations"

    location_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(127), nullable=False)
    street = Column(String(127))
    house_number = Column(String(15))
    zip_code = Column(Integer)
    city = Column(String(127))
    remarks = Column(String(255))
    maps_url = Column(String(255), nullable=True)

    # One-to-many relationship with Seminar
    seminars = relationship("Seminar", back_populates="location")

# ------------------- Participant Table -------------------
class Participant(Base):
    __tablename__ = "participants"

    participant_id = Column(Integer, primary_key=True, nullable=False)
    firstname = Column(String(127))
    lastname = Column(String(127))
    email = Column(String(255))
    remarks = Column(String(511), nullable=True)
    token = Column(String(40), unique=True, nullable=False)
    # Foreign key to Seminar
    seminar_id = Column(Integer, ForeignKey("seminars.seminar_id", ondelete="CASCADE"), nullable=False)

    # Many-to-one relationship to Seminar
    seminar = relationship("Seminar", back_populates="participants")
