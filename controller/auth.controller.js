import {
  authLoginService,
  generateAdminService,
  getNewAccessTokenService,
  logoutService,
  saveRefreshToken,
} from "../service/auth.service.js";
import CustomError from "../utils/classes/custom.error.js";
import jwt from "jsonwebtoken";
import ENV from "../utils/lib/env.config.js";

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await authLoginService(username, password);

    const accessToken = jwt.sign(
      { userId: response.user._id, role: response.user.userRole },
      ENV.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId: response.user._id, role: response.user.userRole },
      ENV.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await saveRefreshToken(response.user._id, refreshToken);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ ...response, accessToken });
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

export const generateAdmin = async (req, res, next) => {
  try {
    const response = await generateAdminService();
    res.status(200).json(response);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

export const getNewAccessToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const response = await getNewAccessTokenService(cookies);
    res.json(response);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
   
    
    const response = await logoutService(cookies);
    res.clearCookie('jwt');
    res.json(response);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};
