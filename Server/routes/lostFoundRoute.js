const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const lostFoundController = require("../controllers/lostFoundController");
const { lostFoundPostsValidator } = require("../middlewares/validator");

const multer = require("multer");

//using multer as a middleware to grab the file
const upload = multer({
  storage: multer.memoryStorage(),
});

router
  .route("/add-lostfound-posts")
  .post(
    upload.single("filename"),
    lostFoundPostsValidator,
    lostFoundController.addlostFound
  );

router.route("/lost-found-posts").get(lostFoundController.getAllPosts);
module.exports = router;
