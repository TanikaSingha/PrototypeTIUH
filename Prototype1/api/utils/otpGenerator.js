const moment = require("moment");
const sendEmail = require("./sendMail");

const otpGenerator = async (user, email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresIn = moment().add(10, "minutes").toDate();
  user.otp = otp;
  user.otpExpires = expiresIn;

  await user.save();

  const emailSubject = "Action Required: Verify Your AquaSavvy Account";
  const emailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h1 style="color: #2196F3; text-align: center; font-size: 28px; margin-bottom: 20px;">Verify Your AquaSavvy Account</h1>
    <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Thank you for joining AquaSavvy! To start your journey in learning about groundwater conservation, please use the following One-Time Password (OTP) to verify your email address:</p>
    <div style="text-align: center; margin: 20px 0;">
      <span style="display: inline-block; padding: 15px 25px; font-size: 22px; background-color: #2196F3; color: #fff; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        ${otp}
      </span>
    </div>
    <p style="font-size: 16px; margin-bottom: 20px;">This OTP is valid for the next 10 minutes. If you did not request this verification, please disregard this email.</p>
    <p style="font-size: 16px;">Best regards,<br>The AquaSavvy Team</p>
  </div>
`;
  await sendEmail(email, emailSubject, emailBody);
};

module.exports = otpGenerator;
