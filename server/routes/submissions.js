const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  createSubmission,
  getSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  getUserSubmissions
} = require('../controllers/submissionController');

// Public routes
router.get('/', getSubmissions);
router.get('/:id', getSubmissionById);

// Protected routes
router.post('/', protect, createSubmission);
router.put('/:id', protect, updateSubmission);
router.delete('/:id', protect, deleteSubmission);
router.get('/user/submissions', protect, getUserSubmissions);

module.exports = router; 