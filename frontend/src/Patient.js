import { useState } from 'react';
import './Patient.css';
import BACKEND_URL from './consts';
import { validateData } from './utils';

function Patient(props) {
    const [showEdit, setShowEdit] = useState(false)
    const [editErrorMsg, setEditErrorMsg] = useState("");
    const [deleteErrorMsg, setDeleteErrorMsg] = useState("");
    const [newPatientData, setNewPactientData] = useState(props.patient);

    function updateNewPatientData(key, value) {
        setEditErrorMsg("");
        let updatedPatientData = { ...newPatientData }
        updatedPatientData[key] = value;
        setNewPactientData(updatedPatientData);
    }

    function updatePatient() {
        let err_msg = validateData(newPatientData)
        if (err_msg === '') {
            fetch(`${BACKEND_URL}/patient/update`, { method: "PATCH", body: JSON.stringify(newPatientData) }).then(
                response => response.json()
            ).then(data => {
                if (data.hasOwnProperty('detail')) {
                    setEditErrorMsg(data.detail);
                }
                else {
                    setShowEdit(false);
                    props.fetchPatients();
                }
            }).catch(ex => {
                console.error(ex);
            })
        }
        else {
            setEditErrorMsg(err_msg);
        }
    }

    function deletePatient() {
        fetch(`${BACKEND_URL}/patient/delete`, { method: "DELETE", body: JSON.stringify({ id: props.patient.id }) }).then(
            response => response.json()
        ).then(data => {
            console.log(data);
            if (data.hasOwnProperty('detail')) {
                setDeleteErrorMsg(data.detail);
            }
            else {
                props.fetchPatients();
            }
        }).catch(ex => {
            console.error(ex);
        })
    }

    function cancelEdit() {
        setShowEdit(false);
        setEditErrorMsg("");
    }
    return (
        <>
            <div className='warningInfo'>
                {deleteErrorMsg}
            </div>
            <div className='patient'>
                <div className='patientName'>
                    {props.patient.first_name}
                </div>
                <div className='patientSurname'>
                    {props.patient.last_name}
                </div>
                <div className='patientPesel'>
                    {props.patient.pesel}
                </div>
                <div className='patientAddress'>
                    {props.patient.street} {props.patient.flatNumber}, {props.patient.zip_code} {props.patient.city}
                </div>
                <div className='patientControlButtons'>
                    <button className='deleteButton' onClick={deletePatient}>
                        Delete patient
                    </button>
                    <button className='editButton' onClick={() => setShowEdit(!showEdit)}>
                        Edit patient
                    </button>
                </div>
            </div>
            {showEdit ?
                <div className='addPatientContainer'>
                    <div className='addPatientParamsContainer'>
                        <div className='warningInfo'>
                            {editErrorMsg}
                        </div>
                        <div className='addPatientParamContainer'>
                            Name:
                            <input type="text" defaultValue={props.patient.first_name} className='addParameter' onChange={(event) => updateNewPatientData('first_name', event.target.value)}></input>
                        </div>
                        <div className='addPatientParamContainer'>
                            Surname:
                            <input type="text" defaultValue={props.patient.last_name} className='addParameter' onChange={(event) => updateNewPatientData('last_name', event.target.value)}></input>
                        </div>
                        <div className='addPatientParamContainer'>
                            Pesel:
                            <input type="text" defaultValue={props.patient.pesel} className='addParameter' onChange={(event) => updateNewPatientData('pesel', event.target.value)}></input>
                        </div>
                        <div className='addPatientParamContainer'>
                            Street:
                            <input type="text" defaultValue={props.patient.street} className='addParameter' onChange={(event) => updateNewPatientData('street', event.target.value)}></input>
                        </div>
                        <div className='addPatientParamContainer'>
                            City:
                            <input type="text" defaultValue={props.patient.city} className='addParameter' onChange={(event) => updateNewPatientData('city', event.target.value)}></input>
                        </div>
                        <div className='addPatientParamContainer'>
                            Zip-code:
                            <input type="text" defaultValue={props.patient.zip_code} className='addParameter' onChange={(event) => updateNewPatientData('zip_code', event.target.value)}></input>
                        </div>
                        <div className='addPatientParamContainer'>
                            <button className='cancelButton' onClick={cancelEdit}>
                                Cancel
                            </button>
                            <button className='saveButton' onClick={updatePatient} >
                                Update
                            </button>
                        </div>
                    </div>

                </div> :
                <div>
                </div>
            }
        </>
    );
}

export default Patient;
