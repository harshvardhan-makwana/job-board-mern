const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  resume: {
    type: String,
    required: [true, 'Resume link is required']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed','shortlisted', 'rejected', 'hired'],
    default: 'pending'
  }
}, { timestamps: true });

// Ensure user can apply to a job only once
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);