# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB**
   - Option A: Install locally from https://www.mongodb.com/try/download/community
   - Option B: Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify installation: `mongod --version`

3. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Step-by-Step Installation

### 1. Clone or Download the Project

```bash
cd ecommerce-app
```

### 2. Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install-all
```

Or install separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Edit the `backend/.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**Important Notes:**
- If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Change `JWT_SECRET` to a strong random string for production
- For local MongoDB, ensure MongoDB service is running

### 4. Start MongoDB (if using local installation)

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

### 5. Seed the Database

Populate the database with sample data (categories, products, and users):

```bash
cd backend
npm run seed
```

This will create:
- 3 Categories (Men, Women, Kids)
- 9 Sample Products
- 2 Users (1 admin, 1 regular user)

### 6. Start the Application

**Option 1: Run both frontend and backend together (Recommended)**

From the root directory:
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### 7. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Test:** http://localhost:5000/api/products

## Default Login Credentials

After seeding the database, use these credentials:

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Access:** Full admin dashboard with product/category/order management

### Regular User Account
- **Email:** john@example.com
- **Password:** password123
- **Access:** Shopping and order features

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**

Solution:
1. Ensure MongoDB is running: `mongod --version`
2. Check connection string in `.env` file
3. For local MongoDB, try: `mongodb://127.0.0.1:27017/ecommerce`

### Port Already in Use

**Error: "Port 5000 is already in use"**

Solution:
1. Change PORT in `backend/.env` to another port (e.g., 5001)
2. Update API_URL in `frontend/src/services/api.js` accordingly

### CORS Issues

If you see CORS errors in the browser console:

Solution:
1. Ensure backend is running on port 5000
2. Check that `cors` is properly configured in `backend/server.js`
3. Clear browser cache and restart both servers

### Dependencies Installation Fails

Solution:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

# Reinstall
npm run install-all
```

## Testing the Application

### 1. Test Backend API

```bash
# Test if backend is running
curl http://localhost:5000

# Test products endpoint
curl http://localhost:5000/api/products

# Test categories endpoint
curl http://localhost:5000/api/categories
```

### 2. Test Frontend

1. Open http://localhost:3000
2. Register a new account or login with default credentials
3. Browse products
4. Add items to cart
5. Complete checkout process
6. View orders

### 3. Test Admin Features

1. Login with admin credentials
2. Navigate to Admin Dashboard
3. Add/Edit/Delete products
4. Manage categories
5. View and update order statuses

## Production Deployment

### Environment Variables for Production

Update `backend/.env`:
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_random_secret_key
PORT=5000
```

### Build Frontend

```bash
cd frontend
npm run build
```

The build folder will contain optimized production files.

### Deploy Backend

1. Deploy to services like Heroku, AWS, DigitalOcean, or Vercel
2. Set environment variables on your hosting platform
3. Ensure MongoDB is accessible from your hosting environment

### Deploy Frontend

1. Deploy build folder to services like Netlify, Vercel, or AWS S3
2. Update API_URL in frontend to point to your production backend

## Additional Commands

```bash
# Start backend only
npm run server

# Start frontend only
npm run client

# Build frontend for production
cd frontend && npm run build

# Seed database
cd backend && npm run seed

# Start backend in production mode
cd backend && npm start
```

## Support

For issues or questions:
1. Check the README.md file
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all dependencies are installed correctly
