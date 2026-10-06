from pydantic import BaseModel


class AttendanceRecord(BaseModel):
    student_id: str
    student_name: str
    roll_no: str
    branch: str
    date: str
    status: str