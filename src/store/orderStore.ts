import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          business_profiles (
            business_name,
            owner_name,
            owner_mobile
          ),
          order_items (
            *,
            products (
              name,
              unit
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ orders: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      });
    }
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      // Refresh orders after update
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      set({ orders: data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      });
    }
  },
}));