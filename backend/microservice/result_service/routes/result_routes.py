from fastapi import APIRouter, Depends

from microservice.result_service.schemas.result_schema import (
    ResultRecord
)

from microservice.result_service.controllers.result_controller import (
    create_result_controller,
    get_student_results_controller
)

from microservice.auth_service.services.auth_security import (
    get_current_user
)


router = APIRouter(
    prefix="/results",
    tags=["Results"]
)


@router.post("")
def create_result(
    result: ResultRecord,
    current_user=Depends(get_current_user)
):
    return create_result_controller(
        result.model_dump()
    )


@router.get("/{student_id}")
def get_student_results(
    student_id: str,
    current_user=Depends(get_current_user)
):
    return get_student_results_controller(
        student_id
    )