// routes/agentRoutes.js
import express from "express";
import { queryAgent } from "../controllers/agentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/query", protect, queryAgent);

export default router;
