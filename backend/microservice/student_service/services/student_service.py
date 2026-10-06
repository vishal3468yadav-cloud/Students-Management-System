from microservice.student_service.repositories.student_repository import (
    create_student,
    get_all_students,
    update_student,
    delete_student
)


def add_student(student_data):
    return create_student(student_data)


def get_students():
    return get_all_students()


def edit_student(student_id, student_data):
    return update_student(student_id, student_data)


def remove_student(student_id):
    return delete_student(student_id)