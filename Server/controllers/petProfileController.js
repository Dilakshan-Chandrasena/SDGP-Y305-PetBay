const asyncHandler = require("express-async-handler");
const { storage } = require("../config/firebaseCloudStorage");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

// initializing used DB collections
const petsCollection = db.collection("pets");

exports.addPet = asyncHandler(async (req, res, next) => {
  const newPetProfile = req.body;
  newPetProfile.id = uuid.v4();

  const petProfImage = req.file;
  let petImageURL = "";
  if (petProfImage) {
    const path = `pet-profile-images/${newPetProfile.id}`;
    // setting the profile image of the new pet
    petImageURL = await saveFile(storage, path, req);
    newPetProfile.petImageURL = petImageURL;
   
  }
  const savedPetProfile = await petsCollection.doc(newPetProfile.id).set(newPetProfile);
  const petProfile = (await petsCollection.doc(newPetProfile.id).get()).data();
  res.status(201).json(petProfile);
});

/**
 * desc: upload any file for firebase cloud storage
 * return : URL for the file
 *  */
saveFile = asyncHandler(async (storage, path, req) => {
  const storageRef = ref(storage, path);

  // Create file metadata including the content type
  const metadata = {
    contentType: req.file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log("File successfully uploaded.");
  return downloadURL;
});

