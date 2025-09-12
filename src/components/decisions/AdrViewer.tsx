'use client';

import React, { useState } from 'react';
import { 
  ArchitectureDecisionRecord, 
  Locale 
} from '@/types';
import { 
  FileCode2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Calendar, 
  Building, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  GitBranch
} from 'lucide-react';

interface AdrViewerProps {
  adrs: ArchitectureDecisionRecord[];
  locale: Locale;
}

export function AdrViewer({ adrs, locale }: AdrViewerProps) {
  const [selectedAdrId, setSelectedAdrId] = useState<string>(adrs[0]?.id || '');
  const activeAdr = adrs.find(a => a.id === selectedAdrId) || adrs[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header & ADR Selector Tabs */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>{locale === 'ar' ? 'سجل القرارات والمفاضلات المعمارية (ADRs)' : 'Architecture Decision Records (ADRs)'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ar' ? 'توثيق رسمي للقرارات الهندسية والمفاضلات الفنية في المشاريع الميدانية' : 'Formal records of technical trade-offs, evaluated alternatives, and production outcomes'}
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800">
            {adrs.length} ADRs Documented
          </div>
        </div>

        {/* Horizontal ADR Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {adrs.map(adr => (
            <button
              key={adr.id}
              onClick={() => setSelectedAdrId(adr.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedAdrId === adr.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              ADR #{adr.adrNumber}: {adr.titleEn.split(':')[1]?.trim() || adr.titleEn}
            </button>
          ))}
        </div>
      </div>

      {/* Selected ADR Deep Dive Card */}
      {activeAdr && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          {/* Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {activeAdr.status}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeAdr.decisionDate}</span>
              </span>
            </div>

            <div className="text-xs font-semibold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-lg">
              {locale === 'ar' ? activeAdr.relatedSystemAr : activeAdr.relatedSystemEn}
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {locale === 'ar' ? activeAdr.titleAr : activeAdr.titleEn}
            </h2>
          </div>

          {/* Context & Problem Statement */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. {locale === 'ar' ? 'السياق والدافع الهندسي (Context & Problem)' : 'Context & Engineering Problem'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              {locale === 'ar' ? activeAdr.contextAr : activeAdr.contextEn}
            </p>
          </div>

          {/* Decision */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              2. {locale === 'ar' ? 'القرار المعماري المعتمد (Decision Outcome)' : 'Architectural Decision Outcome'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold leading-relaxed bg-blue-50/80 dark:bg-blue-950/60 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
              {locale === 'ar' ? activeAdr.decisionAr : activeAdr.decisionEn}
            </p>
          </div>

          {/* Alternatives & Trade-Offs Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. {locale === 'ar' ? 'البدائل والمفاضلات التي تم تقييمها (Trade-Off Matrix)' : 'Evaluated Alternatives & Trade-Offs'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {activeAdr.alternativesConsidered.map((alt, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-slate-700">
                    <GitBranch className="w-3.5 h-3.5 text-blue-500" />
                    <span>{alt.name}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Pros:</span>
                    <ul className="space-y-1">
                      {alt.pros.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">Cons:</span>
                    <ul className="space-y-1">
                      {alt.cons.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                          <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consequences */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              4. {locale === 'ar' ? 'النتائج والمخرجات المقاسة (Consequences & Production Impact)' : 'Consequences & Production Impact'}
            </h4>
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {locale === 'ar' ? activeAdr.consequencesAr : activeAdr.consequencesEn}
            </div>
          </div>

          {/* Tags */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {activeAdr.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
