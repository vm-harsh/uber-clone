const userModel = require('../models/userModel');
const createUser = require('../services/userService')
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req,res) => {
    try {
        //CLIENT SIDE ERROR HANDLING USING EXPRESS VALIDATOR
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        // INPUT FROM THE BODY
        const {firstName, lastName, email, password} = req.body;

        const isUserAlreadyExist =await userModel.findOne({email});

        if(isUserAlreadyExist){
            return res.status(400).json({
                message:"User Already Exist with this Email"
            })
        }

        // PASSWORD IS HASHED BEFORE CREATING USER
        const hashPassword =await userModel.hashPassword(password);

        // CREATING NEW USER USING CREATERUSER SERVICE
        const newUser = await createUser({
            firstName,
            lastName,
            email,
            password:hashPassword
        })

        if(!newUser){
            return res.status(400).json({
                message:"User Creation Failed"
            })
        }


        // GENERATING JWT TOKEN FOR NEW USER
        const token = newUser.generateAuthToken();

        

        res.status(201).json({
            message:"User Created Successfully",
            token,
            newUser
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })   
    }
}