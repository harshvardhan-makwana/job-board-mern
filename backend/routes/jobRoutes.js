const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");
const { protect, employer } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, employer, createJob)  // Sirf employer bana paye
  .get(getAllJobs);  // Sab dekh paye - getJobs hata de, getAllJobs use kar

router.route("/:id")
  .get(getJobById)  // Public
  .put(protect, employer, updateJob)  // Private + Owner check
  .delete(protect, employer, deleteJob);  // Private + Owner check

module.exports = router;