// routes/companyRoutes.js
import express from "express";
import { listCompanies, approveCompany } from "../controllers/companyController.js";
import { protect, governmentOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", protect, governmentOnly, listCompanies);
router.put("/:id/approve", protect, governmentOnly, approveCompany);

export default router;
