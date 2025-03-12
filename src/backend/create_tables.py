from database import engine, Base
import models  # important to import models to register them with Base, do not remove

Base.metadata.create_all(bind=engine)
print("successfully created tables")
