const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob,getMyJobs } = require("../controllers/jobController");
const { protect, employer } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, employer, createJob)  // private employer used
  .get(getAllJobs);  // public

router.route('/my-jobs').get(protect, employer, getMyJobs)

router.route("/:id")
  .get(getJobById)  // Public
  .put(protect, employer, updateJob)  // Private + Owner check
  .delete(protect, employer, deleteJob);  // Private + Owner check

module.exports = router;