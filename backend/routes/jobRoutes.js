const express = require("express");
const router = express.Router();
const { createJob, getJobs,getJobById,updateJob,deleteJob } = require("../controllers/jobController");
const { protect, employer } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, employer, createJob)  // सिर्फ employer बना पाए
  .get(getJobs); // सब देख पाएं

router.route("/:id")
  .get(getJobById) // Public
  .put(protect, employer, updateJob) // Private + Owner check
  .delete(protect, employer, deleteJob); // Private + Owner check

module.exports = router;