export function generateOtpEmailTemplate(otp: number): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Verify Your OTP</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
          color: #fff;
          font-family: 'Courier New', Courier, monospace;
          line-height: 1.6;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #111;
          padding: 40px;
          border: 1px solid #333;
          border-radius: 6px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header h1 {
          font-weight: normal;
          font-size: 28px;
          letter-spacing: 2px;
          color: #fff;
          margin: 0;
        }

        .otp-box {
          background-color: #000;
          border: 2px dashed #fff;
          padding: 20px;
          text-align: center;
          font-size: 32px;
          letter-spacing: 12px;
          font-weight: bold;
          margin: 30px 0;
          color: #fff;
        }

        .message {
          font-size: 16px;
          margin-bottom: 30px;
          color: #ddd;
          text-align: center;
        }

        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin-top: 30px;
        }

        @media (max-width: 600px) {
          .container {
            padding: 20px;
          }

          .otp-box {
            font-size: 24px;
            letter-spacing: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verification Code</h1>
        </div>
        <div class="message">
          Someone requested to verify your identity. Use the OTP below to proceed.
        </div>

        <div class="otp-box">
          ${otp}
        </div>

        <div class="message">
          This code is valid for only a few minutes. If you didn't request this, you can ignore this email.
        </div>

        <div class="footer">
          &copy; 2025 Monologue Inc. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
