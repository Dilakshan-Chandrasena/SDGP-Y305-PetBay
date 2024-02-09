const asyncHandler = require("express-async-handler");
const { db, storage } = require("../config/firebase");
const CustomError = require("../utils/CustomError");
const multer = require("multer");
const { getDownloadURL, uploadBytesResumable } = require("firebase-admin/firestore");

//using multer as a middleware to gram the file
const upload = multer({ storage: multer.memoryStorage() });

exports.addPet = asyncHandler(upload.single("filename"),async (req, res, next) => {

  
});
