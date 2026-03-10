const twilio = require('twilio');

const verifySMS = async (phone, code) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

        if (!accountSid || !authToken || !verifyServiceSid) {
            console.warn('Twilio credentials not found. Cannot verify real SMS. Assuming Dev Mode bypass.');
            // Allow successful bypass in dev mode if they enter the dev fallback OTP generated in controller
            return false;
        }

        const client = twilio(accountSid, authToken);

        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({ to: phone, code: code });

        if (verificationCheck.status === 'approved') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error verifying SMS via Twilio Verify:', error);
        return false;
    }
};

module.exports = verifySMS;
