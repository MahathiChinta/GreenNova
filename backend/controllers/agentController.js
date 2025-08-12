// controllers/agentController.js
import { runAgent } from "../services/agentService.js";

export const queryAgent = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt required" });
  try {
    const answer = await runAgent(prompt, { user: req.user || null });
    res.json({ success: true, answer });
  } catch (err) {
    console.error("Agent error:", err);
    res.status(500).json({ error: "Agent failed", message: err.message });
  }
};
