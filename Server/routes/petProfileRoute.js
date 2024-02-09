const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const petProfileController = require("../controllers/petProfileController");



module.exports = router;