# 📧 Email Notification Setup Guide

Your StyleAura app now sends email notifications for:
- ✅ User Registration (Welcome Email)
- ✅ Order Placement (Order Confirmation Email)

## 🔧 Setup Instructions

### Option 1: Using Gmail (Recommended)

1. **Enable 2-Step Verification**
   - Go to your Google Account: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "StyleAura" as the name
   - Click "Generate"
   - Copy the 16-character password

3. **Update .env File**
   - Open `backend/.env`
   - Replace these lines:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```
   - Example:
   ```
   EMAIL_USER=john.doe@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```

4. **Restart Backend Server**
   ```bash
   cd backend
   node server-simple.js
   ```

### Option 2: Using Other Email Services

#### Outlook/Hotmail
```javascript
service: 'hotmail'
```

#### Yahoo
```javascript
service: 'yahoo'
```

#### Custom SMTP
Edit `backend/utils/emailService.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-email-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## 📬 Email Templates

### Welcome Email
- Sent when a new user registers
- Includes welcome message and shopping benefits
- Has a "Start Shopping" button

### Order Confirmation Email
- Sent when an order is placed
- Includes:
  - Order ID
  - Product details with quantities and prices
  - Total amount
  - Shipping address
  - Payment method
  - "Track Your Order" button

## 🧪 Testing

1. **Register a new account** with your real email
2. **Place an order** and check your inbox
3. Check spam folder if emails don't arrive

## ⚠️ Important Notes

- Emails are sent asynchronously (won't block the API response)
- If email fails, the registration/order still succeeds
- Email errors are logged in the console
- For production, use a professional email service like SendGrid, AWS SES, or Mailgun

## 🔒 Security

- Never commit your `.env` file to Git
- Use App Passwords, not your actual Gmail password
- Keep your email credentials secure

## 🎨 Customization

To customize email templates, edit:
- `backend/utils/emailService.js`
- Modify the HTML in `sendWelcomeEmail()` and `sendOrderConfirmationEmail()`

## 📝 Example Email Preview

**Welcome Email:**
```
Subject: 🎉 Welcome to StyleAura!
- Personalized greeting
- Account benefits
- Call-to-action button
```

**Order Confirmation:**
```
Subject: 🎊 Order Confirmed - #ORDER_ID
- Order details table
- Shipping information
- Payment method
- Track order button
```

## 🚀 Production Recommendations

For production deployment, consider:
1. **SendGrid** - Free tier: 100 emails/day
2. **AWS SES** - Very cheap, reliable
3. **Mailgun** - Developer-friendly
4. **Postmark** - High deliverability

These services offer better deliverability and analytics than Gmail.
