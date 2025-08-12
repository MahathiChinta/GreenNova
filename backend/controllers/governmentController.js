// controllers/governmentController.js
import { jobs } from "../utils/seed.js";
import { grid } from "../utils/seed.js";

export const dashboardSummary = async (req, res) => {
  const totalJobs = jobs.length;
  const running = jobs.filter((j) => j.status === "running").length;
  const scheduled = jobs.filter((j) => j.status === "scheduled").length;

  // Use correct property names from seed.js
  const avgCarbon = Math.round(
    jobs.reduce((s, j) => s + (j.carbon || 0), 0) / Math.max(1, jobs.length)
  );

  const avgRenew = grid.length
    ? Math.round(grid.reduce((s, g) => s + (g.renewable || 0), 0) / grid.length)
    : 0;

  res.json({
    success: true,
    summary: { totalJobs, running, scheduled, avgCarbon, avgRenew },
  });
};
