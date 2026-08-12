import api from './axios';

// Get all students
export const getStudents = async (searchQuery = '') => {
  const token = localStorage.getItem("token");
  const params = searchQuery ? { search: searchQuery } : {};
  const response = await api.get('/api/student', { 
    params,
    headers: { Authorization: token ? `Bearer ${token}` : '' }
  });
  return response.data;
};

// Get single student by ID
export const getStudentById = async (id) => {
  const response = await api.get(`/api/student/${id}`);
  return response.data;
};

// Create new student
export const createStudent = async (studentData) => {
  const response = await api.post('/api/student', studentData);
  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/api/student/${id}`, studentData);
  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const response = await api.delete(`/api/student/${id}`);
  return response.data;
};
