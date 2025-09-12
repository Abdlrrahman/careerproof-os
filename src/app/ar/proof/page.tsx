'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProofGraph } from '@/components/proof/ProofGraph';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function ArabicProofPage() {
  const locale: Locale = 'ar';
  const skills = db.getSkills();
  const projects = db.getProjects();
  const experiences = db.getExperiences();
  const credentials = db.getCredentials();
  const achievements = db.getAchievements();
  const evidenceItems = db.getEvidenceItems();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
            خريطة الأدلة التفاعلية
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            مصفوفة العلاقات والأدلة الهندسية
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            استكشف الروابط التفاعلية الموثقة بين المهارات، والمشاريع، ودراسات الحالة، والشهادات المعتمدة.
          </p>
        </div>

        <ProofGraph
          skills={skills}
          projects={projects}
          experiences={experiences}
          credentials={credentials}
          achievements={achievements}
          evidenceItems={evidenceItems}
          locale={locale}
        />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
