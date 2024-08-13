import Redis from "ioredis";
import log from "./logger";
// Create a Redis instance.
export let redisClient: Redis;

export async function initializeRedis(index: number | string = 1): Promise<void> {
  redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });
  redisClient.select(index);

  log.info("Redis Connection successful!! ");
}
