import {
  AddEmployee,
  allEmployees,
  createEmployeeReq,
  deleteEmployee,
  deleteEmployeeReq,
  GetEmployeeReq,
  SingleEmployee,
  updateEmployee,
} from "../models/employee.model.js";
import { getIO } from "../config/socket.js";
import { uploadToEmployeeImage } from "../utils/cloudinaryUpload.js";
import { createNotification } from "../models/notification.model.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, created_by_id, approved_by } =
      req.body;
    let employee_Image;
    const cloudinaryResponse = await uploadToEmployeeImage(req.file.buffer);

    employee_Image = cloudinaryResponse.secure_url;
    const employee = await AddEmployee(
      name,
      email,
      department,
      salary,
      employee_Image,
      created_by_id,
      approved_by,
    );

    const io = getIO();
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

export const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await SingleEmployee(id);

    const io = getIO();
    io.emit("getEmployee", employee);

    res.status(200).json({
      message: "Employee Found",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

export const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedId = await deleteEmployee(id);
    const io = getIO();
    io.emit("deleteEmployee", deletedId);
    res.status(200).json({
      message: "Delete Employee",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

// *************************** for Employees*********************************
export const createEmployeeRequest = async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    const image = await uploadToEmployeeImage(req.file.buffer);
    const employee = await createEmployeeReq({
      employee_profile_id: req.user.id,
      name,
      email,
      department,
      salary,
      profile_image: image.secure_url,
      created_by_id: req.user.id,
    });

    // notification
    const notification = await createNotification({
      employee_id: employee.id,
      sender_id: req.user.id,
      title: "New Employee Request",
      message: `${employee.name} has requested to create an employee.`,
      name,
      email,
      department,
      salary,
      profile_image: image.secure_url,
    });

        const io = getIO();
        io.emit("reqEmployee", { employee, notification });

    return res.status(201).json({
      success: true,
      message: "Request Submitted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const GetEmployeeRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await GetEmployeeReq(userId);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user.length > 0 ? user[0] : null,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployeeReqById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("deleteEmployeeReqById  from Id", id);

    const deletedId = await deleteEmployeeReq(id);
    const io = getIO();
    // io.emit("deleteEmployee", deletedId);
    res.status(200).json({
      message: "Delete Employee",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



