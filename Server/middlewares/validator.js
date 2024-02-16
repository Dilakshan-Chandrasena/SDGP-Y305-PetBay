const {body, validationResult } = require("express-validator")

exports.userValidator = [
    body('firstName').notEmpty().withMessage("First name is required"),
    body('lastName').notEmpty().withMessage("Last name is required"),
    body('email')
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
    body('subscriptionPlan').notEmpty().withMessage("Subscription plan is required"),
    body('paymentMethod').notEmpty().withMessage("Payment method is required"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        next();
    },
];