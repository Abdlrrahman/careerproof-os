'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ResumeViewer } from '@/components/resume/ResumeViewer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function ResumePage() {
  const locale: Locale = 'en';
  const profile = db.getProfile();
  const allRoleLenses = db.getRoleLenses();
  const experiences = db.getExperiences();
  const education = db.getEducation();
  const credentials = db.getCredentials();
  const skills = db.getSkills();
  const projects = db.getProjects();
  const achievements = db.getAchievements();

  const [currentRoleLensId, setCurrentRoleLensId] = useState<string>('ai-ml-engineer');
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const activeLens = allRoleLenses.find(l => l.id === currentRoleLensId) || allRoleLenses[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <ResumeViewer
          profile={profile}
          roleLens={activeLens}
          allRoleLenses={allRoleLenses}
          experiences={experiences}
          education={education}
          credentials={credentials}
          skills={skills}
          projects={projects}
          achievements={achievements}
          locale={locale}
          onLensChange={setCurrentRoleLensId}
        />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
