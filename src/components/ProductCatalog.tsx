import React, { useState, useMemo, useEffect } from 'react';
import { Product, CategoryKey } from '../types/product';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, SlidersHorizontal, Sparkles, Download, FileSpreadsheet, ArrowLeft, ArrowRight } from 'lucide-react';
import { exportAccountingCodesCSV } from '../utils/accountingExport';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  initialCategory?: CategoryKey;
  isStandalonePage?: boolean;
  onBackToHome?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  initialCategory = 'all',
  isStandalonePage = false,
  onBackToHome
}) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'all', label: t('allCategories') },
    { key: 'best-sellers', label: t('catBestSellers') },
    { key: 'new-arrivals', label: t('catNewArrivals') },
    { key: 'premium-misbahas', label: t('catPremium') },
    { key: 'luxury-misbahas', label: t('catLuxury') },
    { key: 'special-collections', label: t('catSpecial') },
    { key: 'silver', label: t('catSilver') },
    { key: 'gifts-accessories', label: t('catGifts') },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.visible)
      .filter((p) => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'best-sellers') return Boolean(p.isBestSeller);
        if (selectedCategory === 'new-arrivals') return Boolean(p.isNewArrival);
        if (selectedCategory === 'silver') {
          return (
            p.category === 'silver' ||
            p.specs?.ar?.material?.includes('فضة') ||
            p.specs?.en?.material?.toLowerCase().includes('silver') ||
            p.name.ar.includes('فضة') ||
            p.name.en.toLowerCase().includes('silver')
          );
        }
        if (selectedCategory === 'gifts-accessories') {
          return p.category === 'gifts-accessories';
        }
        return p.category === selectedCategory;
      })
      .filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const nameEn = p.name.en.toLowerCase();
        const nameAr = p.name.ar.toLowerCase();
        const descEn = p.description.en.toLowerCase();
        const descAr = p.description.ar.toLowerCase();
        const sku = (p.sku || '').toLowerCase();
        return nameEn.includes(q) || nameAr.includes(q) || descEn.includes(q) || descAr.includes(q) || sku.includes(q);
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        // Extract numeric price value (supports both Arabic and English digits)
        const getNum = (priceStr: string) => {
          if (!priceStr) return 0;
          const normalized = priceStr.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
          const match = normalized.match(/\d+/g);
          return match ? parseInt(match.join(''), 10) : 0;
        };
        const numA = getNum(a.price.en);
        const numB = getNum(b.price.en);
        if (sortBy === 'price-asc') return numA - numB;
        if (sortBy === 'price-desc') return numB - numA;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to Home Button on Standalone Page */}
      {isStandalonePage && onBackToHome && (
        <div className="mb-6 text-start">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#0A2F5C] bg-white border border-[#0A2F5C]/15 rounded-lg hover:bg-[#F4F1EC] transition-colors shadow-2xs"
          >
            {isArabic ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isArabic ? 'الرجوع للرئيسية' : 'Back to Home'}</span>
          </button>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-[#8A5B0A]">
          <span className="w-5 h-[1.5px] bg-[#F0B85A]" />
          <span>{lang === 'ar' ? 'المتجر المستقل' : 'INDEPENDENT BOUTIQUE'}</span>
          <span className="w-5 h-[1.5px] bg-[#F0B85A]" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2F5C] tracking-tight mb-4 font-heading">
          {t('catalogTitle')}
        </h2>
        <p className="text-sm sm:text-base text-[#0A2F5C]/75 leading-relaxed">
          {t('catalogSubtitle')}
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4 mb-10">
        
        {/* Category Tabs (Segmented controls placed right at the beginning) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#0A2F5C] text-[#F0B85A] border-[#0A2F5C] shadow-sm'
                    : 'bg-white text-[#0A2F5C]/80 border-[#0A2F5C]/15 hover:border-[#0A2F5C]/40 hover:bg-[#F4F1EC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort & Accounting Export Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A2F5C]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full ps-10 pe-4 py-2.5 text-xs bg-white border border-[#0A2F5C]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0B85A] focus:border-transparent text-[#0A2F5C] placeholder-[#0A2F5C]/40 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-[#0A2F5C]/40 hover:text-[#0A2F5C]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector & Accounting Export Button */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              onClick={() => exportAccountingCodesCSV(products)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0A2F5C] bg-white hover:bg-[#eae5dd] border border-[#0A2F5C]/15 rounded-lg transition-colors shadow-2xs shrink-0"
              title="تصدير جدول الأكواد للمحاسبة والمخزون بصيغة CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#8A5B0A]" />
              <span className="hidden sm:inline">{t('exportAccountingCsv')}</span>
              <span className="sm:hidden">أكواد المحاسبة (CSV)</span>
            </button>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0A2F5C]/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 text-xs bg-white border border-[#0A2F5C]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0B85A] text-[#0A2F5C] shadow-xs"
              >
                <option value="featured">{t('sortFeatured')}</option>
                <option value="price-asc">{t('sortPriceLow')}</option>
                <option value="price-desc">{t('sortPriceHigh')}</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-[#0A2F5C]/10 max-w-md mx-auto my-8">
          <p className="text-sm text-[#0A2F5C]/70 mb-4">{t('noProductsFound')}</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2F5C] rounded hover:bg-[#061F3D] transition-colors"
          >
            {t('clearFilter')}
          </button>
        </div>
      )}

      {/* Notice on direct WhatsApp ordering */}
      <div className="mt-12 p-4 bg-white/70 rounded-xl border border-[#0A2F5C]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0A2F5C]/5 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#8A5B0A]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0A2F5C]">
              {lang === 'ar' ? 'هل تبحث عن تصميم خاص أو مسبحة محددة؟' : 'Looking for a bespoke creation or custom misbaha?'}
            </h4>
            <p className="text-xs text-[#0A2F5C]/70">
              {lang === 'ar'
                ? 'يوفر خبراؤنا خدمة صياغة وتخصيص المسابح مع اختيار نوع الأحجار والفضة والكركوشة.'
                : 'Our artisans offer bespoke design services including custom stone selection, sterling silver minarets, and personalized tassels.'}
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/971526700503?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%AF%D9%8F%D8%B1%20%D9%84%D9%84%D9%87%D8%AF%D8%A7%D9%8A%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B7%D9%84%D8%A8%20%D9%85%D8%B3%D8%A8%D8%AD%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%A3%D9%88%20%D8%AA%D9%81%D8%B5%D9%8A%D9%84%20%D8%AD%D8%B5%D8%B1%D9%8A."
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-4 py-2 text-xs font-semibold text-[#0A2F5C] bg-[#F0B85A] hover:bg-[#e4ad4b] rounded shadow-xs transition-colors shrink-0"
        >
          {lang === 'ar' ? 'طلب مسبحة خاصة ←' : 'Inquire for Bespoke Piece →'}
        </a>
      </div>
    </section>
  );
};
