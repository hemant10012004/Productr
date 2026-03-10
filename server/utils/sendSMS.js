const twilio = require('twilio');

const sendSMS = async (phone) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

        if (!accountSid || !authToken || !verifyServiceSid) {
            console.warn('Twilio credentials not found. Cannot send real SMS. Simulating success for terminal fallback.');
            return false; // Return false to trigger the dev fallback
        }

        const client = twilio(accountSid, authToken);

        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: phone, channel: 'sms' });

        console.log(`Twilio Verify SMS sent to ${phone}. Status: ${verification.status}`);
        return true;
    } catch (error) {
        console.error('Error sending SMS via Twilio Verify:', error);
        return false;
    }
};

module.exports = sendSMS;
