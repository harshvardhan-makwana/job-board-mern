const Job = require("../models/Job");

// @desc Create new job
// @route POST /api/jobs
// @access Private/Employer
const createJob = async (req, res) => {
  try {
    const { title, company, location, description, requirements, salary, jobType } = req.body;

    const job = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      user: req.user._id, // middleware से आएगा
    });

    const createdJob = await job.save();
    return res.status(201).json(createdJob);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get all jobs
// @route GET /api/jobs
// @access Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("user", "name email"); // user की id से name,email ले आओ
    return res.json(jobs);
  } catch (error) {
    console.error(error);
     return res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get job by ID
// @route GET /api/jobs/:id
// @access Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("user", "name email");
    
    if (job) {
      return res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update job
// @route PUT /api/jobs/:id
// @access Private/Employer
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      // Check: job उसी employer ने बनाई है या नहीं
      if (job.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized to update this job" });
      }

      job.title = req.body.title || job.title;
      job.company = req.body.company || job.company;
      job.location = req.body.location || job.location;
      job.description = req.body.description || job.description;
      job.requirements = req.body.requirements || job.requirements;
      job.salary = req.body.salary || job.salary;
      job.jobType = req.body.jobType || job.jobType;

      const updatedJob = await job.save();
      return res.json(updatedJob);
    } else {
      return res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access Private/Employer
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      // Check: job उसी employer ने बनाई है या नहीं
      if (job.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized to delete this job" });
      }
      
      await Job.deleteOne({ _id: job._id });
      return res.json({ message: "Job removed" });
    } else {
     return res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
   return res.status(500).json({ message: "Server Error" });
  }
};


// Get all jobs from DB
getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs, newest first
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob,getAllJobs }; // एक्सपोर्ट अपडेट कर

