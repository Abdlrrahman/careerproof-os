'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JobFitAnalyzer } from '@/components/fit/JobFitAnalyzer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function FitPage() {
  const locale: Locale = 'en';
  const skills = db.getSkills();
  const projects = db.getProjects();
  const achievements = db.getAchievements();
  const roleLenses = db.getRoleLenses();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JobFitAnalyzer
          skills={skills}
          projects={projects}
          achievements={achievements}
          roleLenses={roleLenses}
          locale={locale}
        />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
