import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Globe, CheckCircle2, ShieldCheck, Zap, Cloud, Github, Sparkles, ExternalLink, Copy, Check, Download, FileArchive, FolderArchive } from 'lucide-react';

interface FreeHostingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeHostingGuideModal: React.FC<FreeHostingGuideModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedTab(id);
        setTimeout(() => setCopiedTab(null), 2000);
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
        {/* Header */}
        <div className="bg-[#0A2F5C] text-white p-6 flex items-center justify-between">
          <div className="text-start">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#F0B85A]" />
              <h3 className="text-xl font-bold text-white font-heading">
                {isArabic ? 'دليل نشر واستضافة موقع دُر للهدايا مجاناً 100%' : '100% Free Hosting & Deployment Guide'}
              </h3>
            </div>
            <p className="text-xs text-[#F4F1EC]/75 mt-1">
              {isArabic
                ? 'بدون اشتراكات شهرية، بدون خوادم مدفوعة، مع شهادة أمان SSL مجانية ومدى الحياة.'
                : 'Zero monthly fees, zero subscriptions, permanent free SSL certificate, fast global CDN.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto text-start space-y-6">
          
          {/* Active Preview URL Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950">
                  {isArabic ? 'الموقع يعمل الآن بنجاح على الرابط السحابي المباشر:' : 'Your live website is currently running at:'}
                </h4>
                <a
                  href="https://ais-dev-z7r65urmy3wcuzgpt2dszq-295032167701.europe-west2.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:underline break-all"
                >
                  https://ais-dev-z7r65urmy3wcuzgpt2dszq-295032167701.europe-west2.run.app
                </a>
              </div>
            </div>

            <button
              onClick={() =>
                copyToClipboard(
                  'https://ais-dev-z7r65urmy3wcuzgpt2dszq-295032167701.europe-west2.run.app',
                  'live-url'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded shadow-xs hover:bg-emerald-100 transition-colors shrink-0"
            >
              {copiedTab === 'live-url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTab === 'live-url' ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ الرابط' : 'Copy URL')}</span>
            </button>
          </div>

          {/* Direct ZIP Downloads Section */}
          <div className="bg-[#0A2F5C] text-white rounded-xl p-5 sm:p-6 border border-[#F0B85A]/30 shadow-md">
            <div className="flex items-center gap-2.5 mb-2">
              <FolderArchive className="w-5 h-5 text-[#F0B85A]" />
              <h4 className="text-base font-bold text-white font-heading">
                {isArabic ? 'تحميل ملفات ومجلدات الموقع كاملاً (ملفات مضغوطة ZIP)' : 'Download Full Website & Project Packages (ZIP)'}
              </h4>
            </div>
            <p className="text-xs text-[#F4F1EC]/80 leading-relaxed mb-5">
              {isArabic
                ? 'تم جمع كافة الملفات والمجلدات والصور والكتالوج والشعارات الخاصة بموقع دُر للهدايا في حزم مضغوطة جاهزة للتحميل المباشر بنقرة واحدة:'
                : 'All folders, images, logos, product catalog data, and source files have been compiled into one-click downloadable zip packages:'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              
              {/* Package 1: All-in-One Complete Project */}
              <div className="bg-white/10 hover:bg-white/15 transition-all p-4 rounded-lg border border-[#F0B85A]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F0B85A] bg-[#F0B85A]/20 px-2 py-0.5 rounded">
                      {isArabic ? 'الحزمة الشاملة ★ موصى بها' : 'Master Package ★'}
                    </span>
                    <span className="text-[10px] text-[#F4F1EC]/60">~29 MB</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mb-1">
                    {isArabic ? 'المشروع كاملاً بكافة مجلداته' : 'Complete Project Package'}
                  </h5>
                  <p className="text-[11px] text-[#F4F1EC]/70 leading-relaxed mb-3">
                    {isArabic
                      ? 'يحتوي على: مجلد الكود المصدري كاملاً + مجلد الموقع الجاهز للنشر الفوري + ملف التعليمات.'
                      : 'Includes: Full source code + Pre-built ready-to-deploy static website + Instructions.'}
                  </p>
                </div>
                <a
                  href="/durgifts-complete-project.zip"
                  download="durgifts-complete-project.zip"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-[#0A2F5C] bg-[#F0B85A] hover:bg-[#e4ad4b] rounded shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'تحميل الحزمة الشاملة' : 'Download Master ZIP'}</span>
                </a>
              </div>

              {/* Package 2: Ready to Deploy */}
              <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-lg border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                      {isArabic ? 'نشر فوري (سحب وإفلات)' : 'Ready to Deploy'}
                    </span>
                    <span className="text-[10px] text-[#F4F1EC]/60">~14 MB</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mb-1">
                    {isArabic ? 'نسخة الموقع الجاهزة للنشر' : 'Deployable Static Website'}
                  </h5>
                  <p className="text-[11px] text-[#F4F1EC]/70 leading-relaxed mb-3">
                    {isArabic
                      ? 'ملفات HTML و CSS والجافاسكربت والصور الجاهزة للرفع على أي استضافة بدون الحاجة لأوامر برمجية.'
                      : 'Static HTML, CSS, JS and all assets ready to drop on Netlify or Cloudflare Pages.'}
                  </p>
                </div>
                <a
                  href="/durgifts-website.zip"
                  download="durgifts-website.zip"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 rounded transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'تحميل نسخة النشر (dist)' : 'Download Deployable ZIP'}</span>
                </a>
              </div>

              {/* Package 3: Source Code Only */}
              <div className="bg-white/5 hover:bg-white/10 transition-all p-4 rounded-lg border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded">
                      {isArabic ? 'الكود المصدري' : 'Source Code'}
                    </span>
                    <span className="text-[10px] text-[#F4F1EC]/60">~14 MB</span>
                  </div>
                  <h5 className="text-xs font-bold text-white mb-1">
                    {isArabic ? 'كود المشروع للمطورين' : 'Full Source Code'}
                  </h5>
                  <p className="text-[11px] text-[#F4F1EC]/70 leading-relaxed mb-3">
                    {isArabic
                      ? 'مجلدات src/ و public/ وكافة المكونات لتشغيل المشروع عبر npm run dev والتطوير المحلي.'
                      : 'All source folders, components, Tailwind, and configurations for local development.'}
                  </p>
                </div>
                <a
                  href="/durgifts-source-code.zip"
                  download="durgifts-source-code.zip"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 rounded transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'تحميل الكود المصدري' : 'Download Source ZIP'}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Option 1: Cloudflare Pages (Recommended) */}
          <div className="bg-white rounded-xl p-6 border border-[#0A2F5C]/10 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Cloud className="w-5 h-5 text-amber-500" />
                <h4 className="text-base font-bold text-[#0A2F5C]">
                  {isArabic ? 'الخيار الأول (الأفضل والموصى به): Cloudflare Pages' : 'Option 1 (Recommended): Cloudflare Pages'}
                </h4>
              </div>
              <span className="text-[11px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
                {isArabic ? 'مجاني 100% مدى الحياة' : '100% Free Forever'}
              </span>
            </div>

            <p className="text-xs text-[#0A2F5C]/80 leading-relaxed mb-4">
              {isArabic
                ? 'تعتبر كلاودفلير أفضل منصة استضافة ثابتة في العالم؛ حيث تقدم نقل بيانات غير محدود، وحماية DDoS متقدمة، وأسرع شبكة خوادم داخل الإمارات (دبي وأبوظبي)، وتدعم ربط نطاقك الخاص (مثل durgifts.ae) مجاناً وبدون أي رسوم.'
                : 'Cloudflare Pages offers unlimited bandwidth, free custom domain with SSL (e.g. durgifts.ae), zero fees, and edge servers located directly in Dubai and Abu Dhabi.'}
            </p>

            <div className="bg-[#F4F1EC] p-4 rounded-lg text-xs space-y-2 text-[#0A2F5C]">
              <p className="font-bold">{isArabic ? 'طريقة النشر السريعة خلال دقيقتين:' : '2-Minute Deployment Steps:'}</p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#0A2F5C]/85 ps-1">
                <li>
                  {isArabic
                    ? 'قم ببناء المشروع عن طريق الأمر: npm run build لينتج مجلد dist/'
                    : 'Build the website by running `npm run build` which produces the `dist/` directory.'}
                </li>
                <li>
                  {isArabic
                    ? 'سجل دخولك مجاناً إلى dash.cloudflare.com واختر Workers & Pages ثم Create application -> Pages.'
                    : 'Sign up for free at dash.cloudflare.com and go to Workers & Pages -> Create application -> Pages.'}
                </li>
                <li>
                  {isArabic
                    ? 'يمكنك إما سحب وإفلات مجلد dist مباشرة (Direct Upload) أو ربط حساب GitHub الخاص بك.'
                    : 'Choose Direct Upload and drag-and-drop the `dist` folder, or connect your GitHub repository.'}
                </li>
                <li>
                  {isArabic
                    ? 'ستحصل فوراً على رابط رسمي مجاني مثل durgifts.pages.dev مع شهادة HTTPS خضراء.'
                    : 'Instantly receive your live public URL (e.g. durgifts.pages.dev) with automatic HTTPS.'}
                </li>
              </ol>
            </div>
          </div>

          {/* Option 2: Netlify */}
          <div className="bg-white rounded-xl p-6 border border-[#0A2F5C]/10 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-teal-600" />
                <h4 className="text-base font-bold text-[#0A2F5C]">
                  {isArabic ? 'الخيار الثاني: Netlify' : 'Option 2: Netlify'}
                </h4>
              </div>
              <span className="text-[11px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200">
                {isArabic ? 'سحب وإفلات مباشر' : 'Drag & Drop'}
              </span>
            </div>

            <p className="text-xs text-[#0A2F5C]/80 leading-relaxed mb-3">
              {isArabic
                ? 'توفر Netlify استضافة مجانية عبر مجرد سحب مجلد dist وإفلاته في المتصفح على app.netlify.com/drop دون الحاجة لكتابة أي كود أو أوامر برمجية.'
                : 'Netlify Drop lets you deploy the entire website simply by dragging and dropping the `dist` folder onto app.netlify.com/drop without any terminal commands.'}
            </p>
          </div>

          {/* Option 3: GitHub Pages */}
          <div className="bg-white rounded-xl p-6 border border-[#0A2F5C]/10 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-gray-800" />
                <h4 className="text-base font-bold text-[#0A2F5C]">
                  {isArabic ? 'الخيار الثالث: GitHub Pages' : 'Option 3: GitHub Pages'}
                </h4>
              </div>
              <span className="text-[11px] bg-gray-100 text-gray-800 font-bold px-2 py-0.5 rounded border border-gray-300">
                {isArabic ? 'استضافة مفتوحة المصدر' : 'Open Source'}
              </span>
            </div>

            <p className="text-xs text-[#0A2F5C]/80 leading-relaxed">
              {isArabic
                ? 'إذا كان كود مشروعك على GitHub، يمكنك تفعيل GitHub Pages من إعدادات المستودع (Settings -> Pages) واختيار GitHub Actions للنشر التلقائي عند كل تحديث.'
                : 'If your repository is hosted on GitHub, enable GitHub Pages under Repository Settings -> Pages with automated GitHub Actions on push.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F1EC] border-t border-[#0A2F5C]/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded shadow-xs transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
