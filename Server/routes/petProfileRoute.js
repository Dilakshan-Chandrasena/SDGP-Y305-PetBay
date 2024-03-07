const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const petProfileController = require("../controllers/petProfileController");
const { petProfileValidator } = require("../middlewares/validator");

const multer = require("multer");


//using multer as a middleware to grab the file
const upload = multer({ 
  storage: multer.memoryStorage(),
 });
router.route("/add-pet").post(upload.single("filename"),petProfileValidator,petProfileController.addPet);

router.route("/owned-pets/:id").get(petProfileController.getUserOwnedPets);

router.route("/:id").get(petProfileController.getPetProfileById);

router.route("/:id").delete(petProfileController.deletePet).put(upload.single("filename"),petProfileValidator,petProfileController.updatePet);



module.exports = router;