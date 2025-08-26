import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from './components/AdminDashboard';
import OrderHistory from './components/OrderHistory';

function App() {
  const { user, setUser, fetchBusinessProfile, businessProfile } = useAuthStore();

  useEffect(() => {
    // Set initial user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchBusinessProfile();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchBusinessProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, fetchBusinessProfile]);

  // Show admin dashboard if user is admin
  if (user && businessProfile?.is_admin) {
    return (
      <>
        <AdminDashboard />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        {user ? (
          <>
            <ProductCatalog />
            <OrderHistory />
          </>
        ) : (
          <>
            <About />
            <Testimonials />
            <ContactForm />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;