import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { orderAPI } from '../services/api';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, gpay, phonepe, card

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        products: cart.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        shippingAddress: formData,
        paymentMethod: paymentMethod
      };

      const response = await orderAPI.create(orderData);
      clearCart();
      // Navigate to success page with order ID and payment method
      navigate('/order-success', { 
        state: { 
          orderId: response.data._id,
          paymentMethod: paymentMethod
        } 
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodName = () => {
    const methods = {
      cod: 'Cash on Delivery',
      gpay: 'Google Pay',
      phonepe: 'PhonePe',
      card: 'Card',
      upi: 'UPI'
    };
    return methods[paymentMethod] || 'COD';
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-8 text-center text-white gradient-text bounce-in" style={{ fontFamily: "'Playfair Display', serif" }}>
        🛒 Checkout
      </h1>

      {error && (
        <div className="glass-card bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-6 font-semibold">
          ❌ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 hover-card">
          <h2 className="text-3xl font-bold mb-6 gradient-text">📍 Shipping Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Enter your street address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Enter your city"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Enter your state"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Enter zip code"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-800">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Enter your country"
              />
            </div>

            {/* Payment Method Selection */}
            <div className="glass-card p-8 hover-card mb-6">
              <h2 className="text-3xl font-bold mb-6 gradient-text">💳 Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 glass-card hover-card cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">💵</span>
                    <div>
                      <p className="font-bold text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 glass-card hover-card cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="gpay"
                    checked={paymentMethod === 'gpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">📱</span>
                    <div>
                      <p className="font-bold text-gray-800">Google Pay</p>
                      <p className="text-sm text-gray-600">UPI Payment</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 glass-card hover-card cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="phonepe"
                    checked={paymentMethod === 'phonepe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">💜</span>
                    <div>
                      <p className="font-bold text-gray-800">PhonePe</p>
                      <p className="text-sm text-gray-600">UPI Payment</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 glass-card hover-card cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">💳</span>
                    <div>
                      <p className="font-bold text-gray-800">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 glass-card hover-card cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🔗</span>
                    <div>
                      <p className="font-bold text-gray-800">Other UPI</p>
                      <p className="text-sm text-gray-600">Paytm, BHIM, etc.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn liquid-btn magnetic-btn py-4 rounded-full font-bold text-xl shadow-2xl disabled:opacity-50"
            >
              {loading ? '⏳ Placing Order...' : `✓ Place Order (${getPaymentMethodName()})`}
            </button>
          </form>
        </div>

        <div className="glass-card p-8 hover-card">
          <h2 className="text-3xl font-bold mb-6 gradient-text">📋 Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800">{item.productName}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-xl gradient-text">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="pt-4 mt-4 border-t-2 border-purple-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Subtotal</span>
                <span className="font-semibold text-gray-800">₹{getTotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Delivery</span>
                <span className="font-semibold text-green-600">FREE 🚚</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold">
                <span className="text-gray-800">Total</span>
                <span className="gradient-text">₹{getTotal()}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700 text-center font-medium">
                🔒 Secure Payment | ✓ 100% Safe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
