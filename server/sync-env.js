const fs = require('fs');
const { execSync } = require('child_process');

const envFile = fs.readFileSync('./.env', 'utf-8');
const lines = envFile.split('\n');

for (const line of lines) {
    if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueChunks] = line.split('=');
        const value = valueChunks.join('=');

        if (key && value) {
            console.log(`Setting ${key}...`);
            try {
                execSync(`npx vercel env add ${key} production`, { input: value.trim() });
            } catch (e) {
                console.log(`Failed or already exists for ${key}`);
            }
        }
    }
}
console.log('Done uploading env vars');
