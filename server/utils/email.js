// server/utils/email.js
// Email utility using Nodemailer

const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
};

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @returns {Promise} Send result
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Artisan\'s Corner" <noreply@artisanscorner.com>',
      to,
      subject,
      text,
      html: html || text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

/**
 * Send order confirmation email
 * @param {Object} user - User object
 * @param {Object} order - Order object
 */
const sendOrderConfirmation = async (user, order) => {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td>${item.title}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B4513;">Order Confirmed!</h1>
      <p>Dear ${user.name},</p>
      <p>Thank you for your order! Here are your order details:</p>
      
      <h3>Order #${order._id}</h3>
      <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align: right; padding: 10px;"><strong>Total:</strong></td>
            <td style="text-align: right; padding: 10px;"><strong>$${order.totalAmount.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <h3>Shipping Address</h3>
      <p>
        ${order.shippingAddress.fullName}<br>
        ${order.shippingAddress.line1}<br>
        ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br>
        ${order.shippingAddress.country}
      </p>

      <p>We'll notify you when your order ships!</p>
      
      <p style="color: #666; margin-top: 30px;">
        Best regards,<br>
        The Artisan's Corner Team
      </p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: `Order Confirmed - #${order._id}`,
    html
  });
};

/**
 * Send password reset email
 * @param {Object} user - User object
 * @param {string} resetToken - Reset token
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B4513;">Password Reset Request</h1>
      <p>Dear ${user.name},</p>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      
      <p style="margin: 30px 0;">
        <a href="${resetUrl}" style="background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </p>
      
      <p style="color: #666;">Or copy and paste this link:</p>
      <p style="color: #0066cc; word-break: break-all;">${resetUrl}</p>
      
      <p style="color: #666;">This link expires in 10 minutes.</p>
      
      <p style="color: #666; margin-top: 30px;">
        If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
      </p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset - Artisan\'s Corner',
    html
  });
};

/**
 * Send vendor approval email
 * @param {Object} user - User object
 */
const sendVendorApprovalEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B4513;">Congratulations! 🎉</h1>
      <p>Dear ${user.name},</p>
      <p>Great news! Your vendor application has been approved!</p>
      
      <p>You can now:</p>
      <ul>
        <li>Add products to your store</li>
        <li>Manage orders</li>
        <li>View your sales dashboard</li>
        <li>Connect with customers</li>
      </ul>
      
      <p style="margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/dashboard/seller" style="background: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Go to Seller Dashboard
        </a>
      </p>
      
      <p style="color: #666; margin-top: 30px;">
        Welcome to the Artisan's Corner family!<br>
        Best regards,<br>
        The Artisan's Corner Team
      </p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: 'Vendor Application Approved - Artisan\'s Corner',
    html
  });
};

module.exports = {
  sendEmail,
  sendOrderConfirmation,
  sendPasswordResetEmail,
  sendVendorApprovalEmail
};
