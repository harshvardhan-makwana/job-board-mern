const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Job = require("../models/Job");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get all jobs with employer details
// @route   GET /api/admin/jobs
// @access  Private/Admin
router.get("/jobs", protect, adminOnly, async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @dec Delete job by id
// delete /api/admin/job/:id
//@access private/admin
router.delete("/job/:id", protect, adminOnly, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/admin/users/:id - User delete 
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // @desc    Delete user by ID
    // @route   DELETE /api/admin/users/:id
    // @access  Private/Admin
    // Prevent admin from deleting their own account
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/admin/job/:id - Job delete
router.delete("/job/:id", protect, adminOnly, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
