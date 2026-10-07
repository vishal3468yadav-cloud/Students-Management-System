from fastapi import APIRouter, Depends

from microservice.chatbot_service.schemas.chatbot_schema import ChatMessage
from microservice.chatbot_service.controllers.chatbot_controller import (
    chat_controller
)
from microservice.auth_service.services.auth_security import get_current_user


router = APIRouter(
    prefix="/chatbot",
    tags=["SVIET AI Chatbot"]
)


@router.post("/chat")
def chat(
    chat_message: ChatMessage,
    current_user=Depends(get_current_user)
):
    return {
        "response": chat_controller(chat_message.message)
    }