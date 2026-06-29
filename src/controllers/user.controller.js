import bcrypt from "bcrypt";
import { createUser, findUserByEmail, getAllUsers } from "../models/user.model";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body();

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
