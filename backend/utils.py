class InvalidPesel(Exception):
    pass


class InvalidPeselValue(Exception):
    pass


class InvalidZipCode(Exception):
    pass


def validate_patient_data(patient_data: dict):
    if len(patient_data["pesel"]) != 11 or not patient_data["pesel"].isdigit():
        raise InvalidPesel

    if int(patient_data["pesel"][2:4]) > 12 or int(patient_data["pesel"][4:6]) > 31:
        raise InvalidPeselValue

    splited_zip_code = patient_data["zip_code"].split("-")
    if (
        len(splited_zip_code) != 2
        or not splited_zip_code[0].isdigit()
        or not splited_zip_code[1].isdigit()
    ):
        raise InvalidZipCode
