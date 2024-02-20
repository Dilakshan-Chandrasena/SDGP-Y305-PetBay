import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Card from "react-bootstrap/Card";



function ReminderHome() {
  const [data, setData] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/petbay/api/v1/reminders/reminder/" + userId)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        "http://localhost:8080/petbay/api/v1/reminders/deleteReminder" + id
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    
    <div className="main">
      <div className="header">
        <Header />
      </div>

      <div className="d-flex  vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <h2>Reminder List</h2>
          <div className="d-flex justify-content-end">
            <Link to="/addReminder" className="btn btn-success">
              Add Reminder +
            </Link>
          </div>
          <table className="table">
            <tbody>
              {data.map((reminder, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Card>
                        <Card.Body>
                            <div className="card d-flex ">
                                {reminder.reminderText}
                            </div>
                            </Card.Body>
                      </Card>
                    </td>
                    {/* <td>{reminder.dogName}</td>
                    <td>{reminder.time}</td>
                    <td>{reminder.date}</td> */}
                    {/* <td>
                      <Link
                        to={`/editReminder/${reminder.id}`}
                        className="btn btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ReminderHome;
