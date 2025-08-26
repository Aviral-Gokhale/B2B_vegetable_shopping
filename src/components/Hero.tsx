import React from 'react';
import { Truck, Clock, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-20">
      <div className="relative bg-gradient-to-r from-green-50 to-green-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fresh Produce Delivered to Your Business
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Premium quality vegetables sourced directly from farmers to your food establishment. 
                Reliable, fresh, and hassle-free delivery service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
                  Start Ordering
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full hover:bg-green-50 transition-colors">
                  Request Bulk Order
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Fresh vegetables"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Truck className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-gray-600">Order before 6 PM for next morning delivery</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Choose your preferred delivery time slots</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">100% satisfaction or money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}