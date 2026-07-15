import { eployeesFiles } from "../models/employee_files.model";

export const getEployeesFiles =  async (req,res) => {
    try{
        const {id} =  req.body;
        const response = await eployeesFiles(id)


    return res.status(201).json({
      success: true,
      message: "File Data SuccessFully Fetch",
      body : response,
    });
    }catch(error){
    return res.status(500).json({
      message: err.message,
    });
    }
}