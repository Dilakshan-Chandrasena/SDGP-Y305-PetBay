import { useEffect, useState } from "react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./uploadimage.module.css";
import { faArrowUpFromBracket, faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../contexts/authContext";

export default function UploadImage() {
  // configuring base url based on the env
  const base_url =
    import.meta.env.VITE_SERVER_NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL;

  //fetching path variables and authentication details 
  const { userId } = useAuth();
  const { petId } = useParams();
  const navigate = useNavigate();
  // initializing state hooks for predictions
  const [predictedBreed, setPredictedBreed] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  
  // to store uploaded image
  let breedImage = undefined;


  useEffect(() => {}, []);

  // calling flask backend to predict the breed - POST
  const predict = async (image) => {
    const predictImage = createFormData(image);
    await axios
      .post("http://13.51.70.250/predict", predictImage)
      .then((res) => {
        let breedName = res.data.pred;
        // processing predicted breed name for better UI/UX
        breedName = breedName.replaceAll("_", " ");
        breedName = breedName.replaceAll("-", " ");
        breedName = breedName.toLowerCase();
        breedName = setPredictedBreed(breedName);
        setUploaded(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured! Please try again");
      });
  };

  // creating form data with image to pass to POST req
  const createFormData = (data) => {
    const formData = new FormData();
    formData.append("image", data);

    return formData;
  };

  // handling drag and drop zone using react-dropzone
  const onDrop = useCallback(async (acceptedFiles) => {
    breedImage = acceptedFiles[0];

    const image = new FileReader();

    image.onload = function () {
      setImagePreview(image.result);
    };
    image.readAsDataURL(acceptedFiles[0]);

    await predict(breedImage);
  }, []);

  // checking if user preferences set and redirecting accordingly -GET
  const generateRecommendation = async () => {
    axios
      .get(`${base_url}/petbay/api/v1/breed-recommendation/${userId}`)
      .then((res) => {
        const preferenceStatus = res.data.preferenceStatus;
        if (preferenceStatus == true) {
          // redirecting recommendation page
          navigate("/recommendation", {
            state: { breed: predictedBreed },
          });
        } else {
          // redirecting to quiz page
          alert("Please set your breed preferences by taking the quiz");
          navigate("/Quiz");
        }
      });
  };

  // deserializing props of dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={styles.dropzoneContainer}>
      {/* dynamically changing the view based on image upload status */}
      {uploaded ? (

        // rendering if image is umploaded with uploaded image
        <div className={styles.postUpload}>
          <img src={imagePreview} alt="predicted-image" />

          <div className={styles.predContainer}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.iconPaw} icon={faPaw} />
              <span>Predicted</span>
            </div>
            <h1>{predictedBreed}</h1>
            <p className={styles.para}>
              You've uploaded an image of <span>{predictedBreed}</span>
            </p>
            <div className={styles.btnConatiner}>
              <Button variant="dark" onClick={generateRecommendation}>
                Generate Recommendation
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  setUploaded(false);
                }}
              >
                Upload New Image
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // rendering image uploading dropzone
        <div className={styles.dropzone} {...getRootProps()}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faArrowUpFromBracket}
          />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Droping the Files</p>
          ) : (
            <div className={styles.uploadIntro}>
              <p>Choose or Drag & Drop an Image</p>
              <span>
                Let's predict the breed and get a recommendation for you!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
