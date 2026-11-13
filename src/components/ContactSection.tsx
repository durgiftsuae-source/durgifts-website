import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MessageCircle,
  MapPin,
  ExternalLink,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  Sparkles
} from 'lucide-react';
import {
  WHATSAPP_DISPLAY,
  GOOGLE_MAPS_URL,
  SOCIAL_LINKS,
  createGeneralInquiryWhatsAppUrl
} from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';
  const whatsappUrl = createGeneralInquiryWhatsAppUrl(lang);

  const socialChannels = [
    {
      name: 'Instagram',
      handle: '@durgifts',
      url: SOCIAL_LINKS.instagram,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'hover:text-[#E4405F]'
    },
    {
      name: 'TikTok',
      handle: '@dur.gifts',
      url: SOCIAL_LINKS.tiktok,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
      color: 'hover:text-[#00F2FE]'
    },
    {
      name: 'Facebook',
      handle: 'DUR GIFTS',
      url: SOCIAL_LINKS.facebook,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
        </svg>
      ),
      color: 'hover:text-[#1877F2]'
    },
    {
      name: 'Threads',
      handle: '@durgifts',
      url: SOCIAL_LINKS.threads,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.719 0 12.186 5.467 12.186 11.814 0 6.72-5.467 12.186-12.186 12.186zm0-21.818c-5.416 0-9.822 4.406-9.822 9.818 0 5.413 4.406 9.818 9.822 9.818 5.413 0 9.818-4.405 9.818-9.818 0-5.412-4.405-9.818-9.818-9.818zm5.289 8.016c-.035-1.895-1.258-3.327-3.153-3.327-2.316 0-3.662 1.636-3.662 4.195 0 2.664 1.488 4.258 3.863 4.258 1.547 0 2.766-.653 3.325-1.78l1.777.986c-.957 1.838-2.863 2.809-5.102 2.809-3.791 0-6.148-2.61-6.148-6.273 0-3.593 2.155-6.208 5.946-6.208 3.125 0 5.127 2.174 5.188 5.148h-2.034z" />
        </svg>
      ),
      color: 'hover:text-[#0A2F5C]'
    },
    {
      name: 'YouTube',
      handle: '@durgifts',
      url: SOCIAL_LINKS.youtube,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: 'hover:text-[#FF0000]'
    },
    {
      name: 'Snapchat',
      handle: 'durgifts',
      url: SOCIAL_LINKS.snapchat,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.001 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm.232 18.919c-1.393.003-2.612-.486-3.626-.954-.34-.157-.655-.302-.916-.302-.345 0-.616.19-.884.378-.231.161-.476.332-.797.332-.239 0-.462-.089-.66-.263-.448-.396-.519-1.025-.198-1.742.368-.823.955-1.378 1.488-1.884.148-.14.288-.273.411-.409.052-.057.086-.129.086-.214 0-.158-.119-.24-.265-.24-.131 0-.309.049-.525.109-.569.158-1.428.397-2.073-.131-.482-.396-.659-1.053-.452-1.674.209-.628.784-.962 1.472-1.01.218-.016.438.006.657.028.188.019.38.038.566.027.319-.019.529-.153.539-.345.021-.402-.231-.951-.606-1.55-.42-.672-.888-1.421-.888-2.396 0-2.88 2.502-4.992 5.584-4.992 3.083 0 5.586 2.112 5.586 4.992 0 .975-.468 1.724-.888 2.396-.375.599-.627 1.148-.606 1.55.01.192.22.326.539.345.186.011.378-.008.566-.027.219-.022.439-.044.657-.028.688.048 1.263.382 1.472 1.01.207.621.03 1.278-.452 1.674-.645.528-1.504.289-2.073.131-.216-.06-.394-.109-.525-.109-.146 0-.265.082-.265.24 0 .085.034.157.086.214.123.136.263.269.411.409.533.506 1.12 1.061 1.488 1.884.321.717.25 1.346-.198 1.742-.198.174-.421.263-.66.263-.321 0-.566-.171-.797-.332-.268-.188-.539-.378-.884-.378-.261 0-.576.145-.916.302-1.014.468-2.233.957-3.626.954z" />
        </svg>
      ),
      color: 'hover:text-[#FFFC00]'
    }
  ];

  return (
    <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest text-[#8A5B0A]">
          <span className="w-5 h-[1.5px] bg-[#F0B85A]" />
          <span>{t('contactSectionTitle')}</span>
          <span className="w-5 h-[1.5px] bg-[#F0B85A]" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2F5C] tracking-tight mb-4 font-heading">
          {t('contactHeadline')}
        </h2>
        <p className="text-sm sm:text-base text-[#0A2F5C]/75 leading-relaxed">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* WhatsApp & Concierge Direct Box (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-[#0A2F5C]/10 shadow-lg flex flex-col justify-between text-start relative overflow-hidden">
          <div className="absolute top-0 end-0 w-32 h-32 bg-[#F0B85A]/10 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-xs">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A2F5C] leading-snug">
                  {t('whatsappOrderTitle')}
                </h3>
                <p className="text-xs text-[#0A2F5C]/60">
                  {t('whatsappOrderDesc')}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#0A2F5C]/80 leading-relaxed mb-6">
              {isArabic
                ? 'نستقبل كافة الطلبات والاستفسارات الخاصة بالمسابح والهدايا الفاخرة عبر خط الواتساب المباشر.'
                : 'We welcome all inquiries and bespoke misbaha orders directly through our official WhatsApp concierge.'}
            </p>

            <div className="bg-[#F4F1EC] rounded-xl p-4 border border-[#0A2F5C]/5 mb-6 space-y-2 text-xs text-[#0A2F5C]">
              <div className="flex items-center justify-between">
                <span className="text-[#0A2F5C]/60 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8A5B0A]" />
                  {isArabic ? 'رقم الواتساب الرسمي:' : 'Official WhatsApp:'}
                </span>
                <bdi dir="ltr" className="font-bold tabular-nums text-sm text-[#0A2F5C] inline-block font-sans" style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>{WHATSAPP_DISPLAY}</bdi>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#0A2F5C]/60 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8A5B0A]" />
                  {isArabic ? 'ساعات الرد والمتابعة:' : 'Concierge Hours:'}
                </span>
                <span className="font-medium text-[#0A2F5C]">
                  {isArabic ? 'على مدار الساعة · طوال أيام الأسبوع' : '24/7 Available across UAE'}
                </span>
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded-xl shadow-md hover:shadow-lg transition-all border border-[#F0B85A]/40"
          >
            <MessageCircle className="w-5 h-5 text-[#F0B85A]" />
            <span>{isArabic ? 'محادثة مباشرة وتأكيد الطلب الآن' : 'Start WhatsApp Order Now'}</span>
          </a>
        </div>

        {/* Location & UAE Maps Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-8 sm:p-10 border border-[#0A2F5C]/10 shadow-lg flex flex-col justify-between text-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0A2F5C]/5 text-[#0A2F5C] flex items-center justify-center shrink-0 border border-[#0A2F5C]/10 shadow-xs">
                <MapPin className="w-6 h-6 text-[#8A5B0A]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A2F5C] leading-snug">
                  {t('ourLocationTitle')}
                </h3>
                <p className="text-xs text-[#0A2F5C]/60">
                  {isArabic ? 'دولة الإمارات العربية المتحدة' : 'United Arab Emirates'}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#0A2F5C]/80 leading-relaxed mb-6">
              {t('ourLocationDesc')}
            </p>

            {/* Map Preview Callout */}
            <div className="relative rounded-xl overflow-hidden border border-[#0A2F5C]/10 bg-[#0A2F5C]/5 p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 text-[#0A2F5C]">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0A2F5C]">
                    {isArabic ? 'موقع دُر للهدايا على خرائط Google' : 'DUR GIFTS Location on Google Maps'}
                  </h4>
                  <p className="text-[11px] text-[#0A2F5C]/60 truncate max-w-[200px] sm:max-w-[260px]">
                    https://maps.app.goo.gl/QFLMPV5Rg4JDX8QS8
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-[#0A2F5C] bg-[#F4F1EC] hover:bg-[#eae5dd] border border-[#0A2F5C]/15 rounded-xl transition-colors"
          >
            <span>{t('openGoogleMaps')}</span>
            <ExternalLink className="w-4 h-4 text-[#8A5B0A]" />
          </a>
        </div>

      </div>

      {/* Official Social Media Grid (All 6 Accounts Verified) */}
      <div className="mt-16 pt-12 border-t border-[#0A2F5C]/10 text-center">
        <h3 className="text-xl font-bold text-[#0A2F5C] mb-2 font-heading">
          {t('socialMediaTitle')}
        </h3>
        <p className="text-xs text-[#0A2F5C]/60 mb-8 max-w-md mx-auto">
          {isArabic
            ? 'انضموا إلى عائلة دُر لمشاهدة أحدث المسابح، وتفاصيل الصياغة الحرفية والعروض الحصرية.'
            : 'Join the DUR family across our official social networks for new arrivals, craftsmanship previews, and seasonal drops.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {socialChannels.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 bg-white rounded-xl border border-[#0A2F5C]/10 hover:border-[#F0B85A] hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 text-[#0A2F5C] ${social.color}`}
            >
              <div className="p-2 rounded-lg bg-[#F4F1EC] text-[#0A2F5C] group-hover:scale-110 transition-transform">
                {social.icon}
              </div>
              <span className="text-xs font-bold leading-none">{social.name}</span>
              <span className="text-[10px] text-[#0A2F5C]/60 dir-ltr">{social.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
