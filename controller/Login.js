const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check if user is verified
    if (!existingUser.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // Compare password
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create token with only user._id
    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Set token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = Login;
