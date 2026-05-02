const Application = require('../models/Application.js');
const Job = require('../models/Job.js');

// Apply to a job
// @route   POST /api/applications/:jobId
// @access  Private/Jobseeker
const applyToJob = async (req, res) => {
  try {
    const { resume } = req.body;
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applicants for a job
// @route   GET /api/applications/:jobId
// @access  Private/Employer
const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (job.user.toString() !== req.user._id.toString()) { 
      return res.status(401).json({ message: 'Not authorized to view applicants' });
    }
    
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email');
      
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salary') // also fetch related job details
      .sort({ createdAt: -1 })
    
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    
    
    const application = await Application.findById(req.params.id)
    
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    const job = await Job.findById(application.job)
   
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    application.status = req.body.status
    const updatedApp = await application.save()
    
    res.json(updatedApp)
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { applyToJob, getJobApplicants,getMyApplications,updateStatus };