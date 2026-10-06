from microservice.auth_service.services.auth_service import (
    register_user,
    login_user
)


def register_controller(user_data):
    return register_user(user_data)


def login_controller(email, password):
    return login_user(email, password)