import candidateModel from "../models/candidate.model.js";
import CustomError from "../utils/classes/custom.error.js";
import bcrypt from "bcrypt";

export const createCandidateService = async (candidateData) => {
  try {
    const existingCandidate = await candidateModel.findOne({
      $or: [{ email: candidateData.email }, { phone: candidateData.phone }],
    });

    if (existingCandidate) {
      throw new CustomError(
        400,
        "Candidate with this email or phone already exists."
      );
    }

    const hashedPassword = await bcrypt.hash(candidateData.password, 10);

    const candidate = new candidateModel({
      ...candidateData,
      password: hashedPassword,
      userKey: candidateData.password,
    });

    await candidate.save();

    return {
      success: true,
      message: "Candidate added successfully",
    };
  } catch (error) {
    throw new CustomError(500, error.message || "An unexpected error occurred while Candidate adding");
  }
};


export const  candidateListService = async () =>{
    try {
        const candidates = await candidateModel.find();
        return candidates;
    } catch (error) {
        throw new CustomError(500,"Service error while fetching candidates.");
    }
}