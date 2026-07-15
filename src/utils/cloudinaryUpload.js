
import streamifier from 'streamifier'
import { pool } from "../config/db.js";
import {cloudinary} from "../config/cloudinary.js"




export const uploadToEmployeeImage = (buffer) => {

   return new Promise ((resolve,reject)  => {
    const stream = cloudinary.uploader.upload_stream(
        {folder : 'employee_image'},
        (error,result)  => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        }
    )
    streamifier.createReadStream(buffer).pipe(stream)
   });
}

export const uploadToProfileImage = (buffer) => {
   return new Promise ((resolve,reject)  => {
    const stream = cloudinary.uploader.upload_stream(
        {folder : 'profile_image'},
        (error,result)  => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        }
    )
    streamifier.createReadStream(buffer).pipe(stream)
   });
}

        export const uploadfile = (buffer,fileName)=>{
        return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder:   "employees_files"
        },(err,res)=>{
        if(err) return reject(err);
        resolve(res);
        });
        streamifier.createReadStream(buffer).pipe(stream);
        })}

  

export const deleteOldImage =   async (userId) => {
    const [FetchProfile]  =  await pool.execute(`SELECT * FROM admins WHERE id = ?`, [userId]);
    const  oldPublicId = FetchProfile[0].public_id
    const deleteImage =     await cloudinary.uploader.destroy(oldPublicId);
    return deleteImage;
}

export const deleteEmployeeProfileImage =   async (userId) => {
    const [FetchProfile]  =  await pool.execute(`SELECT * FROM employee_profile WHERE id = ?`, [userId]);
    const  oldPublicId = FetchProfile[0].public_id
    const deleteImage =     await cloudinary.uploader.destroy(oldPublicId);
    return deleteImage;
}


export const uploadEmployeeProfileImage = (buffer) => {
   return new Promise ((resolve,reject)  => {
    const stream = cloudinary.uploader.upload_stream(
        {folder : 'employeProfile_image'},
        (error,result)  => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        }
    )
    streamifier.createReadStream(buffer).pipe(stream)
   });
}




export const deleteEmployeeImage =   async (userId) => {
    const [FetchProfile]  =  await pool.execute(`SELECT * FROM employees WHERE id = ?`, [userId]);
    const  oldPublicId = FetchProfile[0].public_id
    const deleteImage =     await cloudinary.uploader.destroy(oldPublicId);
    return deleteImage;
}


export const deleteEmployeefile = async (userId) => {
    const [FetchProfile]  =  await pool.execute(`SELECT * FROM employees WHERE id = ?`, [userId]);
    const  oldPublicId = FetchProfile[0].file_public_id
    const deleteFile = await cloudinary.uploader.destroy(oldPublicId)
    return deleteFile;
}



