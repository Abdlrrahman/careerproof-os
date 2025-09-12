'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AudioBriefingPlayer } from '@/components/briefing/AudioBriefingPlayer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function BriefingPage() {
  const locale: Locale = 'en';
  const briefings = db.getBriefings();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-cyan-500">
            For Busy Hiring Managers & Talent Partners
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            60-Second Executive Audio Briefing
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Listen to a high-density, 60-second summary of Abdlrrahman&apos;s verified technical background, key architectural achievements, and remote availability.
          </p>
        </div>

        <AudioBriefingPlayer briefings={briefings} locale={locale} />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
