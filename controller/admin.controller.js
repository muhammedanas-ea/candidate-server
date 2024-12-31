import {
  candidateListService,
  createCandidateService,
} from "../service/admin.service.js";
import CustomError from "../utils/classes/custom.error.js";
import Candidate from "../models/candidate.model.js";

export const createCandidate = async (req, res, next) => {
  try {
    const { userName, email, mobileNumber, password, address } = req.body;

    if (!userName || !email || !mobileNumber || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const candidateData = {
      username: userName.trim(),
      email:email.trim(),
      phone: mobileNumber.trim(),
      password:password.trim(),
      address:address.trim(),
    };

    const response = await createCandidateService(candidateData);

    res.status(200).json(response);
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};

export const candidateList = async (req, res, next) => {
  try {
    const candidates = await candidateListService();

    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};


export const deleteCandidate = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "id is required" });
    }

    const candidate = await Candidate.findByIdAndDelete({_id:req.params.id});

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    return res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};
