import Job from "../models/Job.js";

// Company: submit job
export const submitJob = async (req, res) => {
  try {
    const { title, company, region } = req.body;
    const job = await Job.create({
      title,
      company,
      region,
      companyId: req.user.id, // link job to logged-in company
      status: "pending",
    });
    res.status(201).json({ message: "Job created", job });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(400).json({ message: err.message });
  }
};



// Government: get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("companyId", "name email");
  res.json({ jobs });
};

// controllers/jobController.js
export const getCompanyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.user.id }); // only their jobs
    res.json({ jobs });
  } catch (err) {
    console.error("Error fetching company jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Single job
export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

// Update job
export const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  job.title = req.body.title || job.title;
  job.region = req.body.region || job.region;
  job.status = req.body.status || job.status;
  await job.save();

  res.json({ message: "Job updated", job });
};

// Delete job
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  await job.deleteOne();
  res.json({ message: "Job deleted" });
};

