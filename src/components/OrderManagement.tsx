import React from 'react';
import { useOrderStore } from '../store/orderStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Clock, CheckCircle, XCircle, Truck as TruckDelivery, Package } from 'lucide-react';

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  delivered: TruckDelivery,
  cancelled: XCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderManagement() {
  const { orders, loading, error, fetchOrders, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus as any);
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        Error loading orders: {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          return (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="mr-4 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span className={`px-3 py-1 rounded-full flex items-center ${statusColors[order.status]}`}>
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Order Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Total Amount:</span>{' '}
                      ₹{order.total_amount}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Delivery Date:</span>{' '}
                      {new Date(order.delivery_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Delivery Address:</span>{' '}
                      {order.delivery_address}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Customer Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Business Name:</span>{' '}
                      {order.business_profiles?.business_name}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Owner Name:</span>{' '}
                      {order.business_profiles?.owner_name}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Contact:</span>{' '}
                      {order.business_profiles?.owner_mobile}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
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
          );
        })}
      </div>
    </div>
  );
}