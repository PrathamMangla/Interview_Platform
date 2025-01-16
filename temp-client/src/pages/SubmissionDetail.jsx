import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getSubmissionById, deleteSubmission } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: submission, isLoading } = useQuery(
    ['submission', id],
    () => getSubmissionById(id)
  );

  const deleteMutation = useMutation(deleteSubmission, {
    onSuccess: () => {
      toast.success('Submission deleted successfully');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete submission');
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (!submission) return <div>Submission not found</div>;

  const isOwner = user?.id === submission.userId._id;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Interview Experience at {submission.company}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {submission.position}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Country</dt>
                <dd className="mt-1 text-sm text-gray-900">{submission.country}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                <dd className="mt-1 text-sm text-gray-900">{submission.difficulty}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Experience</dt>
                <dd className="mt-1 text-sm text-gray-900">{submission.experience}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Questions</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-5 space-y-2">
                    {submission.questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {submission.tips && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Tips</dt>
                  <dd className="mt-1 text-sm text-gray-900">{submission.tips}</dd>
                </div>
              )}
            </dl>
          </div>
          {isOwner && (
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={() => deleteMutation.mutate(submission._id)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmissionDetail; 