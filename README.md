### Running instructions
1. Install docker, you can use instructions from official Docker site [here](https://docs.docker.com/engine/install/).
2. Open terminal.
3. Run mongodb container using command: `docker run -d -p 27017:27017 --name mongo mongo:latest`.
4. Go to `backend` directory in project folder.
5. (Optional) Init virtual environment using `python -m venv env` and start it accordingly to your operational system.
6. Run `pip install -r requirements.txt` to install all necessary dependencies.
7. Run `uvicorn main:app --reload` to start backend.
8. Open another terminal and go to `frontend` directory in project folder.
9. Run: `npm install`. If you do not have npm installed you can follow this instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
10. Then run `npm start`.

After this steps you should be able to access the page under `http://localhost:3000/`.  
**Note:** If you have port `27017` occupied on your machine you can select different one and use: `docker run -d -p <different_port>:27017 --name mongo mongo:latest`. Please also change the connection string for mongodb in `backend\consts.py` file in that case.

### Filling the data

In `backend` directory there is file called `MOCK_DATA.json` with generated 500 patients to fill the database. To use it you can either use curl: `curl -X 'PUT' 'http://localhost:8000/patients/fill' -H 'accept: application/json'` or go to `http://localhost:8000/docs` and execute `patients/fill` request in swagger. Select said request and press `Execute`.  
If you whis to clear the database you can again, use curl `curl -X 'DELETE' 'http://localhost:8000/patients/delete' -H 'accept: application/json'` or select `patients/delete` in swagger and press `Execute`.

### Implemented features

1. Add patient.
2. Edit patient.
3. Delete patient.
4. List patient.
5. Add base validation for submitted data.
6. Data is stored in database.
7. Different types of sorting (by id, age, age reversed, alphabetical, alphabetical reversed).
8. Added search bar absed on last name of patient.

### Possible improvements

1. Dockerize every component and connect them using `docker-compose`.
2. Improve logging system for errors. 
3. Add paggination.
