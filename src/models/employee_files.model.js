import { pool } from "../config/db.js";


export const uploadEmployeesFiles = async ({employee_id,notification_id,file_name,file_url,public_id,file_type,uploaded_by}) => {
   
    
    const sql = `INSERT INTO employee_files
        (employee_id,notification_id,file_name,file_url,public_id,file_type,uploaded_by)
        VALUES (?,?,?,?,?,?,?)`;

        
         const [result] = await pool.execute(sql,  [employee_id,notification_id,file_name,file_url,public_id,file_type,uploaded_by])

        const  [rows] = await pool.execute(
        "SELECT * FROM employee_files WHERE id=?",
        [result.insertId]
    );

    return rows[0];
}