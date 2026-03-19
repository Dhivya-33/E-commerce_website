import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('');

  // Available filter options
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple'];
  const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levi\'s', 'Gap', 'Uniqlo'];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        // Use the category name directly
        setSelectedCategory(categoryParam);
      } else {
        setSelectedCategory('');
      }
    }
  }, [searchParams, categories]);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts();
    }
  }, [selectedCategory, search, categories]);

  useEffect(() => {
    applyFilters();
  }, [products, priceRange, selectedSizes, selectedColors, selectedBrands, sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Size filter (if any selected)
    if (selectedSizes.length > 0) {
      // For demo, we'll show all products if size is selected
      // In real app, products would have size property
    }

    // Color filter (if any selected)
    if (selectedColors.length > 0) {
      // For demo, we'll show all products if color is selected
    }

    // Brand filter (if any selected)
    if (selectedBrands.length > 0) {
      // For demo, we'll show all products if brand is selected
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    setFilteredProducts(filtered);
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSortBy('');
  };

  const fetchProducts = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategory) params.category = selectedCategory;
      
      const response = await productAPI.getAll(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8 text-center text-white gradient-text bounce-in" style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        ✨ {selectedCategory || 'All'} Products
      </h1>

      {/* Search and Sort Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-3 glass-card rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-medium"
          />
        </form>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-6 py-3 glass-card rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 font-medium"
        >
          <option value="">🔄 Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="gradient-btn px-6 py-3 rounded-full font-semibold shadow-lg md:hidden"
        >
          {showFilters ? '✕ Close Filters' : '🎛️ Filters'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
          {/* Price Range Filter */}
          <div className="glass-card p-6 hover-card">
            <h3 className="text-xl font-bold mb-4 gradient-text">💰 Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Size Filter */}
          <div className="glass-card p-6 hover-card">
            <h3 className="text-xl font-bold mb-4 gradient-text">📏 Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                    selectedSizes.includes(size)
                      ? 'gradient-btn text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="glass-card p-6 hover-card">
            <h3 className="text-xl font-bold mb-4 gradient-text">🎨 Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColors.includes(color)
                      ? 'border-purple-600 scale-110'
                      : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase(),
                    boxShadow: selectedColors.includes(color) ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none'
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="glass-card p-6 hover-card">
            <h3 className="text-xl font-bold mb-4 gradient-text">🏷️ Brand</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-5 h-5 rounded"
                  />
                  <span className="text-gray-700 font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full glass-card hover-card py-3 rounded-lg font-semibold text-gray-800"
          >
            🔄 Clear All Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-gray-700 font-medium">
            Showing {filteredProducts.length} products
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="glass-card hover-card overflow-hidden group spotlight"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/500'}
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 glass-card">
              <p className="text-gray-800 text-2xl font-semibold">😔 No products found</p>
              <p className="text-gray-600 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
