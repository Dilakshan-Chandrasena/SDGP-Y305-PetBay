const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const petRecordController = require("../controllers/petRecordController");
const multer = require("multer");


//using multer as a middleware to grab the file
const upload = multer({ 
  storage: multer.memoryStorage(),
 });

router.route("/add-record").post(upload.single("filename"), petRecordController.addRecord);
router.route("/records/:id").get(petRecordController.getPetRecordsById);
router.route("/:id").delete(petRecordController.deleteRecord);







module.exports = router;
