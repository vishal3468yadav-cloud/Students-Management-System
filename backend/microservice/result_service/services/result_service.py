from microservice.result_service.repositories.result_repository import (
    save_result,
    get_results_by_student
)


def create_result(result_data):
    return save_result(result_data)


def get_student_results(student_id):
    return get_results_by_student(student_id)