import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="glass-card p-16 zoom-in">
          <div className="text-9xl mb-6 floating">🛒</div>
          <h2 className="text-5xl font-bold mb-6 gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart is Empty
          </h2>
          <p className="text-xl text-gray-700 mb-8">Looks like you haven't added anything yet!</p>
          <Link
            to="/products"
            className="gradient-btn liquid-btn magnetic-btn px-8 py-4 rounded-full text-xl font-semibold shadow-2xl inline-block"
          >
            🛍️ Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8 text-center text-white gradient-text bounce-in" style={{ fontFamily: "'Playfair Display', serif" }}>
        🛒 Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div
              key={item._id}
              className="glass-card hover-card p-6 flex items-center spotlight fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative group">
                <img
                  src={item.images[0]}
                  alt={item.productName}
                  className="w-32 h-32 object-cover rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 rounded-lg transition-opacity"></div>
              </div>
              <div className="flex-1 ml-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.productName}</h3>
                <p className="text-2xl font-bold gradient-text mb-2">₹{item.price}</p>
                <p className="text-sm text-gray-600">Stock: {item.stock} available</p>
              </div>

              <div className="flex flex-col items-end space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                    className="w-10 h-10 gradient-btn rounded-full font-bold text-xl flex items-center justify-center"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2 glass-card rounded-lg text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, Math.min(item.stock, item.quantity + 1))}
                    className="w-10 h-10 gradient-btn rounded-full font-bold text-xl flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors ripple-effect"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card p-8 sticky top-24 gradient-border-animated glow-on-hover">
            <h2 className="text-3xl font-bold mb-6 gradient-text">💳 Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg text-gray-800">
                <span className="font-medium">Subtotal ({cart.length} items)</span>
                <span className="font-semibold">₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-800">
                <span className="font-medium">Shipping</span>
                <span className="font-semibold text-green-600">FREE 🚚</span>
              </div>
              <div className="flex justify-between text-lg text-gray-800">
                <span className="font-medium">Discount</span>
                <span className="font-semibold text-green-600">−₹0</span>
              </div>
              <div className="border-t-2 border-purple-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-bold gradient-text">₹{getTotal()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full gradient-btn liquid-btn magnetic-btn py-4 rounded-full font-bold text-xl shadow-2xl mt-6 ripple-effect"
            >
              ✓ Proceed to Checkout
            </button>
            <div className="mt-6 text-center">
              <Link to="/products" className="text-purple-600 hover:text-purple-800 font-semibold">
                ← Continue Shopping
              </Link>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700 text-center font-medium">
                🔒 Secure Checkout | ✓ Safe Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
