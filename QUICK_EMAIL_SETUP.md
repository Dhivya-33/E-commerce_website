# ⚡ Quick Email Setup (2 Minutes)

## Step 1: Get Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Gmail account
3. Click "Generate" and copy the 16-character password

## Step 2: Update Configuration
Open `backend/.env` and replace:
```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

## Step 3: Restart Backend
The backend is already running with email support!

## ✅ That's It!

Now when users:
- **Register** → They get a welcome email 🎉
- **Place an order** → They get order confirmation email 📦

## 🧪 Test It
1. Register with your real email
2. Check your inbox for welcome email
3. Place an order and check for confirmation email

**Note:** If you don't set up email, the app still works perfectly - emails just won't be sent.
