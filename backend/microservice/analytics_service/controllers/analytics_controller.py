from microservice.analytics_service.services.analytics_service import (
    get_analytics_summary,
    get_student_performance_data
)


def get_analytics_controller():
    return get_analytics_summary()


def get_student_performance_controller():
    return get_student_performance_data()