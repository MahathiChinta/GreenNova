// services/agentService.js
export async function runAgent(prompt, opts = {}) {
  // demo: very simple rule-based assistant
  if (!prompt) return "No prompt provided";

  // small handy rules
  if (prompt.toLowerCase().includes("how many jobs")) {
    return "You can GET /api/jobs (government) to list jobs. In demo mode jobs are seeded.";
  }

  // fallback mimic
  return `Agent (demo) reply: I received your prompt — "${prompt.slice(0, 200)}"`;
}

export async function processWithAI(prompt) {
  // simple wrapper
  return runAgent(prompt);
}
