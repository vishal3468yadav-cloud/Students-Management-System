from pydantic import BaseModel


class RegisterUser(BaseModel):
    name: str
    email: str
    password: str
    role: str = "student"


class LoginUser(BaseModel):
    email: str
    password: str