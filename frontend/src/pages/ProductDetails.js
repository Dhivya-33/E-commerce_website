import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/Toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchSimilarProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setSimilarProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setToastMessage(`🎉 ${product.productName} added to cart!`);
    setToastType('success');
    setShowToast(true);
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 floating">⏳</div>
        <p className="text-white text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span className="hover:text-purple-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-purple-600 cursor-pointer">{product.category?.categoryName}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{product.productName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="glass-card p-4 hover-card spotlight">
              <img
                src={product.images[selectedImage]}
                alt={product.productName}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`glass-card p-2 cursor-pointer hover-card ${
                    selectedImage === index ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.productName} ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.productName}
              </h1>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded">
                  <span className="font-bold">4.8</span>
                  <span>⭐</span>
                </div>
                <span className="text-gray-600">2,543 ratings & 412 reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-5xl font-bold gradient-text">₹{product.price}</span>
                <span className="text-2xl text-gray-500 line-through">₹{Math.floor(product.price * 1.5)}</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded text-lg font-bold">
                  {Math.floor(((product.price * 1.5 - product.price) / (product.price * 1.5)) * 100)}% OFF
                </span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Offers */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">🎁 Available Offers</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <p className="text-sm text-gray-700">Bank Offer: 10% instant discount on HDFC Bank Credit Cards</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <p className="text-sm text-gray-700">Special Price: Get extra 5% off (price inclusive of discount)</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">•</span>
                  <p className="text-sm text-gray-700">No Cost EMI: Avail No Cost EMI on select cards</p>
                </div>
              </div>
            </div>

            {/* Size Selection (if applicable) */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Select Size</h3>
              <div className="flex space-x-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    className="w-14 h-14 glass-card hover-card rounded-lg font-semibold text-gray-800 hover:ring-2 hover:ring-purple-500"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">📍 Delivery Options</h3>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="gradient-btn px-6 py-2 rounded-lg font-semibold">Check</button>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>🚚 Free Delivery</p>
                <p>⚡ Get it by Tomorrow</p>
                <p>↩️ 7 Days Return & Exchange</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex space-x-4">
              <div className="flex items-center space-x-3 glass-card px-4 py-2 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 gradient-btn rounded-full font-bold"
                >
                  −
                </button>
                <span className="text-xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 gradient-btn rounded-full font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 gradient-btn liquid-btn py-4 rounded-lg font-bold text-xl shadow-2xl disabled:opacity-50"
              >
                🛒 ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="glass-card p-6 mb-12">
          <div className="flex space-x-6 border-b border-gray-200 mb-6">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Premium quality fabric</li>
                <li>Comfortable fit for all-day wear</li>
                <li>Easy to wash and maintain</li>
                <li>Available in multiple sizes</li>
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">Brand</span>
                  <span className="text-gray-600">StyleAura</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">Category</span>
                  <span className="text-gray-600">{product.category?.categoryName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">Material</span>
                  <span className="text-gray-600">Cotton Blend</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-700">Color</span>
                  <span className="text-gray-600">Multiple</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
              {[1, 2, 3].map(review => (
                <div key={review} className="glass-card p-4 hover-card">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">User {review}</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                        <span className="text-sm text-gray-600">5.0</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">Great product! Excellent quality and fast delivery. Highly recommended!</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Products */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
            Similar Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map(item => (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className="glass-card hover-card overflow-hidden cursor-pointer spotlight"
              >
                <img
                  src={item.images[0]}
                  alt={item.productName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.productName}</h3>
                  <p className="text-xl font-bold gradient-text">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
