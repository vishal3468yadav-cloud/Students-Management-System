from microservice.student_service.services.student_service import (
    add_student,
    get_students,
    edit_student,
    remove_student
)


def create_student_controller(student_data):
    return add_student(student_data)


def get_students_controller():
    return get_students()


def update_student_controller(student_id, student_data):
    return edit_student(student_id, student_data)


def delete_student_controller(student_id):
    return remove_student(student_id)