import { AddEmployee,allEmployees,deleteEmployee,SingleEmployee ,updateEmployee} from "../models/employee.model.js";


export const createEmployee = async (req, res) => {
  try {
    const { name,email,department,salary } = req.body;
    await AddEmployee(name,email,department,salary )
    res.status(201).json({
      message: "Employee Successfully Created",
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
    const employee = await deleteEmployee(id);
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

    const result = await updateEmployee(id, req.body);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};