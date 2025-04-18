const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => console.log('Redis Connected'));
client.on('error', (err) => console.log('Redis Error:', err));

module.exports = client;
