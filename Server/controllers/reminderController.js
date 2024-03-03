const asyncHandler = require("express-async-handler");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const { google } = require("googleapis");

const remindersCollection = db.collection('reminders');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

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


exports.createTokens = asyncHandler(async (req, res, next) => {
  try {
    const { code } = res.body
    const response = await oauth2Client.getToken(code)
    res.send(response)
  } catch (error) {
    next(error.response.data)
  }
})


exports.scheduleEvent = asyncHandler (async (req, res, next) => {
  const reminder = req.body;
  const event = {
    'summary': reminder.reminderText,
    'start': {
      'dateTime': reminder.date+"T"+reminder.time+":00+05:30",
      'timeZone': 'Asia/Colombo',
    },
    'end': {
      'dateTime': reminder.date+"T"+reminder.time+":00+05:30",
      'timeZone': 'Asia/Colombo',
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  await calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    resource: event,
});

res.send({
    msg: "Done",
})
})

exports.addReminder = asyncHandler(async (req,res,next) =>{
  const reminder = req.body;
  const reminderId = uuid.v4();
  reminder.id = reminderId;
  console.log(reminder);
  try{
    await remindersCollection.doc(reminderId).set(reminder);
    res.status(201).send("Reminder added successfully");
  }catch {
      throw new CustomError("Failed to add reminder", 400);
  }
});

exports.deleteReminder = asyncHandler(async(req,res,next) => {
  const reminderId = req.params.id;
  await remindersCollection.doc(reminderId).delete();
  res.status(200).json({
      reminderId : reminderId,
      deleteStatus : "Deleted"
  })
});
