const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const Router = express.Router();
const { body } = require('express-validator');

Router.post('/auth/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').isLength({min : 3}).withMessage('FirstName must be atleast 3 characters long'),
    body('password').isLength({min : 6}).withMessage("Password must be atleast 6 characters long")
],registerUser)

Router.post('/auth/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],loginUser)


module.exports = Router