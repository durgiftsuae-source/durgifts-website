import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MessageCircle,
  MapPin,
  Globe,
  Settings2,
  Heart,
  Download,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';
import {
  WHATSAPP_DISPLAY,
  GOOGLE_MAPS_URL,
  SOCIAL_LINKS,
  createGeneralInquiryWhatsAppUrl
} from '../utils/whatsapp';

interface FooterProps {
  onOpenManager: () => void;
  onOpenHostingGuide: () => void;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManager, onOpenHostingGuide, currentView, onNavigate }) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';
  const whatsappUrl = createGeneralInquiryWhatsAppUrl(lang);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(target);
    }
  };

  return (
    <footer className="bg-[#061F3D] text-[#F4F1EC] pt-16 pb-12 border-t border-[#F0B85A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-start">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/dur-avatar-transparent.png"
                alt="DUR GIFTS - دُر للهدايا"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col text-start">
                <span className="font-bold text-lg tracking-wider text-white leading-none">
                  DUR GIFTS
                </span>
                <span className="text-[10px] text-[#F0B85A] font-semibold tracking-widest leading-tight mt-0.5">
                  دُر للهدايا
                </span>
              </div>
            </div>
            
            <p className="text-sm font-light text-[#F4F1EC]/80 leading-relaxed max-w-sm">
              {isArabic
                ? 'وجهتكم الأولى لصياغة وانتقاء أرقى المسابح والهدايا الفاخرة التي تحمل قيمة معنوية وتاريخية تدوم طويلاً.'
                : 'Specializing in heirloom prayer beads, artisanal misbahas, and bespoke presentations with enduring value.'}
            </p>

            <div className="text-xs text-[#F0B85A] font-serif italic">
              {isArabic ? '«هدايا تحمل قيمة تدوم»' : '"Gifts worth keeping"'}
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#F0B85A]">
              {isArabic ? 'روابط الوصول السريع' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-[#F4F1EC]/75">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className={`hover:text-[#F0B85A] transition-colors ${currentView === 'home' ? 'text-[#F0B85A] font-semibold' : ''}`}
                >
                  {t('navHome')}
                </a>
              </li>
              <li>
                <a
                  href="#shop"
                  onClick={(e) => handleLinkClick(e, 'shop')}
                  className={`hover:text-[#F0B85A] transition-colors ${currentView === 'shop' ? 'text-[#F0B85A] font-semibold' : ''}`}
                >
                  {t('navShop')}
                </a>
              </li>
              <li>
                <a
                  href="#best-sellers"
                  onClick={(e) => handleLinkClick(e, 'best-sellers')}
                  className={`hover:text-[#F0B85A] transition-colors ${currentView === 'best-sellers' ? 'text-[#F0B85A] font-semibold' : ''}`}
                >
                  {t('navBestSellers')}
                </a>
              </li>
              <li>
                <a
                  href="#new-arrivals"
                  onClick={(e) => handleLinkClick(e, 'new-arrivals')}
                  className={`hover:text-[#F0B85A] transition-colors ${currentView === 'new-arrivals' ? 'text-[#F0B85A] font-semibold' : ''}`}
                >
                  {t('navNewArrivals')}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className={`hover:text-[#F0B85A] transition-colors ${currentView === 'about' ? 'text-[#F0B85A] font-semibold' : ''}`}
                >
                  {t('navAbout')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className={`hover:text-[#F0B85A] transition-colors ${currentView === 'contact' ? 'text-[#F0B85A] font-semibold' : ''}`}
                >
                  {t('navContact')}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenManager}
                  className="hover:text-[#F0B85A] transition-colors flex items-center gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5 text-[#F0B85A]" />
                  <span>{t('navManage')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Ordering Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#F0B85A]">
              {isArabic ? 'الطلب والتوصيل في الإمارات' : 'UAE Orders & Concierge'}
            </h4>
            <p className="text-xs text-[#F4F1EC]/75 leading-relaxed">
              {t('freeDeliveryNote')}
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#F0B85A] text-[#0A2F5C] text-xs font-bold hover:bg-[#e4ad4b] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#0A2F5C]" />
                <bdi dir="ltr" className="inline-block font-sans font-bold tracking-wider" style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>
                  {WHATSAPP_DISPLAY}
                </bdi>
              </a>
            </div>
            <div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F4F1EC]/70 hover:text-[#F0B85A] inline-flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F0B85A]" />
                <span>{isArabic ? 'عرض موقعنا على خرائط جوجل' : 'View UAE Boutique Map'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4F1EC]/60">
          <p>{t('copyright')}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/durgifts-complete-project.zip"
              download="durgifts-complete-project.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0B85A]/15 text-[#F0B85A] border border-[#F0B85A]/40 hover:bg-[#F0B85A] hover:text-[#0A2F5C] transition-all font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isArabic ? 'تحميل الموقع كاملاً (ZIP)' : 'Download Full Website (ZIP)'}</span>
            </a>

            <button
              onClick={onOpenHostingGuide}
              className="text-[#F0B85A] hover:underline flex items-center gap-1 font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t('freeHostingGuideLink')}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
