import asyncio
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from schema import ContactSchema
from model import SessionLocal, engine, Base
from service import get_contacts, create_contact


async def create_db_tables():
    for i in range(10): # will try 10 times
        try:
            Base.metadata.create_all(bind=engine)
            break
        except:
            await asyncio.sleep(5) # will wait 5 seconds before the next retry


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await create_db_tables()


@app.get("/api/contacts")
async def get_contacts_list(db: Session = Depends(get_db)):
    return get_contacts(db)


@app.post("/api/contacts", status_code=201)
async def add_contact(contact: ContactSchema, db: Session = Depends(get_db)):
    return create_contact(db, contact)
