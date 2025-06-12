const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,       
       
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    otpExpiresAt: {
        type: Date          
    },
    isVerified: {
        type: Boolean,
        default: false       
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema);
module.exports= User
