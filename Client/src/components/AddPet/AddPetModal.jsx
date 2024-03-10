import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./addpetmodal.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

function AddPetModal({ reloadPetList }) {
  const base_url =
  import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;
      
  const { userId } = useParams();
  const [show, setShow] = useState(false);
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    breed: z.string().min(1, "Breed is required"),
    gender: z.string().min(1, "Gender is required"),
    address: z.string().min(1, "Address is required"),
    age: z.string().min(1, "Age is required"),
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
    filename: z
      .any()
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Invalid file format(Images Only) "
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    const addPetFormData = createFormData(data);
    await addPet(addPetFormData);
  };

  const createFormData = (data) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", data.name);
    formData.append("breed", data.breed);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("age", data.age);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("filename", data.filename[0]);
    formData.append("petImageURL", " ");
    formData.append("id", "");

    return formData;
  };

  const addPet = async (newPetData) => {
    console.log(newPetData);
    try {
      await axios
        .post(
          `${base_url}/petbay/api/v1/pet-profiles/add-pet`,
          newPetData
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            reset();
            handleClose();
            reloadPetList(userId);
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
    <>
      <button onClick={handleShow} className={styles.addBtn}>
        <span className={styles.addIcon}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </button>

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
            <Modal.Title style={{ fontSize: "18px" }}>New Pet</Modal.Title>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter Pet Name"
              />
              {errors.name && (
                <span className={styles.errorValidation}>
                  {errors.name.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("breed")}
                type="text"
                placeholder="Enter Breed"
              />
              {errors.breed && (
                <span className={styles.errorValidation}>
                  {errors.breed.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("gender")}
                type="text"
                placeholder="Select Gender"
              />
              {errors.gender && (
                <span className={styles.errorValidation}>
                  {errors.gender.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("address")}
                type="text"
                placeholder="Enter Address"
              />
              {errors.address && (
                <span className={styles.errorValidation}>
                  {errors.address.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("age")}
                type="text"
                placeholder="Enter Age"
              />
              {errors.age && (
                <span className={styles.errorValidation}>
                  {errors.age.message}
                </span>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                {...register("height")}
                className="mb-3"
                type="text"
                placeholder="Enter Height"
              />
              {errors.height && (
                <span className={styles.errorValidation}>
                  {errors.height.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("weight")}
                type="text"
                placeholder="Enter Weight"
              />
              {errors.weight && (
                <span className={styles.errorValidation}>
                  {errors.weight.message}
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
    </>
  );
}

export default AddPetModal;
