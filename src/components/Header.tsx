import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import AuthModal from './AuthModal';
import Cart from './Cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const { items } = useCartStore();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-green-600">AgrilConnect</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-gray-600 hover:text-green-600">Products</a>
            <a href="#about" className="text-gray-600 hover:text-green-600">About Us</a>
            <a href="#contact" className="text-gray-600 hover:text-green-600">Contact</a>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
              Start Ordering
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-green-600" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
              >
                <User className="w-6 h-6" />
                {user && <span className="text-sm">{user.email}</span>}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <a href="#products" className="block py-2 text-gray-600">Products</a>
            <a href="#about" className="block py-2 text-gray-600">About Us</a>
            <a href="#contact" className="block py-2 text-gray-600">Contact</a>
            <button className="w-full mt-4 bg-green-600 text-white px-6 py-2 rounded-full">
              Start Ordering
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full mt-2 flex items-center justify-center space-x-2 py-2 text-gray-600"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({items.length})</span>
            </button>
            <button
              onClick={handleAuthClick}
              className="w-full mt-2 flex items-center justify-center space-x-2 py-2 text-gray-600"
            >
              <User className="w-5 h-5" />
              <span>{user ? 'Sign Out' : 'Sign In'}</span>
            </button>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
}