import mongoose from "mongoose";
import ENV from "../utils/lib/env.config.js";

const candidateSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      url: String,
      publicId: String,
      mimeType: String,
    },
    resume: {
      url: String,
      publicId: String,
      mimeType: String,
    },
    userRole: {
      type: Number,
      default: ENV.CANDIDATE_USER_ROLE,
    },
    userKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
