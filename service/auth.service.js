import adminModel from "../models/admin.model.js";
import candidateModel from "../models/candidate.model.js";
import CustomError from "../utils/classes/custom.error.js";
import bcrypt from "bcrypt";
import ENV from "../utils/lib/env.config.js";
import jwt from "jsonwebtoken";

const validateUser = async (model, username, password) => {
  const user = await model.findOne({ username });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;
  const {
    password: _password,
    userKey: _userKey,
    refreshToken: _refreshToken,
    ...userWithoutPassword
  } = user.toObject();
  return userWithoutPassword;
};

const getUserById = async (model, userId) => {
  const user = await model.findById(userId);
  if (!user) return null;

  return user;
};

const getUserByRefreshToken = async (model, refreshToken) => {
  const user = await model.findOne({ refreshToken });

  if (!user) return null;

  return user;
};

export const authLoginService = async (username, password) => {
  try {
    if (!username) {
      throw new CustomError(400, "Username is required");
    }
    if (!password) {
      throw new CustomError(400, "Password is required");
    }
    const user =
      (await validateUser(adminModel, username, password)) ||
      (await validateUser(candidateModel, username, password));

    if (!user) {
      throw new CustomError(401, "Invalid username or password");
    }

    return {
      user,
    };
  } catch (error) {
    throw new CustomError(500, error.message || "An unexpected error occurred");
  }
};

export const saveRefreshToken = async (userId, refreshToken) => {
  try {
    const user =
      (await getUserById(adminModel, userId)) ||
      (await getUserById(candidateModel, userId));

    if (!user) throw new CustomError(404, "User not found");

    user.refreshToken = refreshToken;
    await user.save();
  } catch (error) {
    throw new CustomError(500, error.message || "An unexpected error occurred");
  }
};

export const generateAdminService = async () => {
  try {
    const existingAdmin = await adminModel.findOne();

    if (existingAdmin) {
      throw new CustomError(400, "Admin already exists");
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await adminModel.create({
      username: "admin",
      password: hashedPassword,
      email: "myworkground@google.com",
    });

    const { password: _, ...adminWithoutPassword } = admin.toObject();
    return adminWithoutPassword;
  } catch (error) {
    throw new CustomError(500, error.message || "An unexpected error occurred");
  }
};

export const getNewAccessTokenService = async (cookies) => {
  try {
    if (!cookies?.jwt) throw new CustomError(401, "Refresh token is required");
    const refreshToken = cookies.jwt;

    const userData =
      (await getUserByRefreshToken(adminModel, refreshToken)) ||
      (await getUserByRefreshToken(candidateModel, refreshToken));

    if (!userData) throw new CustomError(403, "User not found");

    jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || userData._id.toString() !== decoded.userId)
        throw new CustomError(403, "Invalid refresh token");
    });

    const accessToken = jwt.sign(
      {
        userId: userData._id,
        role: userData.userRole,
      },
      ENV.ACCESS_TOKEN_SECRET,
      { expiresIn: "10min" }
    );

    return { accessToken };
  } catch (error) {
    throw new CustomError(500, error.message || "An unexpected error occurred");
  }
};

export const logoutService = async (cookies) => {
  try {
    if (!cookies?.jwt) throw new CustomError(401, "Refresh token is required");
    const refreshToken = cookies.jwt;

    const userData =
      (await getUserByRefreshToken(adminModel, refreshToken)) ||
      (await getUserByRefreshToken(candidateModel, refreshToken));

    if (!userData) throw new CustomError(403, "User not found");

    jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || userData._id.toString() !== decoded.userId)
        throw new CustomError(403, "Invalid refresh token");
    });

    userData.refreshToken = null;
    await userData.save();
    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    throw new CustomError(
      500,
      error.message || "An error occurred while logging out"
    );
  }
};
