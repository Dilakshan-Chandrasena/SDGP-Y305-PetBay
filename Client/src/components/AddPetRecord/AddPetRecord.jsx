import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import styles from "./addpetrecord.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function AddPetRecord({ reloadRecordsList }) {
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
      
  const { petId } = useParams();
  const [show, setShow] = useState(false);

  //Declaring accepted file formats for record
  const ACCEPTED_MIME_TYPES = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  //defining a zod schema to validate form inputs
  const formSchema = z.object({
    recordName: z.string().min(1, "Name is required"),
    date: z.string().min(1, "Date is required"),
    filename: z
      .any()
      .refine(
        (files) => ACCEPTED_MIME_TYPES.includes(files?.[0]?.type),
        "Invalid file format"
      ),
  });

  //handling the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  //Close pop up form
  const handleClose = () => {
    setShow(false);
  };

  //Opens pop up form
  const handleShow = () => setShow(true);

  //on submitting the form
  const onSubmit = async (data) => {
    const addPetRecordFormData = createFormData(data);
    await addPetRecord(addPetRecordFormData);
  };

  //creates the form data from the user input
  const createFormData = (data) => {
    const formData = new FormData();
    formData.append("petId", petId);
    formData.append("recordName", data.recordName);
    formData.append("date", data.date);
    formData.append("filename", data.filename[0]);
    formData.append("petRecordURL", " ");
    formData.append("id", "");


    return formData;
  };

  //saves a new pet record in the DB using backend api call:POST
  const addPetRecord = async (newPetRecordData) => {
    console.log(newPetRecordData);
    try {
      await axios
        .post(
          `${base_url}/petbay/api/v1/pet-records/add-record`,
          newPetRecordData
        )
        .then((res) => {
          if (res.status == 201) {
            reset();
            handleClose();
            reloadRecordsList(petId);
          } else {
            throw new Error(res);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleShow} className={styles.addBtn} variant="primary">
        Add Record
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <Modal.Header className={styles.modalHeader}>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Modal.Title style={{ fontSize: "18px" }}>New Record</Modal.Title>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                {...register("recordName")}
                type="text"
                placeholder="Enter Record Name"
              />
              {errors.recordName && (
                <span className={styles.errorValidation}>
                  {errors.recordName.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control {...register("date")} type="date" />
              {errors.date && (
                <span className={styles.errorValidation}>
                  {errors.date.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("filename")}
                type="file"
                placeholder="Upload Profile Image"
              />
              {errors.filename && (
                <span className={styles.errorValidation}>
                  {errors.filename.message}
                </span>
              )}
            </Form.Group>
            <div style={{ visibility: isSubmitting ? "visible" : "hidden" }}>
              <Loading />
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
