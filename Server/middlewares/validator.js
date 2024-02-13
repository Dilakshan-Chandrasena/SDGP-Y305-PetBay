const {body, validationResult } = require("express-validator")

exports.petProfileValidator = [
    body('userId').notEmpty().withMessage("User ID is required"),
    body('name').notEmpty().withMessage("Pet name is required"),
    body('breed').notEmpty().withMessage("Breed is required"),
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