import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, X } from 'lucide-react';
import { createGeneralInquiryWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { lang, t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappUrl = createGeneralInquiryWhatsAppUrl(lang);
  const isArabic = lang === 'ar';

  return (
    <div
      className={`fixed bottom-6 ${
        isArabic ? 'left-6' : 'right-6'
      } z-40 flex flex-col items-${isArabic ? 'start' : 'end'} gap-2`}
    >
      {/* Speech Bubble / Tooltip */}
      {showTooltip && (
        <div className="relative bg-white rounded-xl p-3 shadow-xl border border-[#0A2F5C]/15 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 end-1.5 text-[#0A2F5C]/40 hover:text-[#0A2F5C] p-0.5 rounded"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2.5 pe-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <div className="text-start">
              <p className="text-xs font-bold text-[#0A2F5C] leading-tight">
                {isArabic ? 'مستشار الهدايا من دُر' : 'DUR Concierge Online'}
              </p>
              <p className="text-[11px] text-[#0A2F5C]/70 mt-0.5 leading-snug">
                {isArabic
                  ? 'أهلاً بك! نحن جاهزون للرد على استفسارك ومساعدتك في اختيار هديتك.'
                  : 'Welcome! We are ready to help you select and order your misbaha.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0A2F5C] text-[#F0B85A] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#F0B85A]/80 focus:outline-none focus:ring-4 focus:ring-[#F0B85A]/30"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-7 h-7 text-[#F0B85A]" />
        
        {/* Subtle Ping Ring */}
        <span className="absolute -top-1 -end-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>
      </a>
    </div>
  );
};
