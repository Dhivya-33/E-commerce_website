const fs = require('fs');
const path = require('path');

// Product name templates
const menProducts = [
  'Casual Shirt', 'Formal Shirt', 'T-Shirt', 'Polo Shirt', 'Denim Jacket',
  'Leather Jacket', 'Blazer', 'Jeans', 'Chinos', 'Cargo Pants',
  'Shorts', 'Track Pants', 'Hoodie', 'Sweatshirt', 'Sweater',
  'Cardigan', 'Suit', 'Waistcoat', 'Kurta', 'Sherwani'
];

const womenProducts = [
  'Kurti', 'Saree', 'Lehenga', 'Salwar Suit', 'Palazzo',
  'Dress', 'Top', 'Blouse', 'Skirt', 'Jeans',
  'Leggings', 'Jumpsuit', 'Gown', 'Anarkali', 'Shrug',
  'Cardigan', 'Jacket', 'Coat', 'Dupatta', 'Stole'
];

const kidsProducts = [
  'T-Shirt', 'Shirt', 'Dress', 'Frock', 'Shorts',
  'Jeans', 'Track Pants', 'Hoodie', 'Jacket', 'Sweater',
  'Romper', 'Jumpsuit', 'Dungarees', 'Skirt', 'Top',
  'Kurta', 'Ethnic Wear', 'Party Wear', 'Casual Wear', 'School Uniform'
];

const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Orange', 'Grey', 'Brown', 'Navy', 'Maroon', 'Beige', 'Cream'];
const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levi\'s', 'Gap', 'Uniqlo', 'Forever 21', 'Mango', 'Benetton', 'Allen Solly', 'Peter England', 'Van Heusen', 'Raymond'];
const styles = ['Casual', 'Formal', 'Party', 'Ethnic', 'Western', 'Sports', 'Vintage', 'Modern', 'Classic', 'Trendy'];

// Image URLs from Unsplash
const menImages = [
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
  'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'
];

const womenImages = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
  'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500',
  'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=500',
  'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500'
];

const kidsImages = [
  'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
  'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
  'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500',
  'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=500',
  'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500'
];

function generateProducts(count = 1000) {
  const products = [];
  const categories = ['Men', 'Women', 'Kids'];
  
  for (let i = 1; i <= count; i++) {
    const categoryIndex = i % 3;
    const category = categories[categoryIndex];
    
    let productNames, images;
    if (category === 'Men') {
      productNames = menProducts;
      images = menImages;
    } else if (category === 'Women') {
      productNames = womenProducts;
      images = womenImages;
    } else {
      productNames = kidsProducts;
      images = kidsImages;
    }
    
    const productName = productNames[Math.floor(Math.random() * productNames.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const image = images[Math.floor(Math.random() * images.length)];
    
    const basePrice = Math.floor(Math.random() * 4000) + 500; // 500-4500
    const price = Math.floor(basePrice / 10) * 10; // Round to nearest 10
    
    const product = {
      _id: `prod${i.toString().padStart(4, '0')}`,
      productName: `${brand} ${color} ${style} ${productName}`,
      price: price,
      description: `Premium quality ${style.toLowerCase()} ${productName.toLowerCase()} in ${color.toLowerCase()} color. Perfect for ${category.toLowerCase()}'s fashion. Made with high-quality materials for comfort and durability. ${brand} brings you the latest trends in fashion.`,
      category: category,
      images: [image],
      stock: Math.floor(Math.random() * 100) + 10
    };
    
    products.push(product);
  }
  
  return products;
}

// Generate 1000 products
console.log('Generating 1000 products...');
const products = generateProducts(1000);

// Save to JSON file
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

fs.writeFileSync(
  path.join(dataDir, 'products.json'),
  JSON.stringify(products, null, 2)
);

console.log(`✅ Successfully generated ${products.length} products!`);
console.log('📁 Saved to: backend/data/products.json');
console.log('\nProduct distribution:');
console.log(`👔 Men: ${products.filter(p => p.category === 'Men').length}`);
console.log(`👗 Women: ${products.filter(p => p.category === 'Women').length}`);
console.log(`🧸 Kids: ${products.filter(p => p.category === 'Kids').length}`);
