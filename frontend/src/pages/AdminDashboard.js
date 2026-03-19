import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { productAPI, categoryAPI, orderAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    productName: '',
    price: '',
    description: '',
    category: '',
    images: [''],
    stock: ''
  });
  const [categoryForm, setCategoryForm] = useState({ categoryName: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
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

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct._id, productForm);
        alert('Product updated successfully!');
      } else {
        await productAPI.create(productForm);
        alert('Product created successfully!');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        productName: '',
        price: '',
        description: '',
        category: '',
        images: [''],
        stock: ''
      });
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      productName: product.productName,
      price: product.price,
      description: product.description,
      category: product.category._id,
      images: product.images,
      stock: product.stock
    });
    setShowProductForm(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryAPI.create(categoryForm);
      alert('Category created successfully!');
      setShowCategoryForm(false);
      setCategoryForm({ categoryName: '' });
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.delete(id);
        alert('Category deleted successfully!');
        fetchCategories();
      } catch (error) {
        alert('Failed to delete category');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      alert('Order status updated!');
      fetchOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'products'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'categories'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === 'orders'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="mb-6">
            <button
              onClick={() => {
                setShowProductForm(!showProductForm);
                setEditingProduct(null);
                setProductForm({
                  productName: '',
                  price: '',
                  description: '',
                  category: '',
                  images: [''],
                  stock: ''
                });
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              {showProductForm ? 'Cancel' : 'Add New Product'}
            </button>
          </div>

          {showProductForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleProductSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      value={productForm.productName}
                      onChange={(e) =>
                        setProductForm({ ...productForm, productName: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, price: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({ ...productForm, category: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock</label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({ ...productForm, stock: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description: e.target.value })
                      }
                      required
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      value={productForm.images[0]}
                      onChange={(e) =>
                        setProductForm({ ...productForm, images: [e.target.value] })
                      }
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                  <p className="text-gray-600 mb-2">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mb-2">Stock: {product.stock}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div>
          <div className="mb-6">
            <button
              onClick={() => setShowCategoryForm(!showCategoryForm)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              {showCategoryForm ? 'Cancel' : 'Add New Category'}
            </button>
          </div>

          {showCategoryForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.categoryName}
                    onChange={(e) =>
                      setCategoryForm({ categoryName: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Create Category
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{category.categoryName}</h3>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    Customer: {order.userId?.name} ({order.userId?.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="border-t pt-4">
                {order.products.map((item) => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span>
                      {item.product?.productName} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total Amount</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
