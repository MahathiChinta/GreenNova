// utils/carbonCalculator.js
export function calculateCarbon(job) {
  let base = 50;
  if (job.priority === 1) base += 30;
  if (job.priority === 5) base -= 10;
  return base;
}
