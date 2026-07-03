import express from "express";
import {createEmployee,deleteEmployeeById,getAllEmployees,getSingleEmployee,updateEmployeeController} from "../controllers/employee.controller.js"
import { upload } from "../middleware/upload.js";




const employeeRouter = express.Router();
employeeRouter.post('/add-Employee',upload.single("employee_image") , createEmployee)
employeeRouter.get('/getSingle-Employee/:id', getSingleEmployee)
employeeRouter.get('/getAllEmployees', getAllEmployees)
employeeRouter.delete("/delete-Employee/:id",deleteEmployeeById )
employeeRouter.put("/edit-employees/:id", updateEmployeeController);


export default employeeRouter;