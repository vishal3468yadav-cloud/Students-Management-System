from shared.database.firebase import db


def create_student(student_data):
    student_ref = db.collection("students").document()

    student_ref.set(student_data)

    return {
        "id": student_ref.id,
        **student_data
    }


def get_all_students():
    students = []

    docs = db.collection("students").stream()

    for doc in docs:
        student = doc.to_dict()
        student["id"] = doc.id
        students.append(student)

    return students


def update_student(student_id, student_data):
    student_ref = db.collection("students").document(student_id)

    student_ref.update(student_data)

    return {
        "id": student_id,
        **student_data
    }


def delete_student(student_id):
    student_ref = db.collection("students").document(student_id)

    student_ref.delete()

    return {
        "message": "Student deleted successfully",
        "id": student_id
    }