import {cloudinary} from '../config/cloudinary.js'
import streamifier from 'streamifier'


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
