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
    router as result_router
)

from microservice.dashboard_service.routes.dashboard_routes import (
    router as dashboard_router
)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


app.include_router(student_router)
app.include_router(auth_router)
app.include_router(attendance_router)
app.include_router(result_router)
app.include_router(dashboard_router)