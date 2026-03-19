import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  order.orderStatus === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : order.orderStatus === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.orderStatus.toUpperCase()}
              </span>
            </div>

            <div className="border-t pt-4">
              {order.products && order.products.map((item) => (
                <div key={item._id} className="flex items-center mb-4">
                  <img
                    src={item.product?.images?.[0] || 'https://via.placeholder.com/100'}
                    alt={item.product?.productName || 'Product'}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold">{item.product?.productName || 'Product'}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-bold text-xl">Total Amount</span>
              <span className="font-bold text-xl text-indigo-600">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
