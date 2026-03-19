const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Send welcome email on registration
const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'StyleAura <noreply@styleaura.com>',
    to: userEmail,
    subject: '🎉 Welcome to StyleAura!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 32px; }
          .content { padding: 30px; }
          .content h2 { color: #667eea; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Welcome to StyleAura!</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}! 👋</h2>
            <p>Thank you for joining StyleAura - where fashion meets innovation!</p>
            <p>Your account has been successfully created. You can now:</p>
            <ul>
              <li>🛍️ Browse our exclusive collection of 1000+ products</li>
              <li>💳 Enjoy secure checkout with multiple payment options</li>
              <li>📦 Track your orders in real-time</li>
              <li>🎁 Get access to exclusive deals and offers</li>
            </ul>
            <p style="text-align: center;">
              <a href="http://localhost:3000" class="button">Start Shopping Now</a>
            </p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Happy Shopping! 🎉</p>
          </div>
          <div class="footer">
            <p>© 2026 StyleAura. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
    return false;
  }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  const { orderId, products, totalAmount, shippingAddress, paymentMethod } = orderDetails;
  
  const productsList = products.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product.productName || 'Product'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER || 'StyleAura <noreply@styleaura.com>',
    to: userEmail,
    subject: `🎊 Order Confirmed - #${orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 32px; }
          .content { padding: 30px; }
          .order-id { background: #f0f0f0; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; color: #667eea; margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #667eea; color: white; padding: 12px; text-align: left; }
          .total { background: #f8f8f8; font-weight: bold; font-size: 18px; }
          .address-box { background: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; font-weight: bold; }
          .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎊 Order Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Thank you, ${userName}! 🎉</h2>
            <p>Your order has been successfully placed and is being processed.</p>
            
            <div class="order-id">
              Order ID: #${orderId}
            </div>

            <h3>📦 Order Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${productsList}
                <tr class="total">
                  <td colspan="3" style="padding: 15px; text-align: right;">Total Amount:</td>
                  <td style="padding: 15px; text-align: right; color: #667eea;">₹${totalAmount}</td>
                </tr>
              </tbody>
            </table>

            <h3>🚚 Shipping Address:</h3>
            <div class="address-box">
              <strong>${shippingAddress.fullName || userName}</strong><br>
              ${shippingAddress.address}<br>
              ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}<br>
              Phone: ${shippingAddress.phone}
            </div>

            <h3>💳 Payment Method:</h3>
            <p><strong>${paymentMethod || 'Cash on Delivery'}</strong></p>

            <p style="text-align: center;">
              <a href="http://localhost:3000/orders" class="button">Track Your Order</a>
            </p>

            <p><strong>What's Next?</strong></p>
            <ul>
              <li>✅ Your order is being prepared</li>
              <li>📧 You'll receive shipping updates via email</li>
              <li>🚚 Expected delivery: 3-5 business days</li>
              <li>📦 Track your order anytime from your account</li>
            </ul>

            <p>Thank you for shopping with StyleAura! 💜</p>
          </div>
          <div class="footer">
            <p>© 2026 StyleAura. All rights reserved.</p>
            <p>Need help? Contact us at support@styleaura.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error.message);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmationEmail
};
