import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  useEffect(() => {
    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Floating Particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <div className="glass-card p-12 max-w-2xl w-full text-center bounce-in spotlight">
        {/* Success Icon */}
        <div className="mb-8 floating">
          <div className="inline-block relative">
            <div className="text-9xl pulse">✓</div>
            <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-50 animate-ping"></div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-7xl font-bold mb-6 gradient-text neon-flicker" style={{ fontFamily: "'Playfair Display', serif" }}>
          Order Placed Successfully! 🎉
        </h1>

        <p className="text-3xl text-gray-700 mb-8 font-light">
          Thank you for shopping with StyleAura
        </p>

        {/* Order Details Card */}
        <div className="glass-card p-6 mb-8 rainbow-border">
          <p className="text-xl text-gray-800 mb-2">
            <span className="font-semibold">Order ID:</span>
          </p>
          <p className="text-2xl font-bold gradient-text font-mono">
            {orderId}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 hover-card">
            <div className="text-4xl mb-2">📧</div>
            <p className="text-sm text-gray-700 font-medium">Confirmation email sent</p>
          </div>
          <div className="glass-card p-4 hover-card">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-sm text-gray-700 font-medium">Track your order</p>
          </div>
          <div className="glass-card p-4 hover-card">
            <div className="text-4xl mb-2">🚚</div>
            <p className="text-sm text-gray-700 font-medium">Free delivery</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="gradient-btn liquid-btn magnetic-btn px-8 py-4 rounded-full text-xl font-semibold shadow-2xl inline-block"
          >
            📋 View My Orders
          </Link>
          <Link
            to="/"
            className="glass-card hover-card px-8 py-4 rounded-full text-xl font-semibold text-gray-800 inline-block"
          >
            🏠 Back to Home
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 text-6xl space-x-4 floating">
          <span>🎊</span>
          <span style={{animationDelay: '0.5s'}} className="floating">🎉</span>
          <span style={{animationDelay: '1s'}} className="floating">🎁</span>
          <span style={{animationDelay: '1.5s'}} className="floating">✨</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
