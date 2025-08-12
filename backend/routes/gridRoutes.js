// routes/gridRoutes.js
import express from "express";
import { getGridData } from "../controllers/gridController.js";
const router = express.Router();
router.get("/", getGridData);
export default router;
