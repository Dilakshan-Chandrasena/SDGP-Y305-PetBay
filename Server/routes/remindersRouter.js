const express = require("express");
const reminderController = require("../controllers/reminderController");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.route("/addReminder").post(reminderController.addReminder);
router.route('/reminder/:id').get(reminderController.getReminders)
router.route("/deleteReminder/:id").delete(reminderController.deleteReminder);
router.route("/create-tokens").post(reminderController.createTokens);

module.exports = router;
