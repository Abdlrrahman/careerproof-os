'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ArabicImpactPage() {
  const locale: Locale = 'ar';
  const achievements = db.getAchievements();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const verifiedAchievements = achievements.filter(a => a.verificationStatus === 'verified');
  const pendingAchievements = achievements.filter(a => a.verificationStatus === 'verification_required');

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
            مؤشرات الأثر والنتائج القابلة للقياس
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            الأثر الموثق والمقاييس المعتمدة
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            عرض شفاف للنتائج المنجزة. كل رقم مدعوم بأدلة إنتاجية أو موضح بوضوح كبيانات بانتظار الاعتماد الخارجي.
          </p>
        </div>

        {/* Verified Impact Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              المؤشرات الإنتاجية المعتمدة رسمياً ({verifiedAchievements.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedAchievements.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-black text-blue-600 dark:text-cyan-400 font-mono tracking-tight">
                      {ach.metricValue}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>موثق</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {ach.metricLabelAr}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {ach.descriptionAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Reported Section */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                نتائج بانتظار الاعتماد الخارجي ({pendingAchievements.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingAchievements.map((ach) => (
              <div
                key={ach.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                      {ach.metricValue}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      <span>بانتظار الوثائق</span>
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {ach.metricLabelAr}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {ach.descriptionAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
