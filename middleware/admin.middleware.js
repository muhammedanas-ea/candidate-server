import ENV from "../utils/lib/env.config.js";

export const verifyAdminRole = (req, res, next) => {
  if (req.role !== ENV.ADMIN_USER_ROLE) {
    res.status(401).json({
      role: true,
      message: "Access denied. Only admin can access this route.",
    });
    return;
  }

  next();
};
