import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../test/utils';
import ProductCatalog from '../ProductCatalog';
import { useProductStore } from '../../store/productStore';
import { mockSupabase } from '../../test/mocks/supabase';

const mockProducts = [
  {
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
  },
];

const mockCategories = [
  {
    id: '1',
    name: 'Vegetables',
    description: 'Fresh vegetables',
    created_at: new Date().toISOString(),
  },
];

describe('ProductCatalog', () => {
  beforeEach(() => {
    useProductStore.setState({
      products: mockProducts,
      categories: mockCategories,
      loading: false,
      error: null,
    });
  });

  it('renders product catalog', async () => {
    render(<ProductCatalog />);
    
    await waitFor(() => {
      expect(screen.getByText('Our Fresh Products')).toBeInTheDocument();
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('₹40/kg')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    useProductStore.setState({ loading: true });
    render(<ProductCatalog />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state', () => {
    useProductStore.setState({ error: 'Failed to load products' });
    render(<ProductCatalog />);
    
    expect(screen.getByText(/Failed to load products/)).toBeInTheDocument();
  });

  it('filters products by category', async () => {
    const { user } = render(<ProductCatalog />);
    
    await user.click(screen.getByText('Vegetables'));
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
  });

  it('filters products by search', async () => {
    const { user } = render(<ProductCatalog />);
    
    const searchInput = screen.getByPlaceholderText('Search products...');
    await user.type(searchInput, 'Tomatoes');
    
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
  });
});