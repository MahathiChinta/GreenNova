import express from "express";
import Job from "../models/Job.js"; // make sure this path is correct
import { protect, companyOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Simple AI agent route
router.post("/", protect, companyOnly, async (req, res) => {
  try {
    const { message } = req.body;

    let reply = "🤖 Hello! I'm your GreenNova Assistant. How can I help you today?";

    // If the user asks about job status
    if (/job status|status of job|my job/i.test(message)) {
      const jobs = await Job.find({ companyId: req.user.id }).sort({ createdAt: -1 });
      if (jobs.length === 0) {
        reply = "I couldn't find any jobs for your company.";
      } else {
        const latestJob = jobs[0];
        reply = `Your latest job "${latestJob.title}" in region "${latestJob.region}" currently has the status: ${latestJob.status}.`;
      }
    }
    // If they ask about adding jobs
    else if (/add job|create job/i.test(message)) {
      reply = "You can add a new job from your dashboard's Add Job form!";
    }

    res.json({ reply });
  } catch (err) {
    console.error("Assistant error:", err);
    res.status(500).json({ reply: "Sorry, something went wrong on my side." });
  }
});

export default router;
