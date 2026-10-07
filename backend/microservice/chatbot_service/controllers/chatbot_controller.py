from microservice.chatbot_service.services.chatbot_service import (
    process_chat
)


def chat_controller(message):
    return process_chat(message)