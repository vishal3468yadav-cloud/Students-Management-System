from microservice.dashboard_service.repositories.dashboard_repository import (
    get_dashboard_stats
)


def get_dashboard():
    return get_dashboard_stats()