const transporter = require('../config/mail');

const sendEmail = async (options) => {
    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
