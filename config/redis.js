const Redis = require("redis")

const redisClient = Redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-12604.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12604
    }
});

module.exports = redisClient;