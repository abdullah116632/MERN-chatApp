import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        port:process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        /* Inline CSS styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #007bff;
            margin-bottom: 20px;
        }
        .note {
            font-style: italic;
            color: #888;
            text-align: center;
            margin-bottom: 30px;
        }
        .footer {
            text-align: center;
            color: #888;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Email</h1>
        <p>Dear ${options.username},</p>
        <p>This is your One-Time Password (OTP) for accessing the chat application:</p>
        <div class="otp">${options.OTP}</div> 
        <p>The OTP is valid for 20 minutes. Please do not share this OTP with anyone.</p>
        <p>If you did not request this OTP, you can safely ignore this email.</p>
        <p class="note">Note: This email was sent from the chat application.</p>
        <p class="footer">Thank you,<br>Chat Application Team</p>
    </div>
</body>
</html>`

    const mailOptions = {
        from: "chatApp team",
        to: options.email,
        subject: "password reset OTP",
        html 
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;
