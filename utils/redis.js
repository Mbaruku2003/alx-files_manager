import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (error) => {
            console.error('Redis Client Error:', error);
        });

        this.connected = false; // Track connection status

        this.client.connect()
            .then(() => {
                this.connected = true;
                console.log('Redis client connected');
            })
            .catch((err) => {
                console.error('Failed to connect to Redis:', err);
            });
    }

    isAlive() {
        return this.connected; // Check connection status
    }

    async get(key) {
        if (!this.connected) throw new Error('Redis client is not connected');
        return await this.client.get(key);
    }

    async set(key, value, duration) {
        if (!this.connected) throw new Error('Redis client is not connected');
        await this.client.set(key, value, { EX: duration });
    }

    async del(key) {
        if (!this.connected) throw new Error('Redis client is not connected');
        await this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
