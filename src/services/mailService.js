import  nodemailer from "nodemailer"


// set up transporter
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "muhammadshamirmajeed@gmail.com",
    pass: "kvrj wxwm wxji aons",
  },
});




