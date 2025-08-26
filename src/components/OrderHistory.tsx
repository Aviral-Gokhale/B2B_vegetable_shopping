import React, { useEffect } from 'react';
import { useOrderStore } from '../store/orderStore';
import { Clock, CheckCircle, XCircle, Truck, Package, CreditCard, Banknote } from 'lucide-react';

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  delivered: Truck,
  cancelled: XCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentMethodIcons = {
  cod: Banknote,
  razorpay: CreditCard,
};

export default function OrderHistory() {
  const { orders, loading, error, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        Error loading orders: {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">No Orders Yet</h3>
        <p className="text-gray-500 mt-2">Start shopping to create your first order!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const PaymentIcon = paymentMethodIcons[order.payment_method];
          return (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full flex items-center ${statusColors[order.status]}`}>
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 flex items-center">
                    <PaymentIcon className="w-4 h-4 mr-2" />
                    {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Order Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">
                        <span className="text-gray-500">Total Amount:</span>{' '}
                        ₹{order.total_amount}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Delivery Date:</span>{' '}
                        {new Date(order.delivery_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="text-gray-500">Delivery Address:</span>{' '}
                        {order.delivery_address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Order Items</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {order.order_items?.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">
                              {item.products?.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({item.quantity} {item.products?.unit})
                            </span>
                          </div>
                          <span className="text-sm">
                            ₹{item.total_price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}