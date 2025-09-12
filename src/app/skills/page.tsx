'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkillMatrix } from '@/components/skills/SkillMatrix';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { calculateDynamicSkillMetrics } from '@/lib/skills/evidence-scoring';
import { Locale } from '@/types';
import { ShieldCheck, Layers, Award } from 'lucide-react';

export default function SkillsPage() {
  const locale: Locale = 'en';
  const skills = db.getSkills();
  const categories = db.getSkillCategories();
  const evidenceItems = db.getEvidenceItems();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const metrics = calculateDynamicSkillMetrics(skills, evidenceItems);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Deterministic Skill Taxonomy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Evidence-Based Skills Matrix
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every published skill tier (Familiar, Applied, Proven, Advanced, Leadership) is mathematically computed from attached code repositories, production deployments, and accredited certifications.
          </p>
        </div>

        {/* Dynamic Metric Overview Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-blue-600 dark:text-cyan-400 font-mono">
              {metrics.totalCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Total Published Skills</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {metrics.verifiedCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Externally Verified ({metrics.verifiedPercentage}%)</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {metrics.levelDistribution.leadership + metrics.levelDistribution.advanced}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Advanced / Leadership Tiers</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {metrics.totalEvidenceCount}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Attached Proof Artifacts</div>
          </div>
        </div>

        {/* Interactive Skills Matrix Component */}
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
