from fastapi import APIRouter, Depends

from microservice.dashboard_service.controllers.dashboard_controller import (
    get_dashboard_controller
)

from microservice.auth_service.services.auth_security import get_current_user


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def dashboard(
    current_user=Depends(get_current_user)
):
    return get_dashboard_controller()