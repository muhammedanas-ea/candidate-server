import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import ENV from "./utils/lib/env.config.js";
import { connectDB } from "./config/database.config.js";
import { corsOptions } from "./config/cors.config.js";
import adminRouter from "./routes/admin.router.js";
import candidateRouter from "./routes/candidate.router.js";
import authRouter from "./routes/auth.router.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import verifyJwt from "./middleware/verify-jwt.js";
import fileUpload from 'express-fileupload';

dotenv.config();
 
const app = express();
const server = createServer(app);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    limits: {fileSize: 10 * 1024 * 1024},
    abortOnLimit: true,
    safeFileNames: true,
  })
)

app.use("/api/auth", authRouter);
app.use(verifyJwt);
app.use("/api/admin", adminRouter);
app.use("/api/candidate", candidateRouter);

app.use(errorMiddleware);

connectDB()
  .then(() => {
    server.listen(ENV.PORT, () => {
      console.log(`Server is running at http://localhost:${ENV.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
