const asyncHandler = require("express-async-handler");
const { storage } = require("../config/firebaseCloudStorage");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");

const remindersCollection = db.collection('reminders');

exports.getReminders = asyncHandler(async(req,res,next) => {
  const userId = req.params.id;
  const userReminders = await remindersCollection.where('userId', '==', userId).get();
  const reminderList = userReminders.docs.map(doc => doc.data())
  if(reminderList.length !== 0){
    res.status(200).json(reminderList);
  }else{
    res.status(200).json([]);
  }
});

exports.addReminder = asyncHandler(async (req,res,next) =>{
  const reminder = req.body;
  // reminder.userId = req.params.id;
  try{
    console.log(reminder)
    await db.collection("reminders").add(reminder)
    res.status(201).send("Reminder added successfully");
  }catch {
      throw new CustomError("Failed to add reminder", 400);
  }
});

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
