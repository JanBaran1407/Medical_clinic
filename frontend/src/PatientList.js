import './PatientsList.css';
import Patient from './Patient';
import { useEffect, useState } from 'react';
import BACKEND_URL from './consts';
import OperationsContainer from './OperationsContainer';
import { getAge } from './utils';

function PatientList() {
    const [patientsToDisplay, setPatientsToDisplay] = useState(undefined);
    const [patients, setPatients] = useState(undefined);

    function fetchPatients() {
        fetch(`${BACKEND_URL}/patients`).then(
            response => response.json()
        ).then(data => {
            setPatients(data.patients[0]);
            setPatientsToDisplay(data.patients[0]);
        }).catch(ex => {
            console.error(ex);
        })
    }

    function sortPatients(event) {
        const sortMethod = event.target.value;

        let newPatients = new Array(...patients);
        if (sortMethod.includes('age')) {
            newPatients = newPatients.sort((a, b) => {
                return getAge(a.pesel) - getAge(b.pesel)
            })
        }
        else if (sortMethod.includes('alphabetical')) {
            newPatients = newPatients.sort((a, b) => {
                return a.last_name.localeCompare(b.last_name);
            })
        }
        else {
            newPatients = newPatients.sort((a, b) => {
                return a.id - b.id
            })
        }

        if (sortMethod.includes('reverse')) {
            newPatients = newPatients.reverse();
        }

        setPatientsToDisplay(newPatients);
    }

    function filterPatients(event) {
        const filterValue = event.target.value;
        let newPatients = new Array(...patients);

        if (filterValue != "") {
            newPatients = newPatients.filter(patient => patient.last_name.includes(filterValue));
        }
        setPatientsToDisplay(newPatients);


    }

    useEffect(() => {
        if (patients === undefined) {
            fetchPatients();
        }
    });

    return (
        <>
            <OperationsContainer fetchPatients={fetchPatients} sortPatients={sortPatients} filterPatients={filterPatients} ></OperationsContainer>

            {patientsToDisplay ? <div className='patientsContainer'>
                {patientsToDisplay.map((patient) => {
                    return (
                        <Patient fetchPatients={fetchPatients} key={patient.id} patient={patient}></Patient>
                    )
                })}
            </div> : <span> No entries </span>}


        </>
    );
}

export default PatientList;
