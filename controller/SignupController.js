const User = require("../model/userModel");
const sendMail = require("./sendMail");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);


        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt,
            isVerified: false
        });

        await newUser.save();


        await sendMail(email, "Your OTP for verification", `Your OTP is: ${otp}`);

        // 5. Response
        res.status(201).json({ message: "User registered successfully. OTP sent to email." });


    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
