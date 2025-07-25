const Message = require('../models/Message');
const { sendEmail } = require('../services/mailService');
const { isVerified, clearOTP } = require('../services/otpService');

exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!isVerified(email)) {
        return res.status(401).json({ error: 'Email not verified. Please verify via OTP first.' });
    }

    try {
        await sendEmail({
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name}`,
            text: message,
        });

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        clearOTP(email);

        res.status(200).json({ message: 'Message sent and saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message or save to database' });
    }
};
