const nodemailer = require("nodemailer");

async function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL, // sender address
    to: email, // list of receivers
    subject: "OTP verification", // Subject line
    text: "Please verify your account", // plain text body
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px;
        background: #007bff;
        color: white;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        line-height: 1.6;
      }
      .expiry-highlight {
        color: red;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 14px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2 style="font-size: x-large;">Time-sensitive OTP Verification</h2>
      </div>
      <div class="content" style="font-size: large">
        <p>Dear Sir,</p>
        <div style="text-align: center">
          <p style="font-size: x-large">
            Your OTP code is <br />
            <strong
              style="
                background-color: #007bff;
                color: #f4f4f4;
                font-size: xx-large;
                padding: 10px;
                border-radius: 3px;
              "
              >${otp}</strong
            >
            <br />
            This code will expire in
            <span class="expiry-highlight">2 minutes</span>
          </p>
          <p>Please use this code to complete your verification.</p>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`, // html body
  });
}

// payment success confarmation email
const sendSuccessEmail = async (email, fullname, orderId, totalPrice) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP
    auth: {
      user: process.env.AUTH_EMAIL, // admin email
      pass: process.env.AUTH_PASS, // secure this
    },
  });

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Your Payment Was Successful!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Payment Successful</title>
          <style>
            body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }

            .container {
              width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
            }

            .header {
              background-color: #333;
              color: #fff;
              text-align: center;
              padding: 20px;
              border-radius: 5px;
            }

            .body {
              padding: 20px;
              line-height: 1.5;
            }

            .footer {
              text-align: center;
              color: #777;
              padding: 10px;
            }

            .button {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
            }

            /* Responsive Design */
            @media screen and (max-width: 600px) {
              .container {
                width: 100%;
              }
            }
          </style>
        </head>

        <body>
          <div class="container">
            <div class="header">
              <h1>Order Payment Successful</h1>
            </div>

            <div class="body">
              <p>Dear [Customer's Name],</p>

              <p>We're pleased to confirm that your payment for order number [Order Number] has been successfully processed.</p>

              <p>Your total payment of [Payment Amount] has been received.</p>

              <p>Thank you for your purchase. You can view your order details or track your shipment by clicking on the button below:</p>

              <p><a href="[Link to Order Page]" class="button">View Order Details</a></p>

              <p>If you have any questions, please don't hesitate to contact us at [Customer Support Email/Phone Number].</p>
            </div>

            <div class="footer">
              <p>&copy; [Your Company Name] [Year]</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, sendSuccessEmail };
