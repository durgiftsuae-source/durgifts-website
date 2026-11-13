import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Menu, X, Settings2 } from 'lucide-react';
import { createGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  onOpenManager: () => void;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenManager, currentView = 'home', onNavigate }) => {
  const { lang, toggleLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generalWhatsAppUrl = createGeneralInquiryWhatsAppUrl(lang);

  const navLinks = [
    { id: 'home', href: '#home', label: t('navHome') },
    { id: 'shop', href: '#shop', label: t('navShop') },
    { id: 'best-sellers', href: '#best-sellers', label: t('navBestSellers') },
    { id: 'new-arrivals', href: '#new-arrivals', label: t('navNewArrivals') },
    { id: 'about', href: '#about', label: t('navAbout') },
    { id: 'contact', href: '#contact', label: t('navContact') },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, linkId: string, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(linkId);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F1EC]/95 backdrop-blur-md shadow-sm border-b border-[#0A2F5C]/10 py-3'
          : 'bg-[#F4F1EC] border-b border-[#0A2F5C]/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-6 lg:gap-8">
          
          {/* Zone 1: Authentic Brand Logo (Transparent background) */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home', '#home')}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B85A]"
            aria-label="DUR GIFTS Home"
          >
            <img
              src="/assets/aistudio/dur-avatar-transparent.png"
              alt="DUR GIFTS - دُر للهدايا"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-start">
              <span className="font-bold text-base sm:text-lg tracking-wider text-[#0A2F5C] leading-none">
                DUR GIFTS
              </span>
              <span className="text-[10px] text-[#8A5B0A] font-semibold tracking-widest leading-tight mt-0.5">
                دُر للهدايا
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs lg:text-sm font-medium text-[#0A2F5C]/80">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id, link.href)}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive
                      ? 'text-[#0A2F5C] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F0B85A] after:scale-x-100'
                      : 'hover:text-[#0A2F5C] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F0B85A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              onClick={onOpenManager}
              className="hover:text-[#0A2F5C] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs text-[#0A2F5C]/60 hover:text-[#0A2F5C]"
              title={t('navManage')}
            >
              <Settings2 className="w-3.5 h-3.5 text-[#F0B85A]" />
              <span>{t('navManage')}</span>
            </button>
          </nav>

          {/* Zone 3: Language Switch & Primary WhatsApp Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-semibold rounded border border-[#0A2F5C]/20 text-[#0A2F5C] hover:bg-[#0A2F5C]/5 hover:border-[#0A2F5C]/40 transition-all whitespace-nowrap shrink-0"
              aria-label="Switch Language"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>

            {/* Primary Action: WhatsApp Order Button */}
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 border border-[#F0B85A]/40"
            >
              <MessageCircle className="w-4 h-4 text-[#F0B85A]" />
              <span>{t('orderOnWhatsApp')}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0A2F5C] hover:bg-[#0A2F5C]/5 rounded transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4F1EC] border-b border-[#0A2F5C]/10 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id, link.href)}
                  className={`py-2 text-sm font-medium border-b border-[#0A2F5C]/5 transition-all flex items-center justify-between ${
                    isActive ? 'text-[#0A2F5C] font-bold ps-2 border-s-2 border-s-[#F0B85A]' : 'text-[#0A2F5C]/80 hover:text-[#0A2F5C]'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManager();
              }}
              className="py-2 text-sm font-medium text-[#0A2F5C]/70 hover:text-[#0A2F5C] flex items-center gap-2 text-start"
            >
              <Settings2 className="w-4 h-4 text-[#F0B85A]" />
              <span>{t('navManage')}</span>
            </button>
            <div className="pt-2">
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#0A2F5C] rounded"
              >
                <MessageCircle className="w-4 h-4 text-[#F0B85A]" />
                <span>{t('orderOnWhatsApp')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
