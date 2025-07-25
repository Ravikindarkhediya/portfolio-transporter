const { generateOTP, verifyOTP } = require('../services/otpService');
const { sendEmail } = require('../services/mailService');

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = generateOTP(email);

    try {
        await sendEmail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    const result = verifyOTP(email, otp);

    if (!result.success) {
        return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
};
