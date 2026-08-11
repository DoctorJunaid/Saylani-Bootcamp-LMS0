import api from "../api/axios.js";

export const loginAdmin = async (email , password)=>{
    const response = await api.post("api/admin/login",{
        email ,password,
        
    });
    
    return response.data;
}