import express from "express";
import {
  submitJob,
  getAllJobs,
  getCompanyJobs, // ✅ new
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";
import { protect, companyOnly, governmentOnly } from "../middlewares/authMiddleware.js";
import { validateJobPayload } from "../middlewares/validateJob.js";

const router = express.Router();

// Company creates job
router.post("/", protect, companyOnly, validateJobPayload, submitJob);

// Company views their own jobs
router.get("/", protect, companyOnly, getCompanyJobs);

// Government views all jobs
router.get("/all", protect, governmentOnly, getAllJobs);

router.get("/:id", protect, getJobById);
router.put("/:id", protect, companyOnly, validateJobPayload, updateJob);
router.delete("/:id", protect, companyOnly, deleteJob);

export default router;
