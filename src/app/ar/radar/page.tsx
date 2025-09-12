'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TechRadarViewer } from '@/components/tools/TechRadarViewer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function ArabicTechRadarPage() {
  const locale: Locale = 'ar';
  const radarItems = db.getTechRadar();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            رادار النضج والاستراتيجية الهندسية
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            رادار التقنيات والمعماريات البرمجية
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            تصنيف شفاف للأدوات والأنظمة وأطر العمل وفق حلقات الاعتماد (Adopt)، والتجربة (Trial)، والتقييم (Assess)، والتجنب (Hold) من واقع الخبرة الإنتاجية المباشرة.
          </p>
        </div>

        <TechRadarViewer items={radarItems} locale={locale} />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
