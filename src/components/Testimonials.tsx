import React from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    business: 'Spice Garden Restaurant',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    content: 'AgrilConnect has transformed how we source our vegetables. Their quality and reliability are unmatched in the industry.',
    rating: 5
  },
  {
    id: '2',
    name: 'Priya Patel',
    business: 'Fresh Bites Café',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    content: 'The convenience of ordering through WhatsApp and their flexible delivery schedule has made our operations much smoother.',
    rating: 5
  },
  {
    id: '3',
    name: 'Michael D\'Souza',
    business: 'The Green Fork',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    content: 'Outstanding service! Their produce is always fresh, and their bulk ordering system saves us both time and money.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}