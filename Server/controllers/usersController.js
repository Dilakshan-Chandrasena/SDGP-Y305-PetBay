const asyncHandler = require("express-async-handler");
const { db } = require("./../config/firebase");
const CustomError = require("../utils/CustomError");

//@desc Create new user
//@route POST /petbay/api/v1/users
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = req.body;
  if(!getUserById(user.id)){
    const newUser = await db.collection("users").doc(user.id).set(user);
    res.status(201).json(newUser);
  }else{
    throw new CustomError(`User Already Exists! No Duplicate User Ids Accepted(User ID:${user.id})`);
  }
});

//@desc Get user by ID
//@route GET /petbay/api/v1/users
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await getUserById(req.params.id);
  if (user.exists) {
    res.status(200).json(user.data());
  } else {
    const error = new CustomError(`User Not Found (user id:${req.params.id})`, 400);
    next(error);
  }
});

//@desc Get owned pets by user id
//@route GET /petbay/api/v1/users
exports.getOwnedPets = asyncHandler(async (req, res, next) => {
  const user = await getUserById(req.params.id);
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
  const user = await getUserById(req.params.id);
  if (user.data().breedPreferences.length !== 0) {
    res.status(200).json({ breedPreferencesSet: true });
  } else {
    res.status(200).json({ breedPreferencesSet: false });
  }
});

//@desc set breed preferences for a user
//@route PUT /petbay/api/v1/users
exports.setUserBreedPreferences = asyncHandler(async (req, res, next) => {
  const user = await getUserById(req.params.id);
  const userBreedPreferences = req.body.breedPreferences;
  if (userBreedPreferences) {
    await user.update({ breedPreferences: userBreedPreferences });
    res.status(200).json({ reqStatus: "Success" });
  } else {
    throw new CustomError("Breed Preferences Not Set Properly. Try Again", 400);
  }
});

// fetch an user by id from the db
getUserById = (id)=>{
  return db.collection("users").doc(id).get();
};
