import mongoose from "mongoose";
import ENV from "../utils/lib/env.config.js";
import { printWithBorder } from "../utils/index.js";

export const connectDB = async () => {
  const maxAttempts = 5;
  const baseDelay = 1000; // 1 second

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    try {
      const conn = await mongoose.connect(ENV.MONGO_URI);
      printWithBorder(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      const remainingAttempts = maxAttempts - attempts - 1;
      const currentDelay = baseDelay * Math.pow(2, attempts);

      console.error(`Error connecting to DB (Attempt ${attempts + 1}):`, error);

      if (remainingAttempts === 0) {
        console.error("Max attempts reached. Exiting...");
        process.exit(1);
      }

      console.log(
        `Retrying connection in ${
          currentDelay / 1000
        } seconds... (${remainingAttempts} retries left)`
      );

      // Exponential backoff with jitter (±500ms)
      await new Promise((resolve) =>
        setTimeout(resolve, currentDelay + Math.random() * 1000 - 500)
      );
    }
  }
};
