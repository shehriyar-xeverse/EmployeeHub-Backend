import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
createAdmin,
findAdminByEmail,
getAllAdmins,
getAdminProfileModel,
updateProfile,
} from "../models/admin.model.js";
import { deleteOldImage, uploadToProfileImage } from "../utils/cloudinaryUpload.js";
import {getIO} from '../config/socket.js'


export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({
        message: "user Already Exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await createAdmin(name, email, hashPassword);
    res.status(201).json({
      message: "user successfully Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await findAdminByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "user Not Found",
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

    res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000
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

export const getAdmins = async (req, res) => {
  try {
    const users = await getAllAdmins();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
});
  res.status(200).json({
    message: "Logout Successful",
  });
};

export const getAdminProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getAdminProfileModel(userId);
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
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

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }
    const result = await uploadToProfileImage(req.file.buffer);
    const publicId = result.public_id
    await deleteOldImage(userId)
    
    
    const profile_image = result.secure_url;
    await updateProfile(userId, profile_image,publicId);
    
      const io = getIO()
      io.emit("chngAdminProfileImage", profile_image);


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