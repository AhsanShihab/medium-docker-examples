from pydantic import BaseModel

class ContactSchema(BaseModel):
    name: str
    email: str
    phone: str
