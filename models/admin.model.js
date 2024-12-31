import mongoose from "mongoose";
import ENV from "../utils/lib/env.config.js";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userRole: {
      type: Number,
      default: ENV.ADMIN_USER_ROLE,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
