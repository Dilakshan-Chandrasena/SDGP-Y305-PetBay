const express = require("express");
const communityController = require("../controllers/communityController.js");
const router = express.Router();

router.route("/feed").get(communityController.feed);
router.route('/addCommunityPost/:id').post(communityController.addCommunityPost)
module.exports = router;
