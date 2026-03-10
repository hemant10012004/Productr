const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const authController = {
    // Login or Signup (Send OTP)
    // For simplicity, we create a user if they don't exist
    requestOTP: async (req, res) => {
        try {
            const { identifier } = req.body;
            if (!identifier) {
                return res.status(400).json({ message: 'Email or Phone is required' });
            }

            const otp = generateOTP();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

            // Find user or create if they don't exist
            let user = await User.findOne({ identifier });

            if (!user) {
                user = new User({ identifier, otp, otpExpiry });
            } else {
                user.otp = otp;
                user.otpExpiry = otpExpiry;
            }

            await user.save();

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

            let sentObj = false;

            if (isEmail) {
                const sendEmail = require('../utils/sendEmail');
                sentObj = await sendEmail(identifier, otp);
            } else {
                const sendSMS = require('../utils/sendSMS');
                // Format phone number to E.164 if it doesn't start with +
                let formattedPhone = identifier;
                if (!formattedPhone.startsWith('+')) {
                    // Assuming default country code is +91 for India based on prompt 
                    formattedPhone = `+91${formattedPhone}`;
                }
                // Call Twilio Verify without our local otp 
                sentObj = await sendSMS(formattedPhone);
            }

            // Always fallback to logging on dev console if actual delivery failed (e.g no credentials)
            if (!sentObj) {
                console.log(`[DEV FALLBACK] OTP for ${identifier}: ${otp}`);
            }

            res.status(200).json({
                message: 'OTP sent successfully',
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Verify OTP
    verifyOTP: async (req, res) => {
        try {
            const { identifier, otp } = req.body;

            if (!identifier || !otp) {
                return res.status(400).json({ message: 'Identifier and OTP required' });
            }

            const user = await User.findOne({ identifier });

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

            if (isEmail) {
                // Email Verification Flow (Local DB)
                if (!user || user.otp !== otp) {
                    return res.status(400).json({ message: 'Invalid OTP' });
                }

                if (new Date() > user.otpExpiry) {
                    return res.status(400).json({ message: 'OTP has expired' });
                }
            } else {
                // Phone Verification Flow (Twilio Verify API)
                const verifySMS = require('../utils/verifySMS');
                let formattedPhone = identifier;
                if (!formattedPhone.startsWith('+')) {
                    formattedPhone = `+91${formattedPhone}`;
                }
                const isValidTwilio = await verifySMS(formattedPhone, otp);

                // If Twilio fails (or bypassed in dev), fall back to checking our local DEV fallback OTP
                if (!isValidTwilio) {
                    if (!user || user.otp !== otp) {
                        return res.status(400).json({ message: 'Invalid OTP' });
                    }
                    if (new Date() > user.otpExpiry) {
                        return res.status(400).json({ message: 'OTP has expired' });
                    }
                }
            }

            // Success: clear local OTP usage regardless
            if (user) {
                user.otp = undefined;
                user.otpExpiry = undefined;
                await user.save();
            }

            // Fallback generation logic for user ID if user didn't exist strictly locally yet but Twilio verified (edge-case)
            const finalUser = user || await User.create({ identifier });

            const token = jwt.sign(
                { id: finalUser._id, identifier: finalUser.identifier },
                process.env.JWT_SECRET || 'secret123',
                { expiresIn: '30d' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: finalUser._id,
                    identifier: finalUser.identifier
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = authController;
