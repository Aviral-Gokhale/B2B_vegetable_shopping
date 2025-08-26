import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test/utils';
import Cart from '../Cart';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

const mockProduct = {
  id: '1',
  name: 'Tomatoes',
  category_id: '1',
  price: 40,
  unit: 'kg',
  description: 'Fresh tomatoes',
  image_url: null,
  in_stock: true,
  is_seasonal: false,
  seasonal_period: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('Cart', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
    useAuthStore.setState({ user: null, businessProfile: null });
  });

  it('renders empty cart message when no items', () => {
    render(<Cart isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items', () => {
    useCartStore.getState().addItem(mockProduct);
    render(<Cart isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    expect(screen.getByText('₹40/kg')).toBeInTheDocument();
  });

  it('updates quantity', async () => {
    const { user } = render(<Cart isOpen={true} onClose={() => {}} />);
    useCartStore.getState().addItem(mockProduct);
    
    const increaseButton = screen.getByLabelText('Increase quantity');
    await user.click(increaseButton);
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('removes item from cart', async () => {
    const { user } = render(<Cart isOpen={true} onClose={() => {}} />);
    useCartStore.getState().addItem(mockProduct);
    
    const removeButton = screen.getByText('Remove');
    await user.click(removeButton);
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('shows checkout form when proceeding to checkout', async () => {
    const { user } = render(<Cart isOpen={true} onClose={() => {}} />);
    useCartStore.getState().addItem(mockProduct);
    useAuthStore.setState({ 
      user: { id: '1', email: 'test@example.com' },
      businessProfile: {
        id: '1',
        user_id: '1',
        business_name: 'Test Business',
        owner_name: 'Test Owner',
        owner_mobile: '1234567890',
        manager_mobile: '0987654321',
        is_admin: false,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    });
    
    const checkoutButton = screen.getByText('Proceed to Checkout');
    await user.click(checkoutButton);
    
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });
});