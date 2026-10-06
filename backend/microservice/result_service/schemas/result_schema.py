from pydantic import BaseModel


class ResultRecord(BaseModel):
    student_id: str
    student_name: str
    roll_no: str
    branch: str
    semester: int
    subject: str
    marks: float
    grade: str