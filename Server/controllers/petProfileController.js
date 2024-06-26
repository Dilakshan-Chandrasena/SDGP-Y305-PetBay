const asyncHandler = require("express-async-handler");
const { storage } = require("../config/firebaseCloudStorage");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const {  ref,  getDownloadURL,  uploadBytesResumable, deleteObject} = require("firebase/storage");


// initializing used DB collections
const petsCollection = db.collection("pets");
const petRecordsCollection = db.collection("pet-records");


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
  const savedPetProfile = await petsCollection?.doc(newPetProfile.id).set(newPetProfile);
  const petProfile = (await petsCollection?.doc(newPetProfile.id).get())?.data();
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
  
  const userOwnedPetsSnap = await petsCollection?.where('userId', '==', userId).get();
  const userOwnedPets = userOwnedPetsSnap?.docs.map(doc => doc.data())
  if(userOwnedPets?.length !== 0){
    res.status(200).json(userOwnedPets);
  }else{
    res.status(200).json([]);
  }
});

/**
 * @description: get pet by the pet id
 * @param: petId
 * @method: GET
 * @returns: pet obj
 */
exports.getPetProfileById = asyncHandler((async(req,res,next)=>{
  const petId = req.params.id;
  const pet = (await petsCollection?.doc(petId).get())?.data()
  if(pet){
    res.status(200).json(pet);
  }else{
    throw new CustomError("Pet Not Found", 404);
  }
}))


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
      petImageURL = await saveFile(storage, path, req);
      updatePet.petImageURL = petImageURL;
     
    }
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

  if(petRef){
    if(petRef.petImageURL){
      const petImageRef = ref(storage, `pet-profile-images/${petId}`)
      await deleteObject(petImageRef);
    }
    
    deleteAllRecords(petId);
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
const saveFile = asyncHandler(async (storage, path, req) => {
  const storageRef = ref(storage, path);

  // Create file metadata 
  const metadata = {
    contentType: req.file.mimetype,
  };

  // Upload the file to cloud storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );

  // Gettinf the url for the file
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
});

// deleting all the pet records of a pet that is going to be deleted from the system
const deleteAllRecords = asyncHandler(async(petId)=>{
  const petRecListSnap = await petRecordsCollection.where('petId', '==', petId).get();
  const petRecList = petRecListSnap.docs.map(doc=>doc.data());
  if(petRecList.length > 0){
    for (let i = 0; i < petRecList.length; i++) {
      const recId = petRecList[i].id;
      const petRecFileRef = ref(storage, `pet-records/${recId + '-' + petRecList[i].recordName}`)
      await deleteObject(petRecFileRef);
      await petRecordsCollection.doc(recId).delete();
    }
  }
})



