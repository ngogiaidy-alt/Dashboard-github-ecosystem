import { Redis } from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
});

export async function pushTaskToQueue(taskName: string, payload: any) {
    const data = JSON.stringify({ task: taskName, payload, timestamp: Date.now() });
    await redis.lpush('build_queue', data);
    console.log(`[Queue Producer] Đã đẩy task ${taskName} vào Redis Queue.`);
}
