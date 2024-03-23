const asyncHandler = require("express-async-handler");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const remindersCollection = db.collection('reminders');

/**
 * @description: gets all the reminders of the user
 * @method: GET
 * @returns:  List of reminders
 */
exports.getReminders = asyncHandler(async(req,res,next) => {
  const userId = req.params.id;
  const userReminders = await remindersCollection.where('userId', '==', userId).get();
    const reminderList = userReminders.docs.map(doc => doc.data())
    if(reminderList.length !== 0){
      res.status(200).json(reminderList);
    }else{
      res.status(404).json([]);
    }
});

/**
 * @description: add a reminder
 * @method: POST
 * @returns:  Reminder Object
 */
exports.addReminder = asyncHandler(async (req,res,next) =>{
  const reminder = req.body;
  const reminderId = uuid.v4();
  reminder.id = reminderId;
  try{
    // Check for required fields
    if(reminder.userId == "" || !reminder.remderText == ""){
      res.status(400).json({ error: 'Missing required fields' });
    }else{
      await remindersCollection.doc(reminderId).set(reminder);
      res.status(201).send("Reminder added successfully");
    }
    
  }catch {
        // Handle error if reminder addition fails
      throw new CustomError("Failed to add reminder", 400);
  }
});

/**
 * @description: Deletes a reminder
 * @method: DELETE
 * @returns:  Status
 */
exports.deleteReminder = asyncHandler(async(req,res,next) => {
  const reminderId = req.params.id;
  await remindersCollection.doc(reminderId).delete();
  res.status(200).json({
      reminderId : reminderId,
      deleteStatus : "Deleted"
  })
});
