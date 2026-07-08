import express from "express";
import {
    verifyTokenforEmployee
} from "../middleware/employeeAuth.middleware.js";
import { upload } from "../middleware/upload.js";

import {signUpEmployeeController,loginEmployeeController,logoutEmployeeController,getEmployeeProfileController,updateEmployeeProfileImageCont} 
from '../controllers/employeeProfile.controller.js'



const employeeProfileRouter = express.Router();
employeeProfileRouter.post("/signup-employee",signUpEmployeeController);
employeeProfileRouter.post("/login-employee", loginEmployeeController);
employeeProfileRouter.post("/logout-employee", logoutEmployeeController);
employeeProfileRouter.get("/employee-profile", verifyTokenforEmployee, getEmployeeProfileController);
employeeProfileRouter.put("/update-employee-profileImage",verifyTokenforEmployee, upload.single("profile_image"),updateEmployeeProfileImageCont);

export default employeeProfileRouter;