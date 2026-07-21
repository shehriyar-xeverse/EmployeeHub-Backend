import { pool } from "../config/db.js"


// Save  OTP
export const saveOTP = async (user_email, otp_code, expires_at) => {
    const sql = `INSERT INTO otp_records (user_email, otp_code, expires_at) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql,[user_email, otp_code, expires_at])
    return result;
}



// get OTP 
export const fetchOTP = async (user_email) => {
  const sql = `SELECT otp_code FROM otp_records WHERE user_email = ? ORDER BY id DESC LIMIT 1`;
  const [result] = await pool.execute(sql, [user_email]);
  return result;
};


// delete OTP 
export const deleteOTP = async (user_email) => {
  const sql = `DELETE FROM otp_records WHERE user_email = ? `;
  const [result] = await pool.execute(sql, [user_email]);
  return result;

}