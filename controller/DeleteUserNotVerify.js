const cron = require('node-cron');
const User = require("../model/userModel");

// Har raat 12 baje chalega
cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    try {
        const result = await User.deleteMany({
            isVerified: false,
            verificationExpiry: { $lt: now }
        });
        console.log(`Deleted ${result.deletedCount} unverified users`);
    } catch (err) {
        console.error("Cleanup error:", err);
    }
});
