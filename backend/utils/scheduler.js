// utils/scheduler.js
import schedule from "node-schedule";
import { jobs } from "./seed.js";

export const scheduleJobs = () => {
  // runs every minute in dev for demo; switch to hourly in prod as needed
  schedule.scheduleJob("*/1 * * * *", () => {
    try {
      console.log("⏳ Scheduler tick - updating demo job statuses");
      if (!jobs || jobs.length === 0) {
        console.log("⚠️ No jobs to update");
        return;
      }
      jobs.forEach((j) => {
        if (j.status === "scheduled") j.status = "running";
        else if (j.status === "running") j.status = "completed";
        j.updated_at = new Date().toISOString();
      });
      console.log("✅ Scheduler updated demo jobs");
    } catch (err) {
      console.error("Scheduler error:", err);
    }
  });
};
