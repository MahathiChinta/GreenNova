// controllers/aiController.js
import { processWithAI } from "../services/agentService.js";

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });
    const answer = await processWithAI(prompt);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
