const asyncHandler = require("express-async-handler");
const { db } = require("./../config/firebase");
const CustomError = require("../utils/CustomError");

// @Desc POST add breed details
// @route /petbay/api/v1/breed-recommendation/
exports.createBreed = asyncHandler(async (req, res, next) => {
  let count = 0;
  const newBreed = req.body;
  newBreed.map(async(breed)=>{
    if (newBreed) {
      const savedBreed = await db
        .collection("breeds")
        .doc(breed.breedName)
        .set(breed);
      count++;
    } else {
      throw new CustomError("Invalid Breed Object Sent! Check Again", 400);
    }

  })
  res.status(201).json({msg:count});

});


//checking if user preferences are set
exports.isUserBreedPreferencesSet = asyncHandler(async(req,res,next)=>{
  const userId = req.params.userId;
  const user = (await db.collection("users").doc(userId).get()).data();
  if (user.breedPreferences.length !== 0) {
    res.status(200).json({"preferenceStatus": true});
  } else {
    res.status(200).json({"preferenceStatus": false});
  }

}); 

// @Desc GET generating a breed recommendation
// @route /petbay/api/v1/breed-recommendation/
exports.generateBreedRecommendation = asyncHandler(async (req, res, next) => {
  //Removing char _ to match breed names with database breed names
  const userId = req.body.userId;
  const breed = req.body.breedName;

  //fetching breedDetails and User details
  const breedDetails = await db.collection("breeds").doc(breed).get();
  const user = await db.collection("users").doc(userId).get();

  if (breedDetails.exists && user.exists) {
      const userBreedPreferences = user.data().breedPreferences;
      const breed = breedDetails.data();
      const breedCharacteristics = breed.breedRatings;

      const characsComparisonResults = compareRatings(
        userBreedPreferences,
        breedCharacteristics
      );
      const overallMatchingPercentage = calOverallMatchingPercentage(
        characsComparisonResults
      );

      const recommendationResult = {
        breedName: breed.breedName,
        description: breed.description,
        imageLink: breed.imageLink,
        dogSize: breed.dogSize,
        avgHeight: breed.avgHeight,
        avgWeight: breed.avgWeight,
        avgLifeSpan: breed.avgLifeSpan,
        breedGroup: breed.breedGroup,
        overallMatchingPercentage: overallMatchingPercentage,
        comparisonResults: characsComparisonResults,
      };

      res.status(200).json(recommendationResult);
    } else {
      throw new CustomError("User Preferences Not Set", 404);
    }
  
});



// compares user preference rating and actual breed rating and generate matching percentages for each characteristic
compareRatings = (userPreferencesRatings, breedCharacteristicRatings) => {
  const comparisonResults = [];
  for (let i = 0; i < breedCharacteristicRatings.length; i++) {
    const characteristic = breedCharacteristicRatings[i].characteristic;
    const userPrefRating = userPreferencesRatings[i].userRating;
    const breedCharRating = breedCharacteristicRatings[i].actualRating;

    //calculating the difference of the ratings
    const prefDifference = calculatePrefDifference(
      userPrefRating,
      breedCharRating
    );

    // calculating matching percentage for each characteristic
    const matchingPercentage = Math.round(100 - (prefDifference / 5) * 100);

    // creating result json obj with necessary calculated details
    const result = {
      characteristic: characteristic,
      userPreferenceRating: userPrefRating,
      breedCharacteristicRating: breedCharRating,
      matchingPercentage: matchingPercentage,
    };

    // adding comparison results to an array to return
    comparisonResults.push(result);
  }
  return comparisonResults;
};

// returning the difference between user rating and actual rating for a breed characteristic
calculatePrefDifference = (userPrefRating, breedCharRating) => {
  if (userPrefRating >= breedCharRating) {
    return userPrefRating - breedCharRating;
  } else {
    return breedCharRating - userPrefRating;
  }
};

// calculating the overall matching percentage based on the comparison results of each characteristic
calOverallMatchingPercentage = (characsComparisonResults) => {
  let totalMatchingPercentage = 0;
  for (let i = 0; i < characsComparisonResults.length; i++) {
    totalMatchingPercentage += characsComparisonResults[i].matchingPercentage;
  }
  const overallMatchingPercentage = Math.round(
    totalMatchingPercentage / characsComparisonResults.length
  );
  return overallMatchingPercentage;
};
