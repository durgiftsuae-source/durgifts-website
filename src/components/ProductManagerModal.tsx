import React, { useState } from 'react';
import { Product, CategoryKey } from '../types/product';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Save,
  Image as ImageIcon,
  Camera,
  Upload,
  ImagePlus,
  Languages,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';
import initialProductsData from '../data/products.json';
import { translateArabicToEnglish } from '../utils/translate';
import { exportAccountingCodesCSV } from '../utils/accountingExport';

interface ProductManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
}

export const ProductManagerModal: React.FC<ProductManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
}) => {
  const { lang, t } = useLanguage();
  const isArabic = lang === 'ar';

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isTranslating, setIsTranslating] = useState<string | null>(null);

  const handleTranslateName = async () => {
    if (!editingProduct?.name.ar.trim()) return;
    setIsTranslating('name');
    try {
      const translated = await translateArabicToEnglish(editingProduct.name.ar);
      if (translated) {
        setEditingProduct((prev) => (prev ? { ...prev, name: { ...prev.name, en: translated } } : null));
      }
    } finally {
      setIsTranslating(null);
    }
  };

  const handleTranslateDescription = async () => {
    if (!editingProduct?.description.ar.trim()) return;
    setIsTranslating('desc');
    try {
      const translated = await translateArabicToEnglish(editingProduct.description.ar);
      if (translated) {
        setEditingProduct((prev) => (prev ? { ...prev, description: { ...prev.description, en: translated } } : null));
      }
    } finally {
      setIsTranslating(null);
    }
  };

  const handleTranslateAll = async () => {
    if (!editingProduct) return;
    setIsTranslating('all');
    try {
      const promises: Promise<any>[] = [];
      let newNameEn = editingProduct.name.en;
      let newDescEn = editingProduct.description.en;

      if (editingProduct.name.ar.trim()) {
        promises.push(
          translateArabicToEnglish(editingProduct.name.ar).then((res) => {
            if (res) newNameEn = res;
          })
        );
      }
      if (editingProduct.description.ar.trim()) {
        promises.push(
          translateArabicToEnglish(editingProduct.description.ar).then((res) => {
            if (res) newDescEn = res;
          })
        );
      }

      await Promise.all(promises);
      setEditingProduct((prev) =>
        prev
          ? {
              ...prev,
              name: { ...prev.name, en: newNameEn },
              description: { ...prev.description, en: newDescEn }
            }
          : null
      );
    } finally {
      setIsTranslating(null);
    }
  };

  if (!isOpen) return null;

  const handleToggleVisibility = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, visible: !p.visible } : p
    );
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm(isArabic ? 'هل أنت متأكد من حذف هذه القطعة؟' : 'Are you sure you want to delete this piece?')) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isAddingNew) {
      onUpdateProducts([editingProduct, ...products]);
    } else {
      const updated = products.map((p) =>
        p.id === editingProduct.id ? editingProduct : p
      );
      onUpdateProducts(updated);
    }
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleStartAdd = () => {
    const newId = `dur-${Date.now()}`;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setEditingProduct({
      id: newId,
      sku: `DUR-${randomCode}`,
      name: {
        en: 'New Misbaha Piece',
        ar: 'مسبحة جديدة فاخرة'
      },
      category: 'premium-misbahas',
      price: {
        en: 'AED 750',
        ar: '٧٥٠ درهم'
      },
      image: '/assets/aistudio/82_Honey_Barrel_cleaned_1940x2576_07e30b70.jpg',
      description: {
        en: 'Handcrafted luxury misbaha with premium beads and bespoke tassel.',
        ar: 'مسبحة فاخرة مصنوعة يدوياً بحبات راقية وكركوشة مذهبة.'
      },
      specs: {
        en: {
          beadCount: '33 Beads',
          beadShape: 'Barrel Cut',
          material: 'Premium Amber Resin',
          tassel: 'Hand-braided silk cord',
          origin: 'Master Artisanal Craftsmanship'
        },
        ar: {
          beadCount: '٣٣ حبة',
          beadShape: 'قصة برميلية',
          material: 'كهرمان فاخر',
          tassel: 'كركوشة حريرية مجدولة',
          origin: 'صياغة يدوية متقنة عالية الجودة'
        }
      },
      inStock: true,
      featured: false,
      visible: true,
      isBestSeller: false,
      isNewArrival: true
    });
    setIsAddingNew(true);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'products.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyJson = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(products, null, 2)).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Automatically optimize and resize image client-side to keep JSON fast and light
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setEditingProduct((prev) => (prev ? { ...prev, image: compressedDataUrl } : null));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm(isArabic ? 'هل تريد استعادة قائمة المنتجات الأصلية؟' : 'Restore original factory default products?')) {
      onUpdateProducts(initialProductsData as Product[]);
      localStorage.removeItem('dur_custom_products');
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
              <Sparkles className="w-4 h-4 text-[#F0B85A]" />
              <h3 className="text-lg font-bold text-white font-heading">
                {t('managementTitle')}
              </h3>
            </div>
            <p className="text-xs text-[#F4F1EC]/75 mt-1">
              {t('managementSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-xs flex items-center gap-1 transition-colors"
              title="How to manage products"
            >
              <HelpCircle className="w-4 h-4 text-[#F0B85A]" />
              <span className="hidden sm:inline">{isArabic ? 'تعليمات سهلة' : 'Instructions'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructions Banner */}
        {showGuide && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs text-amber-900 text-start space-y-2">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
              <Sparkles className="w-4 h-4 text-[#8A5B0A]" />
              {isArabic ? 'دليل إدارة وتحديث المنتجات بدون أي برمجة:' : 'Beginner Guide to Managing Products:'}
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-900 leading-relaxed ps-1">
              <li>
                {isArabic
                  ? 'يمكنك تعديل أي منتج (الاسم، السعر، الوصف، الصورة، التصنيف) أو إخفاؤه مباشرة من هذه الشاشة.'
                  : 'Edit any piece (Name, Price, Description, Image, Category) or toggle visibility directly here.'}
              </li>
              <li>
                {isArabic
                  ? 'التعديلات تحفظ فورياً في متصفحك وستراها مباشرة على الموقع.'
                  : 'Changes save instantly in your browser and are live on your storefront.'}
              </li>
              <li>
                {isArabic
                  ? 'لحفظ التغييرات بشكل دائم في مجلد الموقع، اضغط زر «تحميل ملف products.json المحدث» وضعه في مجلد src/data/products.json و public/data/products.json.'
                  : 'To save changes permanently into your project folder, click "Download Updated products.json" and place it in src/data/products.json and public/data/products.json.'}
              </li>
            </ol>
          </div>
        )}

        {/* Toolbar */}
        <div className="p-4 bg-white border-b border-[#0A2F5C]/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleStartAdd}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#F0B85A]" />
              <span>{t('addNewProduct')}</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0A2F5C] bg-[#F4F1EC] hover:bg-[#eae5dd] border border-[#0A2F5C]/15 rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#8A5B0A]" />
              <span>{t('downloadJsonBtn')}</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0A2F5C] bg-[#F4F1EC] hover:bg-[#eae5dd] border border-[#0A2F5C]/15 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isArabic ? 'تم النسخ!' : 'Copied!') : t('copyJsonBtn')}</span>
            </button>

            <button
              onClick={() => exportAccountingCodesCSV(products)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0A2F5C] bg-[#F4F1EC] hover:bg-[#eae5dd] border border-[#0A2F5C]/15 rounded transition-colors"
              title="تصدير جدول الأكواد للمحاسبة والمخزون بصيغة CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#8A5B0A]" />
              <span>{isArabic ? 'تصدير أكواد المحاسبة (CSV)' : 'Export Accounting (CSV)'}</span>
            </button>
          </div>

          <button
            onClick={handleResetDefaults}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('resetDefaultBtn')}</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {editingProduct ? (
            /* Edit / Add Form */
            <form onSubmit={handleSaveProduct} className="space-y-4 text-start bg-white p-6 rounded-xl border border-[#0A2F5C]/10">
              <div className="flex items-center justify-between pb-3 border-b border-[#0A2F5C]/10">
                <h4 className="text-base font-bold text-[#0A2F5C]">
                  {isAddingNew ? t('addNewProduct') : t('editProduct')}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className="text-xs text-[#0A2F5C]/60 hover:text-[#0A2F5C]"
                >
                  {t('cancel')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Instant Translation Banner */}
                <div className="col-span-1 sm:col-span-2 bg-[#F0B85A]/15 border border-[#F0B85A]/40 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0A2F5C] flex items-center justify-center shrink-0">
                      <Languages className="w-4 h-4 text-[#F0B85A]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0A2F5C]">
                        {isArabic ? 'الترجمة الفورية الذكية للإنجليزية' : 'Instant Luxury English Translation'}
                      </h4>
                      <p className="text-[11px] text-[#0A2F5C]/75">
                        {isArabic
                          ? 'اكتب اسم ووصف المسبحة بالعربية، ثم اضغط للترجمة الفورية بعبارات فخمة مناسبة للماركة.'
                          : 'Write in Arabic and instantly translate to elegant English with one click.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={Boolean(isTranslating)}
                    onClick={handleTranslateAll}
                    className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold bg-[#0A2F5C] text-[#F0B85A] hover:bg-[#061F3D] rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0 disabled:opacity-50"
                  >
                    {isTranslating === 'all' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>جاري الترجمة...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ترجمة كل الحقول للإنجليزي</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Arabic Name */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-[#0A2F5C]">اسم المسبحة (بالعربية)</label>
                    <button
                      type="button"
                      disabled={Boolean(isTranslating)}
                      onClick={handleTranslateName}
                      className="text-[10px] text-[#8A5B0A] hover:underline font-bold bg-[#F0B85A]/15 px-2 py-0.5 rounded flex items-center gap-1 disabled:opacity-50"
                    >
                      {isTranslating === 'name' ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>جاري الترجمة...</span>
                        </>
                      ) : (
                        <>
                          <Languages className="w-3 h-3" />
                          <span>ترجمة الاسم للإنجليزي</span>
                        </>
                      )}
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={editingProduct.name.ar}
                    placeholder="مثال: مسبحة كهرمان برميل العسل"
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: { ...editingProduct.name, ar: e.target.value }
                      })
                    }
                    className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                  />
                </div>

                {/* English Name */}
                <div>
                  <label className="block font-semibold text-[#0A2F5C] mb-1">Product Name (English)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name.en}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: { ...editingProduct.name, en: e.target.value }
                      })
                    }
                    className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                  />
                </div>

                {/* Category & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#0A2F5C] mb-1">{t('filterCategory')}</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as any
                        })
                      }
                      className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                    >
                      <option value="premium-misbahas">{t('catPremium')}</option>
                      <option value="luxury-misbahas">{t('catLuxury')}</option>
                      <option value="special-collections">{t('catSpecial')}</option>
                      <option value="silver">{t('catSilver')}</option>
                      <option value="gifts-accessories">{t('catGifts')}</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-[#0A2F5C]">
                        {isArabic ? 'كود القطعة والمحاسبة (SKU)' : 'Item SKU / Code'}
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProduct({
                            ...editingProduct,
                            sku: `DUR-${Math.floor(1000 + Math.random() * 9000)}`
                          })
                        }
                        className="text-[10px] text-[#8A5B0A] hover:underline bg-[#F0B85A]/15 px-2 py-0.5 rounded font-medium"
                      >
                        {isArabic ? 'توليد كود تلقائي' : 'Auto-Generate'}
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={editingProduct.sku || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          sku: e.target.value
                        })
                      }
                      placeholder="DUR-8201"
                      className="w-full p-2 font-mono font-bold text-xs border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A] text-[#0A2F5C]"
                    />
                  </div>
                </div>

                {/* Image Upload & Management Area */}
                <div className="col-span-1 sm:col-span-2 bg-[#0A2F5C]/5 p-4 rounded-xl border border-[#0A2F5C]/15">
                  <label className="block font-bold text-xs text-[#0A2F5C] mb-2">
                    {isArabic ? 'صورة القطعة (أسهل طريقة: اختر مباشرة من جوالك أو جهازك)' : 'Piece Photo (Upload directly from device/camera)'}
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Live Thumbnail Preview */}
                    <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-lg overflow-hidden border-2 border-[#F0B85A] bg-white shadow-xs shrink-0">
                      {editingProduct.image ? (
                        <img
                          src={editingProduct.image}
                          alt="Preview"
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-2 text-center text-[10px]">
                          <ImageIcon className="w-6 h-6 mb-1 text-gray-400" />
                          <span>{isArabic ? 'لا توجد صورة' : 'No image'}</span>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 w-full space-y-3">
                      <div>
                        {/* Direct File Upload Button */}
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A2F5C] text-[#F0B85A] hover:bg-[#061F3D] font-bold text-xs shadow-xs transition-colors">
                          <Camera className="w-4 h-4 text-[#F0B85A]" />
                          <span>{isArabic ? '📸 اختر صورة من الجوال أو الكاميرا مباشرة' : '📸 Choose from Gallery or Camera'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-[#0A2F5C]/70 mt-1">
                          {isArabic
                            ? 'سيتم ضغط الصورة وتحسين جودتها تلقائياً لتناسب شاشات الهواتف والموقع بدون إبطاء.'
                            : 'Image will be automatically optimized and compressed for instant loading.'}
                        </p>
                      </div>

                      {/* Quick Preset Images Picker */}
                      <div>
                        <span className="text-[11px] font-semibold text-[#0A2F5C]/80 block mb-1.5">
                          {isArabic ? 'أو اختر بنقرة واحدة من مكتبة مسابح دُر الحالية:' : 'Or pick from existing DUR library:'}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {[
                            { name: 'كهرمان عسلي', url: '/assets/aistudio/82_Honey_Barrel_cleaned_1940x2576_07e30b70.jpg' },
                            { name: 'ندف المريمية', url: '/assets/aistudio/103_Amber_Flake_Sage_cleaned_1940x2576_1c8afa05.jpg' },
                            { name: 'عاجي أحمر', url: '/assets/aistudio/110_Ivory_Veined_Red_cleaned_1940x2576_e68b3fed.jpg' },
                            { name: 'ليموني مشرق', url: '/assets/aistudio/31_Lemon_Gold_cleaned_1940x2576_5e83efc2.jpg' },
                            { name: 'مرجان وفضة 925', url: '/assets/aistudio/56_Coral_Red_cleaned_ecac8465.png' },
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, image: preset.url })}
                              className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium border transition-all ${
                                editingProduct.image === preset.url
                                  ? 'bg-[#0A2F5C] text-[#F0B85A] border-[#0A2F5C] font-bold'
                                  : 'bg-white text-[#0A2F5C] border-[#0A2F5C]/20 hover:border-[#F0B85A]'
                              }`}
                            >
                              <img src={preset.url} alt="" className="w-4 h-4 rounded-full object-cover" />
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Optional manual URL input */}
                      <details className="text-[11px] text-[#0A2F5C]/75">
                        <summary className="cursor-pointer hover:underline text-[#8A5B0A] font-semibold">
                          {isArabic ? 'أو كتابة رابط صورة خارجي (اختياري)...' : 'Or enter custom image URL (optional)...'}
                        </summary>
                        <input
                          type="text"
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          placeholder="https://... أو /assets/..."
                          className="mt-1.5 w-full p-2 text-xs bg-white border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                        />
                      </details>
                    </div>
                  </div>
                </div>

                {/* Arabic Price */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-[#0A2F5C]">السعر (بالعربية)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const digits = editingProduct.price.en.match(/\d+/g)?.join('') || '';
                        if (digits) {
                          const arabicDigits = digits.replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d, 10)]);
                          setEditingProduct({
                            ...editingProduct,
                            price: { ...editingProduct.price, ar: `${arabicDigits} درهم` }
                          });
                        }
                      }}
                      className="text-[10px] text-[#8A5B0A] hover:underline font-bold bg-[#F0B85A]/15 px-2 py-0.5 rounded"
                      title="تحويل تلقائي من السعر الإنجليزي"
                    >
                      تحويل تلقائي: {editingProduct.price.en.match(/\d+/g)?.join('') ? `${editingProduct.price.en.match(/\d+/g)!.join('').replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d, 10)])} درهم` : 'من السعر الإنجليزي'}
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={editingProduct.price.ar}
                    placeholder="مثال: ٧٥٠ درهم أو 750 درهم"
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: { ...editingProduct.price, ar: e.target.value }
                      })
                    }
                    className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                  />
                  {/* Quick-Click Arabic Numerals Keypad */}
                  <div className="mt-1.5 flex flex-wrap items-center gap-1">
                    <span className="text-[10px] text-[#0A2F5C]/60 me-1">أرقام سريعة:</span>
                    {['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', ' درهم'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setEditingProduct({
                            ...editingProduct,
                            price: {
                              ...editingProduct.price,
                              ar: (editingProduct.price.ar || '') + num
                            }
                          });
                        }}
                        className="px-1.5 py-0.5 text-xs font-bold bg-[#F4F1EC] hover:bg-[#F0B85A] hover:text-[#0A2F5C] text-[#0A2F5C] rounded border border-[#0A2F5C]/15 transition-colors"
                      >
                        {num.trim() || 'درهم'}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const converted = (editingProduct.price.ar || '').replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d, 10)]);
                        setEditingProduct({
                          ...editingProduct,
                          price: { ...editingProduct.price, ar: converted }
                        });
                      }}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                    >
                      تحويل الأرقام المدخلة إلى (٠-٩)
                    </button>
                  </div>
                </div>

                {/* English Price */}
                <div>
                  <label className="block font-semibold text-[#0A2F5C] mb-1">Price (English)</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.price.en}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: { ...editingProduct.price, en: e.target.value }
                      })
                    }
                    className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                  />
                </div>

                {/* Arabic Description */}
                <div className="col-span-1 sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-[#0A2F5C]">الوصف (بالعربية)</label>
                    <button
                      type="button"
                      disabled={Boolean(isTranslating)}
                      onClick={handleTranslateDescription}
                      className="text-[10px] text-[#0A2F5C] hover:bg-[#F0B85A] font-bold bg-[#F0B85A]/25 border border-[#F0B85A]/50 px-2.5 py-0.5 rounded flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      {isTranslating === 'desc' ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>جاري الترجمة الفورية...</span>
                        </>
                      ) : (
                        <>
                          <Languages className="w-3.5 h-3.5 text-[#8A5B0A]" />
                          <span>🌐 ترجمة الوصف فورياً إلى الإنجليزية</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={editingProduct.description.ar}
                    placeholder="اكتب وصف المسبحة بالعربية ثم اضغط زر الترجمة أعلاه..."
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: { ...editingProduct.description, ar: e.target.value }
                      })
                    }
                    className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                  />
                </div>

                {/* English Description */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block font-semibold text-[#0A2F5C] mb-1">Description (English)</label>
                  <textarea
                    rows={2}
                    value={editingProduct.description.en}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: { ...editingProduct.description, en: e.target.value }
                      })
                    }
                    className="w-full p-2 border border-[#0A2F5C]/20 rounded focus:ring-1 focus:ring-[#F0B85A]"
                  />
                </div>

                {/* Toggles */}
                <div className="col-span-1 sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          inStock: e.target.checked
                        })
                      }
                      className="rounded text-[#0A2F5C] focus:ring-[#F0B85A]"
                    />
                    <span className="font-semibold text-[#0A2F5C]">{t('inStock')}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isBestSeller || false}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isBestSeller: e.target.checked
                        })
                      }
                      className="rounded text-[#0A2F5C] focus:ring-[#F0B85A]"
                    />
                    <span className="font-semibold text-[#0A2F5C]">
                      {isArabic ? '★ الأكثر طلباً' : '★ Best Seller'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isNewArrival || false}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isNewArrival: e.target.checked
                        })
                      }
                      className="rounded text-[#0A2F5C] focus:ring-[#F0B85A]"
                    />
                    <span className="font-semibold text-[#0A2F5C]">
                      {isArabic ? '✨ وصلنا حديثاً' : '✨ New Arrival'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.featured}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          featured: e.target.checked
                        })
                      }
                      className="rounded text-[#0A2F5C] focus:ring-[#F0B85A]"
                    />
                    <span className="font-semibold text-[#0A2F5C]">
                      {isArabic ? 'قطعة مميزة في الواجهة' : 'Featured on Home'}
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.visible}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          visible: e.target.checked
                        })
                      }
                      className="rounded text-[#0A2F5C] focus:ring-[#F0B85A]"
                    />
                    <span className="font-semibold text-[#0A2F5C]">
                      {editingProduct.visible ? t('visibilityShow') : t('visibilityHide')}
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0A2F5C]/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#0A2F5C] bg-[#F4F1EC] hover:bg-[#eae5dd] rounded"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0A2F5C] hover:bg-[#061F3D] rounded shadow-xs"
                >
                  <Save className="w-3.5 h-3.5 text-[#F0B85A]" />
                  <span>{t('saveChanges')}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Product List Table */
            <div className="space-y-3">
              {products.map((p) => {
                const name = isArabic ? p.name.ar : p.name.en;
                const price = isArabic ? p.price.ar : p.price.en;
                return (
                  <div
                    key={p.id}
                    className={`bg-white rounded-xl p-3 border ${
                      p.visible ? 'border-[#0A2F5C]/10' : 'border-gray-200 opacity-60'
                    } flex items-center justify-between gap-4 transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={name}
                        className="w-12 h-12 object-cover rounded-lg bg-[#F4F1EC]"
                      />
                      <div className="text-start">
                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                          <h5 className="text-xs font-bold text-[#0A2F5C]">{name}</h5>
                          {p.sku && (
                            <span className="font-mono text-[10px] bg-[#0A2F5C]/10 text-[#0A2F5C] px-1.5 py-0.5 rounded font-bold">
                              {p.sku}
                            </span>
                          )}
                          {p.isBestSeller && (
                            <span className="text-[10px] bg-amber-500/15 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                              ★ {isArabic ? 'الأكثر طلباً' : 'Best Seller'}
                            </span>
                          )}
                          {p.isNewArrival && (
                            <span className="text-[10px] bg-emerald-500/15 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                              ✨ {isArabic ? 'وصلنا حديثاً' : 'New'}
                            </span>
                          )}
                          {p.featured && (
                            <span className="text-[10px] bg-[#F0B85A]/20 text-[#8A5B0A] px-1.5 py-0.5 rounded font-semibold">
                              مميز
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#0A2F5C]/60">{price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Visibility Toggle */}
                      <button
                        onClick={() => handleToggleVisibility(p.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          p.visible ? 'text-emerald-700 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={p.visible ? t('visibilityShow') : t('visibilityHide')}
                      >
                        {p.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setIsAddingNew(false);
                        }}
                        className="p-2 text-[#0A2F5C] hover:bg-[#F4F1EC] rounded-lg transition-colors"
                        title={t('editProduct')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={t('deleteProduct')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F1EC] border-t border-[#0A2F5C]/10 flex items-center justify-between text-xs text-[#0A2F5C]/70">
          <span>
            {isArabic ? `إجمالي القطع في الكتالوج: ${products.length}` : `Total pieces in catalog: ${products.length}`}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-[#0A2F5C] hover:bg-white/80 rounded transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
