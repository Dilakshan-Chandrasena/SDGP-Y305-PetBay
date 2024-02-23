const asyncHandler = require("express-async-handler");
const { storage } = require("../config/firebaseCloudStorage");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const {  ref,  getDownloadURL,  uploadBytesResumable, deleteObject} = require("firebase/storage");

const remindersCollection = db.collection('reminders');
const petsCollection = db.collection('pets');

exports.getReminders = asyncHandler(async(req,res,next) => {
  const userId = req.params.id;
  const userReminders = await remindersCollection.where('userId', '==', userId).get();
  const reminderList = userReminders.docs.map(doc => doc.data())
  const pets = await petsCollection.where('userId', '==', userId).get();
  const petsList = pets.docs.map(doc => doc.data())
  if(reminderList.length !== 0){
    res.status(200).json(reminderList);
  }else{
    res.status(200).json([]);
  }
});

// exports.addRecord = asyncHandler(async (req,res,next) =>{
//   const petRecocrd = req.body;
//   const recordFile = req.file;
//   if(recordFile){
//       const recordId = uuid.v4();
//       petRecocrd.id = recordId;
//       const recordsPath = `pet-records/${recordId + '-' +petRecocrd.recordName}`;
//       const recordURL = await saveFile(storage,recordsPath,req);
//       petRecocrd.petRecordURL = recordURL;
//       await petRecordsCollection.doc(recordId).set(petRecocrd);
//       const newPetRecord = (await petRecordsCollection.doc(recordId).get()).data();

//       res.status(201).json(newPetRecord);
//   }else{
//       throw new CustomError("Pet record file is required", 400);
//   }
// });
// // GET data using the document ID
// exports.getReminderById =("/reminder/:id", async (req, res) => {
//   const documentId = req.params.id;

//   try {
//     const doc = await admin
//       .firestore()
//       .collection("reminders")
//       .doc(documentId)
//       .get();

//     if (!doc.exists) {
//       return res.status(404).json({ error: "Document not found" });
//     }

//     const data = { id: doc.id, ...doc.data() };
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Adding a new Reminder
// exports.addReminder = ("/addReminder", async (req, res) => {
//   const { dogName, reminderText, time, date } = req.body;
//   try {
//     await db.collection("reminders").add({
//       dogName,
//       reminderText,
//       time,
//       date,
//     });

//     res.status(201).send("Reminder added successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Editing a reminder
// exports.editReminder = ("/editReminder/:id", async (req, res) => {
//   const { id } = req.params;
//   const newData = req.body;

//   try {
//     const documentRef = admin.firestore().collection("reminders").doc(id);

//     // Check if the document exists
//     const doc = await documentRef.get();
//     if (!doc.exists) {
//       return res.status(404).json({ error: "Document not found" });
//     }

//     // Update the document
//     await documentRef.update(newData);

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Delete data from the database
// exports.deleteReminder = ("/deleteReminder/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     await admin.firestore().collection("reminders").doc(id).delete();
//     res.json({ success: true, message: "Data deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
