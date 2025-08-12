// routes/governmentRoutes.js
import express from "express";
import { dashboardSummary } from "../controllers/governmentController.js";
import { protect, governmentOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/summary", protect, governmentOnly, dashboardSummary);
export default router;
