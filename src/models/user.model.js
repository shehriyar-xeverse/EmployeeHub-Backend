import { pool } from "../config/db";


// creat user  
export const createUser = async (name,email,password) => {
    const sql = `insert into users(name,email,password)  values (?,?,?)`;
    const [result] = pool.execute(sql,[name,email,password])
    return result;
}


export const findUserByEmail = async (email) => {
    const sql  = `select * from users where = ?`;
    const [rows] = await pool.execute(sql,[email])
    return rows[0];
}



export const getAllUsers  = async  () => {
    const sql = `select * from users`;
    const [rows] = await pool.execute(sql)
    return  rows;
}