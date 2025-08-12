import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  region: { type: String, required: true },
  status: { type: String, default: "open" },
  companyId: { type: String, required: true }, // ✅ allow UUID
});

export default mongoose.model("Job", jobSchema);
