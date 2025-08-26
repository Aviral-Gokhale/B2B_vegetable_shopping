import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../cartStore';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  category_id: '1',
  price: 10,
  unit: 'kg',
  description: 'Test description',
  image_url: null,
  in_stock: true,
  is_seasonal: false,
  seasonal_period: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('should add item to cart', () => {
    useCartStore.getState().addItem(mockProduct);
    const state = useCartStore.getState();
    
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product).toEqual(mockProduct);
    expect(state.items[0].quantity).toBe(1);
  });

  it('should increase quantity for existing item', () => {
    const store = useCartStore.getState();
    store.addItem(mockProduct);
    store.addItem(mockProduct);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const store = useCartStore.getState();
    store.addItem(mockProduct);
    store.removeItem(mockProduct.id);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const store = useCartStore.getState();
    store.addItem(mockProduct);
    store.updateQuantity(mockProduct.id, 5);
    
    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
  });

  it('should calculate total correctly', () => {
    const store = useCartStore.getState();
    store.addItem(mockProduct);
    store.updateQuantity(mockProduct.id, 3);
    
    const total = store.getTotal();
    expect(total).toBe(30); // 3 * $10
  });

  it('should clear cart', () => {
    const store = useCartStore.getState();
    store.addItem(mockProduct);
    store.clearCart();
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });
});