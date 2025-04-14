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


# Remark: Although the relationship between Participant and Seminar is actually Many-to-Many, here it is Many-to-One because
# it is easier to handle. Currently, participants in seminars are deleted after a while and their data is not stored for long. Also,
# participants do not create an account, therefore it is easier to handle it like this.