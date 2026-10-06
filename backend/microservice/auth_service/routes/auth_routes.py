from fastapi import APIRouter

from microservice.auth_service.schemas.auth_schema import (
    RegisterUser,
    LoginUser
)

from microservice.auth_service.controllers.auth_controller import (
    register_controller,
    login_controller
)


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: RegisterUser):
    return register_controller(user.model_dump())


@router.post("/login")
def login(user: LoginUser):
    return login_controller(
        user.email,
        user.password
    )