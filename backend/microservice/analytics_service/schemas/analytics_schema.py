from pydantic import BaseModel


class AnalyticsSummary(BaseModel):
    total_students: int
    average_attendance: float
    average_marks: float
    total_results: int