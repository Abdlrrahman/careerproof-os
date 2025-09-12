'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Project, 
  CaseStudy, 
  Locale 
} from '@/types';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Code2, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Cpu 
} from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { getDictionary } from '@/lib/i18n/translations';

interface CaseStudyViewerProps {
  project: Project;
  caseStudy?: CaseStudy;
  locale: Locale;
}

export function CaseStudyViewer({
  project,
  caseStudy,
  locale,
}: CaseStudyViewerProps) {
  const t = getDictionary(locale);

  if (!caseStudy) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {locale === 'ar' ? 'دراسة الحالة قيد التوثيق' : 'Case Study Documentation in Review'}
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          {locale === 'ar' ? project.summaryAr : project.summaryEn}
        </p>
        <Link 
          href={locale === 'ar' ? '/ar/projects' : '/projects'}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Back Link */}
      <div>
        <Link 
          href={locale === 'ar' ? '/ar/projects' : '/projects'}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale === 'ar' ? 'العودة لدراسات الحالة' : 'Back to All Case Studies'}</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {project.status.replace('_', ' ')} &bull; {project.confidentiality.replace('_', ' ')}
          </span>
          <div className="flex items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live System</span>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {locale === 'ar' ? project.titleAr : project.titleEn}
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
            {locale === 'ar' ? project.subtitleAr : project.subtitleEn}
          </p>
        </div>

        {/* Recruiter Executive 60s Summary */}
        <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-cyan-400 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>{locale === 'ar' ? 'الملخص التنفيذي لمسؤولي التوظيف (60s Summary)' : 'Recruiter Executive Summary (60s Read)'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {locale === 'ar' ? caseStudy.recruiterSummaryAr : caseStudy.recruiterSummaryEn}
          </p>
        </div>
      </div>

      {/* Problem, Context & Scope */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span>{locale === 'ar' ? 'المشكلة وسياق الأعمال' : 'The Problem & Business Context'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {locale === 'ar' ? caseStudy.problemAr : caseStudy.problemEn}
        </p>

        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">
          {locale === 'ar' ? 'القيود التقنية وحجم البيانات' : 'Constraints & Scale'}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {locale === 'ar' ? caseStudy.contextAndConstraintsAr : caseStudy.contextAndConstraintsEn}
        </p>
      </section>

      {/* Technical Architecture & Decisions */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          <span>{locale === 'ar' ? 'المعمارية الهندسية وقرارات التصميم' : 'Technical Architecture & System Design'}</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {locale === 'ar' ? caseStudy.architectureAr : caseStudy.architectureEn}
        </p>

        {/* Key Architectural Decisions Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {locale === 'ar' ? 'المفاضلات والقرارات المعمارية الرئيسية' : 'Architectural Trade-Offs & RFC Decisions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(locale === 'ar' ? caseStudy.keyDecisionsAr : caseStudy.keyDecisionsEn).map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{item.decision}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.rationale}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Technology Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {caseStudy.techStack.map((tech, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Measurable Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security Considerations */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Security & Zero-Trust Architecture</span>
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {locale === 'ar' ? caseStudy.securityConsiderationsAr : caseStudy.securityConsiderationsEn}
          </p>
        </section>

        {/* Measurable Results */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Verified Outcomes & Metrics</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {(locale === 'ar' ? caseStudy.resultsAr : caseStudy.resultsEn).map((res, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-tight">{res}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Lessons Learned */}
      <section className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
        <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>Engineering Retrospective & Lessons Learned</span>
        </span>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {locale === 'ar' ? caseStudy.lessonsLearnedAr : caseStudy.lessonsLearnedEn}
        </p>
      </section>
    </article>
  );
}
