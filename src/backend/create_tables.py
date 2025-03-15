from database import engine, Base
import models  # important to import models to register them with Base, do not remove

# deletes all tables
Base.metadata.drop_all(bind=engine)

Base.metadata.create_all(bind=engine)
print("successfully created tables")
