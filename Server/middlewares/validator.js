const { body, validationResult } = require("express-validator");

exports.userValidator = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("subscriptionPlan")
    .notEmpty()
    .withMessage("Subscription plan is required"),
  body("paymentMethod").notEmpty().withMessage("Payment method is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.petProfileValidator = [
    body('userId').notEmpty().withMessage("User ID is required"),
    body('name').notEmpty().withMessage("Pet name is required"),
    body('breed').notEmpty().withMessage("Breed is required"),
    body('gender').notEmpty().withMessage("Gender is required"),
    body('address').notEmpty().withMessage("Address is required"),
    body('age').notEmpty().withMessage("Age is required"),
    body('height').notEmpty().withMessage("Height is required"),
    body('weight').notEmpty().withMessage("Weight is required"),
    body('petImageURL').notEmpty().withMessage("Pet Image URL is required(Empty string if no image is there)"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        next();
    },
];

exports.lostFoundPostsValidator = [
  body("userId").notEmpty().withMessage("User ID is required"),
  body("name").notEmpty().withMessage("Pet name is required"),
  body("breed").notEmpty().withMessage("Breed is required"),
  body("height").notEmpty().withMessage("Height is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("time").notEmpty().withMessage("Time is required"),
  body("area").notEmpty().withMessage("Area is required"),
  body("features").notEmpty().withMessage("Features are required"),
  body("contact").notEmpty().withMessage("Conatct is required"),
  body("status").notEmpty().withMessage("Status is required"),
  body("lostFoundImageURL")
    .notEmpty()
    .withMessage(
      "Pet Image URL is required(Empty string if no image is there)"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
