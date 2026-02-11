// sendMail.js
const axios = require("axios");

const sendWelcomeEmail = async (email, name) => {
  try {

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              color: #666;
              font-size: 14px;
            }
            .feature-list {
              background: white;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .feature-list li {
              margin: 10px 0;
            }
            .emoji {
              font-size: 24px;
              margin-right: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Welcome to Our Sareeora!</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${name},</h2>
            
            <p>Thank you for registering! We're thrilled to have you on board. Your account has been successfully created and you're all set to get started.</p>
            
            <div class="feature-list">
              <h3>What's Next?</h3>
              <ul>
                <li><span class="emoji">✨</span><strong>Complete Your Profile:</strong> Add more details to personalize your experience</li>
                <li><span class="emoji">🚀</span><strong>Explore Features:</strong> Discover all the amazing tools we have to offer</li>
                <li><span class="emoji">💡</span><strong>Get Started:</strong> Begin your journey with our platform</li>
                <li><span class="emoji">🤝</span><strong>Join the Community:</strong> Connect with other members</li>
              </ul>
            </div>
            
            <p style="text-align: center;">
              <a href="#" class="button">Get Started Now</a>
            </p>
            
            <p><strong>Your Account Details:</strong></p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Registration Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</li>
            </ul>
            
            <p>If you have any questions or need assistance, feel free to reach out to our support team. We're here to help!</p>
            
            <p>Best regards,<br>
            <strong>The Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This email was sent to ${email}</p>
            <p>If you didn't create this account, please ignore this email.</p>
            <p style="margin-top: 10px;">
              © ${new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `;

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Sareeora", email: process.env.EMAIL_USER },
        to: [{ email, name }],
        subject: "Welcome to Sareeora! Your Account is Ready 🎉",
        htmlContent: htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error message:", error.message);
    throw error;
  }
};

module.exports = { sendWelcomeEmail };