'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CandidateComparisonMatrix } from '@/components/compare/CandidateComparisonMatrix';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function ComparePage() {
  const locale: Locale = 'en';
  const dimensions = db.getComparisonDimensions();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Hiring Committee & Leadership Differentiation
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineering Candidate Comparison Matrix
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            An objective, evidence-driven breakdown of how Abdlrrahman's experience in spatial AI, zero-drift ledgers, and squad governance compares to industry profiles.
          </p>
        </div>

        <CandidateComparisonMatrix dimensions={dimensions} locale={locale} />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
