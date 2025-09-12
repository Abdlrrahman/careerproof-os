'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkillMatrix } from '@/components/skills/SkillMatrix';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { calculateDynamicSkillMetrics } from '@/lib/skills/evidence-scoring';
import { Locale } from '@/types';

export default function ArabicSkillsPage() {
  const locale: Locale = 'ar';
  const skills = db.getSkills();
  const categories = db.getSkillCategories();
  const evidenceItems = db.getEvidenceItems();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const metrics = calculateDynamicSkillMetrics(skills, evidenceItems);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            مصفوفة المهارات المحسوبة
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            المهارات المبنية على الأدلة والدرجات الحقيقية
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            يتم حساب مستويات الكفاءة (تأسيسية، تطبيقية، مثبتة، متقدمة، قيادية) آلياً من خلال الشيفرات البرمجية والأنظمة الإنتاجية والشهادات المعتمدة.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-blue-600 dark:text-cyan-400 font-mono">
              {metrics.totalCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">إجمالي المهارات المنشورة</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {metrics.verifiedCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">مهارة معتمدة رسمياً ({metrics.verifiedPercentage}%)</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {metrics.levelDistribution.leadership + metrics.levelDistribution.advanced}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">مهارات متقدمة وقيادية</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {metrics.totalEvidenceCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">وثيقة وسجل إثبات مرفق</div>
          </div>
        </div>

        <SkillMatrix
          skills={skills}
          categories={categories}
          evidenceItems={evidenceItems}
          locale={locale}
        />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
