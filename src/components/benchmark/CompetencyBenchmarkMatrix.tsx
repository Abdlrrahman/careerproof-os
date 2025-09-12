'use client';

import React, { useState } from 'react';
import { 
  CompetencyBenchmark, 
  Locale 
} from '@/types';
import { 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface CompetencyBenchmarkMatrixProps {
  benchmarks: CompetencyBenchmark[];
  locale: Locale;
}

export function CompetencyBenchmarkMatrix({ benchmarks, locale }: CompetencyBenchmarkMatrixProps) {
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>(benchmarks[0]?.id || '');

  const activeBenchmark = benchmarks.find(b => b.id === activeBenchmarkId) || benchmarks[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
                Staff & Principal Engineering Percentiles
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'مصفوفة المقارنة المعيارية والكفاءة الهندسية' : 'Verified Industry Competency Benchmarks'}
            </h2>
            <p className="text-xs text-slate-400">
              {locale === 'ar' ? 'مقارنة دقيقة ومبنية على الأدلة بين خبرات المرشح والمعايير الهندسية العالمية في كبرى شركات التقنية' : 'Quantified percentile comparisons benchmarking Abdlrrahman against global engineering standards in specialized domains.'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Top 1% - 5% Production Caliber</span>
          </div>
        </div>
      </div>

      {/* Benchmark Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benchmarks.map((b) => {
          const isSelected = b.id === activeBenchmarkId;
          return (
            <div
              key={b.id}
              onClick={() => setActiveBenchmarkId(b.id)}
              className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-slate-900 border-blue-500 shadow-lg ring-1 ring-blue-500/50'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
              } space-y-5 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    {b.candidateTier}
                  </span>
                  <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {b.candidatePercentile}th Percentile
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {locale === 'ar' ? b.domainAr : b.domainEn}
                </h3>

                {/* Visual Percentile Comparison Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Industry Median ({b.industryBenchmarkMedian}%)</span>
                    <span className="text-cyan-500 font-bold">Candidate ({b.candidatePercentile}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                    {/* Industry median marker */}
                    <div
                      className="absolute top-0 bottom-0 bg-slate-400 dark:bg-slate-600 w-1"
                      style={{ left: `${b.industryBenchmarkMedian}%` }}
                    />
                    {/* Candidate bar */}
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                      style={{ width: `${b.candidatePercentile}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1">
                  {locale === 'ar' ? b.verifiedEvidenceSummaryAr : b.verifiedEvidenceSummaryEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                  Production Evidence Artifact:
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                  {b.productionArtifact}
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {b.coreCompetencies.map((comp, cIdx) => (
                    <span
                      key={cIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
