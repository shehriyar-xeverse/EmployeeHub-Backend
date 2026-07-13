import {cloudinary} from '../config/cloudinary.js'
import streamifier from 'streamifier'
import { pool } from "../config/db.js";



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
