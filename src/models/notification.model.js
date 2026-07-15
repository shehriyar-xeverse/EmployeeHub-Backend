import { pool } from "../config/db.js";



// create notifictaion  
export const createNotification = async ({
    employee_id,
    sender_id,
    title,
    message,
    name,
    email,
    department,
    salary,
    profile_image,
    employee_file,
})=>{
    const sql=`
    INSERT INTO notifications(employee_id,sender_type,sender_id,receiver_type,title,message,
    name,email,department,salary,profile_image, employee_file)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    const [result]  = await pool.execute(sql,[employee_id,"employee",sender_id,"admin",title,message,name,email,department,salary,profile_image, employee_file]);


    const [rows] = await pool.execute(
        "SELECT * FROM notifications  WHERE id=?",
        [result.insertId]
    );

    return rows[0];
}


// fetch All Notifications
export const getNotifications = async () => {
    const sql = `SELECT * FROM notifications`
    const [rows] = await pool.execute(sql)
    return  rows;
} 






// Approved notifications  
export const approveEmployeeRequest = async (
    notificationId,
    adminId
) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [notification] = await connection.execute( `SELECT employee_id FROM notifications WHERE id = ?`,[notificationId]);
        if (notification.length === 0) {
            throw new Error("Notification not found");
        }

        const employeeId = notification[0].employee_id;
        await connection.execute(`UPDATE notifications SET status = 'accept' WHERE id = ?`,[notificationId]);
        await connection.execute(`UPDATE employees SET  status = 'Approved', approved_by = ?, 
             updated_at = NOW()  WHERE id = ?`, [adminId, employeeId]);
        const [employee] = await connection.execute(`SELECT * FROM employees WHERE id = ?`,[employeeId]
        );
        await connection.commit();
            return {
                employee: employee[0],
                notificationId
            };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }

};





export const rejectEmployeeRequest = async (
    notificationId,
    adminId
) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [notification] = await connection.execute( `SELECT employee_id FROM notifications WHERE id = ?`,[notificationId]);
        if (notification.length === 0) {
            throw new Error("Notification not found");
        }
        const employeeId = notification[0].employee_id;
        // Update Employee Status
        await connection.execute(`UPDATE employees SET  status = 'Rejected', approved_by = ?, 
             approved_at = NOW() WHERE id = ? `,[adminId, employeeId]
        );
        const [employee] = await connection.execute( `SELECT * FROM employees WHERE id = ?`,[employeeId]
        );
        // reject 
        await connection.execute( `UPDATE notifications SET status = 'reject' WHERE id = ?`, [notificationId]);
        await connection.commit();
        return {
                employee: employee[0],
                notificationId
            };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }

};