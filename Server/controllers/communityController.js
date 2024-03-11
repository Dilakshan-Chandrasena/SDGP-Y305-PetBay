const asyncHandler = require("express-async-handler");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const communityCollection = db.collection('community');
const userCollection = db.collection('users');

exports.addCommunityPost = asyncHandler(async(req, res, next) => {
    const communityPost = req.body;
    const userId = req.params.id;
    const postId = uuid.v4();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    communityPost.dateTime = formattedDate;
    communityPost.id = postId;
    const user = await userCollection.where('id', '==', userId).get();
    const userDoc = user.docs[0];
    const userData = userDoc.data();
    communityPost.username = userData.firstName + " " + userData.lastName;
    try{
        await communityCollection.doc(postId).set(communityPost);
        res.status(201).send("Reminder added successfully");
    }catch {
        throw new CustomError("Failed to add reminder", 400);
    }
});

exports.feed = asyncHandler(async(req,res,next) => {
    const posts = await communityCollection.get();
      const postList = posts.docs.map(doc => doc.data())
      if(postList.length !== 0){
        res.status(200).json(postList);
      }else{
        res.status(200).json([]);
      }
  });

exports.addComment = (async(req,res,next) => {
  const comments = req.body;
  const userId = req.params.id;
  
});