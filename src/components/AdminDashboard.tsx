import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { usePermissions } from '../hooks/usePermissions';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';
import DeliveryManagement from './DeliveryManagement';
import InquiryManagement from './InquiryManagement';
import UserManagement from './UserManagement';
import { Package, Grid, ShoppingBag, LogOut, Truck, MessageSquare, Users } from 'lucide-react';

type Tab = 'products' | 'categories' | 'orders' | 'deliveries' | 'inquiries' | 'users';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const { signOut, businessProfile } = useAuthStore();
  const { canAccessResource } = usePermissions();

  if (!businessProfile?.role || !['admin', 'manager', 'staff'].includes(businessProfile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Package; resource: Parameters<typeof canAccessResource>[0] }[] = [
    { id: 'products', label: 'Products', icon: Package, resource: 'products' },
    { id: 'categories', label: 'Categories', icon: Grid, resource: 'categories' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, resource: 'orders' },
    { id: 'deliveries', label: 'Deliveries', icon: Truck, resource: 'orders' },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, resource: 'inquiries' },
    { id: 'users', label: 'Users', icon: Users, resource: 'users' },
  ];

  const accessibleTabs = tabs.filter(tab => canAccessResource(tab.resource));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
            <p className="text-sm text-gray-600 mt-2">Role: {businessProfile.role}</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {accessibleTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-50 text-green-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'products' && canAccessResource('products') && <ProductManagement />}
        {activeTab === 'categories' && canAccessResource('categories') && <CategoryManagement />}
        {activeTab === 'orders' && canAccessResource('orders') && <OrderManagement />}
        {activeTab === 'deliveries' && canAccessResource('orders') && <DeliveryManagement />}
        {activeTab === 'inquiries' && canAccessResource('inquiries') && <InquiryManagement />}
        {activeTab === 'users' && canAccessResource('users') && <UserManagement />}
      </div>
    </div>
  );
}