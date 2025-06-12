const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const ForgetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        return res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
module.exports=ForgetPassword