import os

from dotenv import load_dotenv
from pwdlib import PasswordHash
from jose import jwt
from fastapi import HTTPException, status

from microservice.auth_service.repositories.auth_repository import (
    create_user,
    get_user_by_email
)


load_dotenv()


password_hash = PasswordHash.recommended()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def register_user(user_data):
    existing_user = get_user_by_email(user_data["email"])

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    user_data["password"] = password_hash.hash(
        user_data["password"]
    )

    created_user = create_user(user_data)

    return {
        "id": created_user["id"],
        "name": created_user["name"],
        "email": created_user["email"],
        "role": created_user["role"]
    }


def login_user(email, password):
    user = get_user_by_email(email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not password_hash.verify(
        password,
        user["password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = jwt.encode(
        {
            "user_id": user["id"],
            "email": user["email"],
            "role": user["role"]
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer"
    }