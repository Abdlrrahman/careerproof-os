'use client';

import React, { useState } from 'react';
import { EngineeringRunbook, Locale } from '@/types';
import { 
  Terminal, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Flame, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface RunbookLibraryProps {
  runbooks: EngineeringRunbook[];
  locale: Locale;
}

export function RunbookLibrary({ runbooks, locale }: RunbookLibraryProps) {
  const [activeRunbookId, setActiveRunbookId] = useState<string>(runbooks[0]?.id || '');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const activeRunbook = runbooks.find(r => r.id === activeRunbookId) || runbooks[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    if (severity.includes('Critical')) {
      return 'text-rose-400 bg-rose-950 border-rose-800';
    }
    return 'text-amber-400 bg-amber-950 border-amber-800';
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Production Incident & Operations Runbooks
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'مكتبة أدلة التشغيل وحل أعطال الأنظمة الحية' : 'Engineering Operations & Incident Runbook Library'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'أدلة تشغيل قياسية وإجراءات طوارئ مجربة للترقيات الحية لقواعد البيانات بدون توقف، واحتواء أعطال البحث المتجهي' : 'Battle-tested operational procedures for zero-downtime database migrations, vector memory exhaustion, and multi-tenant key rotation.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified Production Procedures</span>
          </div>
        </div>

        {/* Runbook Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
          {runbooks.map((rb) => (
            <button
              key={rb.id}
              onClick={() => setActiveRunbookId(rb.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeRunbookId === rb.id
                  ? 'bg-blue-600 text-white shadow-xs ring-1 ring-cyan-400/50'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-cyan-300">{rb.code}</span>
              <span className="truncate max-w-[200px]">{locale === 'ar' ? rb.titleAr : rb.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Runbook Viewer */}
      {activeRunbook && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  {activeRunbook.code}
                </span>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getSeverityBadge(activeRunbook.severity)}`}>
                  {activeRunbook.severity}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {locale === 'ar' ? activeRunbook.titleAr : activeRunbook.titleEn}
              </h3>

              <div className="text-xs font-mono text-slate-500">
                Target System: <span className="font-bold text-slate-700 dark:text-slate-300">{activeRunbook.targetSystem}</span> • Estimated MTTR: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeRunbook.estimatedTimeToResolve}</span>
              </div>
            </div>

            <button
              onClick={() => handleCopy(JSON.stringify(activeRunbook, null, 2), `full-rb-${activeRunbook.id}`)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all shadow-xs"
            >
              {copiedSnippetId === `full-rb-${activeRunbook.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSnippetId === `full-rb-${activeRunbook.id}` ? 'Copied Runbook' : 'Copy Full Runbook'}</span>
            </button>
          </div>

          {/* Summary & Prerequisites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Operational Summary:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {locale === 'ar' ? activeRunbook.summaryAr : activeRunbook.summaryEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Required Prerequisites & Safety Checks:
              </span>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-sans">
                {(locale === 'ar' ? activeRunbook.prerequisitesAr : activeRunbook.prerequisitesEn).map((pre, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Procedure */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider block">
              Step-by-Step Incident Execution Protocol:
            </span>

            <div className="space-y-4">
              {activeRunbook.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                        Step 0{step.stepNumber}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        {locale === 'ar' ? step.titleAr : step.titleEn}
                      </h4>
                    </div>

                    {step.commandSnippet && (
                      <button
                        onClick={() => handleCopy(step.commandSnippet!, `step-${step.stepNumber}`)}
                        className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono text-xs flex items-center gap-1 shrink-0 self-start sm:self-auto"
                      >
                        {copiedSnippetId === `step-${step.stepNumber}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSnippetId === `step-${step.stepNumber}` ? 'Copied Command' : 'Copy Snippet'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                    {locale === 'ar' ? step.explanationAr : step.explanationEn}
                  </p>

                  {step.commandSnippet && (
                    <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 overflow-x-auto whitespace-pre">
                      {step.commandSnippet}
                    </div>
                  )}

                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verification: {locale === 'ar' ? step.verificationAr : step.verificationEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rollback Procedure */}
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-700 dark:text-amber-400 font-bold uppercase">
              <RotateCcw className="w-4 h-4" />
              <span>Emergency Rollback Protocol:</span>
            </div>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-3 rounded-xl border border-amber-200 dark:border-amber-900">
              {locale === 'ar' ? activeRunbook.rollbackProcedureAr : activeRunbook.rollbackProcedureEn}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
