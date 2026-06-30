import { pool } from "../config/db.js";


// add emplyee 
export const AddEmployee = async (name,email,department,salary) => {
    const sql = `INSERT  INTO empolyees (name,email,department,salary) VALUES (?, ?, ?,?)`;
    const [result] = await pool.execute(sql,[name,email,department,salary])
    return result;
}


// Single Employee 
export const SingleEmployee = async (id) => {
    const sql  = `SELECT * FROM empolyees WHERE id = ?`;
    const [rows] = await pool.execute(sql,[id])
    return rows[0];
}

// get ALL employees
export const allEmployees  = async  () => {
    const sql = `SELECT * FROM empolyees`;
    const [rows] = await pool.execute(sql)
    return  rows;
}


// Delete Employees
export const deleteEmployee = async (id) => {
    const sql  = `DELETE FROM empolyees WHERE id = ?`;
    const [rows] = await pool.execute(sql,[id])
    return rows[0];
}


// Edit Employee
export const updateEmployee = async (id, employeeData) => {
  const { name, email, department, salary } = employeeData;

  console.log({
    id,
    name,
    email,
    department,
    salary,
  });

  const sql = `
    UPDATE empolyees
    SET
      name = ?,
      email = ?,
      department = ?,
      salary = ?
    WHERE id = ?
  `;

  const [result] = await pool.execute(sql, [
    name,
    email,
    department,
    salary,
    id,
  ]);

  return result;
};

