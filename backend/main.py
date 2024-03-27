from fastapi import Request, FastAPI, HTTPException
from db_conn import (
    get_patients,
    add_patient,
    delete_patient,
    update_patient,
    clear_patients,
    fill_patients,
)
from fastapi.middleware.cors import CORSMiddleware
from utils import InvalidPesel, InvalidZipCode, InvalidPeselValue, validate_patient_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/patients")
async def root():
    return {"patients": get_patients()}


