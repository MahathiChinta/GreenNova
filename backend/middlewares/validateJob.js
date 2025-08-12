// middlewares/validateJob.js
export function validateJobPayload(req, res, next) {
  const { title, company, region } = req.body;
  if (!title || !company) return res.status(400).json({ error: "title and company required" });
  if (region && !["north", "south", "east", "west"].includes(region)) {
    return res.status(400).json({ error: "invalid region" });
  }
  next();
}
