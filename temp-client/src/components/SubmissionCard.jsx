import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function SubmissionCard({ submission }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">
          {submission.company}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{submission.position}</p>
        <div className="mt-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            submission.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            submission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {submission.difficulty}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            {format(new Date(submission.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <Link
          to={`/submissions/${submission._id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default SubmissionCard; 