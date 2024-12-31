import { uploadFileToS3 } from "../utils/upload-image.js";
import candidateModel from "../models/candidate.model.js";
import CustomError from "../utils/classes/custom.error.js";

export const createProfileService = async (userId, branchOwnerFiles) => {
  try {
    const profileImage = await uploadFileToS3(branchOwnerFiles.profileImage);
    const resumeImage = await uploadFileToS3(branchOwnerFiles.resumeImage);

    const updatedCandidate = await candidateModel.findByIdAndUpdate(
      { _id: userId },
      {
        profileImage: {
          url: profileImage.url,
          publicId: profileImage.publicId,
          mimeType: profileImage.mimetype,
        },
        resume: {
          url: resumeImage.url,
          publicId: resumeImage.publicId,
          mimeType: resumeImage.mimetype,
        },
      },
      { new: true }
    );

    console.log(updatedCandidate, "aa");

    if (!updatedCandidate) {
      throw new CustomError(400, "Candidate not found");
    }

    return {
      success: true,
      message: "profile updated successfully",
    };
  } catch (error) {
    throw new CustomError(
      500,
      error.message || "An unexpected error occurred while profile updating"
    );
  }
};
