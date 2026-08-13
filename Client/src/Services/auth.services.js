import api from "../api/axios.js";

export const loginAdmin = async (email , password)=>{
    const response = await api.post("admin/login",{
        email ,password,
        
    });
    
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};