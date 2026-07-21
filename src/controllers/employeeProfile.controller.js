import {
  signUpEmployee,
  findEmployeeByEmail,
  getEmployeeProfileModel,
  updateEmployeeProfile,
} from "../models/employeeProfile.model.js";
import {
  deleteEmployeeProfileImage,
  deleteOldImage,
  uploadEmployeeProfileImage,
  uploadToProfileImage,
} from "../utils/cloudinaryUpload.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getIO } from "../config/socket.js";
import { transporter } from "../services/mailService.js";
import { OTPContent } from "../services/otpContent.js";
import { deleteOTP, fetchOTP, saveOTP } from "../models/otp.model.js";

export const signUpEmployeeController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmployee = await findEmployeeByEmail(email);
    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee Already Exist",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    const mailOptions = {
      from: "employeehub.hr@gmail.com",
      to: email,
      subject: "Email Verfiication",
      text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
      html: OTPContent(otp),
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(
          "Error sending email  from signUpEmployeeController Admin: ",
          error,
        );
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent from register Admin", info.response);
        await saveOTP(email, otp, expiresAt);
      }
    });

    res.status(201).json({
      message: "Employee successfully Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifiedOTPEmployee = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const otpRecord = await fetchOTP(email);
    if (otpRecord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "OTP not found.",
      });
    }
    if (otpRecord[0].otp_code !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await signUpEmployee(name, email, hashPassword);
    await deleteOTP(email)
    return res.status(201).json({
      success: true,
      message: "OTP Verified Successfully. Employee SignUp!.",
    });
  } catch (error) {
    console.log("Verified OTP Error:", error);
    return res.status(500).json({
      success: false,
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
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("employeeToken", token, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "None" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
    httpOnly: false,
    secure: false,
    sameSite: "lax",
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
        message: "employee not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
    const publicId = result.public_id;

    await deleteEmployeeProfileImage(userId);

    const profile_image = result.secure_url;
    await updateEmployeeProfile(userId, profile_image, publicId);

    const io = getIO();
    io.emit("chngEmpProfileImage", profile_image);

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

export const createOwnEmployee = async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    let employee_Image;
    const cloudinaryResponse = await uploadToEmployeeImage(req.file.buffer);
    employee_Image = cloudinaryResponse.secure_url;
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
