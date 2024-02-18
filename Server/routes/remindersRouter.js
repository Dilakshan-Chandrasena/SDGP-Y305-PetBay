const express = require("express");
const reminderController = require("../controllers/reminderController");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { userValidator } = require("../middlewares/validator");

router.route("/addReminder").post(userValidator, reminderController.addReminder);
router.route('/reminder').get(reminderController.getReminders)
router.route("/reminder/:id").get(reminderController.getReminderById);
router.route("/editReminder/:id").put(reminderController.editReminder);
router.route("/deleteReminder/:id").put(reminderController.deletReminder);

module.exports = router;
