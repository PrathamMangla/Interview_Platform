import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { submitInterview } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function NewSubmission() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    country: '',
    experience: '',
    interviewRounds: [
      {
        roundNumber: 1,
        roundType: '',
        description: '',
        questions: ['']
      }
    ],
    difficulty: 'Medium',
    result: 'Pending',
    salary: '',
    tips: ''
  });

  const mutation = useMutation(submitInterview, {
    onSuccess: (data) => {
      toast.success(data.message || 'Experience shared successfully!');
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to share experience. Please try again.');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.company || !formData.position || !formData.country || !formData.experience) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Clean up and validate interview rounds
      const validRounds = formData.interviewRounds
        .map(round => ({
          ...round,
          questions: round.questions.filter(q => q.trim() !== '')
        }))
        .filter(round => round.roundType && round.questions.length > 0);

      if (validRounds.length === 0) {
        toast.error('Please add at least one interview round with questions');
        return;
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        interviewRounds: validRounds
      };

      await mutation.mutateAsync(submissionData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to submit interview experience');
    }
  };

  const addInterviewRound = () => {
    setFormData(prev => ({
      ...prev,
      interviewRounds: [
        ...prev.interviewRounds,
        {
          roundNumber: prev.interviewRounds.length + 1,
          roundType: '',
          description: '',
          questions: ['']
        }
      ]
    }));
  };

  const updateInterviewRound = (index, field, value) => {
    const newRounds = [...formData.interviewRounds];
    newRounds[index] = { ...newRounds[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      interviewRounds: newRounds
    }));
  };

  const addRoundQuestion = (roundIndex) => {
    const newRounds = [...formData.interviewRounds];
    newRounds[roundIndex].questions.push('');
    setFormData(prev => ({
      ...prev,
      interviewRounds: newRounds
    }));
  };

  const updateRoundQuestion = (roundIndex, questionIndex, value) => {
    const newRounds = [...formData.interviewRounds];
    newRounds[roundIndex].questions[questionIndex] = value;
    setFormData(prev => ({
      ...prev,
      interviewRounds: newRounds
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Share Your Interview Experience</h3>
          <p className="mt-1 text-sm text-gray-500">
            Help others prepare by sharing your interview experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <input
              type="text"
              required
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., 2 years, Entry Level, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interview Rounds</label>
          {formData.interviewRounds.map((round, roundIndex) => (
            <div key={roundIndex} className="mt-4 p-4 border rounded-md">
              <h4 className="font-medium">Round {round.roundNumber}</h4>
              
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Round Type</label>
                <input
                  type="text"
                  required
                  value={round.roundType}
                  onChange={(e) => updateInterviewRound(roundIndex, 'roundType', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Technical, HR, System Design"
                />
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={round.description}
                  onChange={(e) => updateInterviewRound(roundIndex, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows="2"
                />
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Questions</label>
                {round.questions.map((question, qIndex) => (
                  <input
                    key={qIndex}
                    type="text"
                    required
                    value={question}
                    onChange={(e) => updateRoundQuestion(roundIndex, qIndex, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={`Question ${qIndex + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addRoundQuestion(roundIndex)}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  + Add Question
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addInterviewRound}
            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Add Interview Round
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              required
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <select
              value={formData.result}
              onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary (Optional)</label>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., $100,000/year"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tips (Optional)</label>
          <textarea
            value={formData.tips}
            onChange={(e) => setFormData(prev => ({ ...prev, tips: e.target.value }))}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Share any tips or advice for other candidates..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {mutation.isLoading ? 'Submitting...' : 'Share Experience'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSubmission; 