"""
database.py

Initializes the database connection and session for the FastAPI application
using SQLAlchemy. This module is responsible for setting up the database
infrastructure.

Exports:
- engine: SQLAlchemy Engine instance used to interact with the database.
- SessionLocal: Session factory used to create scoped database sessions.
- Base: Declarative base class for all ORM models.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DB_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
