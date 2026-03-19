import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Floating Particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      {/* Loading Banner */}
      {loading && (
        <div className="fixed top-20 left-0 right-0 z-40 flex justify-center">
          <div className="glass-card px-6 py-3 flex items-center gap-3 shadow-xl">
            <div className="w-5 h-5 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-semibold">Loading products... (server waking up, please wait 30s) ☕</p>
          </div>
        </div>
      )}

      {/* Hero Section with Animations */}
      <div className="glass-card p-16 mb-12 text-center relative overflow-hidden bounce-in spotlight shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl floating morphing-shape"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl floating morphing-shape" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="text-6xl mb-4 floating">✨</div>
        <h1 className="text-6xl font-bold mb-6 gradient-text neon-flicker" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome to StyleAura
        </h1>
        <p className="text-2xl mb-4 text-gray-700 font-light slide-in-left">
          Where Fashion Meets Innovation 🌟
        </p>
        <p className="text-lg mb-8 text-gray-600 font-medium">
          1000+ Premium Products | Trusted by 10,000+ Customers | Fast Delivery
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/products"
            className="gradient-btn liquid-btn magnetic-btn px-10 py-4 rounded-full text-lg font-semibold inline-block shadow-2xl hover:scale-110 transition-transform"
          >
            🛍️ Shop Now
          </Link>
          <Link
            to="/products"
            className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-semibold inline-block shadow-2xl hover:scale-110 transition-transform border-2 border-purple-600"
          >
            🔥 View Deals
          </Link>
        </div>
      </div>

      {/* Trending Banner */}
      <div className="glass-card p-6 mb-12 text-center rainbow-border shadow-xl">
        <p className="text-2xl font-bold gradient-text animate-pulse">
          🔥 Flash Sale: Up to 70% OFF on Selected Items! Limited Time Only! ⏰
        </p>
      </div>

      {/* Categories Section with 3D Effects */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold mb-10 text-center text-white slide-in-right" style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          🎯 Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category._id}
              to={`/products?category=${category.categoryName}`}
              className="glass-card hover-card p-12 text-center group relative overflow-hidden spotlight flip-card"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flip-card-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="text-6xl mb-4 floating pulse">
                  {category.categoryName === 'Men' && '👔'}
                  {category.categoryName === 'Women' && '👗'}
                  {category.categoryName === 'Kids' && '🧸'}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300 glitch">
                  {category.categoryName}
                </h3>
                <p className="text-gray-600 mt-2 font-medium">Explore Collection →</p>
                <div className="mt-4 text-sm text-purple-600 font-semibold">
                  {index === 0 && '🆕 New Arrivals'}
                  {index === 1 && '⭐ Bestsellers'}
                  {index === 2 && '🎁 Special Offers'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products with Enhanced Effects */}
      <div>
        <h2 className="text-5xl font-bold mb-10 text-center text-white" style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          ⭐ Trending Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="glass-card hover-card overflow-hidden group spotlight zoom-in transform hover:scale-105 transition-all duration-300"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative overflow-hidden image-zoom-container">
                <img
                  src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/500'}
                  alt={product.productName}
                  className="w-full h-80 object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Multiple Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold pulse shadow-lg">
                    🔥 HOT
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {Math.floor(33 + Math.random() * 40)}% OFF
                  </span>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ⭐ BESTSELLER
                  </span>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg shimmer block text-center">
                    ⚡ Only {Math.floor(5 + Math.random() * 15)} Left!
                  </span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors">
                  {product.productName}
                </h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-3xl font-bold gradient-text">
                      ₹{product.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500 line-through">₹{Math.floor(product.price * 1.5)}</p>
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">
                        SAVE ₹{Math.floor(product.price * 0.5)}
                      </span>
                    </div>
                  </div>
                  <span className="text-green-600 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
                    ✓ In Stock
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="text-sm text-gray-600">(4.8)</span>
                  </div>
                  <span className="text-xs text-purple-600 font-semibold">
                    🚚 Free Delivery
                  </span>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
                  🛒 Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <Link
        to="/cart"
        className="fixed bottom-8 right-8 w-16 h-16 gradient-btn rounded-full flex items-center justify-center text-3xl shadow-2xl pulse z-50 magnetic-btn"
        title="View Cart"
      >
        🛒
      </Link>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-transform z-50"
        title="Scroll to Top"
      >
        ⬆️
      </button>

      {/* Trust Badges Section */}
      <div className="mt-16 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center hover-card">
            <div className="text-5xl mb-3">🚚</div>
            <h4 className="font-bold text-gray-800 mb-2">Free Shipping</h4>
            <p className="text-sm text-gray-600">On orders above ₹999</p>
          </div>
          <div className="glass-card p-6 text-center hover-card">
            <div className="text-5xl mb-3">🔒</div>
            <h4 className="font-bold text-gray-800 mb-2">Secure Payment</h4>
            <p className="text-sm text-gray-600">100% Protected</p>
          </div>
          <div className="glass-card p-6 text-center hover-card">
            <div className="text-5xl mb-3">↩️</div>
            <h4 className="font-bold text-gray-800 mb-2">Easy Returns</h4>
            <p className="text-sm text-gray-600">7 Days Return Policy</p>
          </div>
          <div className="glass-card p-6 text-center hover-card">
            <div className="text-5xl mb-3">⭐</div>
            <h4 className="font-bold text-gray-800 mb-2">Top Quality</h4>
            <p className="text-sm text-gray-600">Premium Products</p>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="glass-card p-8 text-center mb-8">
        <h3 className="text-3xl font-bold gradient-text mb-4">Loved by 10,000+ Happy Customers! 💜</h3>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          <div>
            <p className="text-4xl font-bold text-purple-600">10K+</p>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">1000+</p>
            <p className="text-sm text-gray-600">Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">4.8⭐</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-600">24/7</p>
            <p className="text-sm text-gray-600">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
