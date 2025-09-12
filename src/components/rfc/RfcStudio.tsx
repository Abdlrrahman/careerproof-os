'use client';

import React, { useState } from 'react';
import { RfcDocument, Locale } from '@/types';
import { 
  FileCode2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  Terminal,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface RfcStudioProps {
  rfcs: RfcDocument[];
  locale: Locale;
}

export function RfcStudio({ rfcs, locale }: RfcStudioProps) {
  const [activeRfcId, setActiveRfcId] = useState<string>(rfcs[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeRfc = rfcs.find(r => r.id === activeRfcId) || rfcs[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
              RFC Engineering Governance & Architecture Proposals
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'استوديو ومستودع وثائق طلب التعليقات RFC' : 'Engineering RFC Proposal & Governance Studio'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'وثائق معمارية رسمية تفصل القرارات البرمجية، البدائل التي تم رفضها، والآثار الأمنية وخطط الإطلاق التدريجي' : 'Production-grade engineering RFCs detailing technical motivation, rejected alternatives, security implications, and zero-downtime canary rollout plans.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Staff Engineering Standards</span>
          </div>
        </div>

        {/* RFC Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
          {rfcs.map((rfc) => (
            <button
              key={rfc.id}
              onClick={() => setActiveRfcId(rfc.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeRfcId === rfc.id
                  ? 'bg-blue-600 text-white shadow-xs ring-1 ring-cyan-400/50'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-cyan-300">{rfc.rfcNumber}</span>
              <span className="truncate max-w-[200px]">{locale === 'ar' ? rfc.titleAr : rfc.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active RFC Document Viewer */}
      {activeRfc && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  {activeRfc.rfcNumber}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                  {activeRfc.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {locale === 'ar' ? activeRfc.titleAr : activeRfc.titleEn}
              </h3>

              <div className="text-xs font-mono text-slate-500">
                Author: <span className="font-bold text-slate-700 dark:text-slate-300">{activeRfc.author}</span> • Date: {activeRfc.createdDate}
              </div>
            </div>

            <button
              onClick={() => handleCopy(JSON.stringify(activeRfc, null, 2), `rfc-${activeRfc.id}`)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all shadow-xs"
            >
              {copiedId === `rfc-${activeRfc.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === `rfc-${activeRfc.id}` ? 'Copied Raw RFC' : 'Copy RFC Spec'}</span>
            </button>
          </div>

          {/* Section 1: Executive Summary & Motivation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                1. Executive Summary:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {locale === 'ar' ? activeRfc.summaryAr : activeRfc.summaryEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                2. Problem Statement & Motivation:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {locale === 'ar' ? activeRfc.motivationAr : activeRfc.motivationEn}
              </p>
            </div>
          </div>

          {/* Section 2: Technical Proposal */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              3. Proposed Architectural Solution:
            </span>
            <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {locale === 'ar' ? activeRfc.technicalProposalAr : activeRfc.technicalProposalEn}
            </div>
          </div>

          {/* Section 3: Rejected Alternatives Considered */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              4. Rejected Alternatives & Trade-Off Analysis:
            </span>
            <div className="space-y-2">
              {(locale === 'ar' ? activeRfc.alternativesConsideredAr : activeRfc.alternativesConsideredEn).map((alt, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-sans flex items-start gap-2">
                  <span className="text-amber-500 font-bold font-mono">❌</span>
                  <span>{alt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Security Implications & Rollout Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
              <span className="text-[10px] font-mono text-blue-700 dark:text-cyan-400 uppercase font-bold block">
                5. Security & Isolation Controls:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {locale === 'ar' ? activeRfc.securityImplicationsAr : activeRfc.securityImplicationsEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-bold block">
                6. Phased Rollout & Canary Verification:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                {locale === 'ar' ? activeRfc.rolloutPlanAr : activeRfc.rolloutPlanEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
