from shared.database.firebase import db


def save_result(result_data):
    result_ref = db.collection("results").document()

    result_ref.set(result_data)

    return {
        "id": result_ref.id,
        **result_data
    }


def get_results_by_student(student_id):
    results = []

    docs = (
        db.collection("results")
        .where("student_id", "==", student_id)
        .stream()
    )

    for doc in docs:
        result = doc.to_dict()
        result["id"] = doc.id
        results.append(result)

    return results