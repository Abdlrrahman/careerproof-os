'use client';

import React, { useState } from 'react';
import { OnboardingRoadmap, Locale } from '@/types';
import { 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  Award
} from 'lucide-react';

interface OnboardingPlannerProps {
  roadmaps: OnboardingRoadmap[];
  locale: Locale;
}

export function OnboardingPlanner({ roadmaps, locale }: OnboardingPlannerProps) {
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>(roadmaps[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  const activeRoadmap = roadmaps.find(r => r.id === activeRoadmapId) || roadmaps[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeRoadmap, null, 2));
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
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Executive Onboarding & 30-60-90 Day Strategy
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              30-60-90 Day High-Impact Execution Roadmap
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Strategic execution plan demonstrating immediate architectural discovery, high-leverage quick wins, and long-term organizational scale.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Roadmap' : 'Export 90-Day Plan'}</span>
          </button>
        </div>
      </div>

      {/* Roadmap Phase Cards */}
      {activeRoadmap && (
        <div className="space-y-6">
          {activeRoadmap.phases.map((phase, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6"
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    {phase.phaseRange}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                    {locale === 'ar' ? phase.phaseTitleAr : phase.phaseTitleEn}
                  </h3>
                </div>

                <div className="text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  Theme: <span className="font-bold text-slate-700 dark:text-slate-300">{locale === 'ar' ? phase.themeAr : phase.themeEn}</span>
                </div>
              </div>

              {/* Deliverables & Success Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                    Key Tactical Deliverables:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    {(locale === 'ar' ? phase.keyDeliverablesAr : phase.keyDeliverablesEn).map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider block">
                    Quantifiable Success Criteria:
                  </span>
                  <div className="space-y-2">
                    {(locale === 'ar' ? phase.successMetricsAr : phase.successMetricsEn).map((met, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs font-sans text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium">{met}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
