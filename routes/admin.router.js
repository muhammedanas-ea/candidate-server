import express from "express"
import { createCandidate,candidateList ,deleteCandidate} from "../controller/admin.controller.js";
import { verifyAdminRole } from "../middleware/admin.middleware.js";

const adminRouter = express.Router();

adminRouter.use(verifyAdminRole)
adminRouter.get("/candidates", candidateList);
adminRouter.post("/candidate/create",createCandidate);
adminRouter.delete("/candidate/delete/:id", deleteCandidate);

export default adminRouter; 