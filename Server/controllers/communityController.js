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

exports.addComment = asyncHandler(async(req,res,next) => {
  const commentsData = req.body;
  const userId = req.params.id;
  const post = await communityCollection.where('id', '==', commentsData.commentId).get();
  const postDoc = post.docs[0];
  const postData = postDoc.data();
  const commentArray = postData.comments || [];
  const usernameList = await userCollection.where("id", "==", userId).get();
  const userDoc = usernameList.docs[0];
  const userData = userDoc.data();
  const username = userData.firstName + " " + userData.lastName;
  if(username && post){
    commentsData.commentUser = username;
    const updatedComments = [...commentArray, commentsData];
      await communityCollection.doc(postDoc.id).update({
        comments: updatedComments
      });
    res.status(200).json({ reqStatus: "Success" });
  }else {
    throw new CustomError("Comments not added. Try Again", 400);
  }
});

exports.getComments = asyncHandler (async(req,res,next) => {
  const commentDoc = await communityCollection.get();
  const commentRef = commentDoc.docs.map(doc => doc.data().comments)
  if(commentRef.length != 0){
    res.status(200).json(commentRef);
  }else{
    res.status(500).json([]);
  }
})
