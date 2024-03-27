from consts import MONGO_CONECTION_URL
from pymongo import MongoClient, DESCENDING
import json


db = MongoClient(MONGO_CONECTION_URL)
patients_db = db["patients"]
patients_collection = patients_db["patients"]


def get_patients():
    cursor = patients_collection.find({}, {"_id": 0})
    patients = [patient for patient in cursor]
    return [patients]


def get_max_id():
    max_id_patient = patients_collection.find_one(sort=[("id", DESCENDING)])
    return max_id_patient["id"]


def add_patient(patient_data: dict):
    max_id = get_max_id()
    patient_data["id"] = max_id + 1
    inserted = patients_collection.insert_one(patient_data)
    return inserted.acknowledged


def delete_patient(id: int):
    deleted = patients_collection.delete_one({"id": id})
    return deleted.acknowledged


def update_patient(patient_data: dict):
    updated = patients_collection.update_one(
        {"id": patient_data["id"]}, {"$set": patient_data}
    )
    return updated.acknowledged


def clear_patients():
    deleted = patients_collection.delete_many({})
    return deleted


def fill_patients():
    with open("MOCK_DATA.json", "r", encoding="utf-8") as mock_file:
        mock_patients = json.load(mock_file)
        for id, patient in enumerate(mock_patients):
            patient["id"] = id
            _ = patients_collection.insert_one(patient)
        return len(mock_patients)
