import { AddEmployee,allEmployees,deleteEmployee,SingleEmployee ,updateEmployee} from "../models/employee.model.js";
import {getIO} from '../config/socket.js'
import { uploadToEmployeeImage } from "../utils/cloudinaryUpload.js";


export const createEmployee = async (req, res) => {
  console.log("Request file from controller",req.file)
  try {
    const { name,email,department,salary } = req.body;
    let employee_Image ; 
    const cloudinaryResponse = await uploadToEmployeeImage(req.file.buffer)


      employee_Image = cloudinaryResponse.secure_url;
    const employee = await AddEmployee(name,email,department,salary, employee_Image)



      const io = getIO()
      io.emit("employeeCreated", employee);

    res.status(201).json({
      message: "Employee Successfully Created",
      employee,
      
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getSingleEmployee = async (req,res) => {
  try{
     const { id } = req.params;
    const employee = await SingleEmployee(id);

    const io = getIO()
    io.emit("getEmployee", employee);


      res.status(200).json({
          message: "Employee Found",
          employee,
      });
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
}


export const getAllEmployees = async (req, res) => {
  try {
    const employees = await allEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteEmployeeById = async (req,res) => {
  try{
     const { id } = req.params;
    const deletedId = await deleteEmployee(id);
    const io = getIO();
    io.emit("deleteEmployee", deletedId);
      res.status(200).json({
          message: "Delete Employee",
      });
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
}


export const updateEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await updateEmployee(id, req.body);
    const io = getIO();
    io.emit("updateEmployee", employee);
    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });

  } catch (error) {
    console.log(error);
  }
};