from microservice.chatbot_service.repositories.chatbot_repository import (
    get_sviet_information
)


def process_chat(message):
    information = get_sviet_information()

    message = message.lower()

    if "sviet" in message:
        return information["description"]

    if "attendance" in message:
        return "You can check and manage attendance from the Attendance section of the Student Management System."

    if "result" in message or "marks" in message:
        return "You can check student results and marks from the Results section."

    if "placement" in message:
        return "You can use the Placement Support features available in the Student Management System."

    if "service" in message:
        return ", ".join(information["services"])

    return "Sorry, I could not understand your question. Please ask about SVIET, attendance, results, placement or student services."