from microservice.result_service.services.result_service import (
    create_result,
    get_student_results
)


def create_result_controller(result_data):
    return create_result(result_data)


def get_student_results_controller(student_id):
    return get_student_results(student_id)