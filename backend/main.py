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


@app.delete("/patients/delete")
async def root():
    try:
        deleted = clear_patients()
        return {"deleted": deleted.deleted_count}

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unhandeled exception occured. Please check the connection to database.\n{e}",
        )


@app.put("/patients/fill")
async def root():
    try:
        inserted = fill_patients()
        return {"inserted": inserted}

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unhandeled exception occured. Please check the connection to database.\n{e}",
        )

