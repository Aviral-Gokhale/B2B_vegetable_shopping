import { User } from '@supabase/supabase-js';

export type Role = 'admin' | 'manager' | 'staff' | 'user';

export interface Product {
  id: string;
  name: string;
  category_id: string;
  price: number;
  unit: string;
  description: string;
  image_url: string | null;
  in_stock: boolean;
  is_seasonal: boolean;
  seasonal_period: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'processing' | 'delivered' | 'cancelled';
  payment_method: 'cod' | 'razorpay';
  total_amount: number;
  delivery_address: string;
  delivery_date: string;
  created_at: string;
  updated_at: string;
  business_profiles?: {
    business_name: string;
    owner_name: string;
    owner_mobile: string;
  };
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
  products?: {
    name: string;
    unit: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  image: string;
  content: string;
  rating: number;
}

export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  owner_name: string;
  owner_mobile: string;
  manager_mobile: string;
  is_admin: boolean;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete';
  resource: 'products' | 'categories' | 'orders' | 'users' | 'inquiries';
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { action: 'create', resource: 'products' },
    { action: 'read', resource: 'products' },
    { action: 'update', resource: 'products' },
    { action: 'delete', resource: 'products' },
    { action: 'create', resource: 'categories' },
    { action: 'read', resource: 'categories' },
    { action: 'update', resource: 'categories' },
    { action: 'delete', resource: 'categories' },
    { action: 'read', resource: 'orders' },
    { action: 'update', resource: 'orders' },
    { action: 'create', resource: 'users' },
    { action: 'read', resource: 'users' },
    { action: 'update', resource: 'users' },
    { action: 'delete', resource: 'users' },
    { action: 'read', resource: 'inquiries' },
    { action: 'update', resource: 'inquiries' },
  ],
  manager: [
    { action: 'create', resource: 'products' },
    { action: 'read', resource: 'products' },
    { action: 'update', resource: 'products' },
    { action: 'create', resource: 'categories' },
    { action: 'read', resource: 'categories' },
    { action: 'update', resource: 'categories' },
    { action: 'read', resource: 'orders' },
    { action: 'update', resource: 'orders' },
    { action: 'read', resource: 'users' },
    { action: 'read', resource: 'inquiries' },
    { action: 'update', resource: 'inquiries' },
  ],
  staff: [
    { action: 'read', resource: 'products' },
    { action: 'read', resource: 'categories' },
    { action: 'read', resource: 'orders' },
    { action: 'update', resource: 'orders' },
  ],
  user: [
    { action: 'read', resource: 'products' },
    { action: 'read', resource: 'categories' },
  ],
};