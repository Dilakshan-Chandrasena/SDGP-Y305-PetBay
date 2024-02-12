const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const petProfileController = require("../controllers/petProfileController");

const multer = require("multer");


//using multer as a middleware to grab the file
const upload = multer({ 
  storage: multer.memoryStorage(),
 });
router.route("/add-pet").post(upload.single("filename"),petProfileController.addPet);



module.exports = router;