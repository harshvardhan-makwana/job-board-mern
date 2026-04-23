const express = require('express');
const router = express.Router();
const { applyToJob, getJobApplicants } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:jobId', protect, applyToJob);
router.get('/:jobId', protect, getJobApplicants);

module.exports = router;