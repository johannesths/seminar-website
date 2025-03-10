# create_tables.py

from database import engine, Base
import models  # Important: import models to register them with Base

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
