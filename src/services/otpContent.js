export const OTPContent = (otp)  => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 40px; }
        .container { max-width: 450px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 40px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        h2 { color: #333; margin-bottom: 15px; }
        p { color: #666; font-size: 15px; line-height: 24px; }
        .otp-code { display: inline-block; background: #eef2f6; color: #00466a; padding: 15px 30px; font-size: 28px; font-weight: bold; letter-spacing: 6px; border-radius: 5px; margin: 25px 0; }
        .footer { color: #aaa; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification</h2>
        <p>Enter this verification code to complete your signup.</p>
        <div class="otp-code">${otp}</div>
        <p>This code expires in 10 minutes. Do not share this code with anyone.</p>
        <div class="footer">This is an automated message, please do not reply.</div>
      </div>
    </body>
    </html>`

    return htmlContent
}