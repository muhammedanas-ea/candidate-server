import { createProfileService } from "../service/candidate.service.js";
import Candidate from "../models/candidate.model.js";

export const addProfile = async (req, res, next) => {
  try {
    if (!req.files?.profileImage) {
      return res.status(400).json({ message: "No profile image uploaded" });
    }

    if (!req.files?.resumeImage) {
      return res.status(400).json({ message: "No aadhaar image uploaded" });
    }

    const profileImage = req.files.profileImage;
    const resumeImage = req.files.resumeImage;

    const branchOwnerFiles = {
      profileImage,
      resumeImage,
    };

    const response = await createProfileService(req.userId, branchOwnerFiles);
    res.status(200).json(response);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

export const candidateProfile = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById({ _id: req.userId });

    if (!candidate) {
      return res.status(400).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};
