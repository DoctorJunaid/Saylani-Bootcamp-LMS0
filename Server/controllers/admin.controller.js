import { loginAdmin } from "../services/admin.Service.js";

export const loginAdminController = async(req , res)=>{
    try {
        const {email , password} = req.body;

        // Check fields
        if(!email || !password){
            return res.status(400).json({message : "Email and passowrd are requried!"});
        };

        // Login
        const result = await loginAdmin(email, password);
          res.status(200).json({
            // message:email, password,
            message:"Admin login Sucessfully",
            // result
            ...result
          })
        
    } 
    catch (error) 
    {
        res.status(401).json({
        erroMessage : error.message
        })
    }
}