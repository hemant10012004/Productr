const axios = require('axios');
async function test() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/send-otp', { identifier: '9145918638' });
        console.log('Success:', res.data);
    } catch (e) {
        console.error('Error:', e.response ? e.response.data : e.message);
    }
}
test();
