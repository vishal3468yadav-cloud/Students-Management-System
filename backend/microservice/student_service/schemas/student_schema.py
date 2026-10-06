from pydantic import BaseModel


class Student(BaseModel):
    name: str
    email: str
    phone: str
    branch: str
    semester: int