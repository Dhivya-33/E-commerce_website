# E-Commerce Web Application

A full-stack e-commerce application similar to AJIO built with React, Node.js, Express, and MongoDB.

## Features

### User Features
- User registration and login with JWT authentication
- Browse products by category (Men, Women, Kids)
- Search products
- View product details
- Add/remove items to/from cart
- Update cart quantities
- Checkout and place orders
- View order history

### Admin Features
- Admin dashboard
- Add, edit, and delete products
- Manage categories
- View all orders
- Update order status
- Manage inventory

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-app
```

2. Install dependencies for both frontend and backend
```bash
npm run install-all
```

3. Configure environment variables
- Edit `backend/.env` file with your MongoDB URI and JWT secret

4. Seed the database with sample data
```bash
cd backend
npm run seed
```

5. Start the application

Option 1: Run both frontend and backend concurrently
```bash
npm run dev
```

Option 2: Run separately
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## Default Credentials

After seeding the database, you can use these credentials:

### Admin Account
- Email: admin@example.com
- Password: admin123

### User Account
- Email: john@example.com
- Password: password123

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)

### Products
- GET `/api/products` - Get all products (with search and category filters)
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category (admin only)
- PUT `/api/categories/:id` - Update category (admin only)
- DELETE `/api/categories/:id` - Delete category (admin only)

### Orders
- POST `/api/orders` - Create order (protected)
- GET `/api/orders/myorders` - Get user orders (protected)
- GET `/api/orders` - Get all orders (admin only)
- PUT `/api/orders/:id` - Update order status (admin only)

## Project Structure

```
ecommerce-app/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   └── Navbar.js
│       ├── context/
│       │   ├── AuthContext.js
│       │   └── CartContext.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── ProductList.js
│       │   ├── ProductDetails.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Cart.js
│       │   ├── Checkout.js
│       │   ├── Orders.js
│       │   └── AdminDashboard.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       ├── index.js
│       └── index.css
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── orderRoutes.js
│   ├── .env
│   ├── server.js
│   └── seedData.js
└── package.json
```

## Usage

1. Start by registering a new account or use the default credentials
2. Browse products on the home page or products page
3. Filter products by category or search
4. Click on a product to view details
5. Add products to cart
6. Proceed to checkout and place order
7. View your order history in the Orders page
8. Admin users can access the Admin Dashboard to manage products, categories, and orders

## License

ISC
