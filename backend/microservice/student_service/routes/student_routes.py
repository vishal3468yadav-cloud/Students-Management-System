from fastapi import APIRouter, Depends

from microservice.student_service.schemas.student_schema import Student

from microservice.student_service.controllers.student_controller import (
    create_student_controller,
    get_students_controller,
    update_student_controller,
    delete_student_controller
)

from microservice.auth_service.services.auth_security import get_current_user


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("")
def create_student(
    student: Student,
    current_user=Depends(get_current_user)
):
    return create_student_controller(student.model_dump())


@router.get("")
def get_students(
    current_user=Depends(get_current_user)
):
    return get_students_controller()


@router.put("/{student_id}")
def update_student(
    student_id: str,
    student: Student,
    current_user=Depends(get_current_user)
):
    return update_student_controller(
        student_id,
        student.model_dump()
    )


@router.delete("/{student_id}")
def delete_student(
    student_id: str,
    current_user=Depends(get_current_user)
):
    return delete_student_controller(student_id)