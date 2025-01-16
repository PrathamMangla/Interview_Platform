import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
);

export const submitInterview = async (formData) => {
  try {
    const response = await api.post('/submissions', formData);
    return response;
  } catch (error) {
    console.error('Submit interview error:', error);
    throw error;
  }
};

export const getSubmissions = async (params) => {
  try {
    const response = await api.get('/submissions', { params });
    return response;
  } catch (error) {
    console.error('Get submissions error:', error);
    throw error;
  }
};

export const getSubmissionById = async (id) => {
  const response = await api.get(`/submissions/${id}`);
  return response.data;
};

export const updateSubmission = async (id, data) => {
  const response = await api.put(`/submissions/${id}`, data);
  return response.data;
};

export const deleteSubmission = async (id) => {
  const response = await api.delete(`/submissions/${id}`);
  return response.data;
};

export default api; 