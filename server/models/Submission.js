const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  interviewRounds: [{
    roundNumber: Number,
    roundType: {
      type: String,
      required: true
    },
    description: String,
    questions: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length > 0 && v.some(q => q.trim() !== '');
        },
        message: 'Each interview round must have at least one question'
      }
    }
  }],
  result: {
    type: String,
    enum: ['Selected', 'Rejected', 'Pending'],
    default: 'Pending'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  salary: {
    type: String
  },
  tips: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema); 