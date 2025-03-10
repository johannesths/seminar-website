from sqlalchemy import Column, Integer, String, Text, Date, Time
from database import Base

class Seminar(Base):
    __tablename__ = "seminars"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    category = Column(String(100), nullable=True)
    location = Column(String(255), nullable=False)
    url = Column(String(255), nullable=True) 
