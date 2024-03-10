import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams  } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./addreminder.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AddReminder({loadReminders}) {
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
      
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userId } = useParams();
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    id: "",
    userId: "",
    dogName: "",
    reminderText: "",
    time: "",
    date: "",
  });

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
    await axios
      .post(
        `${base_url}/petbay/api/v1/reminders/addReminder/`,
        values
      )
      .then(async (res) => {
        alert("Reminder added")
        handleClose();       
        loadReminders;
      })
      .catch((err) => console.log(err));
    setValidated(true);
  };

  const getPetNames = async () => {
    await axios
      .get(
        `${base_url}/petbay/api/v1/pet-profiles/owned-pets/${userId}`
      )
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Button
        className={styles.addReminder}
        variant="primary"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header className={styles.modalHeader}>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Modal.Title style={{ fontSize: "18px" }}>New Reminder</Modal.Title>
            <Button type="submit" variant="primary" >
              Add
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="7" controlId="validationCustom01">
                  <Form.Label>Pet's Name</Form.Label>
                  <Form.Select
                    required
                    defaultValue=""
                    onChange={(e) =>
                      setValues({ ...values, dogName: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select your pet's name
                    </option>
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
                    onChange={(e) =>
                      setValues({ ...values, reminderText: e.target.value })
                    }
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
                  <Form.Control
                    type="date"
                    placeholder="State"
                    required
                    onChange={(e) =>
                      setValues({ ...values, date: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="validationCustom05">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    onChange={(e) =>
                      setValues({ ...values, time: e.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid time.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

