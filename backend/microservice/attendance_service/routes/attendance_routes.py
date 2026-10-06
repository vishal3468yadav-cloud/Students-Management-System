from fastapi import APIRouter, Depends

from microservice.attendance_service.schemas.attendance_schema import (
    AttendanceRecord
)

from microservice.attendance_service.controllers.attendance_controller import (
    create_attendance_controller,
    get_attendance_controller
)

from microservice.auth_service.services.auth_security import (
    get_current_user
)


router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("")
def create_attendance(
    attendance: AttendanceRecord,
    current_user=Depends(get_current_user)
):
    return create_attendance_controller(
        attendance.model_dump()
    )


@router.get("/{date}")
def get_attendance(
    date: str,
    current_user=Depends(get_current_user)
):
    return get_attendance_controller(date)