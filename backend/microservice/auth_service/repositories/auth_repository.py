from shared.database.firebase import db


def create_user(user_data):
    user_ref = db.collection("users").document()

    user_ref.set(user_data)

    return {
        "id": user_ref.id,
        **user_data
    }


def get_user_by_email(email):
    docs = (
        db.collection("users")
        .where("email", "==", email)
        .limit(1)
        .stream()
    )

    for doc in docs:
        user = doc.to_dict()
        user["id"] = doc.id
        return user

    return None