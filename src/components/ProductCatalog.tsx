import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

export default function ProductCatalog() {
  const { products, categories, loading, error, fetchProducts, fetchCategories } = useProductStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || 
      categories.find(cat => cat.id === product.category_id)?.name === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading products: {error}</div>
      </div>
    );
  }

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Fresh Products</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto md:overflow-visible">
            <button
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category.name
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.is_seasonal && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm">
                    Seasonal
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="text-green-600 font-semibold">
                    ₹{product.price}/{product.unit}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <button 
                  className={`w-full py-2 rounded-full transition-colors ${
                    product.in_stock
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.in_stock}
                  onClick={() => product.in_stock && addToCart(product)}
                >
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}