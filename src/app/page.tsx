'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Building, 
  Award, 
  Calendar,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { db } from '@/lib/db/data-store';
import { calculateDynamicSkillMetrics } from '@/lib/skills/evidence-scoring';
import { ViewMode, Locale } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { ProofGraph } from '@/components/proof/ProofGraph';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { getDictionary } from '@/lib/i18n/translations';

export default function HomePage() {
  const locale: Locale = 'en';
  const t = getDictionary(locale);

  const profile = db.getProfile();
  const allRoleLenses = db.getRoleLenses();
  const skills = db.getSkills();
  const projects = db.getProjects();
  const experiences = db.getExperiences();
  const credentials = db.getCredentials();
  const achievements = db.getAchievements();
  const evidenceItems = db.getEvidenceItems();
  const testimonials = db.getTestimonials();

  const [currentRoleLensId, setCurrentRoleLensId] = useState<string>('ai-ml-engineer');
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>('60s');
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const activeLens = allRoleLenses.find(l => l.id === currentRoleLensId) || allRoleLenses[0];
  const skillMetrics = calculateDynamicSkillMetrics(skills, evidenceItems);
  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        locale={locale}
        currentRoleLens={currentRoleLensId}
        onRoleLensChange={setCurrentRoleLensId}
        currentViewMode={currentViewMode}
        onViewModeChange={setCurrentViewMode}
        onOpenAskAi={() => setIsAskAiOpen(true)}
      />

      <main className="flex-1 space-y-16 pb-20">
        {/* Professional Hero */}
        <Hero
          profile={profile}
          activeLens={activeLens}
          allRoleLenses={allRoleLenses}
          currentViewMode={currentViewMode}
          onViewModeChange={setCurrentViewMode}
          onRoleLensChange={setCurrentRoleLensId}
          onOpenAskAi={() => setIsAskAiOpen(true)}
          verifiedSkillCount={skillMetrics.verifiedCount}
          totalProjectsCount={projects.length}
          locale={locale}
        />

        {/* 60s OVERVIEW MODE CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section: Featured Case Studies */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
                  Production Engineering Proof
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {t.sections.featuredCaseStudies}
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All 10+ Systems & Architectures</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          </div>

          {/* Section: Measurable Achievements & Metrics */}
          <div className="space-y-6">
            <div className="flex justify-between items-end pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                  Verified Outcomes
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {t.sections.verifiedMetrics}
                </h2>
              </div>
              <Link
                href="/impact"
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Full Impact Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.filter(a => a.isFeatured).slice(0, 4).map((ach) => (
                <div 
                  key={ach.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-black text-blue-600 dark:text-cyan-400 font-mono tracking-tight">
                      {ach.metricValue}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ach.verificationStatus === 'verified'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {ach.verificationStatus === 'verified' ? 'Verified' : 'Verification Req.'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {ach.metricLabelEn}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {ach.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3M & 10M MODE: INTERACTIVE PROOF GRAPH PREVIEW */}
          {(currentViewMode === '3m' || currentViewMode === '10m') && (
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400">
                    Interactive Evidence Topology
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {t.sections.proofGraphTitle}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.sections.proofGraphSubtitle}
                  </p>
                </div>
                <Link
                  href="/proof"
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Full Screen Topology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
            </div>
          )}

          {/* Section: Testimonials & Executive Endorsements */}
          <div className="space-y-6 pt-4">
            <div className="flex justify-between items-end pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Institutional References
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {t.sections.testimonialsTitle}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test) => (
                <div
                  key={test.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    &ldquo;{test.quoteEn}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {test.authorName}
                      </div>
                      <div className="text-[11px] text-blue-600 dark:text-cyan-400 font-medium">
                        {test.authorTitleEn} &bull; {test.organizationEn}
                      </div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Conversion CTA Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 border border-blue-800/40">
            <div className="space-y-3 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
                Direct Recruiter Booking
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {t.sections.conversionCallout}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.sections.conversionSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 btn-tactile"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.scheduleInterview}</span>
              </a>

              <Link
                href="/fit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 btn-tactile"
              >
                <Cpu className="w-4 h-4 text-cyan-300" />
                <span>{t.nav.fit}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />

      <AskPortfolioModal
        isOpen={isAskAiOpen}
        onClose={() => setIsAskAiOpen(false)}
        locale={locale}
      />
    </div>
  );
}
