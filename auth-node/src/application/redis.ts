import { createClient } from "redis";

// connect to redis db on localhost
const redisClient = createClient({
  url: "redis://cache.starter",
});

// listen for errors
redisClient.on("err", (err) => {
  console.log("redis client error", err);
});

// listen for successful connection
redisClient.connect().then(() => {
  console.log("redis connected successfully");
});

export default redisClient;
