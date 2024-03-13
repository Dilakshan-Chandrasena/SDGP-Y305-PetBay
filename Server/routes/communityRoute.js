const express = require("express");
const communityController = require("../controllers/communityController.js");
const router = express.Router();

router.route("/feed").get(communityController.feed);
router.route("/getComments").get(communityController.getComments);
router.route('/addCommunityPost/:id').post(communityController.addCommunityPost)
router.route('/addComment/:id').post(communityController.addComment)
module.exports = router;
