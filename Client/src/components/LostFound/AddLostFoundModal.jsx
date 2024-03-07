import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./lostfound.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Loading from "./Loading";
import { useAuth } from "../../contexts/authContext";
import "firebase/auth";

function AddLostFoundModal({ reloadLostFoundPosts }) {
  const { userId } = useAuth();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    breed: z.string().min(1, "Breed is required"),
    color: z.string().min(1, "Colour is required"),
    area: z.string().min(1, "Area is required"),
    height: z.string().min(1, "Height is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    features: z.string().min(1, "Features are  required"),
    contact: z.string().min(1, "Contact is required"),
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
  const onInvalid = (errors) => console.error(errors);

  const onSubmit = async (data) => {
    const addLostFoundData = createFormData(data);
    await addLostFoundPost(addLostFoundData);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDateTime = now.toISOString();
    return formattedDateTime;
  };

  const createFormData = (data) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", data.name);
    formData.append("breed", data.breed);
    formData.append("color", data.color);
    formData.append("gender", gender);
    formData.append("area", data.area);
    formData.append("height", data.height);
    formData.append("status", status); // Use selected status
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("features", data.features);
    formData.append("contact", data.contact);
    formData.append("filename", data.filename[0]);
    formData.append("lostFoundImageURL", " ");
    formData.append("createdDate", getCurrentDateTime());
    formData.append("id", "");
    return formData;
  };

  const addLostFoundPost = async (newLostFoundData) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/petbay/api/v1/lost-found/add-lostfound-posts",
        newLostFoundData
      );
      if (res.status === 201) {
        reset();
        handleClose();
        reloadLostFoundPosts();
      } else {
        throw new Error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Please try again.");
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
        <Form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          disabled={isSubmitting}
        >
          <Modal.Header className={styles.modalHeader}>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Modal.Title style={{ fontSize: "18px" }}>New Post</Modal.Title>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <span style={{ paddingRight: "40px" }}>Status</span>
              <Form.Check
                inline
                label="Lost"
                type="radio"
                name="status"
                value="lost"
                onChange={() => setStatus("lost")}
              />
              <Form.Check
                inline
                label="Found"
                type="radio"
                name="status"
                value="found"
                onChange={() => setStatus("found")}
              />
            </Form.Group>

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
                {...register("color")}
                type="text"
                placeholder="Color"
              />
              {errors.color && (
                <span className={styles.errorValidation}>
                  {errors.color.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <span style={{ paddingRight: "40px" }}>Gender</span>
              <Form.Check
                inline
                label="Male"
                type="radio"
                name="gender"
                value="Male"
                onChange={() => setGender("Male")}
              />
              <Form.Check
                inline
                label="Female"
                type="radio"
                name="gender"
                value="Female"
                onChange={() => setGender("Female")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("area")}
                type="text"
                placeholder="Lost or Found Area"
              />
              {errors.area && (
                <span className={styles.errorValidation}>
                  {errors.area.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("date")}
                type="date"
                placeholder="Lost or Found Date"
              />
              {errors.date && (
                <span className={styles.errorValidation}>
                  {errors.date.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("time")}
                type="time"
                placeholder="Lost or Found Time"
              />
              {errors.date && (
                <span className={styles.errorValidation}>
                  {errors.date.message}
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
                {...register("features")}
                type="text"
                placeholder="Other features"
              />
              {errors.contact && (
                <span className={styles.errorValidation}>
                  {errors.contact.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("contact")}
                type="text"
                placeholder="Contact"
              />
              {errors.contact && (
                <span className={styles.errorValidation}>
                  {errors.contact.message}
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("filename")}
                type="file"
                placeholder="Upload Pet Image"
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

export default AddLostFoundModal;
