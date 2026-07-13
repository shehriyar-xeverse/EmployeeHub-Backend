import { pool } from "../config/db.js";


// add emplyee 
export const AddEmployee = async (name,email,department,salary,employee_image,created_by_id,approved_by,publicId) => {
    const sql = `INSERT  INTO employees 
    (name,email,department,salary,profile_image,status,created_by_type,created_by_id, approved_by,public_id) 
    VALUES (?, ?, ?,?,?,?,?,?,?,?)`;
    const [result] = await pool.execute(sql,[name,email,department,salary,employee_image, "Approved",
        "admin",created_by_id,approved_by,publicId])


    const [rows] = await pool.execute(
    "SELECT * FROM employees WHERE id = ?",
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
    const sql = `SELECT * FROM employees  WHERE status = 'Approved'`;
    const [rows] = await pool.execute(sql)
    return  rows;
}


// Delete Employees
export const deleteEmployee = async (id) => {
    await pool.execute(
        `DELETE FROM employees WHERE id = ?`,
        [id]
    );

    return Number(id);
};


// Edit Employee
export const updateEmployee = async (id, data) => {

    const { name, email, department, salary } = data;
    await pool.execute(
        `UPDATE employees
         SET name=?, email=?, department=?, salary=?
         WHERE id=?`,
        [name, email, department, salary, id]
    );

    const [rows] = await pool.execute(
        `SELECT * FROM employees WHERE id=?`,
        [id]
    );

    return rows[0];
};




// *************************** For Employees *****************************************

//create Employee Account  Request  
export const createEmployeeReq = async ({employee_profile_id,name,email,
    department,salary,profile_image,created_by_id,publicId}) => {``
    const sql = `INSERT INTO employees
        (employee_profile_id,name,email,department,salary,profile_image,status,created_by_type,created_by_id,public_id)
        VALUES (?,?,?,?,?,?,?,?,?,?)`;
    const [result] = await pool.execute(sql,[employee_profile_id,name,email,department,salary,profile_image,
        "Pending",
        "employee",
        created_by_id,
        publicId
    ]);
    const [rows] = await pool.execute(
        "SELECT * FROM employees WHERE id=?",
        [result.insertId]
    );

    return rows[0];

}

// Ftech Employee Own Req account

export const GetEmployeeReq = async (userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM employees WHERE employee_profile_id = ?`,
        [userId]
    );
    return rows;
}

 
// Delete Employees Request which admin Reject 
export const deleteEmployeeReq = async (id) => {
     await pool.execute(
        `DELETE FROM employees WHERE id = ?`,
        [id]
    );

    return Number(id);
}