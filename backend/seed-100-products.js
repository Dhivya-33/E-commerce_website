const bcrypt = require('bcryptjs');
const { readData, writeData, generateId } = require('./db-simple');

const menProducts = [
  'Casual Shirt', 'Formal Shirt', 'T-Shirt', 'Polo Shirt', 'Denim Jeans', 'Formal Trousers',
  'Cargo Pants', 'Shorts', 'Track Pants', 'Blazer', 'Jacket', 'Hoodie', 'Sweater',
  'Kurta', 'Sherwani', 'Waistcoat', 'Suit', 'Leather Jacket', 'Bomber Jacket',
  'Chinos', 'Joggers', 'Sweatshirt', 'Tank Top', 'Sports Jersey', 'Ethnic Wear',
  'Winter Jacket', 'Raincoat', 'Windcheater', 'Cardigan', 'Pullover', 'Henley Shirt',
  'Linen Shirt', 'Flannel Shirt'
];

const womenProducts = [
  'Kurti', 'Saree', 'Lehenga', 'Salwar Suit', 'Western Dress', 'Palazzo Pants',
  'Jeans', 'Jeggings', 'Skirt', 'Top', 'Blouse', 'Shirt', 'T-Shirt', 'Crop Top',
  'Jumpsuit', 'Romper', 'Gown', 'Anarkali', 'Churidar', 'Dupatta', 'Shawl',
  'Cardigan', 'Sweater', 'Jacket', 'Blazer', 'Coat', 'Ethnic Jacket', 'Cape',
  'Shorts', 'Capris', 'Trousers', 'Formal Pants', 'Track Pants'
];

const kidsProducts = [
  'T-Shirt', 'Shirt', 'Jeans', 'Shorts', 'Dress', 'Frock', 'Skirt', 'Top',
  'Dungarees', 'Romper', 'Jumpsuit', 'Ethnic Wear', 'Kurta', 'Lehenga',
  'Track Suit', 'Hoodie', 'Jacket', 'Sweater', 'Cardigan', 'Pajama Set',
  'Nightwear', 'Party Wear', 'Casual Wear', 'Formal Wear', 'Sports Wear',
  'Winter Wear', 'Summer Dress', 'Cotton Shirt', 'Denim Jacket', 'Raincoat',
  'Sweatshirt', 'Polo Shirt', 'Cargo Pants'
];

const descriptions = [
  'Premium quality fabric with comfortable fit',
  'Stylish design perfect for any occasion',
  'Trendy and fashionable wear',
  'Comfortable and durable material',
  'Perfect for casual outings',
  'Elegant design with modern touch',
  'High-quality stitching and finish',
  'Breathable fabric for all-day comfort',
  'Classic style that never goes out of fashion',
  'Contemporary design with traditional touch'
];

const menImageUrls = [
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=400&h=500&fit=crop'
];

const womenImageUrls = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=400&h=500&fit=crop'
];

const kidsImageUrls = [
  'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=500&fit=crop'
];

async function seedData() {
  console.log('Seeding 100 products...');

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

  // Create 100 products
  const products = [];
  let productCount = 0;

  // Men's products (34 products)
  for (let i = 0; i < menProducts.length && productCount < 34; i++) {
    products.push({
      _id: generateId(),
      productName: `Men ${menProducts[i]}`,
      price: Math.floor(Math.random() * (3999 - 499 + 1)) + 499,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      category: menCat._id,
      images: [menImageUrls[i % menImageUrls.length]],
      stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      createdAt: new Date()
    });
    productCount++;
  }

  // Women's products (33 products)
  for (let i = 0; i < womenProducts.length && productCount < 67; i++) {
    products.push({
      _id: generateId(),
      productName: `Women ${womenProducts[i]}`,
      price: Math.floor(Math.random() * (4999 - 599 + 1)) + 599,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      category: womenCat._id,
      images: [womenImageUrls[i % womenImageUrls.length]],
      stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      createdAt: new Date()
    });
    productCount++;
  }

  // Kids' products (33 products)
  for (let i = 0; i < kidsProducts.length && productCount < 100; i++) {
    products.push({
      _id: generateId(),
      productName: `Kids ${kidsProducts[i]}`,
      price: Math.floor(Math.random() * (2499 - 299 + 1)) + 299,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      category: kidsCat._id,
      images: [kidsImageUrls[i % kidsImageUrls.length]],
      stock: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
      createdAt: new Date()
    });
    productCount++;
  }
  
  writeData('products.json', products);
  console.log(`✓ ${products.length} Products created`);

  writeData('orders.json', []);
  console.log('✓ Orders initialized');

  console.log('\n✅ Data seeded successfully!');
  console.log(`\nTotal Products: ${products.length}`);
  console.log('- Men: 34 products');
  console.log('- Women: 33 products');
  console.log('- Kids: 33 products');
  console.log('\nDefault credentials:');
  console.log('Admin: admin@example.com / admin123');
  console.log('User: john@example.com / password123');
}

seedData();
