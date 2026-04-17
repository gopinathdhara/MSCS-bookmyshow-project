import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";



function replaceContent(content, creds) {
  let allKeysArr = Object.keys(creds);

  allKeysArr.forEach((key) => {
    content = content.replaceAll(`#{${key}}`, creds[key]);
  });

  return content;
}

async function EmailHelper(templateName, receiverEmail, subject, text, creds) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  console.log('email helper');
  const __filename = fileURLToPath(import.meta.url); // current file path
  const __dirname = path.dirname(__filename); // current directory path

  const templatePath = path.join(__dirname, "email_templates", templateName);
  let content = await fs.promises.readFile(templatePath, "utf-8");

  try {
    
    const transportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: SENDGRID_API_KEY,
      },
    };

    const emailDetails = {
      to: receiverEmail,
      from: process.env.EMAIL_FROM,
      subject: subject || "Welcome To BookMyShow",
      text: text || "",
      html: replaceContent(content, creds),
    };

    const transporter = nodemailer.createTransport(transportDetails);
    await transporter.sendMail(emailDetails);
    console.log("email sent");
  } catch (err) {
    console.log("Email sending failed");
    console.log("Error message:", err.message);
    console.log("Full error:", err);
    throw err;
  }
}

export default EmailHelper;
