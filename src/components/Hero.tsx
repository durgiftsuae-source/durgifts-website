import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, ArrowRight, ArrowLeft, ShieldCheck, Gift, Truck, Sparkles } from 'lucide-react';
import { createGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  onExplore?: () => void;
  onExploreBestSellers?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onExploreBestSellers }) => {
  const { lang, t } = useLanguage();
  const whatsappUrl = createGeneralInquiryWhatsAppUrl(lang);
  const isArabic = lang === 'ar';

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle luxury ambient pattern / pearl glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#F0B85A]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#0A2F5C]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-start">
            
            {/* Tagline micro-label */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest text-[#8A5B0A]">
              <span className="w-6 h-[1.5px] bg-[#F0B85A]" />
              <span>{isArabic ? 'دُر للهدايا · هدايا تحمل قيمة تدوم' : 'DUR GIFTS · GIFTS WORTH KEEPING'}</span>
            </div>

            {/* Dual Headlines: Arabic & English */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A2F5C] leading-[1.15] mb-4">
              {isArabic ? (
                <>
                  <span className="block font-heading">هدايا تحمل قيمة تدوم</span>
                  <span className="block text-2xl sm:text-3xl font-light text-[#8A5B0A] mt-2 font-serif italic">
                    Gifts Worth Keeping
                  </span>
                </>
              ) : (
                <>
                  <span className="block font-serif">Gifts Worth Keeping</span>
                  <span className="block text-2xl sm:text-3xl font-normal text-[#8A5B0A] mt-2 font-heading">
                    هدايا تحمل قيمة تدوم
                  </span>
                </>
              )}
            </h1>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg text-[#0A2F5C]/80 leading-relaxed max-w-2xl mb-8">
              {t('heroSubheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={() => {
                  if (onExplore) {
                    onExplore();
                  } else {
                    const el = document.getElementById('collection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded shadow-md hover:shadow-lg transition-all group border border-[#F0B85A]/30 cursor-pointer"
              >
                <span>{t('exploreCollection')}</span>
                {isArabic ? (
                  <ArrowLeft className="w-4 h-4 text-[#F0B85A] group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#F0B85A] group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0A2F5C] bg-[#F0B85A] hover:bg-[#e2a849] rounded shadow-sm hover:shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#0A2F5C]" />
                <span>{t('whatsappConsultation')}</span>
              </a>
            </div>

            {/* Quick Proof Strip */}
            <div className="pt-6 border-t border-[#0A2F5C]/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#0A2F5C]/75">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F0B85A] shrink-0" />
                <span>{t('heroBadge1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#F0B85A] shrink-0" />
                <span>{t('heroBadge2')}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Truck className="w-4 h-4 text-[#F0B85A] shrink-0" />
                <span>{t('heroBadge3')}</span>
              </div>
            </div>

          </div>

          {/* Key Art Showcase Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-2xl bg-white p-3 shadow-xl border border-[#0A2F5C]/10 group overflow-hidden">
              {/* Product / Brand Key Art Showcase */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#F4F1EC]">
                <img
                  src="/assets/aistudio/82_Honey_Barrel_cleaned_1940x2576_07e30b70.jpg"
                  alt="DUR GIFTS Honey Barrel Misbaha - مسبحة كهرمان برميل العسل"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* 3D Brand Badge Floating Over the Hero Visual */}
                <div className="absolute top-4 start-4 bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-md border border-[#0A2F5C]/10 flex items-center gap-2.5">
                  <img
                    src="/assets/aistudio/dur-avatar-white_4fb857e6.png"
                    alt="DUR Seal"
                    className="w-8 h-8 object-contain rounded"
                  />
                  <div className="text-start">
                    <p className="text-[11px] font-bold text-[#0A2F5C] leading-none">DUR GIFTS</p>
                    <p className="text-[9px] text-[#8A5B0A] leading-tight">هدايا دُر الفاخرة</p>
                  </div>
                </div>

                {/* Micro Inset Tag on Bottom */}
                <div className="absolute bottom-4 inset-x-4 bg-[#0A2F5C]/90 backdrop-blur-md text-white rounded-lg p-3 flex items-center justify-between shadow-lg border border-[#F0B85A]/30">
                  <div>
                    <p className="text-xs font-semibold text-[#F0B85A]">
                      {isArabic ? 'مسبحة برميل العسل الملكية' : 'Royal Honey Barrel Misbaha'}
                    </p>
                    <p className="text-[11px] text-[#F4F1EC]/80">
                      {isArabic ? 'كهرمان عسلي فاخر · كركوشة زمردية' : 'Honey Amber · Emerald Silk Tassel'}
                    </p>
                  </div>
                  <a
                    href="#collection"
                    className="text-xs font-semibold text-[#F0B85A] hover:underline"
                  >
                    {isArabic ? 'عرض القطعة ←' : 'View →'}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
