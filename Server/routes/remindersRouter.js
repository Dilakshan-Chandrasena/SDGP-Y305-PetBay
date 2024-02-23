const express = require("express");
const reminderController = require("../controllers/reminderController");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { userValidator } = require("../middlewares/validator");

// router.route("/addReminder").post(userValidator, reminderController.addReminder);
router.route('/reminder/:id').get(reminderController.getReminders)
// router.route('/reminder/add-reminder/:id').post(reminderController.addReminder)
// router.route("/deleteReminder/:id").delete(reminderController.deletReminder);

module.exports = router;
