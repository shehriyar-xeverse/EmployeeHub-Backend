import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  getAllUsers,
} from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "user Already Exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashPassword);
    res.status(201).json({
      message: "user successfully Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
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

    res.cookie("token", token, {
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

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
});
  res.status(200).json({
    message: "Logout Successful",
  });
};