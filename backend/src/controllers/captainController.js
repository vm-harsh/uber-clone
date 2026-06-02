const blackListTokenModel = require('../models/blackListTokenModel');
const captainModel = require('../models/captainModel');
const createCaptain = require('../services/captainService')
const {validationResult} = require('express-validator')

module.exports.registerCaptain = async (req,res) => {
    try {
        //CLIENT SIDE ERROR HANDLING USING EXPRESS VALIDATOR
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        // EXTRACTING DATA FROM THE BODY
        const {firstName, lastName, email, password, status,vehicle} = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({email});

        // CHECK IF CAPTAIN ALREADY EXIST
        if(isCaptainAlreadyExist){
            return res.status(400).json({
                message:"Captain Already Exist with this email"
            })
        }

        // PASSWORD IS HASHED BEFORE CREATING CAPTAIN
        const hashPassword = await captainModel.hashPassword(password);

        // CREATING NEW CAPTAIN USING CREATERCAPTAIN SERVICE
        const captain = await createCaptain({
            firstName,
            lastName,
            email,
            password:hashPassword,
            status,
            vehicle
        })

        // CHECK IF CAPTAIN NOT CREATED
        if(!captain){
            return res.status(400).json({
                message:"Captain Creation Failed"
            })
        }


        // GENERATING JWT TOKEN FOR NEW CAPTAIN
        const token = captain.generateAuthToken();

        // ADDING TOKEN INTO THE COOKIES
        res.cookie('token',token,{
            httpOnly:true
        })

        // RETURN SUCCESS MESSAGE
        res.status(201).json({
            message:"Captain Created Successfully",
            captain,
            token
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })
    }
}

module.exports.loginCaptain = async(req,res) => {
    try {
        // CLIENT SIDE ERROR HANDLING USING EXPRESS VALIDATOR
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({erorrs: error.array()});
        }
        // EXTRACTING EMAIL AND PASSWORD FROM BODY
        const {email, password} = req.body;

        // FINDING CAPTAIN IN DATABASE WITH THE GIVEN EMAIL
        const captain = await captainModel.findOne({email}).select("+password");

        // CHECK IF CAPTAIN DOES NOT EXIST
        if(!captain){
            return res.status(401).json({
                message:"email or password incorrect"
            })
        }

        // COMPARING PASSWORD
        const isMatch = await captain.comparePassword(password);

        // CHECK IF PASSWORD DOES NOT MATCH 
        if(!isMatch){
            return res.status(401).json({
                message:"email or password incorrect"
            })
        }

        // GENERATING AUTH TOKEN
        const token = captain.generateAuthToken();

         // ADDING TOKEN INTO THE COOKIES
        res.cookie('token',token,{
            httpOnly:true
        })

        // RETURN SUCCESS STATUS
        return res.status(200).json({
            message:"captain Login Successfully",
            captain,
            token
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })      
    }
}

module.exports.getProfile = async(req,res) => {
    try {
        res.status(200).json({
            captain:req.captain
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })
    }
}

module.exports.logoutCaptain = async(req,res) => {
    try {
        // CLEAR COOKIES
        res.clearCookie('token');

        // ADD CURRENT TOKEN INTO THE BLACKLIST MODEL SO CAPTAIN CANNOT USE THIS AGAIN FOR ACCESSING DATA
        await blackListTokenModel.create({
            token:req.cookies.token
        })
        res.status(200).json({
            message:"Captain Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        }) 
    }
}