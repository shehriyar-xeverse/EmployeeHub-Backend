import express from "express";
import {createEmployee,createEmployeeRequest,deleteEmployeeById,deleteEmployeeReqById,getAllEmployees,getSingleEmployee,updateEmployeeController} from "../controllers/employee.controller.js"
import { upload } from "../middleware/upload.js";
import {verifyTokenforEmployee} from "../middleware/employeeAuth.middleware.js"

const employeeRouter = express.Router();
employeeRouter.post('/add-Employee',upload.single("employee_image") , createEmployee)
employeeRouter.get('/getSingle-Employee/:id', getSingleEmployee)
employeeRouter.get('/getAllEmployees', getAllEmployees)
employeeRouter.delete("/delete-Employee/:id",deleteEmployeeById )
employeeRouter.put("/edit-employees/:id", updateEmployeeController);


// for employee
employeeRouter.post('/add-Employee-Req',verifyTokenforEmployee,
      upload.fields([
        { name: "employee_image", maxCount: 1 },
        { name: "file", maxCount: 1 }
    ]), createEmployeeRequest)


    employeeRouter.delete("/delete-EmployeeReq/:id",deleteEmployeeReqById)


export default employeeRouter;