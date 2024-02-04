const asyncHandler = require("express-async-handler");
const { db } = require("./../config/firebase");
const CustomError = require("../utils/CustomError");

//@desc Create new user
//@route POST /petbay/api/v1/users
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = req.body;
  const newUser = await db.collection("users").add(user);
  res.status(201).json((await newUser.get()).data());
});

//@desc Get user by ID
//@route GET /petbay/api/v1/users
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await db.collection("users").doc(req.params.id).get();
  if (user.exists) {
    res.status(200).json(user.data());
  } else {
    const error = new CustomError("User Not Found", 400);
    next(error);
  }
});

//@desc Get owned pets by user id
//@route GET /petbay/api/v1/users
exports.getOwnedPets = asyncHandler(async (req, res, next) => {
  const user = await db.collection("users").doc(req.params.id).get();
  if (user.exists) {
    const ownedPets = user.data().pets;
    console.log(ownedPets);
    res.status(200).json({ pets: ownedPets });
  } else {
    const error = new CustomError("User Not Found", 400);
    next(error);
  }
});


//@desc Check if user vreed preferences already set
//@route GET /petbay/api/v1/users
exports.isUserBreedPreferencesSet = asyncHandler(async (req, res, next) => {
  const user = await db.collection("users").doc(req.params.id).get();
  if (user.data().breedPreferences.length !== 0) {
    res.status(200).json({ breedPreferencesSet: true });
  } else {
    res.status(200).json({ breedPreferencesSet: false });
  }
});

//@desc set breed preferences for a user
//@route PUT /petbay/api/v1/users
exports.setUserBreedPreferences = asyncHandler(async (req, res, next) => {
  const user = await db.collection("users").doc(req.params.id);
  const userBreedPreferences = req.body.breedPreferences;
  if (userBreedPreferences) {
    await user.update({ breedPreferences: userBreedPreferences });
    res.status(200).json({ reqStatus: "Success" });
  } else {
    throw new CustomError("Breed Preferences Not Set Properly. Try Again", 400);
  }
});
