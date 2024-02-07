const asyncHandler = require("express-async-handler");
const { db } = require("./../config/firebase");
const CustomError = require("../utils/CustomError");

exports.createBreed = asyncHandler(async (req, res, next) => {
    const newBreed = req.body;
    if(newBreed){
        const savedBreed = await db.collection("breeds").doc(newBreed.breedName).set(newBreed);
        res.status(201).json(savedBreed);
    }else{
        throw new CustomError("Invalid Breed Object Sent! Check Again", 400);
    }
});

// @Desc GET generating a breed recommendation
exports.generateBreedRecommendation = asyncHandler(async(req,res,next) => {
    const breed = req.body.breedName;
    const breedDetails = await doc.collection("breeds").doc(breed).get();
    const user = await doc.collection("users").doc(req.params.id).get();
    if(breedDetails.exists && user.exists){
        


    }else{
        throw new CustomError("Failed to generate recommendation. Try again", 400);
    }
});


compareRatings = (userPreferencesRatings, breedCharacteristicRatings) => {

};
