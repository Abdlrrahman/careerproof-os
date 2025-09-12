'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Users, 
  DollarSign, 
  Globe 
} from 'lucide-react';
import { Profile, RoleLens, ViewMode, Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/translations';

interface HeroProps {
  profile: Profile;
  activeLens: RoleLens;
  allRoleLenses: RoleLens[];
  currentViewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRoleLensChange: (lensId: string) => void;
  onOpenAskAi: () => void;
  verifiedSkillCount: number;
  totalProjectsCount: number;
  locale: Locale;
}

export function Hero({
  profile,
  activeLens,
  allRoleLenses,
  currentViewMode,
  onViewModeChange,
  onRoleLensChange,
  onOpenAskAi,
  verifiedSkillCount,
  totalProjectsCount,
  locale,
}: HeroProps) {
  const t = getDictionary(locale);

  return (
    <section className="relative pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-tr from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">
        {/* Availability & Recruiter Viewing Mode Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.hero.badge}</span>
          </div>

          {/* 60s / 3m / 10m Mode Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.hero.viewingMode}
            </span>
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              {(['60s', '3m', '10m'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`px-3 py-1 rounded-md font-bold transition-all ${
                    currentViewMode === mode 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mode === '60s' ? t.hero.mode60s : mode === '3m' ? t.hero.mode3m : t.hero.mode10m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Positioning & Hero Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
                {locale === 'ar' ? profile.legalNameAr : profile.legalName}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {locale === 'ar' ? profile.primaryTitleAr : profile.primaryTitle}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-3xl">
              {locale === 'ar' ? profile.supportingTitleAr : profile.supportingTitle}
            </p>

            {/* Role Lens Targeted Summary */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-800 dark:text-cyan-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>
                    {locale === 'ar' ? 'العدسة النشطة:' : 'Active Role Lens:'} {locale === 'ar' ? activeLens.titleAr : activeLens.titleEn}
                  </span>
                </span>
                <span className="text-[11px] font-mono text-blue-600 dark:text-cyan-400">
                  {activeLens.highlightedSkillIds.length} Verified Focus Skills
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'ar' ? activeLens.summaryAr : activeLens.summaryEn}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={profile.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2 btn-tactile"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.scheduleInterview}</span>
              </a>

              <Link
                href={locale === 'ar' ? '/ar/resume' : '/resume'}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 btn-tactile"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{t.hero.downloadResume}</span>
              </Link>

              <button
                onClick={onOpenAskAi}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 btn-tactile"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.hero.askAi}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats & Recruiter Summary Card */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {locale === 'ar' ? 'نظرة سريعة موثقة' : 'Verified Summary Matrix'}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Proven</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {verifiedSkillCount}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {t.hero.verifiedSkillsCount}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {totalProjectsCount}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {t.hero.projectsDelivered}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  6+ Yrs
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {t.hero.yearsExperience}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  15
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {t.hero.teamSizeLed}
                </div>
              </div>
            </div>

            {/* Quick Timezone & Language Notice */}
            <div className="text-xs space-y-1.5 pt-1 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span>UTC+2 / UTC+3 (Full EU/London & US-East Overlap)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span>Bilingual: Arabic (Native), English (Fluent)</span>
              </div>
            </div>

            <Link
              href={locale === 'ar' ? '/ar/fit' : '/fit'}
              className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
            >
              <span>{t.nav.fit}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 10 Role Lenses Horizontal Selector */}
        <div className="space-y-3 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.hero.roleLensLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {allRoleLenses.map((lens) => (
              <button
                key={lens.id}
                onClick={() => onRoleLensChange(lens.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all btn-tactile ${
                  activeLens.id === lens.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {locale === 'ar' ? lens.titleAr : lens.titleEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
