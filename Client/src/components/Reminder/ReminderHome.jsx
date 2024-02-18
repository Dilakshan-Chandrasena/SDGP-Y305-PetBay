import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ReminderHome(){
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5173/reminder')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:5173/deleteReminder/' + id)
        .then(res => {
            window.location.reload()
        })
        .catch(err => console.log(err));
    }
    
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Reminder List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/addReminder" className="btn btn-success">Add Reminder +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td className='fw-bold'>Reminder</td>
                            <td className='fw-bold'>Dog Name</td>
                            <td className='fw-bold'>Time</td>
                            <td className='fw-bold'>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((reminder, index) => {
                            return <tr key={index}>
                                <td>{reminder.reminderText}</td>
                                <td>{reminder.dogName}</td>
                                <td>{reminder.time}</td>
                                <td>{reminder.date}</td>
                                <td>
                                    <Link to={`/editReminder/${reminder.id}`} className='btn btn-primary me-2'>Edit</Link>
                                    <button onClick={ () => handleDelete(reminder.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReminderHome