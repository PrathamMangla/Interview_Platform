import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Share Your Interview Experience
        </h1>
        
        <div className="space-y-4">
          {user ? (
            <Link
              to="/submissions/new"
              className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600"
            >
              Share Experience
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="block w-full border-2 border-blue-500 text-blue-500 text-center py-3 rounded-lg hover:bg-blue-50"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home; 