import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, Banknote } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { supabase } from '../lib/supabase';
import { initializeRazorpayPayment } from '../lib/razorpay';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  onClose: () => void;
}

export default function CheckoutForm({ onClose }: CheckoutFormProps) {
  const { user, businessProfile } = useAuthStore();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '09:00',
    paymentMethod: 'cod' as 'cod' | 'razorpay',
  });

  // Get tomorrow's date as the minimum delivery date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !businessProfile) {
      toast.error('Please sign in to place an order');
      return;
    }

    try {
      setLoading(true);

      // Combine date and time for delivery
      const deliveryDateTime = new Date(`${formData.deliveryDate}T${formData.deliveryTime}`);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: formData.paymentMethod === 'cod' ? 'confirmed' : 'pending',
          payment_method: formData.paymentMethod,
          total_amount: getTotal(),
          delivery_address: formData.deliveryAddress,
          delivery_date: deliveryDateTime.toISOString(),
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      if (formData.paymentMethod === 'razorpay') {
        // Initialize RazorPay payment
        try {
          const response = await initializeRazorpayPayment({
            amount: getTotal(),
            orderId: order.id,
            currency: 'INR',
            name: 'AgrilConnect',
            description: `Order #${order.id.slice(0, 8)}`,
            customerEmail: user.email || '',
            customerPhone: businessProfile.owner_mobile,
          });

          // Update order status after successful payment
          const { error: updateError } = await supabase
            .from('orders')
            .update({ status: 'confirmed' })
            .eq('id', order.id);

          if (updateError) throw updateError;

          toast.success('Payment successful! Order confirmed.');
        } catch (error) {
          // If payment fails, update order status to cancelled
          await supabase
            .from('orders')
            .update({ status: 'cancelled' })
            .eq('id', order.id);

          throw new Error('Payment failed. Please try again.');
        }
      } else {
        toast.success('Order placed successfully! You can pay on delivery.');
      }

      clearCart();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between mb-2">
              <span>{item.product.name} × {item.quantity}</span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="w-4 h-4 inline-block mr-1" />
            Delivery Address
          </label>
          <textarea
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your complete delivery address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline-block mr-1" />
            Delivery Date
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
            min={minDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="w-4 h-4 inline-block mr-1" />
            Delivery Time
          </label>
          <input
            type="time"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
            min="09:00"
            max="18:00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">Delivery available between 9 AM and 6 PM</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
              formData.paymentMethod === 'cod'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleChange}
                className="sr-only"
              />
              <Banknote className={`w-5 h-5 ${
                formData.paymentMethod === 'cod' ? 'text-green-500' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-gray-500">Pay when you receive</p>
              </div>
            </label>

            <label className={`flex items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
              formData.paymentMethod === 'razorpay'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={formData.paymentMethod === 'razorpay'}
                onChange={handleChange}
                className="sr-only"
              />
              <CreditCard className={`w-5 h-5 ${
                formData.paymentMethod === 'razorpay' ? 'text-green-500' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-medium">Online Payment</p>
                <p className="text-sm text-gray-500">Pay with Razorpay</p>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : formData.paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
}