import { useState } from 'react';
import './OperationsContainer.css';
import BACKEND_URL from './consts';
import { validateData } from './utils';


function OperationsContainer(props) {
  const [showAddDialogBox, setShowAddDialogBox] = useState(false);
  const [newPatientData, setNewPactientData] = useState({});
  const [missingDataInfo, setMissingDataInfo] = useState("");

  function updateNewPatientData(key, value) {
    setMissingDataInfo("");
    let updatedPatientData = { ...newPatientData }
    updatedPatientData[key] = value;
    setNewPactientData(updatedPatientData);
  }

  function savePatient() {
    let err_msg = validateData(newPatientData)
    if (err_msg === '') {
      fetch(`${BACKEND_URL}/patient/add`, { method: "POST", body: JSON.stringify(newPatientData) }).then(
        response => response.json()
      ).then(data => {
        if (data.hasOwnProperty('detail')) {
          setMissingDataInfo(data.detail);
        }
        else {
          setNewPactientData({});
          setShowAddDialogBox(false);
          props.fetchPatients();
        }
      }).catch(ex => {
        console.error(ex);
      })
    }
    else {
      setMissingDataInfo(err_msg);
    }
  }

  function cancelAddition() {
    setShowAddDialogBox(false);
    setMissingDataInfo("");
  }

  return (
    <>
      <div className='functionsContainer'>
        <div className='mainFunctionsContainer'>
          <select className='selectSort' onChange={props.sortPatients}>
            <option value="id">-- Please choose sorting --</option>
            <option value="id">Id</option>
            <option value="age">Age</option>
            <option value="reverse_age">Age (Reversed)</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="reverse_alphabetical">Alphabetical (Reversed)</option>
          </select>
          <input type='text' className='searchInput' placeholder='Type last name' onChange={props.filterPatients}></input>
        </div>
        <div className='addButtonConteinr'>
          <button className='addButton' onClick={() => setShowAddDialogBox(true)}>
            Add patient
          </button>
        </div>
      </div>
      {showAddDialogBox ? <div className='addPatientContainer'>
        <div className='addPatientParamsContainer'>
          <div className='warningInfo'>
            {missingDataInfo}
          </div>
          <div className='addPatientParamContainer'>
            Name:
            <input type="text" className='addParameter' onChange={(event) => updateNewPatientData('first_name', event.target.value)}></input>
          </div>
          <div className='addPatientParamContainer'>
            Surname:
            <input type="text" className='addParameter' onChange={(event) => updateNewPatientData('last_name', event.target.value)}></input>
          </div>
          <div className='addPatientParamContainer'>
            Pesel:
            <input type="text" className='addParameter' onChange={(event) => updateNewPatientData('pesel', event.target.value)}></input>
          </div>
          <div className='addPatientParamContainer'>
            Street:
            <input type="text" className='addParameter' onChange={(event) => updateNewPatientData('street', event.target.value)}></input>
          </div>
          <div className='addPatientParamContainer'>
            City:
            <input type="text" className='addParameter' onChange={(event) => updateNewPatientData('city', event.target.value)}></input>
          </div>
          <div className='addPatientParamContainer'>
            Zip-code:
            <input type="text" className='addParameter' onChange={(event) => updateNewPatientData('zip_code', event.target.value)}></input>
          </div>
          <div className='addPatientParamContainer'>
            <button className='cancelButton' onClick={cancelAddition}>
              Cancel
            </button>
            <button className='saveButton' onClick={savePatient}>
              Save
            </button>
          </div>
        </div>

      </div> : <div></div>}

    </>
  );
}

export default OperationsContainer;
