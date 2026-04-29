import "dotenv/config";

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || "127.0.0.1",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_ACCESS: process.env.JWT_ACCESS,
};

export default env;
