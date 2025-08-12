import { grid } from "../utils/seed.js";

export const getGridData = async (req, res) => {
  // If you want random simulated data:
  const now = Date.now();
  const gridData = Array.from({ length: 10 }).map((_, i) => ({
    timestamp: new Date(now - (9 - i) * 60000).toISOString(),
    carbon_intensity: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
    renewable_percentage: Math.floor(Math.random() * (80 - 20 + 1)) + 20,
  }));

  // OR — if you want to use seed data instead of random:
  /*
  const gridData = grid.map(g => ({
    timestamp: g.timestamp,
    carbon_intensity: g.carbon,
    renewable_percentage: g.renewable
  }));
  */

  res.json({ success: true, gridData });
};
