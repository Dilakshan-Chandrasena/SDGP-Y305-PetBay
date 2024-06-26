const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const breedRecommendationController = require("../controllers/breedRecommendationController");

router.route("/create-breed").post(breedRecommendationController.createBreed);
router.route("/").post(breedRecommendationController.generateBreedRecommendation);
router.route("/:userId").get(breedRecommendationController.isUserBreedPreferencesSet);

module.exports = router;
