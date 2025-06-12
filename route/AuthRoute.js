const express = require('express');
const { signup } = require("../controller/SignupController"); 
const Verify = require('../controller/verifyController');
const Login = require('../controller/Login');
const ForgetPassword = require('../controller/forgetPassword');

const route = express.Router();


route.post("/signup", signup); 
route.post("/verify",Verify)
route.post("/login",Login)
route.post("/forgotPassword",ForgetPassword)
module.exports = route;
