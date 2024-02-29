import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from './addreminder.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddReminder(){
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { userId } = useParams();
    const [values, setValues] = useState({
        id: '',
        userId: '',
        dogName: '',
        reminderText: '',
        time: '',
        date: ''
    })
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    useEffect(() => {
      getPetNames();
    }, []);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        event.preventDefault();
        values.userId = userId;
        await axios.post('http://localhost:8080/petbay/api/v1/reminders/addReminder/', values)
        .then((res) =>{
            console.log(values);
            navigate('/reminder/' + userId)
            location.reload();
        })
        .catch(err => console.log(err))
        setValidated(true);
      };
      const getPetNames = async () => {
        await axios
          .get("http://localhost:8080/petbay/api/v1/pet-profiles/owned-pets/" + userId)
          .then((res) => {
            const data = res.data;
            console.log(data)
            setData(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
    return(
        <>
      <Button className={styles.addReminder} variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Button type="submit" className={styles.addButton}>Add</Button>
          <Modal.Title>Add a Reminder</Modal.Title>
          <Button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="7" controlId="validationCustom01">
          <Form.Label>Pet's Name</Form.Label>
          <Form.Select required defaultValue="" onChange={e => setValues({...values, dogName: e.target.value})}>
            <option value="" disabled>Select your pet's name</option>
            {data.map((data, index) => (
          <option key={index}>{data.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select your pet's name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Reminder</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your Reminder"
            defaultValue=""
            onChange={e => setValues({...values, reminderText: e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a Reminder.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="5" controlId="validationCustom04">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="State" required onChange={e => setValues({...values, date: e.target.value})}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom05">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" required onChange={e => setValues({...values, time: e.target.value})}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid time.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      
    </Form>
        </Modal.Body>
      </Modal>
    </>
    )
}

export default AddReminder