import React from 'react';
import { Leaf, Users, TrendingUp, Truck } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose AgrilConnect?</h2>
          <p className="text-lg text-gray-600">
            We bridge the gap between local farmers and food businesses, ensuring you get the freshest produce while supporting sustainable agriculture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Farm-Fresh Quality</h3>
                <p className="text-gray-600">
                  Direct partnerships with local farmers ensure you receive the freshest, highest-quality produce every time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                <p className="text-gray-600">
                  Our team is available via WhatsApp 24/7 to handle your orders, queries, and special requirements.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">
                  By eliminating middlemen, we offer the best prices while ensuring farmers get their fair share.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reliable Delivery</h3>
                <p className="text-gray-600">
                  Choose your preferred delivery slots and rest assured your produce will arrive fresh and on time.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?auto=format&fit=crop&w=800&q=80"
              alt="Farmer harvesting vegetables"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-green-600">500+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-green-600">100%</p>
              <p className="text-gray-600">Quality Assured</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}