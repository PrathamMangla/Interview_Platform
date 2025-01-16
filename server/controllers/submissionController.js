const Submission = require('../models/Submission');

exports.createSubmission = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Clean and validate the data
    const submissionData = {
      userId,
      company: req.body.company,
      position: req.body.position,
      country: req.body.country,
      experience: req.body.experience,
      interviewRounds: req.body.interviewRounds
        .map(round => ({
          roundNumber: round.roundNumber,
          roundType: round.roundType,
          description: round.description || '',
          questions: round.questions.filter(q => q.trim() !== '') // Remove empty questions
        }))
        .filter(round => round.questions.length > 0), // Only include rounds with questions
      difficulty: req.body.difficulty,
      result: req.body.result,
      salary: req.body.salary || '',
      tips: req.body.tips || ''
    };

    // Validate that there's at least one round with questions
    if (submissionData.interviewRounds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one interview round with questions is required'
      });
    }

    const submission = await Submission.create(submissionData);

    return res.status(201).json({
      success: true,
      data: submission,
      message: 'Interview experience submitted successfully'
    });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating submission',
      error: error.message || 'An unexpected error occurred'
    });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const company = req.query.company || '';
    const difficulty = req.query.difficulty || '';

    const query = {};
    
    // Build search query
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }
    if (company) query.company = { $regex: company, $options: 'i' };
    if (difficulty) query.difficulty = difficulty;

    // Execute query with pagination
    const submissions = await Submission.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Submission.countDocuments(query);

    // Format the response
    const formattedSubmissions = submissions.map(submission => ({
      id: submission._id,
      company: submission.company,
      position: submission.position,
      country: submission.country,
      experience: submission.experience,
      interviewRounds: submission.interviewRounds,
      difficulty: submission.difficulty,
      result: submission.result,
      salary: submission.salary,
      tips: submission.tips,
      user: submission.userId ? {
        name: submission.userId.name,
        email: submission.userId.email
      } : null,
      createdAt: submission.createdAt
    }));

    return res.status(200).json({
      success: true,
      data: {
        submissions: formattedSubmissions,
        pagination: {
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          perPage: limit
        }
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('userId', 'name');
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedSubmission = await Submission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await submission.remove();
    res.json({ message: 'Submission removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 