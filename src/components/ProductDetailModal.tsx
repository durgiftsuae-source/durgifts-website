import React, { useState } from 'react';
import { Product } from '../types/product';
import { useLanguage } from '../context/LanguageContext';
import { X, MessageCircle, Share2, Check, Gift, Sparkles, ShieldCheck, Tag } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const isArabic = lang === 'ar';
  const name = isArabic ? product.name.ar : product.name.en;
  const secondaryName = isArabic ? product.name.en : product.name.ar;
  const description = isArabic ? product.description.ar : product.description.en;
  const price = isArabic ? product.price.ar : product.price.en;
  const specs = isArabic ? product.specs.ar : product.specs.en;

  const whatsappUrl = createProductWhatsAppUrl(name, price, product.sku, lang);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#${product.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#F4F1EC] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#0A2F5C]/15 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#0A2F5C] shadow-sm transition-colors"
          aria-label={t('close')}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Large Image Showcase */}
          <div className="md:col-span-6 bg-white p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-e border-[#0A2F5C]/10">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F4F1EC] shadow-inner">
              <img
                src={product.image}
                alt={name}
                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 start-3">
                <img
                  src="/assets/aistudio/dur-avatar-transparent.png"
                  alt="DUR GIFTS"
                  className="h-9 w-auto"
                />
              </div>
            </div>
            <p className="mt-3 text-[11px] text-[#0A2F5C]/60 text-center">
              {isArabic ? 'صورة حقيقية للقطعة من ورش دُر للهدايا' : 'Authentic photograph from DUR GIFTS workshop'}
            </p>
          </div>

          {/* Right Column: Contiguous Purchase & Specification Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-start bg-[#F4F1EC]">
            <div>
              {/* Category & SKU & Status */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8A5B0A] uppercase tracking-wider mb-2">
                {product.sku && (
                  <span className="bg-[#0A2F5C] text-[#F0B85A] px-2 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider">
                    {t('productSku')}: {product.sku}
                  </span>
                )}
                <span>{product.inStock ? t('inStock') : ''}</span>
                <span aria-hidden="true">·</span>
                <span>DUR GIFTS UAE</span>
              </div>

              {/* Names */}
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2F5C] leading-tight mb-1">
                {name}
              </h2>
              <p className="text-sm text-[#8A5B0A] font-serif italic mb-4">
                {secondaryName}
              </p>

              {/* Price Callout */}
              <div className="bg-white/80 rounded-lg p-3.5 border border-[#0A2F5C]/10 flex items-center justify-between mb-5">
                <div>
                  <span className="text-xs text-[#0A2F5C]/70 block">{isArabic ? 'السعر التقديري' : 'Price'}</span>
                  <span className="text-2xl font-bold text-[#0A2F5C] tabular-nums">{price}</span>
                </div>
                <div className="text-end">
                  <span className="text-xs font-semibold text-[#0A2F5C] block">
                    {isArabic ? 'توصيل متاح لكافة الإمارات' : 'UAE Express Delivery'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#0A2F5C]/85 leading-relaxed mb-6">
                {description}
              </p>

              {/* Specifications Grid */}
              <div className="space-y-2 mb-6 pt-4 border-t border-[#0A2F5C]/10">
                <h4 className="text-xs font-bold text-[#0A2F5C] uppercase tracking-wider mb-2">
                  {t('specifications')}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {specs.beadCount && (
                    <div className="bg-white/60 p-2 rounded border border-[#0A2F5C]/5">
                      <span className="text-[#0A2F5C]/60 block">{t('beadCount')}</span>
                      <span className="font-semibold text-[#0A2F5C]">{specs.beadCount}</span>
                    </div>
                  )}
                  {specs.beadShape && (
                    <div className="bg-white/60 p-2 rounded border border-[#0A2F5C]/5">
                      <span className="text-[#0A2F5C]/60 block">{t('beadShape')}</span>
                      <span className="font-semibold text-[#0A2F5C]">{specs.beadShape}</span>
                    </div>
                  )}
                  {specs.material && (
                    <div className="bg-white/60 p-2 rounded border border-[#0A2F5C]/5 col-span-2">
                      <span className="text-[#0A2F5C]/60 block">{t('material')}</span>
                      <span className="font-semibold text-[#0A2F5C]">{specs.material}</span>
                    </div>
                  )}
                  {specs.tassel && (
                    <div className="bg-white/60 p-2 rounded border border-[#0A2F5C]/5 col-span-2">
                      <span className="text-[#0A2F5C]/60 block">{t('tassel')}</span>
                      <span className="font-semibold text-[#0A2F5C]">{specs.tassel}</span>
                    </div>
                  )}
                  {specs.origin && (
                    <div className="bg-white/60 p-2 rounded border border-[#0A2F5C]/5 col-span-2">
                      <span className="text-[#0A2F5C]/60 block">{t('origin')}</span>
                      <span className="font-semibold text-[#0A2F5C]">{specs.origin}</span>
                    </div>
                  )}
                  {specs.included && (
                    <div className="bg-white/60 p-2 rounded border border-[#0A2F5C]/5 col-span-2">
                      <span className="text-[#0A2F5C]/60 block">{t('included')}</span>
                      <span className="font-semibold text-[#0A2F5C]">{specs.included}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Direct WhatsApp Order & Share */}
            <div className="pt-4 border-t border-[#0A2F5C]/10 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded-lg shadow-md hover:shadow-lg transition-all border border-[#F0B85A]/40"
              >
                <MessageCircle className="w-4 h-4 text-[#F0B85A]" />
                <span>{t('orderViaWhatsApp')}</span>
              </a>

              <button
                onClick={handleShare}
                className="p-3 text-[#0A2F5C] bg-white hover:bg-white/90 border border-[#0A2F5C]/15 rounded-lg transition-colors relative"
                title={t('sharePiece')}
                aria-label={t('sharePiece')}
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                {copied && (
                  <span className="absolute -top-8 start-1/2 -translate-x-1/2 bg-[#0A2F5C] text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                    {t('copiedLink')}
                  </span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
