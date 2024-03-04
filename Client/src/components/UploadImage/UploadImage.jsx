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

export default function UploadImage() {
  const [predictedBreed, setPredictedBreed] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  let breedImage = undefined;

  useEffect(() => {}, []);

  const predict = async (image) => {
    const predictImage = createFormData(image);
    await axios
      .post("http://127.0.0.1:5000/predict", predictImage)
      .then((res) => {
        let breedName = res.data.pred;
        breedName = breedName.replaceAll("_", " ");
        breedName = breedName.replaceAll("-", " ");
        breedName = setPredictedBreed(breedName);
        setUploaded(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Error Occured! Please try again");
      });
  };

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={styles.dropzoneContainer}>
      {uploaded ? (
        <div className={styles.postUpload}>
          <img src={imagePreview} alt="predicted-image" />

          <div className={styles.predContainer}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.iconPaw} icon={faPaw} />
              <span>Predicted</span>
            </div>
            <h1>{predictedBreed}</h1>
            <p>
              You've uploaded an image of <span>{predictedBreed}</span>
            </p>
            <div className={styles.btnConatiner}>
              <Button variant="dark">Generate Recommendation</Button>
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
