import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

interface BestSellersSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onGoToShop: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  onSelectProduct,
  onGoToShop
}) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';

  const bestSellerProducts = products.filter((p) => p.visible && p.isBestSeller);

  if (bestSellerProducts.length === 0) return null;

  return (
    <section id="best-sellers" className="py-16 lg:py-20 bg-white border-y border-[#0A2F5C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-[#8A5B0A]">
              <Sparkles className="w-4 h-4 text-[#F0B85A]" />
              <span>{isArabic ? 'المختارات الأكثر تميزاً' : 'MOST SOUGHT-AFTER'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2F5C] font-heading tracking-tight">
              {t('bestSellersTitle')}
            </h2>
            <p className="text-sm text-[#0A2F5C]/75 mt-1 max-w-2xl leading-relaxed">
              {t('bestSellersSubtitle')}
            </p>
          </div>

          <button
            onClick={onGoToShop}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0A2F5C] hover:text-[#8A5B0A] group transition-colors self-start sm:self-auto"
          >
            <span>{isArabic ? 'عرض كافة منتجات المتجر المستقل' : 'View Full Independent Store'}</span>
            {isArabic ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
