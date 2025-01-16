import { useState } from 'react';
import { useQuery } from 'react-query';
import { getSubmissions } from '../services/api';
import toast from 'react-hot-toast';

function Dashboard() {
  const [filters, setFilters] = useState({
    page: 1,
    search: '',
    company: '',
    difficulty: ''
  });

  const { data, isLoading, error } = useQuery(
    ['submissions', filters],
    () => getSubmissions(filters),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast.error(error.message || 'Failed to fetch submissions');
      }
    }
  );

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error loading submissions</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Company"
          value={filters.company}
          onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value, page: 1 }))}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <select
          value={filters.difficulty}
          onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value, page: 1 }))}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Submissions List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data?.data?.submissions.map((submission) => (
            <li key={submission.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {submission.company} - {submission.position}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {submission.country} • {submission.experience} • {submission.difficulty}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Rounds: {submission.interviewRounds.length} • Result: {submission.result}
                  </p>
                  {submission.salary && (
                    <p className="mt-1 text-sm text-gray-600">
                      Salary: {submission.salary}
                    </p>
                  )}
                </div>
                <div className="ml-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    submission.result === 'Selected' ? 'bg-green-100 text-green-800' :
                    submission.result === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {submission.result}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      {data?.data?.pagination && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {filters.page} of {data.data.pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === data.data.pagination.totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 