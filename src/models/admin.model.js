import { pool } from "../config/db.js";

// creat user  
export const createAdmin = async (name,email,password) => {
    const sql = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql,[name,email,password,role])
    return result;
}

// find user
export const findAdminByEmail = async (email) => {
    const sql  = `SELECT * FROM admins WHERE email = ?`;
    const [rows] = await pool.execute(sql,[email])
    return rows[0];
}


// get All User
export const getAllAdmins  = async  () => {
    const sql = `SELECT * FROM admins`;
    const [rows] = await pool.execute(sql)
    return  rows;
}

// get Profile 
export const getAdminProfileModel = async (userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM admins WHERE id = ?`,
        [userId]
    );

    return rows;
};


export const updateProfile = async (userId, profile_image, publicId) => {
    const sql = `
    UPDATE admins
    SET profile_image = ?, public_id = ?
    WHERE id = ?`;
  const [result] = await pool.execute(sql, [profile_image,publicId,  userId]);
  return result;
};