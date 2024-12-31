import express from "express"
import { verifyCandidateRole } from "../middleware/candidate.middleware.js";
import { addProfile,candidateProfile } from "../controller/candidate.controller.js";

const candidateRouter = express.Router();

candidateRouter.use(verifyCandidateRole)
candidateRouter.get("/profile",candidateProfile);
candidateRouter.post("/add-profile",addProfile);


export default candidateRouter;