import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;

      set({ products: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      set({ categories: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },
}));