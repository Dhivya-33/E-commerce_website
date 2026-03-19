# Quick Start Guide

Get your e-commerce application running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js (should be v14+)
node --version

# Check npm
npm --version

# Check MongoDB (if using local)
mongod --version
```

## Installation (3 Steps)

### Step 1: Install Dependencies

```bash
npm run install-all
```

### Step 2: Configure Environment

The default `.env` file is already configured for local development:
- MongoDB: `mongodb://localhost:27017/ecommerce`
- Port: `5000`
- JWT Secret: Pre-configured (change for production!)

### Step 3: Seed Database

```bash
cd backend
npm run seed
cd ..
```

## Run the Application

```bash
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- Frontend on http://localhost:3000

## Test the Application

### 1. Open Browser
Navigate to: http://localhost:3000

### 2. Login as Admin
- Email: `admin@example.com`
- Password: `admin123`

### 3. Test Features
- Browse products on home page
- Search and filter products
- Add items to cart
- Complete checkout
- View orders
- Access admin dashboard (admin only)

## Default Accounts

### Admin Account
```
Email: admin@example.com
Password: admin123
Features: Full access to admin dashboard
```

### User Account
```
Email: john@example.com
Password: password123
Features: Shopping and order management
```

## Common Issues

### MongoDB Not Running
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Port 5000 Already in Use
Edit `backend/.env`:
```
PORT=5001
```

Then update `frontend/src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### Dependencies Installation Failed
```bash
npm cache clean --force
npm run install-all
```

## What's Included

### Sample Data
- 3 Categories: Men, Women, Kids
- 9 Products with images
- 2 User accounts (1 admin, 1 user)

### Features
- User authentication (JWT)
- Product browsing and search
- Shopping cart
- Order management
- Admin dashboard
- Category filtering
- Responsive design

## Next Steps

1. Explore the admin dashboard
2. Add new products
3. Create new categories
4. Test the checkout flow
5. View order history

## API Testing

Test backend endpoints:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get all categories
curl http://localhost:5000/api/categories

# Test API health
curl http://localhost:5000
```

## Project Structure

```
ecommerce-app/
├── frontend/          # React application
├── backend/           # Express API
├── package.json       # Root scripts
└── README.md          # Full documentation
```

## Available Scripts

```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Seed database
cd backend && npm run seed
```

## Support

For detailed documentation, see:
- `README.md` - Complete project documentation
- `INSTALLATION.md` - Detailed installation guide
- `PROJECT_STRUCTURE.md` - Architecture details

## Production Deployment

See `INSTALLATION.md` for production deployment instructions.

---

**Congratulations!** Your e-commerce application is now running. Happy coding! 🚀
