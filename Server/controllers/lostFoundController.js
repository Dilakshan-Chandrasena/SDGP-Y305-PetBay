const asyncHandler = require("express-async-handler");
const { storage } = require("../config/firebaseCloudStorage");
const { db } = require("../config/firebase");
const uuid = require("uuid");
const CustomError = require("../utils/CustomError");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");

// initializing used DB collections
const lostFoundPostsCollection = db.collection("lostFoundPosts");

/**
 * @description: add a lost or found posts
 * @method: POST
 * @returns:  lostFound JSON obj
 */
exports.addlostFound = asyncHandler(async (req, res, next) => {
  const newlostFoundPost = req.body;
  newlostFoundPost.id = uuid.v4();

  const petProfImage = req.file;
  let lostFoundImageURL = "";
  if (petProfImage) {
    const path = `lost-found-images/${newlostFoundPost.id}`;
    // setting the profile image of the new pet
    lostFoundImageURL = await saveFile(storage, path, req);
    newlostFoundPost.petImageURL = lostFoundImageURL;
  }
  const savedLostFoundPost = await lostFoundPostsCollection
    .doc(newlostFoundPost.id)
    .set(newlostFoundPost);
  const lostFound = (
    await lostFoundPostsCollection.doc(newlostFoundPost.id).get()
  ).data();
  res.status(201).json(lostFound);
});

/**
 * @description: get all the pets owner by the user
 * @param: userId
 * @method: GET
 * @returns: list of pet objs
 */
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await lostFoundPostsCollection.get();
  const allLostFoundPosts = allPosts.docs.map((doc) => doc.data());
  if (allLostFoundPosts.length !== 0) {
    res.status(200).json(allLostFoundPosts);
  } else {
    res.status(200).json([]);
  }
});

/**
 * desc: upload any file for firebase cloud storage
 * return : URL for the file
 *  */
saveFile = asyncHandler(async (storage, path, req) => {
  const storageRef = ref(storage, path);

  // Create file metadata including the content type
  const metadata = {
    contentType: req.file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log("File successfully uploaded.");
  return downloadURL;
});
