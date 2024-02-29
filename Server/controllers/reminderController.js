const asyncHandler = require("express-async-handler");
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
  const reminderId = uuid.v4();
  reminder.id = reminderId;
  try{
    await remindersCollection.add(reminder)
    res.status(201).send("Reminder added successfully");
  }catch {
      throw new CustomError("Failed to add reminder", 400);
  }
});

exports.deleteReminder = asyncHandler(async (req,res, next) => {
  const id = req.params.id;
  try{
    await remindersCollection.doc(id).delete();
    res.json({ success: true, message: 'Data deleted successfully.' });
    console.log("Data deleted Successfully");
  }catch{
    throw new CustomError("Failed to delete the reminder", 400);
  }
})
