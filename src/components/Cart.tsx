import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import CheckoutForm from './CheckoutForm';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const { user } = useAuthStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              {isCheckingOut ? 'Checkout' : 'Shopping Cart'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          {isCheckingOut ? (
            <div className="flex-1 overflow-y-auto">
              <CheckoutForm onClose={onClose} />
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-4 border-b"
                >
                  <img
                    src={item.product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">
                      ₹{item.product.price}/{item.product.unit}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-600 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {!isCheckingOut && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">₹{getTotal()}</span>
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    toast.error('Please sign in to checkout');
                    return;
                  }
                  setIsCheckingOut(true);
                }}
                className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}