import React, { useState, useEffect } from 'react';
import { useOrderStore } from '../store/orderStore';
import { MapPin, Calendar, Clock, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DeliveryManagement() {
  const { orders, loading, error, fetchOrders, updateOrderStatus } = useOrderStore();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const deliveryOrders = orders.filter(
    (order) =>
      order.status === 'confirmed' &&
      new Date(order.delivery_date).toISOString().split('T')[0] === selectedDate
  );

  const handleStatusUpdate = async (orderId: string, status: 'processing' | 'delivered') => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success(`Order marked as ${status}`);
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
      <h2 className="text-2xl font-bold mb-6">Delivery Management</h2>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Pending Deliveries</p>
            <p className="text-2xl font-bold text-blue-600">
              {deliveryOrders.filter((o) => o.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">
              {deliveryOrders.filter((o) => o.status === 'processing').length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Completed Today</p>
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(
                (o) =>
                  o.status === 'delivered' &&
                  new Date(o.updated_at).toISOString().split('T')[0] === selectedDate
              ).length}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {deliveryOrders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">No Deliveries Scheduled</h3>
            <p className="text-gray-500 mt-2">There are no deliveries scheduled for this date.</p>
          </div>
        ) : (
          deliveryOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.delivery_date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {order.status === 'confirmed' ? (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'processing')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Delivery
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusUpdate(order.id, 'delivered')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Delivery Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <p className="text-sm">{order.delivery_address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <p className="text-sm">
                        Expected by: {new Date(order.delivery_date).toLocaleTimeString()}
                      </p>
                    </div>
                    {new Date(order.delivery_date) < new Date() && order.status !== 'delivered' && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        <p className="text-sm">Delivery is overdue!</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Customer Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-500">Business:</span>{' '}
                      {order.business_profiles?.business_name}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Contact:</span>{' '}
                      {order.business_profiles?.owner_mobile}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-500">Total Amount:</span>{' '}
                      ₹{order.total_amount}
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
          ))
        )}
      </div>
    </div>
  );
}