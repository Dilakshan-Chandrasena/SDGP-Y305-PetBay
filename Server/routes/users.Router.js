const express = require("express");
const usersController = require("./../controllers/usersController");
const router = express.Router(); 
const { body, validationResult } = require("express-validator");
const {userValidator} = require("../middlewares/validator")


router.route("/create",).post(userValidator, usersController.createUser);
router.route("/:id").get(usersController.getUser);
router.route("/owned-pets/:id").get(usersController.getOwnedPets);
router.route("/preferences/set/:id").put(usersController.setUserBreedPreferences);


module.exports = router;