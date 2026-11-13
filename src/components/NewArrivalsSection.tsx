import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowLeft, ArrowRight, Clock } from 'lucide-react';

interface NewArrivalsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onGoToShop: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onSelectProduct,
  onGoToShop
}) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';

  const newProducts = products.filter((p) => p.visible && p.isNewArrival);

  if (newProducts.length === 0) return null;

  return (
    <section id="new-arrivals" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-start">
        <div>
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-[#8A5B0A]">
            <Clock className="w-4 h-4 text-[#F0B85A]" />
            <span>{isArabic ? 'إصدارات جديدة' : 'FRESH MASTERPIECES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2F5C] font-heading tracking-tight">
            {t('newArrivalsTitle')}
          </h2>
          <p className="text-sm text-[#0A2F5C]/75 mt-1 max-w-2xl leading-relaxed">
            {t('newArrivalsSubtitle')}
          </p>
        </div>

        <button
          onClick={onGoToShop}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0A2F5C] hover:text-[#8A5B0A] group transition-colors self-start sm:self-auto"
        >
          <span>{isArabic ? 'تصفح كافة القطع' : 'Browse All Pieces'}</span>
          {isArabic ? (
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          ) : (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </div>

      {/* New Arrivals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {newProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </section>
  );
};
