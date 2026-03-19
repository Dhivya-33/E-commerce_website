const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { readData, writeData, generateId } = require('./db-simple');
const { sendWelcomeEmail, sendOrderConfirmationEmail } = require('./utils/emailService');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key_12345';

app.use(cors());
app.use(express.json());

// Middleware to verify JWT
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check admin
const admin = (req, res, next) => {
  const users = readData('users.json');
  const user = users.find(u => u._id === req.userId);
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = readData('users.json');
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: generateId(),
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    };

    users.push(user);
    writeData('users.json', users);

    // Send welcome email (don't wait for it)
    sendWelcomeEmail(email, name).catch(err => console.error('Email error:', err));

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData('users.json');
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/auth/profile', protect, (req, res) => {
  const users = readData('users.json');
  const user = users.find(u => u._id === req.userId);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Product Routes
app.get('/api/products', (req, res) => {
  const products = readData('products.json');
  const { search, category } = req.query;
  
  let filtered = products;
  if (search) {
    filtered = filtered.filter(p => 
      p.productName.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  
  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const products = readData('products.json');
  const product = products.find(p => p._id === req.params.id);
  if (product) {
    const categories = readData('categories.json');
    const category = categories.find(c => c._id === product.category);
    res.json({ ...product, category });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', protect, admin, (req, res) => {
  const products = readData('products.json');
  const product = {
    _id: generateId(),
    ...req.body,
    createdAt: new Date()
  };
  products.push(product);
  writeData('products.json', products);
  res.status(201).json(product);
});

app.put('/api/products/:id', protect, admin, (req, res) => {
  const products = readData('products.json');
  const index = products.findIndex(p => p._id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeData('products.json', products);
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', protect, admin, (req, res) => {
  const products = readData('products.json');
  const filtered = products.filter(p => p._id !== req.params.id);
  writeData('products.json', filtered);
  res.json({ message: 'Product deleted' });
});

// Category Routes
app.get('/api/categories', (req, res) => {
  const categories = readData('categories.json');
  res.json(categories);
});

app.post('/api/categories', protect, admin, (req, res) => {
  const categories = readData('categories.json');
  const category = {
    _id: generateId(),
    ...req.body,
    createdAt: new Date()
  };
  categories.push(category);
  writeData('categories.json', categories);
  res.status(201).json(category);
});

app.put('/api/categories/:id', protect, admin, (req, res) => {
  const categories = readData('categories.json');
  const index = categories.findIndex(c => c._id === req.params.id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...req.body };
    writeData('categories.json', categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

app.delete('/api/categories/:id', protect, admin, (req, res) => {
  const categories = readData('categories.json');
  const filtered = categories.filter(c => c._id !== req.params.id);
  writeData('categories.json', filtered);
  res.json({ message: 'Category deleted' });
});

// Order Routes
app.post('/api/orders', protect, (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    const productsData = readData('products.json');
    const orders = readData('orders.json');
    
    let totalAmount = 0;
    const orderProducts = [];

    for (let item of products) {
      const product = productsData.find(p => p._id === item.product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.productName}` });
      }

      orderProducts.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;
      product.stock -= item.quantity;
    }

    writeData('products.json', productsData);

    const order = {
      _id: generateId(),
      userId: req.userId,
      products: orderProducts,
      totalAmount,
      shippingAddress,
      orderStatus: 'pending',
      createdAt: new Date()
    };

    orders.push(order);
    writeData('orders.json', orders);
    
    // Get user details for email
    const users = readData('users.json');
    const user = users.find(u => u._id === req.userId);
    
    // Populate product details for email
    const orderWithProducts = {
      orderId: order._id,
      products: orderProducts.map(item => ({
        ...item,
        product: productsData.find(p => p._id === item.product)
      })),
      totalAmount,
      shippingAddress,
      paymentMethod: req.body.paymentMethod || 'Cash on Delivery'
    };
    
    // Send order confirmation email (don't wait for it)
    if (user) {
      sendOrderConfirmationEmail(user.email, user.name, orderWithProducts)
        .catch(err => console.error('Email error:', err));
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/orders/myorders', protect, (req, res) => {
  const orders = readData('orders.json');
  const products = readData('products.json');
  const userOrders = orders
    .filter(o => o.userId === req.userId)
    .map(order => ({
      ...order,
      products: order.products.map(item => ({
        ...item,
        product: products.find(p => p._id === item.product) || {}
      }))
    }));
  res.json(userOrders);
});

app.get('/api/orders', protect, admin, (req, res) => {
  const orders = readData('orders.json');
  const users = readData('users.json');
  const products = readData('products.json');
  
  const allOrders = orders.map(order => ({
    ...order,
    userId: users.find(u => u._id === order.userId) || {},
    products: order.products.map(item => ({
      ...item,
      product: products.find(p => p._id === item.product) || {}
    }))
  }));
  res.json(allOrders);
});

app.put('/api/orders/:id', protect, admin, (req, res) => {
  const orders = readData('orders.json');
  const index = orders.findIndex(o => o._id === req.params.id);
  if (index !== -1) {
    orders[index] = { ...orders[index], orderStatus: req.body.orderStatus };
    writeData('orders.json', orders);
    res.json(orders[index]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running (JSON mode)' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (JSON file storage)`);
});
