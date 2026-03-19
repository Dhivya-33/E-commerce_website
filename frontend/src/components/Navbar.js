import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav 
      className={`glass-card fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-32'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-3xl font-bold gradient-text flex items-center floating">
            <span className="text-4xl mr-1">✨</span>
            <span style={{ fontFamily: "'Playfair Display', serif" }}>StyleAura</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800 text-3xl hover:text-purple-600 transition-colors"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/products?category=Men" className="text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-110">
              👔 Men
            </Link>
            <Link to="/products?category=Women" className="text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-110">
              👗 Women
            </Link>
            <Link to="/products?category=Kids" className="text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-110">
              🧸 Kids
            </Link>

            {user ? (
              <>
                <Link to="/orders" className="text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-110">
                  📦 Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-110">
                    ⚙️ Admin
                  </Link>
                )}
                <Link to="/cart" className="relative text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300 hover:scale-110">
                  🛒 Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center pulse shadow-lg">
                      {cart.length}
                    </span>
                  )}
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-800 font-medium bg-purple-100 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    <span className="text-2xl">👤</span>
                    <span>{user.name}</span>
                    <span className="text-sm">{isProfileOpen ? '▲' : '▼'}</span>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 glass-card rounded-2xl shadow-2xl overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                        <div className="text-4xl mb-2">👤</div>
                        <div className="font-bold text-lg">{user.name}</div>
                        <div className="text-sm opacity-90">{user.email}</div>
                        <div className="mt-2 inline-block bg-white bg-opacity-30 px-3 py-1 rounded-full text-xs font-semibold">
                          {user.role === 'admin' ? '👑 Admin' : '🛍️ Customer'}
                        </div>
                      </div>
                      <div className="p-2 bg-white">
                        <Link
                          to="/orders"
                          className="block px-4 py-3 text-gray-800 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          📦 My Orders
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-3 text-gray-800 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            ⚙️ Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 font-semibold hover:text-purple-600 transition-all duration-300">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="gradient-btn px-6 py-2 rounded-full font-semibold shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 mt-2">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/products?category=Men" 
                className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👔 Men
              </Link>
              <Link 
                to="/products?category=Women" 
                className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👗 Women
              </Link>
              <Link 
                to="/products?category=Kids" 
                className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🧸 Kids
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/orders" 
                    className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📦 Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ⚙️ Admin
                    </Link>
                  )}
                  <Link 
                    to="/cart" 
                    className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🛒 Cart {cart.length > 0 && `(${cart.length})`}
                  </Link>
                  <div className="text-gray-800 font-medium">
                    👋 {user.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="gradient-btn px-6 py-2 rounded-full font-semibold shadow-lg text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-800 font-semibold hover:text-purple-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="gradient-btn px-6 py-2 rounded-full font-semibold shadow-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
