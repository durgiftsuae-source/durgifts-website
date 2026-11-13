import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BestSellersSection } from './components/BestSellersSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductManagerModal } from './components/ProductManagerModal';
import { FreeHostingGuideModal } from './components/FreeHostingGuideModal';
import { Product } from './types/product';
import initialProducts from './data/products.json';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dur_custom_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((p: Product) => p.id !== 'dur-signature-packaging-set');
        }
      }
    } catch (e) {
      console.error('Error loading saved products:', e);
    }
    return initialProducts as Product[];
  });

  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'best-sellers' | 'new-arrivals' | 'about' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isHostingGuideOpen, setIsHostingGuideOpen] = useState(false);

  // Sync navigation view with URL hash
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      if (!rawHash || rawHash === 'home') {
        setCurrentView('home');
        return;
      }
      if (rawHash === 'shop' || rawHash === 'collection') {
        setCurrentView('shop');
        return;
      }
      if (rawHash === 'best-sellers') {
        setCurrentView('best-sellers');
        return;
      }
      if (rawHash === 'new-arrivals') {
        setCurrentView('new-arrivals');
        return;
      }
      if (rawHash === 'about') {
        setCurrentView('about');
        return;
      }
      if (rawHash === 'contact') {
        setCurrentView('contact');
        return;
      }

      // Check if hash matches a specific product ID (e.g. #dur-82-honey-barrel)
      const match = products.find((p) => p.id === rawHash);
      if (match) {
        setSelectedProduct(match);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [products]);

  const handleNavigate = (view: string) => {
    const target = view.replace('#', '') as 'home' | 'shop' | 'best-sellers' | 'new-arrivals' | 'about' | 'contact';
    setCurrentView(target);
    window.location.hash = target === 'home' ? '' : target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('dur_custom_products', JSON.stringify(newProducts));
    } catch (e) {
      console.error('Error saving products to localStorage:', e);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F4F1EC] text-[#0A2F5C]">
        {/* Navigation Top Bar */}
        <Header
          onOpenManager={() => setIsManagerOpen(true)}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        {/* Main Content Display Based on Current View */}
        <main className="flex-grow">
          {currentView === 'home' && (
            <>
              {/* Hero Banner */}
              <Hero
                onExplore={() => handleNavigate('shop')}
                onExploreBestSellers={() => handleNavigate('best-sellers')}
              />

              {/* Best Sellers / الأكثر طلباً Highlight Section */}
              <BestSellersSection
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onGoToShop={() => handleNavigate('best-sellers')}
              />

              {/* New Arrivals / وصلنا حديثاً Section */}
              <NewArrivalsSection
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onGoToShop={() => handleNavigate('new-arrivals')}
              />

              {/* About Section */}
              <AboutSection />

              {/* Contact & Boutique Info */}
              <ContactSection />
            </>
          )}

          {currentView === 'shop' && (
            <div className="pt-24 sm:pt-28">
              <ProductCatalog
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                isStandalonePage={true}
                onBackToHome={() => handleNavigate('home')}
              />
            </div>
          )}

          {currentView === 'best-sellers' && (
            <div className="pt-24 sm:pt-28">
              <ProductCatalog
                products={products}
                initialCategory="best-sellers"
                onSelectProduct={(p) => setSelectedProduct(p)}
                isStandalonePage={true}
                onBackToHome={() => handleNavigate('home')}
              />
            </div>
          )}

          {currentView === 'new-arrivals' && (
            <div className="pt-24 sm:pt-28">
              <ProductCatalog
                products={products}
                initialCategory="new-arrivals"
                onSelectProduct={(p) => setSelectedProduct(p)}
                isStandalonePage={true}
                onBackToHome={() => handleNavigate('home')}
              />
            </div>
          )}

          {currentView === 'about' && (
            <div className="pt-24 sm:pt-28">
              <AboutSection />
            </div>
          )}

          {currentView === 'contact' && (
            <div className="pt-24 sm:pt-28">
              <ContactSection />
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenManager={() => setIsManagerOpen(true)}
          onOpenHostingGuide={() => setIsHostingGuideOpen(true)}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        {/* Global Floating WhatsApp Concierge Button */}
        <FloatingWhatsApp />

        {/* Product Detail Modal (PDP) */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            if (window.location.hash.startsWith('#dur-')) {
              history.replaceState(null, '', window.location.pathname);
            }
          }}
        />

        {/* Interactive Store & Product Manager Modal with SKU & Accounting Export */}
        <ProductManagerModal
          isOpen={isManagerOpen}
          onClose={() => setIsManagerOpen(false)}
          products={products}
          onUpdateProducts={handleUpdateProducts}
        />

        {/* 100% Free Static Hosting & Deployment Guide */}
        <FreeHostingGuideModal
          isOpen={isHostingGuideOpen}
          onClose={() => setIsHostingGuideOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
