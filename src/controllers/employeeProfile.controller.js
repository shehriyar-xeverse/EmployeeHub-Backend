import {signUpEmployee,findEmployeeByEmail,getEmployeeProfileModel,updateEmployeeProfile}  from '../models/employeeProfile.model.js'
import { uploadEmployeeProfileImage, uploadToProfileImage } from '../utils/cloudinaryUpload.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {getIO} from '../config/socket.js'





export const signUpEmployeeController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmployee = await findEmployeeByEmail(email);
    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee Already Exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await signUpEmployee(name, email, hashPassword);
    res.status(201).json({
      message: "Employee successfully Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginEmployeeController = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await findEmployeeByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "employee Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.cookie("employeeToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
      });
    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const logoutEmployeeController = (req, res) => {
  res.clearCookie("employeeToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
});
  res.status(200).json({
    message: "Logout Successful",
  });
};

export const getEmployeeProfileController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getEmployeeProfileModel(userId);
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "employee not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: user[0]
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateEmployeeProfileImageCont = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Employee Profile image is required",
      });
    }
    const result = await uploadToProfileImage(req.file.buffer);
    const profile_image = result.secure_url;
    await updateEmployeeProfile(userId, profile_image);



    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      profile_image: profile_image,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createOwnEmployee = async (req,res) => {
   try {
      const { name,email,department,salary } = req.body;
      let employee_Image ; 
      const cloudinaryResponse = await uploadToEmployeeImage(req.file.buffer)
      employee_Image = cloudinaryResponse.secure_url;


      // send to notification to Admin 
      



      // const employee = await AddEmployee(name,email,department,salary, employee_Image)
  
  
  
        // const io = getIO()
        // io.emit("employeeCreated", employee);
  
      res.status(201).json({
        message: "Employee Successfully Created",
        employee,
        
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}




// export const getAllEmployeesController = async (req, res) => {
//   try {
//     const users = await getAllAdmins();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
