# Testing Checklist

Complete testing guide to verify all features are working correctly.

## Pre-Testing Setup

- [ ] MongoDB is running
- [ ] Database is seeded with sample data
- [ ] Backend server is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] No console errors in browser or terminal

## Backend API Testing

### Authentication Endpoints

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```
- [ ] Returns user object with token
- [ ] Password is hashed in database
- [ ] User role defaults to 'user'

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```
- [ ] Returns user object with token
- [ ] Token is valid JWT
- [ ] Incorrect password returns 401

#### Get Profile
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
- [ ] Returns user profile
- [ ] Without token returns 401
- [ ] Invalid token returns 401

### Product Endpoints

#### Get All Products
```bash
curl http://localhost:5000/api/products
```
- [ ] Returns array of products
- [ ] Products include category information
- [ ] Images array is populated

#### Get Product by ID
```bash
curl http://localhost:5000/api/products/PRODUCT_ID
```
- [ ] Returns single product
- [ ] Category is populated
- [ ] Invalid ID returns 404

#### Search Products
```bash
curl "http://localhost:5000/api/products?search=shirt"
```
- [ ] Returns filtered products
- [ ] Search is case-insensitive
- [ ] Empty search returns all products

#### Filter by Category
```bash
curl "http://localhost:5000/api/products?category=CATEGORY_ID"
```
- [ ] Returns products in category
- [ ] Invalid category returns empty array

#### Create Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productName":"Test Product","price":999,"description":"Test","category":"CATEGORY_ID","images":["url"],"stock":10}'
```
- [ ] Admin can create product
- [ ] Non-admin returns 403
- [ ] Missing fields returns 500

#### Update Product (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"price":1299}'
```
- [ ] Admin can update product
- [ ] Non-admin returns 403
- [ ] Product is updated in database

#### Delete Product (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```
- [ ] Admin can delete product
- [ ] Non-admin returns 403
- [ ] Product is removed from database

### Category Endpoints

#### Get All Categories
```bash
curl http://localhost:5000/api/categories
```
- [ ] Returns array of categories
- [ ] All seeded categories present

#### Create Category (Admin Only)
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"categoryName":"Electronics"}'
```
- [ ] Admin can create category
- [ ] Non-admin returns 403
- [ ] Duplicate name returns error

### Order Endpoints

#### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"products":[{"product":"PRODUCT_ID","quantity":2}],"shippingAddress":{"street":"123 Main","city":"City","state":"State","zipCode":"12345","country":"Country"}}'
```
- [ ] Order is created
- [ ] Stock is reduced
- [ ] Total amount is calculated
- [ ] Insufficient stock returns error

#### Get User Orders
```bash
curl http://localhost:5000/api/orders/myorders \
  -H "Authorization: Bearer USER_TOKEN"
```
- [ ] Returns user's orders only
- [ ] Products are populated
- [ ] Orders sorted by date

#### Get All Orders (Admin Only)
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer ADMIN_TOKEN"
```
- [ ] Admin sees all orders
- [ ] Non-admin returns 403
- [ ] User information is populated

#### Update Order Status (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"orderStatus":"shipped"}'
```
- [ ] Admin can update status
- [ ] Non-admin returns 403
- [ ] Invalid status returns error

## Frontend Testing

### User Authentication

#### Registration
- [ ] Navigate to /register
- [ ] Fill in name, email, password
- [ ] Submit form
- [ ] Redirected to home page
- [ ] User is logged in
- [ ] Token stored in localStorage
- [ ] Navbar shows user name

#### Login
- [ ] Navigate to /login
- [ ] Enter valid credentials
- [ ] Submit form
- [ ] Redirected to home page
- [ ] User is logged in
- [ ] Invalid credentials show error

#### Logout
- [ ] Click logout button
- [ ] User is logged out
- [ ] Token removed from localStorage
- [ ] Redirected appropriately
- [ ] Navbar shows login/register

### Product Browsing

#### Home Page
- [ ] Hero section displays
- [ ] Categories section shows all categories
- [ ] Featured products display (6 products)
- [ ] Click category navigates to filtered products
- [ ] Click product navigates to details

#### Product List Page
- [ ] All products display
- [ ] Search bar works
- [ ] Category filter works
- [ ] Product cards show image, name, price, stock
- [ ] Click product navigates to details
- [ ] Empty search shows message

#### Product Details Page
- [ ] Product image displays
- [ ] Product name, price, description show
- [ ] Category displays
- [ ] Stock information shows
- [ ] Quantity selector works
- [ ] Add to cart button works
- [ ] Out of stock button is disabled
- [ ] Not logged in redirects to login

### Shopping Cart

#### Add to Cart
- [ ] Product added to cart
- [ ] Cart counter updates in navbar
- [ ] Cart persists in localStorage
- [ ] Duplicate product increases quantity
- [ ] Alert shows confirmation

#### Cart Page
- [ ] All cart items display
- [ ] Product images show
- [ ] Quantity can be updated
- [ ] Remove button works
- [ ] Total calculates correctly
- [ ] Empty cart shows message
- [ ] Proceed to checkout button works

#### Checkout
- [ ] Cart items display in summary
- [ ] Shipping form displays
- [ ] All fields are required
- [ ] Submit creates order
- [ ] Stock is validated
- [ ] Success redirects to orders
- [ ] Cart is cleared
- [ ] Insufficient stock shows error

### Order Management

#### Orders Page
- [ ] User's orders display
- [ ] Order details show correctly
- [ ] Product information displays
- [ ] Order status shows with color
- [ ] Total amount displays
- [ ] Orders sorted by date
- [ ] Empty state shows message

### Admin Dashboard

#### Access Control
- [ ] Admin can access /admin
- [ ] Non-admin redirected to home
- [ ] Not logged in redirected to login

#### Products Tab
- [ ] All products display
- [ ] Add product button works
- [ ] Product form displays
- [ ] Create product works
- [ ] Edit button loads product data
- [ ] Update product works
- [ ] Delete product works (with confirmation)
- [ ] Form validation works

#### Categories Tab
- [ ] All categories display
- [ ] Add category button works
- [ ] Create category works
- [ ] Delete category works (with confirmation)
- [ ] Duplicate name shows error

#### Orders Tab
- [ ] All orders display
- [ ] Customer information shows
- [ ] Order products display
- [ ] Status dropdown works
- [ ] Update status works
- [ ] Orders sorted by date

## UI/UX Testing

### Responsive Design
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] Navigation menu responsive
- [ ] Product grid responsive
- [ ] Forms responsive

### Navigation
- [ ] All navbar links work
- [ ] Back button works
- [ ] Logo navigates to home
- [ ] Protected routes redirect correctly
- [ ] 404 handling (if implemented)

### Visual Feedback
- [ ] Loading states show
- [ ] Error messages display
- [ ] Success messages display
- [ ] Hover effects work
- [ ] Button states (disabled, active)
- [ ] Form validation messages

### Performance
- [ ] Pages load quickly
- [ ] Images load properly
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth transitions

## Security Testing

### Authentication
- [ ] JWT tokens expire correctly
- [ ] Invalid tokens rejected
- [ ] Protected routes require auth
- [ ] Admin routes require admin role
- [ ] Passwords are hashed
- [ ] Tokens not exposed in URLs

### Authorization
- [ ] Users can only see their orders
- [ ] Users cannot access admin routes
- [ ] Users cannot modify other users' data
- [ ] Admin can access all features

### Input Validation
- [ ] SQL injection prevented (MongoDB)
- [ ] XSS attacks prevented
- [ ] CSRF protection (if needed)
- [ ] File upload validation (if implemented)
- [ ] Email format validation
- [ ] Password strength requirements

## Data Integrity

### Database
- [ ] Products have valid categories
- [ ] Orders reference valid users
- [ ] Orders reference valid products
- [ ] Stock updates correctly
- [ ] Timestamps are accurate
- [ ] Unique constraints work

### State Management
- [ ] Cart state persists
- [ ] Auth state persists
- [ ] State updates correctly
- [ ] No stale data
- [ ] Logout clears state

## Error Handling

### Backend Errors
- [ ] 400 Bad Request handled
- [ ] 401 Unauthorized handled
- [ ] 403 Forbidden handled
- [ ] 404 Not Found handled
- [ ] 500 Server Error handled
- [ ] Database errors handled

### Frontend Errors
- [ ] Network errors handled
- [ ] API errors displayed
- [ ] Form errors displayed
- [ ] Loading states handled
- [ ] Empty states handled

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Final Checklist

- [ ] All features work as expected
- [ ] No console errors
- [ ] No broken links
- [ ] All images load
- [ ] Forms validate correctly
- [ ] Authentication works
- [ ] Authorization works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Admin dashboard works
- [ ] Responsive design works
- [ ] Performance is acceptable

## Test Results

Date: _______________
Tester: _______________
Environment: _______________

### Issues Found:
1. 
2. 
3. 

### Notes:


---

**Testing Complete!** ✅
