const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", 
  },
  title: {
    type: String,
    required: [true, "Please add a job title"],
  },
  company: {
    type: String,
    required: [true, "Please add company name"],
  },
  location: {
    type: String,
    required: [true, "Please add location"],
  },
  description: {
    type: String,
    required: [true, "Please add description"],
  },
  requirements: {
    type: [String],
    required: [true, "Please add requirements"],
  },
  salary: {
    type: String,
    required: [true, "Please add salary range"],
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    default: "Full-time"
  },
}, {
  timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;