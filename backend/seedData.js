const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });

    const menCategory = await Category.create({ categoryName: 'Men' });
    const womenCategory = await Category.create({ categoryName: 'Women' });
    const kidsCategory = await Category.create({ categoryName: 'Kids' });

    const products = [
      {
        productName: 'Men Casual Shirt',
        price: 1299,
        description: 'Comfortable cotton casual shirt for men',
        category: menCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Men+Shirt'],
        stock: 50
      },
      {
        productName: 'Men Formal Trousers',
        price: 1899,
        description: 'Premium formal trousers for office wear',
        category: menCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Men+Trousers'],
        stock: 40
      },
      {
        productName: 'Men Denim Jeans',
        price: 2499,
        description: 'Stylish slim fit denim jeans',
        category: menCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Men+Jeans'],
        stock: 60
      },
      {
        productName: 'Women Ethnic Kurti',
        price: 1599,
        description: 'Beautiful ethnic kurti with embroidery',
        category: womenCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Women+Kurti'],
        stock: 45
      },
      {
        productName: 'Women Western Dress',
        price: 2299,
        description: 'Elegant western dress for parties',
        category: womenCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Women+Dress'],
        stock: 35
      },
      {
        productName: 'Women Palazzo Pants',
        price: 999,
        description: 'Comfortable palazzo pants for casual wear',
        category: womenCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Women+Palazzo'],
        stock: 55
      },
      {
        productName: 'Kids T-Shirt',
        price: 499,
        description: 'Colorful cotton t-shirt for kids',
        category: kidsCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Kids+Tshirt'],
        stock: 70
      },
      {
        productName: 'Kids Shorts',
        price: 599,
        description: 'Comfortable shorts for active kids',
        category: kidsCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Kids+Shorts'],
        stock: 65
      },
      {
        productName: 'Kids Dress',
        price: 1199,
        description: 'Cute dress for little girls',
        category: kidsCategory._id,
        images: ['https://via.placeholder.com/400x500?text=Kids+Dress'],
        stock: 40
      }
    ];

    await Product.insertMany(products);

    console.log('Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
