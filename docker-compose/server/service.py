from sqlalchemy.orm import Session
from model import Contact
from schema import ContactSchema

def get_contacts(db: Session):
    """ returns a list of contacts from the database """
    
    return db.query(Contact).order_by(Contact.name).all()


def create_contact(db: Session, contact: ContactSchema):
    """creates a new entry in the database and returns that entry"""

    contact_entry = Contact(
        name=contact.name,
        email=contact.email,
        phone=contact.phone
    )

    db.add(contact_entry)
    db.commit()
    db.refresh(contact_entry)

    return contact_entry
