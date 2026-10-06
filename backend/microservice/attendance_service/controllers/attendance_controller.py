from microservice.attendance_service.services.attendance_service import (
    create_attendance,
    get_attendance
)


def create_attendance_controller(attendance_data):
    return create_attendance(attendance_data)


def get_attendance_controller(date):
    return get_attendance(date)