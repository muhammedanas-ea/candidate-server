import express from "express";
import {
  generateAdmin,
  Login,
  getNewAccessToken,
  logout,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.get("/generate-admin", generateAdmin);
authRouter.get("/get-new-access-token", getNewAccessToken);
authRouter.get("/logout", logout);

export default authRouter;
