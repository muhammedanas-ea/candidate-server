import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173"],
  ADMIN_USER_ROLE: Number(process.env.ADMIN_USER_ROLE),
  CANDIDATE_USER_ROLE: Number(process.env.CANDIDATE_USER_ROLE),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
};

// Validate all env vars at once
const validateEnv = (config) => {
  const missingVars = Object.entries(config)
    .filter(([_, value]) => value === undefined)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  return config;
};

// Export validated environment
export default validateEnv(ENV);
