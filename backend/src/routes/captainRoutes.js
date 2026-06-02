const express = require('express');

const Router = express.Router();
const {body} = require('express-validator');
const { registerCaptain, loginCaptain, getProfile, logoutCaptain } = require('../controllers/captainController');
const captainAuthMiddleware = require('../middlewares/captainAuthMiddleware');



Router.post('/auth/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    body('firstName').isLength({min:3}).withMessage("FirstNme must be atleast 3 characters long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate Number must be atleast 3 character long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be at least 3 character long"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Invalid Vehicle Type')
], registerCaptain);


Router.post('/auth/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],loginCaptain)


Router.get('/profile',captainAuthMiddleware, getProfile);

Router.get('/auth/logout', captainAuthMiddleware, logoutCaptain);


module.exports = Router;