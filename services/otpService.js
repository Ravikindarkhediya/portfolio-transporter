const otpStore = new Map();

const generateOTP = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const createdAt = Date.now();
    otpStore.set(email, { otp, createdAt, verified: false });
    return otp;
};

const verifyOTP = (email, inputOtp) => {
    const record = otpStore.get(email);
    if (!record) return { success: false, message: 'No OTP found' };

    const { otp, createdAt } = record;
    const now = Date.now();
    const isExpired = (now - createdAt) > 2 * 60 * 1000;

    if (isExpired) {
        otpStore.delete(email);
        return { success: false, message: 'OTP expired' };
    }

    if (otp.toString() !== inputOtp) {
        return { success: false, message: 'Invalid OTP' };
    }

    otpStore.set(email, { otp, createdAt, verified: true });
    return { success: true };
};

const isVerified = (email) => {
    const record = otpStore.get(email);
    return record && record.verified;
};

const clearOTP = (email) => otpStore.delete(email);

module.exports = {
    generateOTP,
    verifyOTP,
    isVerified,
    clearOTP,
};
