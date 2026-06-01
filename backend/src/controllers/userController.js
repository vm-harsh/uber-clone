const blackListTokenModel = require('../models/blackListTokenModel');
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

        // ADDING TOKEN INTO THE COOKIES
        res.cookie('token',token,{
            httpOnly:true
        })

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

module.exports.loginUser = async(req,res) => {
    try {
        // CLIENT SIDE ERROR HANDLING USING EXPRESS VALIDATOR
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({erorrs: error.array()});
        }
        // EXTRACTING EMAIL AND PASSWORD FROM BODY
        const {email, password} = req.body;

        // FINDING USER IN DATABASE WITH THE GIVEN EMAIL
        const user = await userModel.findOne({email}).select("+password");

        // CHECK IF USER DOES NOT EXIST
        if(!user){
            return res.status(401).json({
                message:"email or password incorrect"
            })
        }

        // COMPARING PASSWORD
        const isMatch = await user.comparePassword(password);

        // CHECK IF PASSWORD DOES NOT MATCH 
        if(!isMatch){
            return res.status(401).json({
                message:"email or password incorrect"
            })
        }

        // GENERATING AUTH TOKEN
        const token = user.generateAuthToken();

         // ADDING TOKEN INTO THE COOKIES
        res.cookie('token',token,{
            httpOnly:true
        })

        // RETURN SUCCESS STATUS
        return res.status(200).json({
            message:"User Login Successfully",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })      
    }
}

module.exports.getProfile = async(req,res)=>{
    try {
       res.status(200).json({
        user:req.user
       })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })   
    }
}


module.exports.logoutUser = async(req,res) => {
    try {
        // CLEAR COOKIES
        res.clearCookie('token');

        // ADD CURRENT TOKEN INTO THE BLACKLIST MODEL SO USER CANNOT USE THIS AGAIN FOR ACCESSING DATA
        await blackListTokenModel.create({
            token:req.cookies.token
        })
        res.status(200).json({
            message:"User Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        }) 
    }
}