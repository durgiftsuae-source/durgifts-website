import React from 'react';
import { Product } from '../types/product';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Eye, Sparkles } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';

  const name = isArabic ? product.name.ar : product.name.en;
  const secondaryName = isArabic ? product.name.en : product.name.ar;
  const description = isArabic ? product.description.ar : product.description.en;
  const price = isArabic ? product.price.ar : product.price.en;

  const whatsappUrl = createProductWhatsAppUrl(name, price, product.sku, lang);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'premium-misbahas':
        return t('catPremium');
      case 'luxury-misbahas':
        return t('catLuxury');
      case 'special-collections':
        return t('catSpecial');
      case 'silver':
        return t('catSilver');
      case 'gifts-accessories':
        return t('catGifts');
      default:
        return category;
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#0A2F5C]/10 hover:border-[#F0B85A]/50 hover:shadow-lg transition-all duration-300">
      
      {/* Product Image Area (takes ~65% of height) */}
      <div
        onClick={() => onSelect(product)}
        className="relative w-full aspect-[4/5] bg-[#F4F1EC] cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badges on Top */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <div className="bg-[#0A2F5C]/95 text-[#F0B85A] text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 shadow-sm border border-[#F0B85A]/30">
              <Sparkles className="w-2.5 h-2.5 text-[#F0B85A]" />
              <span>{t('bestSellerTag')}</span>
            </div>
          )}
          {product.isNewArrival && (
            <div className="bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 shadow-sm border border-emerald-400/30">
              <span>{t('newArrivalTag')}</span>
            </div>
          )}
        </div>

        {/* SKU Badge Top End */}
        {product.sku && (
          <div className="absolute top-3 end-3 bg-black/60 text-white/90 text-[10px] font-mono font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
            {product.sku}
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-[#0A2F5C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-[#0A2F5C] text-xs font-semibold rounded-md shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-[#8A5B0A]" />
            <span>{t('viewDetails')}</span>
          </span>
        </div>
      </div>

      {/* Card Content & Action Area */}
      <div className="p-5 flex flex-col flex-grow justify-between text-start">
        <div>
          {/* Category - Clean unboxed text with separator */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#8A5B0A] mb-1.5 uppercase tracking-wider">
            <span>{getCategoryLabel(product.category)}</span>
            <span aria-hidden="true">·</span>
            <span>{product.inStock ? t('inStock') : ''}</span>
          </div>

          {/* Product Primary & Secondary Name */}
          <h3
            onClick={() => onSelect(product)}
            className="text-lg font-bold text-[#0A2F5C] group-hover:text-[#8A5B0A] transition-colors cursor-pointer leading-snug"
          >
            {name}
          </h3>
          <p className="text-xs text-[#0A2F5C]/60 mb-2 font-serif italic">
            {secondaryName}
          </p>

          {/* Short Description */}
          <p className="text-xs text-[#0A2F5C]/75 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Price & Actions Baseline */}
        <div className="pt-3 border-t border-[#0A2F5C]/10 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#0A2F5C]/60 font-medium">{isArabic ? 'السعر' : 'Price'}</span>
            <span className="text-base font-bold text-[#0A2F5C] tabular-nums">
              {price}
            </span>
          </div>

          {/* Buttons: WhatsApp Order & Details */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="w-full inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-[#0A2F5C] bg-[#F4F1EC] hover:bg-[#eae5dd] rounded transition-colors"
            >
              <Eye className="w-3.5 h-3.5 me-1.5 text-[#0A2F5C]/70" />
              <span>{t('viewDetails')}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center py-2 px-3 text-xs font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded transition-colors shadow-sm"
              title={t('orderNow')}
            >
              <MessageCircle className="w-3.5 h-3.5 me-1.5 text-[#F0B85A]" />
              <span>{t('orderNow')}</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
