const asyncHandler = require("express-async-handler");
const { storage } = require("../config/firebaseCloudStorage");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const {  ref,  getDownloadURL,  uploadBytesResumable, deleteObject} = require("firebase/storage");


// initializing used DB collections
const petsCollection = db.collection("pets");


/**
 * @description: add a pet profile and pet profile picture
 * @method: POST
 * @returns:  pet JSON obj
 */
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
 * @description: get all the pets owner by the user
 * @param: userId
 * @method: GET
 * @returns: list of pet objs
 */
exports.getUserOwnedPets = asyncHandler(async(req,res,next) => {
  const userId = req.params.id;
  
  const userOwnedPetsSnap = await petsCollection.where('userId', '==', userId).get();
  const userOwnedPets = userOwnedPetsSnap.docs.map(doc => doc.data())
  if(userOwnedPets.length !== 0){
    res.status(200).json(userOwnedPets);
  }else{
    res.status(200).json([]);
  }
});


/**
 * @description: Updates pet details including the pet image if included
 * @method: PUT
 * @returns:  pet JSON obj
 */
exports.updatePet = asyncHandler(async (req, res, next) => {
  const updatePet = req.body;
  const petId = req.params.id;

  const petRef = await petsCollection.doc(petId);
  const pet = await (await petRef.get()).data()
  if(pet){
    const petProfImage = req.file;
    let petImageURL = "";
    if (petProfImage) {
      const path = `pet-profile-images/${petId}`;
      // setting the profile image of the new pet
      petImageURL = await saveFile(storage, path, req);
      updatePet.petImageURL = petImageURL;
     
    }
    console.log(updatePet);
    await petRef.update(updatePet);
    const updatedPetDet = (await petsCollection.doc(petId).get()).data();
    res.status(200).json(updatedPetDet);
    

  }else{
    throw new CustomError(`Pet does not exist! Invalid ID: ${petId}`, 400);
  }

});


/**
 * @description: Delete a pet profile
 * @param: pet id
 * @method: DELETE
 * @returns: list of pet objs
 */
exports.deletePet = asyncHandler(async(req,res,next) => {
  const petId = req.params.id;
  const petRef = (await petsCollection.doc(petId).get()).data();
  console.log(petRef);
  if(petRef){
    if(petRef.petImageURL){
      const petImageRef = ref(storage, `pet-profile-images/${petId}`)
      await deleteObject(petImageRef);
    }
  
    await petsCollection.doc(petId).delete();
   
    res.status(200).json({
      petId:petId,
      deleteStatus : "Deleted"
    });
  }else{
    throw new CustomError(`Pet does not exist: ${petId}`, 400);
  }

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



