import { pool } from "../config/db.js";


// creat user  
export const createUser = async (name,email,password) => {
    const sql = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql,[name,email,password])
    return result;
}

// find user
export const findUserByEmail = async (email) => {
    const sql  = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await pool.execute(sql,[email])
    return rows[0];
}


// get All User
export const getAllUsers  = async  () => {
    const sql = `SELECT * FROM users`;
    const [rows] = await pool.execute(sql)
    return  rows;
}

// get Profile 
export const getUserProfileModel = async (userId) => {
    const [rows] = await pool.query(
        `SELECT id,name,email,created_at FROM users WHERE id = ?`,
        [userId]
    );

    return rows;
};