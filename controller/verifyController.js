const User = require("../model/userModel");

const Verify = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

  
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

  
    if (Date.now() > user.otpExpiresAt) {
    
      await User.findOneAndUpdate(
        { email },
        {
          $unset: { otp: "", otpExpiresAt: "" }
        }
      );
      return res.status(401).json({ message: "OTP expired, please request again" });
    }

   
    await User.findOneAndUpdate(
      { email },
      {
        isVerified: true,
        $unset: { otp: "", otpExpiresAt: "" }
      }
    );

    return res.status(200).json({ message: "Email verified successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports=Verify;