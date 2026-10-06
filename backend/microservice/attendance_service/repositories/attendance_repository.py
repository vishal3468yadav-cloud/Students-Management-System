from shared.database.firebase import db


def save_attendance(attendance_data):
    attendance_ref = db.collection("attendance").document()

    attendance_ref.set(attendance_data)

    return {
        "id": attendance_ref.id,
        **attendance_data
    }


def get_attendance_by_date(date):
    records = []

    docs = (
        db.collection("attendance")
        .where("date", "==", date)
        .stream()
    )

    for doc in docs:
        record = doc.to_dict()
        record["id"] = doc.id
        records.append(record)

    return records