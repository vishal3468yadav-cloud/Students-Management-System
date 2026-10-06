from microservice.attendance_service.repositories.attendance_repository import (
    save_attendance,
    get_attendance_by_date
)


def create_attendance(attendance_data):
    return save_attendance(attendance_data)


def get_attendance(date):
    return get_attendance_by_date(date)