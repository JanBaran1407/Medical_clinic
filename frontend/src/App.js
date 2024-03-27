import './App.css';
import PatientList from './PatientList';


function App() {
  return (
    <>
      <div className='titleContainer'>
        <div className='title'>
          Patients management system
        </div>

      </div>
      <div className='contentContainer'>
        <div className='content'>
          <PatientList></PatientList>
        </div>
      </div>


    </>
  );
}

export default App;
