import axios from "axios";



const api = axios.create({baseURL:"https://saylani-bootcamp-lms-0.vercel.app",});

export const getStudentData = async (token) => {
  
  const response = await api.get("api/student", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default api;