const bcrypt = require('bcryptjs');
const { readData, writeData, generateId } = require('./db-simple');

async function seedData() {
  console.log('Seeding data...');

  // Create categories
  const menCat = { _id: generateId(), categoryName: 'Men', createdAt: new Date() };
  const womenCat = { _id: generateId(), categoryName: 'Women', createdAt: new Date() };
  const kidsCat = { _id: generateId(), categoryName: 'Kids', createdAt: new Date() };
  
  writeData('categories.json', [menCat, womenCat, kidsCat]);
  console.log('✓ Categories created');

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    {
      _id: generateId(),
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date()
    },
    {
      _id: generateId(),
      name: 'John Doe',
      email: 'john@example.com',
      password: userPassword,
      role: 'user',
      createdAt: new Date()
    }
  ];
  
  writeData('users.json', users);
  console.log('✓ Users created');

  // Create products
  const products = [
    {
      _id: generateId(),
      productName: 'Men Casual Shirt',
      price: 1299,
      description: 'Comfortable cotton casual shirt for men',
      category: menCat._id,
      images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop'],
      stock: 50,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Men Formal Trousers',
      price: 1899,
      description: 'Premium formal trousers for office wear',
      category: menCat._id,
      images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop'],
      stock: 40,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Men Denim Jeans',
      price: 2499,
      description: 'Stylish slim fit denim jeans',
      category: menCat._id,
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop'],
      stock: 60,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Women Ethnic Kurti',
      price: 1599,
      description: 'Beautiful ethnic kurti with embroidery',
      category: womenCat._id,
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop'],
      stock: 45,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Women Western Dress',
      price: 2299,
      description: 'Elegant western dress for parties',
      category: womenCat._id,
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop'],
      stock: 35,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Women Palazzo Pants',
      price: 999,
      description: 'Comfortable palazzo pants for casual wear',
      category: womenCat._id,
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop'],
      stock: 55,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Kids T-Shirt',
      price: 499,
      description: 'Colorful cotton t-shirt for kids',
      category: kidsCat._id,
      images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop'],
      stock: 70,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Kids Shorts',
      price: 599,
      description: 'Comfortable shorts for active kids',
      category: kidsCat._id,
      images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop'],
      stock: 65,
      createdAt: new Date()
    },
    {
      _id: generateId(),
      productName: 'Kids Dress',
      price: 1199,
      description: 'Cute dress for little girls',
      category: kidsCat._id,
      images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop'],
      stock: 40,
      createdAt: new Date()
    }
  ];
  
  writeData('products.json', products);
  console.log('✓ Products created');

  writeData('orders.json', []);
  console.log('✓ Orders initialized');

  console.log('\n✅ Data seeded successfully!');
  console.log('\nDefault credentials:');
  console.log('Admin: admin@example.com / admin123');
  console.log('User: john@example.com / password123');
}

seedData();
