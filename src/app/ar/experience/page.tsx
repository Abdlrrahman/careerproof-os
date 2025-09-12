'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { Building, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ArabicExperiencePage() {
  const locale: Locale = 'ar';
  const experiences = db.getExperiences();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            الخبرات المهنية والمسار القيادي المتداخل
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            المسار المهني والقيادي
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            تمثيل دقيق للأدوار القيادية المتزامنة وتأسيس الشركات وإدارة البرامج التقنية مع المنظمات الدولية.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.roleTitleAr}
                    </h2>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        الدور الحالي
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{exp.companyNameAr}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span>{exp.locationAr}</span>
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-slate-400 shrink-0">
                  <span>{exp.startDate.substring(0, 7)} — {exp.endDate ? exp.endDate.substring(0, 7) : 'حتى الآن'}</span>
                  {exp.teamSize && (
                    <div className="text-slate-500 text-[11px] font-sans mt-0.5">
                      حجم الفريق: {exp.teamSize} مهندسين
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {exp.summaryAr}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    المسؤوليات الهندسية الرئيسية
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {exp.responsibilitiesAr.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-cyan-400 font-bold">&bull;</span>
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>النتائج والمخرجات الموثقة</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                    {exp.keyOutcomesAr.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
