import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddReminder(){
    const [values, setValues] = useState({
        dogName: '',
        reminderText: '',
        time: '',
        date: ''
    })

    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/addReminder', values)
        .then(res =>{
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleAdd}>
                    <h2>Add Reminder</h2>
                    <div className="mb-2">
                        <label htmlFor="">Dog Name:</label>
                        <input type="text" placeholder="Enter Dog's Name" required className="form-control" onChange={e => setValues({...values, dogName: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Reminder :</label>
                        <input type="text" placeholder="Enter the Reminder" required className="form-control" onChange={e => setValues({...values, reminderText: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Time:</label>
                        <input type="time" placeholder="Enter the Time" required className="form-control" onChange={e => setValues({...values, time: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Date:</label>
                        <input type="date" placeholder="Enter the Date" required className="form-control" onChange={e => setValues({...values, date: e.target.value})}/>
                    </div>
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddReminder