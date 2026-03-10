const nodemailer = require('nodemailer');

const sendEmail = async (email, otp) => {
    try {
        // Create a transporter using your SMTP credentials
        // We read from environment variables to keep credentials secure
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // e.g., your email
                pass: process.env.SMTP_PASS, // e.g., your app password
            },
        });

        const mailOptions = {
            from: `"Productr App" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your Productr Login OTP',
            text: `Your OTP for logging into Productr is: ${otp}. It is valid for 10 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                    <h2>Welcome to Productr!</h2>
                    <p>Your One-Time Password (OTP) for login is:</p>
                    <h1 style="color: #11168B; letter-spacing: 5px;">${otp}</h1>
                    <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendEmail;
