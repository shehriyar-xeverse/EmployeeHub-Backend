import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);


export const sendOTP = async (email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Your Verification Code",
      html: `<div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:5px;">
            ${otp}
          </h1>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

