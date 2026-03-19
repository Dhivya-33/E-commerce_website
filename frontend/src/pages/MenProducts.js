import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';

const MenProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const categoriesResponse = await categoryAPI.getAll();
      const menCategory = categoriesResponse.data.find(cat => cat.categoryName === 'Men');
      
      if (menCategory) {
        const params = { category: menCategory._id };
        if (search) params.search = search;
        
        const response = await productAPI.getAll(params);
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8 text-center text-white gradient-text bounce-in" style={{ fontFamily: "'Playfair Display', serif" }}>
        👔 Men's Collection
      </h1>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="🔍 Search men's products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 glass-card rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-medium"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="glass-card hover-card overflow-hidden group spotlight fade-in-up"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.productName}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold pulse shadow-lg">
                  🔥 HOT
                </span>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">
                {product.productName}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold gradient-text">₹{product.price}</p>
                  <p className="text-xs text-gray-500 line-through">₹{Math.floor(product.price * 1.5)}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs text-gray-600">(4.8)</span>
                </div>
                <span className="text-xs text-purple-600 font-semibold">
                  🚚 Free Delivery
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 glass-card">
          <p className="text-gray-800 text-2xl font-semibold">😔 No products found</p>
          <p className="text-gray-600 mt-2">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
};

export default MenProducts;
