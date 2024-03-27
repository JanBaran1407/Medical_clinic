
export function parseStrtoDate(pesel) {
    let year = pesel.substring(0, 2);
    let month = pesel.substring(2, 4);
    let day = pesel.substring(4, 6);

    if (Number(year) < 25) {
        year = '20' + year;
    }
    else {
        year = '19' + year;
    }
    return new Date(Date.parse(`${year}-${month}-${day}`));

}

export function getAge(pesel) {
    let today = new Date();
    let birthDate = parseStrtoDate(pesel);

    let age = today.getFullYear() - birthDate.getFullYear();
    let month_diff = today.getMonth() - birthDate.getMonth();
    if (month_diff < 0 || (month_diff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export function validateData(newPatientData) {
    const NECESSARY_KEYS = ['first_name', 'last_name', 'street', 'city', 'zip_code', 'pesel']

    for (const key of NECESSARY_KEYS) {
        if (!newPatientData.hasOwnProperty(key) || newPatientData[key] === "") {
            return `You have to fill ${key.replace('_', ' ')} information!`;
        }
    }
    return '';

}
