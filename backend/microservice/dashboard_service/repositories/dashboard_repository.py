from shared.database.firebase import db


def get_dashboard_stats():
    students = list(db.collection("students").stream())
    attendance = list(db.collection("attendance").stream())
    results = list(db.collection("results").stream())
    users = list(db.collection("users").stream())

    present = 0
    absent = 0

    for record in attendance:
        data = record.to_dict()

        if data.get("status") == "Present":
            present += 1
        elif data.get("status") == "Absent":
            absent += 1

    return {
        "total_students": len(students),
        "total_attendance_records": len(attendance),
        "present": present,
        "absent": absent,
        "total_results": len(results),
        "total_users": len(users)
    }