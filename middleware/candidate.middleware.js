import ENV from "../utils/lib/env.config.js";

export const verifyCandidateRole = (req, res, next) => {
  if (req.role !== ENV.CANDIDATE_USER_ROLE) {
    res.status(401).json({
      role: true,
      message: "Access denied. Only candidate can access this route.",
    });
    return;
  }

  next();
};
