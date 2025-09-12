'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { Calendar, Award } from 'lucide-react';

export default function ArabicAboutPage() {
  const locale: Locale = 'ar';
  const profile = db.getProfile();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            السيرة التنفيذية وفلسفة القيادة الهندسية
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            من هو عبد الرحمن الشيباني؟
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            مؤسس وقائد هندسي متخصص في خطوط معالجة الذكاء الاصطناعي، والأنظمة الموزعة عالية الأداء، والتحول الرقمي للقطاعين العام والخاص والمنظمات الدولية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                القيادة الهندسية وتأسيس المشاريع التقنية
              </h2>
              <p>
                بصفته مؤسساً ورئيساً تنفيذياً لشركتي <strong>تكنوبول (Technopole)</strong> و<strong>نيكسورا تك (Nexora Tech)</strong>، قاد عبد الرحمن فرقاً هندسية متعددة التخصصات تصل إلى 15 مهندساً ومطوراً، وطور منصات برمجية وأنظمة ذكاء اصطناعي لقطاعات الطاقة والاتصالات وتخطيط الموارد المؤسسية.
              </p>
              <p>
                في منصة <strong>GeoFusion AI</strong>، صمم معمارية استكشاف جيومكانية تعتمد على FastAPI ونماذج GeoBERT ونظم PostGIS، مما قلل وقت التحليل والاستكشاف الجيولوجي بنسبة تقارب 40%.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                التعاون الدولي والتحول الرقمي البلدي
              </h2>
              <p>
                قاد عبد الرحمن مبادرات التحول الرقمي مع كبرى المنظمات الدولية مثل <strong>VNG International</strong> و<strong>Handicap International</strong> وبرامج <strong>Chemonics</strong> الدولية.
              </p>
              <p>
                شملت إنجازاته رقمنة بوابات الخدمات البلدية لأكثر من <strong>200 ألف مواطن</strong>، وتنفيذ برامج تدريبية وتأهيلية لأكثر من <strong>150 موظفاً بلدياً ومؤسسياً</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">
                الهوية والبيانات الأساسية
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 block">الاسم القانوني الكامل</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profile.legalNameAr}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">الموقع</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profile.locationAr}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">اللغات</span>
                  <span className="font-semibold text-slate-900 dark:text-white">العربية (اللغة الأم)، الإنجليزية (طلاقة كاملة)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">طبيعة العمل</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">100% عن بُعد وفرق موزعة دولياً</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={profile.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>حجز موعد مقابلة</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
