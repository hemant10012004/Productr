const axios = require('axios');
async function test() {
    try {
        const res = await axios.post('https://server-9j3em80oj-hemant10012004s-projects.vercel.app/api/auth/send-otp', { identifier: '9145918638' });
        console.log('Success:', res.data);
    } catch (e) {
        console.error('Error:', e.response ? e.response.data : e.message);
    }
}
test();
