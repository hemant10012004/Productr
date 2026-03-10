const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Send OTP
router.post('/send-otp', authController.requestOTP);

// Verify OTP
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
