import { pool } from "../config/db.js";


// add emplyee 
export const AddEmployee = async (name,email,department,salary) => {
    const sql = `INSERT  INTO empolyees (name,email,department,salary) VALUES (?, ?, ?,?)`;
    const [result] = await pool.execute(sql,[name,email,department,salary])


    const [rows] = await pool.execute(
    "SELECT * FROM empolyees WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
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
    await pool.execute(
        `DELETE FROM empolyees WHERE id = ?`,
        [id]
    );

    return Number(id);
};


// Edit Employee
export const updateEmployee = async (id, data) => {

    const { name, email, department, salary } = data;
    await pool.execute(
        `UPDATE empolyees
         SET name=?, email=?, department=?, salary=?
         WHERE id=?`,
        [name, email, department, salary, id]
    );

    const [rows] = await pool.execute(
        `SELECT * FROM empolyees WHERE id=?`,
        [id]
    );

    return rows[0];
};
