from fastapi import APIRouter, Depends

from microservice.analytics_service.controllers.analytics_controller import (
    get_analytics_controller,
    get_student_performance_controller
)

from microservice.auth_service.services.auth_security import get_current_user


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("")
def get_analytics(current_user=Depends(get_current_user)):
    return get_analytics_controller()


@router.get("/students")
def get_student_performance(current_user=Depends(get_current_user)):
    return get_student_performance_controller()