require('dotenv').config();
const twilio = require('twilio');

async function testTwilio() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!accountSid || !authToken || !verifyServiceSid) {
        console.error('Missing Twilio credentials in .env');
        return;
    }

    const client = twilio(accountSid, authToken);
    const phone = '+919145918638'; // the user's requested number

    try {
        console.log(`Attempting to send OTP to ${phone} using service ${verifyServiceSid}...`);
        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: phone, channel: 'sms' });

        console.log(`Success! Status: ${verification.status}`);
    } catch (error) {
        console.error('Twilio Error:', error.message);
        console.error('Twilio Error Code:', error.code);
        console.error('Twilio Error Status:', error.status);
    }
}

testTwilio();
