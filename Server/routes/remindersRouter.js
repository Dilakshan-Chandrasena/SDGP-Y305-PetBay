const express = require("express");
const reminderController = require("../controllers/reminderController");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { userValidator } = require("../middlewares/validator");

router.route("/addReminder").post(reminderController.addReminder);
router.route('/reminder/:id').get(reminderController.getReminders)
router.route("/deleteReminder/:id").delete(reminderController.deleteReminder);
router.route("/google").get(reminderController.getGoogleAuth);
router.route("/google/redirect").get(reminderController.googleRedirect);
router.route("/schedule-event").post(reminderController.scheduleEvent);

module.exports = router;
