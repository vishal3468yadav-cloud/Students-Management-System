from microservice.analytics_service.repositories.analytics_repository import (
    get_total_students,
    get_average_attendance,
    get_average_marks,
    get_total_results,
    get_student_performance
)


def get_analytics_summary():
    return {
        "total_students": get_total_students(),
        "average_attendance": get_average_attendance(),
        "average_marks": get_average_marks(),
        "total_results": get_total_results()
    }


def get_student_performance_data():
    return get_student_performance()