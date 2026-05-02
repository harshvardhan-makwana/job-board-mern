const express = require('express');
const router = express.Router();
const { applyToJob, getJobApplicants,getMyApplications,updateStatus } = require('../controllers/applicationController');
const { protect,employer} = require('../middleware/authMiddleware');

router.get('/my', protect, getMyApplications);

router.post('/:jobId', protect, applyToJob);
router.get('/:jobId', protect,employer, getJobApplicants);
router.put('/:id', protect, updateStatus)
module.exports = router;