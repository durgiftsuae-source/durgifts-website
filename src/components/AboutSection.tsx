import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';

  return (
    <section id="about" className="py-20 bg-[#0A2F5C] text-[#F4F1EC] relative overflow-hidden">
      {/* Decorative ambient gold glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0B85A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1D4A86]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (Brand Emblem) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square bg-[#061F3D] rounded-2xl p-6 border border-[#F0B85A]/30 shadow-2xl flex items-center justify-center">
              <img
                src="/assets/aistudio/dur-avatar-white_4fb857e6.png"
                alt="DUR Emblem"
                className="w-full h-full object-contain filter drop-shadow-2xl rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-3 bg-[#F0B85A] text-[#0A2F5C] px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                {isArabic ? 'رمز الأصالة والفخامة والتميز' : 'Emblem of Enduring Distinction'}
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 text-start">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-[#F0B85A]">
              <span className="w-5 h-[1.5px] bg-[#F0B85A]" />
              <span>{t('aboutSectionTitle')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6 font-heading">
              {t('aboutHeadline')}
            </h2>

            <p className="text-base sm:text-lg text-[#F4F1EC]/90 leading-relaxed mb-6 font-light">
              {t('aboutParagraph1')}
            </p>

            <p className="text-sm sm:text-base text-[#F4F1EC]/80 leading-relaxed mb-8">
              {t('aboutParagraph2')}
            </p>

            {/* Brand Quote Box */}
            <div className="p-5 bg-white/5 rounded-xl border border-[#F0B85A]/25 backdrop-blur-xs">
              <p className="text-base sm:text-lg italic font-serif text-[#F0B85A] mb-1">
                "{isArabic ? 'هدايا تحمل قيمة تدوم' : 'Gifts worth keeping'}"
              </p>
              <p className="text-xs text-[#F4F1EC]/70">
                {isArabic
                  ? 'صوت دُر: دافئ، أنيق، وموجز. نتحدث عما يمنحه الإهداء من شعور، لا عن تكلفته.'
                  : 'DUR Voice: warm, elegant, brief. We talk about how a gift feels, not what it costs.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
