// routes/aiRoutes.js
import express from "express";
import { askAI } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/ask", protect, askAI);
export default router;
