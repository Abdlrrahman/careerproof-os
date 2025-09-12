'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ComparisonDimension, Locale } from '@/types';
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  ExternalLink,
  Users
} from 'lucide-react';

interface CandidateComparisonMatrixProps {
  dimensions: ComparisonDimension[];
  locale: Locale;
}

export function CandidateComparisonMatrix({ dimensions, locale }: CandidateComparisonMatrixProps) {
  const [activeDimensionId, setActiveDimensionId] = useState<string>(dimensions[0]?.id || '');

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              Executive Hiring Decision Framework
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'مصفوفة المقارنة الهندسية والتمايز النوعي' : 'Engineering Differentiation & Candidate Comparison'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'مقارنة موضوعية مبنية على الأدلة توضح الفوارق الجوهرية بين المطور العام، المهندس المتخصص، وخبرات عبد الرحمن القيادية' : 'An objective, side-by-side comparison illustrating why Abdlrrahman delivers Staff/Principal-level velocity across complex architectures.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Verifiable Evidence-Backed Claims</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards Stack */}
      <div className="space-y-6">
        {dimensions.map((dim) => (
          <div
            key={dim.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
          >
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    Engineering Dimension:
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {locale === 'ar' ? dim.categoryAr : dim.categoryEn}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  {locale === 'ar' ? dim.verifiedEvidenceMetricAr : dim.verifiedEvidenceMetricEn}
                </span>

                <Link
                  href={dim.proofRouteUrl}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>Inspect Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3-Column Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
              {/* Column 1: Generic Fullstack Developer */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Generic Developer</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {locale === 'ar' ? dim.genericEngineerAr : dim.genericEngineerEn}
                </p>
              </div>

              {/* Column 2: Senior Specialist */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <Users className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Standard Senior Specialist</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {locale === 'ar' ? dim.seniorSpecialistAr : dim.seniorSpecialistEn}
                </p>
              </div>

              {/* Column 3: Shibani Caliber Advantage */}
              <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-blue-700 dark:text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Abdlrrahman Shibani</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-500">
                    Staff Advantage
                  </span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {locale === 'ar' ? dim.shibaniAdvantageAr : dim.shibaniAdvantageEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
