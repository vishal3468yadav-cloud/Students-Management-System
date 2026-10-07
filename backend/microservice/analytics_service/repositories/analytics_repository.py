from shared.database.firebase import db


def get_total_students():
    docs = db.collection("students").stream()
    return len(list(docs))


def get_average_attendance():
    docs = db.collection("attendance").stream()

    records = list(docs)

    if not records:
        return 0.0

    present_count = 0
    total_count = len(records)

    for doc in records:
        data = doc.to_dict()

        if data.get("status", "").lower() == "present":
            present_count += 1

    return round((present_count / total_count) * 100, 2)


def get_average_marks():
    docs = db.collection("results").stream()

    records = list(docs)

    if not records:
        return 0.0

    total_marks = 0

    for doc in records:
        data = doc.to_dict()
        total_marks += float(data.get("marks", 0))

    return round(total_marks / len(records), 2)


def get_total_results():
    docs = db.collection("results").stream()
    return len(list(docs))


def get_student_performance():
    students = {}

    docs = db.collection("results").stream()

    for doc in docs:
        data = doc.to_dict()

        student_id = data.get("student_id", "")
        student_name = data.get("student_name", "Unknown Student")
        marks = float(data.get("marks", 0))

        if student_id not in students:
            students[student_id] = {
                "student_id": student_id,
                "student_name": student_name,
                "total_marks": 0,
                "total_results": 0
            }

        students[student_id]["total_marks"] += marks
        students[student_id]["total_results"] += 1

    performance = []

    for student in students.values():
        average_marks = (
            student["total_marks"] / student["total_results"]
        )

        performance.append({
            "student_id": student["student_id"],
            "student_name": student["student_name"],
            "average_marks": round(average_marks, 2),
            "total_results": student["total_results"]
        })

    return performance