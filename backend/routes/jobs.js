router.post("/", async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      region: req.body.region,
      company: req.user.id, // ✅ from auth middleware
      status: "pending",
    });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to add job" });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.id });
    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});
