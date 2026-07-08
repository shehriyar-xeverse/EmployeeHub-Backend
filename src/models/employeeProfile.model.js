import { pool } from "../config/db.js";

// creat user  
export const signUpEmployee = async (name,email,password) => {
    const sql = `INSERT INTO employee_profile(name, email, password) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql,[name,email,password])
    return result;
}

// find Employee
export const findEmployeeByEmail = async (email) => {
    const sql  = `SELECT * FROM employee_profile WHERE email = ?`;
    const [rows] = await pool.execute(sql,[email])
    return rows[0];
}


// get Profile 
export const getEmployeeProfileModel = async (userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM employee_profile WHERE id = ?`,
        [userId]
    );

    return rows;
}


export const updateEmployeeProfile = async (userId, profile_image) => {
  const sql = `
    UPDATE employee_profile
    SET profile_image = ?
    WHERE id = ?
  `;
  const [result] = await pool.execute(sql, [profile_image, userId]);
  return result;
};