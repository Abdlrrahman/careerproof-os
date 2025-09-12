'use client';

import React, { useState } from 'react';
import { AssessmentRubric, Locale } from '@/types';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Check, 
  FileText, 
  Layers,
  Terminal,
  Percent
} from 'lucide-react';

interface TechnicalGraderProps {
  rubrics: AssessmentRubric[];
  locale: Locale;
}

export function TechnicalGrader({ rubrics, locale }: TechnicalGraderProps) {
  const [activeRubricId, setActiveRubricId] = useState<string>(rubrics[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRubric = rubrics.find(r => r.id === activeRubricId) || rubrics[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeRubric, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              Staff+ Engineering Evaluation Rubric
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Technical Assessment & Coding Challenge Grader
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Objective, criteria-driven assessment scorecards for Staff/Principal platform engineer take-home projects, systems design, and architecture defenses.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="text-right font-mono">
              <span className="text-[10px] uppercase text-slate-400 block">Overall Score</span>
              <span className="text-xl font-black text-emerald-400">{activeRubric.overallScore}/100</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Rubric' : 'Export Scorecard'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Criteria Breakdown Grid */}
      <div className="space-y-4">
        {activeRubric.criteria.map((c, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                  Dimension 0{idx + 1}
                </span>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {c.dimension}
                </h4>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400">Weight: {c.weightPercent}%</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                  Score: {c.candidateEvaluationScore}/100
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {locale === 'ar' ? c.evaluatorNotesAr : c.evaluatorNotesEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
