const blackListTokenModel = require('../models/blackListTokenModel');
const captainModel = require('../models/captainModel');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');


// USER AUTHENTICATION MIDDLEWARE
const userAuth = async (req,res,next) => {
    // TAKING TOKEN FROM COOKIES OR HEADERS
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // CHECK IF TOKEN NOT FOUND
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // CHECK IF THE TOKEN IS BLACKLISTED OR NOT
    const blackListToken = await blackListTokenModel.findOne({token});
    if(blackListToken){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // CHECK IF THE TOKEN IS VALID OR NOT
    try {
        const decoded =await jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findOne({_id:decoded._id});
        // ADD NEW FIELD IN REQ => REQ.USER = USER DATA
        req.user = user;
        
        return next();
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}


// CAPTAIN AUTHENTICATION MIDDLEWARE
const captainAuth = async (req,res,next) => {
    // TAKING TOKEN FROM COOKIES OR HEADERS
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // CHECK IF TOKEN NOT FOUND
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // CHECK IF THE TOKEN IS BLACKLISTED OR NOT
    const blackListToken = await blackListTokenModel.findOne({token});
    if(blackListToken){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    // CHECK IF THE TOKEN IS VALID OR NOT
    try {
        const decoded =await jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findOne({_id:decoded._id});
        // ADD NEW FIELD IN REQ => REQ.USER = USER DATA
        req.captain = captain;
        
        return next();
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

module.exports = {userAuth, captainAuth}