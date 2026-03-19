# Project Structure

## Complete Directory Tree

```
ecommerce-app/
│
├── frontend/                          # React Frontend Application
│   ├── public/
│   │   └── index.html                # HTML template
│   │
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   └── Navbar.js            # Navigation bar component
│   │   │
│   │   ├── context/                  # React Context for state management
│   │   │   ├── AuthContext.js       # Authentication state management
│   │   │   └── CartContext.js       # Shopping cart state management
│   │   │
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.js              # Home page with featured products
│   │   │   ├── ProductList.js       # Product listing with filters
│   │   │   ├── ProductDetails.js    # Individual product details
│   │   │   ├── Login.js             # User login page
│   │   │   ├── Register.js          # User registration page
│   │   │   ├── Cart.js              # Shopping cart page
│   │   │   ├── Checkout.js          # Checkout and order placement
│   │   │   ├── Orders.js            # User order history
│   │   │   └── AdminDashboard.js    # Admin panel for management
│   │   │
│   │   ├── services/                 # API service layer
│   │   │   └── api.js               # Axios API configuration and endpoints
│   │   │
│   │   ├── App.js                    # Main App component with routing
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles
│   │
│   └── package.json                  # Frontend dependencies
│
├── backend/                           # Node.js/Express Backend API
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   │
│   ├── controllers/                  # Request handlers (business logic)
│   │   ├── authController.js        # Authentication logic (register, login)
│   │   ├── productController.js     # Product CRUD operations
│   │   ├── categoryController.js    # Category CRUD operations
│   │   └── orderController.js       # Order management logic
│   │
│   ├── middleware/
│   │   └── auth.js                   # JWT authentication & authorization
│   │
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js                  # User model with password hashing
│   │   ├── Product.js               # Product model
│   │   ├── Category.js              # Category model
│   │   └── Order.js                 # Order model
│   │
│   ├── routes/                       # API route definitions
│   │   ├── authRoutes.js            # /api/auth routes
│   │   ├── productRoutes.js         # /api/products routes
│   │   ├── categoryRoutes.js        # /api/categories routes
│   │   └── orderRoutes.js           # /api/orders routes
│   │
│   ├── .env                          # Environment variables (not in git)
│   ├── server.js                     # Express server entry point
│   ├── seedData.js                   # Database seeding script
│   └── package.json                  # Backend dependencies
│
├── .gitignore                        # Git ignore rules
├── package.json                      # Root package.json for scripts
├── README.md                         # Project documentation
├── INSTALLATION.md                   # Installation guide
└── PROJECT_STRUCTURE.md              # This file

```

## File Descriptions

### Frontend Files

#### Components
- **Navbar.js**: Navigation bar with links, cart counter, and user authentication status

#### Context
- **AuthContext.js**: Manages user authentication state, login, register, and logout functions
- **CartContext.js**: Manages shopping cart state, add/remove items, update quantities

#### Pages
- **Home.js**: Landing page with hero section, categories, and featured products
- **ProductList.js**: Displays all products with search and category filtering
- **ProductDetails.js**: Shows detailed product information with add to cart functionality
- **Login.js**: User login form with authentication
- **Register.js**: New user registration form
- **Cart.js**: Shopping cart with item management and checkout button
- **Checkout.js**: Order placement form with shipping address
- **Orders.js**: User's order history with status tracking
- **AdminDashboard.js**: Admin panel for managing products, categories, and orders

#### Services
- **api.js**: Centralized API configuration with Axios, includes authentication interceptor

### Backend Files

#### Config
- **db.js**: MongoDB connection setup using Mongoose

#### Controllers
- **authController.js**: Handles user registration, login, and profile retrieval
- **productController.js**: CRUD operations for products with search and filtering
- **categoryController.js**: CRUD operations for categories
- **orderController.js**: Order creation, retrieval, and status updates

#### Middleware
- **auth.js**: JWT token verification and role-based authorization (protect, admin)

#### Models
- **User.js**: User schema with password hashing and comparison methods
- **Product.js**: Product schema with category reference
- **Category.js**: Simple category schema
- **Order.js**: Order schema with user and product references

#### Routes
- **authRoutes.js**: Authentication endpoints (register, login, profile)
- **productRoutes.js**: Product endpoints (CRUD with admin protection)
- **categoryRoutes.js**: Category endpoints (CRUD with admin protection)
- **orderRoutes.js**: Order endpoints (create, view, update status)

#### Other
- **server.js**: Express server setup with middleware and route mounting
- **seedData.js**: Script to populate database with sample data

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get user profile (protected)

### Products (`/api/products`)
- `GET /` - Get all products (with optional search and category filters)
- `GET /:id` - Get product by ID
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)

### Categories (`/api/categories`)
- `GET /` - Get all categories
- `POST /` - Create category (admin only)
- `PUT /:id` - Update category (admin only)
- `DELETE /:id` - Delete category (admin only)

### Orders (`/api/orders`)
- `POST /` - Create order (protected)
- `GET /myorders` - Get user's orders (protected)
- `GET /` - Get all orders (admin only)
- `PUT /:id` - Update order status (admin only)

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  timestamps: true
}
```

### Products Collection
```javascript
{
  productName: String,
  price: Number,
  description: String,
  category: ObjectId (ref: Category),
  images: [String],
  stock: Number,
  timestamps: true
}
```

### Categories Collection
```javascript
{
  categoryName: String (unique),
  timestamps: true
}
```

### Orders Collection
```javascript
{
  userId: ObjectId (ref: User),
  products: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  orderStatus: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  timestamps: true
}
```

## Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router 6.20.1** - Client-side routing
- **Axios 1.6.2** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework (via CDN)

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.0.3** - MongoDB ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 2.4.3** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.3.1** - Environment variables

### Development Tools
- **nodemon 3.0.2** - Auto-restart server
- **concurrently 8.2.2** - Run multiple commands
- **react-scripts 5.0.1** - React build tools

## Key Features Implementation

### Authentication Flow
1. User registers/logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Token sent with each API request via Axios interceptor
5. Backend verifies token in protected routes

### Cart Management
1. Cart state managed in CartContext
2. Cart data persisted in localStorage
3. Add/remove/update operations
4. Cart synced across components

### Order Processing
1. User adds items to cart
2. Proceeds to checkout
3. Enters shipping address
4. Backend validates stock availability
5. Creates order and reduces stock
6. Order confirmation sent to user

### Admin Features
1. Role-based access control
2. Product management (CRUD)
3. Category management (CRUD)
4. Order status updates
5. Inventory tracking
