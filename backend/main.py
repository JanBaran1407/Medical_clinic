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


@app.post("/patient/add")
async def root(request: Request):

    try:
        patient_data = await request.json()
        validate_patient_data(patient_data)
        inserted = add_patient(patient_data)
        return {"inserted": inserted}

    except InvalidPesel as e:
        raise HTTPException(
            status_code=422,
            detail="Pesel number is not valid, please make sure it has 11 digits and does not contain any other characters.",
        )
    except InvalidZipCode as e:
        raise HTTPException(
            status_code=422,
            detail="Zip Code number is not valid, please make sure it has two parts divided by '-' character.",
        )
    except InvalidPeselValue as e:
        raise HTTPException(
            status_code=422,
            detail="Please check if pesel number contains correct values. 3 and 4 number must be less or eqauls to 12 and 4 and 5 number must be less or eqauls 31.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unhandeled exception occured. Please check the connection to database.\n{e}",
        )


@app.delete("/patient/delete")
async def root(request: Request):
    try:
        patient_data = await request.json()
        deleted = delete_patient(patient_data["id"])
        return {"deleted": deleted}

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unhandeled exception occured. Please check the connection to database.\n{e}",
        )


@app.patch("/patient/update")
async def root(request: Request):
    try:
        patient_data = await request.json()
        validate_patient_data(patient_data)
        updated = update_patient(patient_data)
        return {"updated": updated}

    except InvalidPesel as e:
        raise HTTPException(
            status_code=422,
            detail="Pesel number is not valid, please make sure it has 11 digits and does not contain any other characters.",
        )
    except InvalidZipCode as e:
        raise HTTPException(
            status_code=422,
            detail="Zip Code number is not valid, please make sure it has two parts divided by '-' character.",
        )
    except InvalidPeselValue as e:
        raise HTTPException(
            status_code=422,
            detail="Please check if pesel number contains correct values. 3 and 4 number must be less or eqauls to 12 and 4 and 5 number must be less or eqauls 31.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unhandeled exception occured. Please check the connection to database.\n{e}",
        )
