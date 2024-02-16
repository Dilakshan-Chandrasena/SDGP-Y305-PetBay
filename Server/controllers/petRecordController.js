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
 * @description: add a pet record along with a file using multer
 * @method: POST
 * @returns:  Pet record obj
 */
exports.addRecord = asyncHandler(async (req,res,next) =>{
    const petRecocrd = req.body;
    const recordFile = req.file;
    if(recordFile){
        const recordId = uuid.v4();
        petRecocrd.id = recordId;
        const recordsPath = `pet-records/${recordId + '-' +petRecocrd.recordName}`;
        const recordURL = await saveFile(storage,recordsPath,req);
        petRecocrd.petRecordURL = recordURL;
        await petRecordsCollection.doc(recordId).set(petRecocrd);
        const newPetRecord = (await petRecordsCollection.doc(recordId).get()).data();

        res.status(201).json(newPetRecord);
    }else{
        throw new CustomError("Pet record file is required", 400);
    }
});

/**
 * @description: Get list of pet records by pet id
 * @method: GET
 * @returns:  List of pet reocords
 */
exports.getPetRecordsById = asyncHandler(async(req,res,next) => {
    const petId = req.params.id;
    console.log(petId);
    const petRecordsSnap = await petRecordsCollection.where('petId', '==', petId).get();
    const petsRecordsList = petRecordsSnap.docs.map(doc => doc.data());
    console.log(petsRecordsList);
    if(petsRecordsList.length !== 0){
        res.status(200).json(petsRecordsList);
      }else{
        res.status(200).json([]);
      }

});

/**
 * @description: Delete a record by record id
 * @param: record id
 * @method: DELETE
 * @returns:  Delete status
 */
exports.deleteRecord = asyncHandler(async(req,res,next) => {
    const dltRecordId = req.params.id;
    const petRecord = (await petRecordsCollection.doc(dltRecordId).get()).data();
    const petRecFileRef = ref(storage, `pet-records/${dltRecordId + '-' + petRecord.recordName}`)
    await deleteObject(petRecFileRef);
    await petRecordsCollection.doc(dltRecordId).delete();
    res.status(200).json({
        recordId : dltRecordId,
        deleteStatus : "Deleted"
    })
});




/**
 * desc: upload any file for firebase cloud storage
 * return : URL for the file
 *  */
saveFile = asyncHandler(async (storage, path, req) => {
    const storageRef = ref(storage, path);
  
    // Grab meta data of the file
    const metadata = {
      contentType: req.file.mimetype,
    };
  
    // Upload the file to firebase cloud storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

  
    // Grab the public URL and return
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File successfully uploaded.");
    return downloadURL;
  });