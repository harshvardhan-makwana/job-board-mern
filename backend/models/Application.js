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
    enum: ['pending', 'reviewed', 'rejected', 'hired'],
    default: 'pending'
  }
}, { timestamps: true });

// 1 user 1 job पे सिर्फ 1 बार apply कर सके
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);