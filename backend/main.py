from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from shared.database.firebase import db

from microservice.student_service.routes.student_routes import (
    router as student_router
)

from microservice.auth_service.routes.auth_routes import (
    router as auth_router
)

from microservice.attendance_service.routes.attendance_routes import (
    router as attendance_router
)

from microservice.result_service.routes.result_routes import (
    router as results_router
)

from microservice.analytics_service.routes.analytics_routes import (
    router as analytics_router
)

from microservice.chatbot_service.routes.chatbot_routes import (
    router as chatbot_router
)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Student Management System API is running"
    }


@app.get("/firebase-test")
def firebase_test():
    db.collection("test").document("connection").set({
        "status": "Firebase connected successfully"
    })

    return {
        "message": "Firebase connected successfully"
    }


# Student Service
app.include_router(student_router)

# Authentication Service
app.include_router(auth_router)

# Attendance Service
app.include_router(attendance_router)

# Results Service
app.include_router(results_router)

# Analytics Service
app.include_router(analytics_router)

# Chatbot Service
app.include_router(chatbot_router)