'use client';

import React, { useState } from 'react';
import { EngineeringPostmortem, Locale } from '@/types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Copy, 
  Check, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Terminal,
  Activity
} from 'lucide-react';

interface PostmortemStudioProps {
  postmortems: EngineeringPostmortem[];
  locale: Locale;
}

export function PostmortemStudio({ postmortems, locale }: PostmortemStudioProps) {
  const [activePostmortemId, setActivePostmortemId] = useState<string>(postmortems[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePostmortem = postmortems.find(p => p.id === activePostmortemId) || postmortems[0];

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
              <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
              Blameless Postmortems & Root Cause Analysis
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'مستودع تحليلات ما بعد الحوادث والأسباب الجذرية (RCA)' : 'Production Postmortems & RCA Repository'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'توثيق شفاف وغير لائم للحوادث التقنية السابقة مع تفكيك الأسباب الجذرية عبر منهجية 5 Whys والإجراءات الوقائية' : 'Transparent, blameless postmortems detailing incident timelines, 5 Whys root cause investigations, and permanent automated mitigations.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Blameless Culture Standards</span>
          </div>
        </div>

        {/* Postmortem Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
          {postmortems.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setActivePostmortemId(pm.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activePostmortemId === pm.id
                  ? 'bg-blue-600 text-white shadow-xs ring-1 ring-cyan-400/50'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-cyan-300">{pm.incidentNumber}</span>
              <span className="truncate max-w-[200px]">{locale === 'ar' ? pm.titleAr : pm.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Postmortem Document */}
      {activePostmortem && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                  {activePostmortem.incidentNumber}
                </span>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                  {activePostmortem.severity}
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded">
                  Duration: {activePostmortem.durationMinutes} min
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {locale === 'ar' ? activePostmortem.titleAr : activePostmortem.titleEn}
              </h3>

              <div className="text-xs font-mono text-slate-500">
                Lead Investigator: <span className="font-bold text-slate-700 dark:text-slate-300">{activePostmortem.leadInvestigator}</span> • Date: {activePostmortem.date}
              </div>
            </div>

            <button
              onClick={() => handleCopy(JSON.stringify(activePostmortem, null, 2), `pm-${activePostmortem.id}`)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all shadow-xs"
            >
              {copiedId === `pm-${activePostmortem.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === `pm-${activePostmortem.id}` ? 'Copied Postmortem' : 'Copy Raw RCA'}</span>
            </button>
          </div>

          {/* User Impact Summary */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
            <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400 uppercase font-bold block">
              1. Measured Customer & Operational Impact:
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {locale === 'ar' ? activePostmortem.userImpactAr : activePostmortem.userImpactEn}
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold tracking-wider block">
              2. Incident Timeline & Key Interventions:
            </span>
            <div className="space-y-2 border-l-2 border-slate-200 dark:border-slate-800 pl-4 ml-2">
              {activePostmortem.timeline.map((ev, idx) => (
                <div key={idx} className="relative space-y-0.5">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-slate-900" />
                  <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {ev.time}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                    {locale === 'ar' ? ev.descriptionAr : ev.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Whys Root Cause Investigation */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>3. Five Whys Root Cause Breakdown:</span>
            </div>

            <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
              {(locale === 'ar' ? activePostmortem.fiveWhysAr : activePostmortem.fiveWhysEn).map((why, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2">
                  <span className="text-cyan-500 font-mono font-bold shrink-0">W{idx + 1}:</span>
                  <span>{why}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Lessons Learned & Action Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
              <span className="text-[10px] font-mono text-blue-700 dark:text-cyan-400 uppercase font-bold block">
                4. Key Engineering Lessons Learned:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                {(locale === 'ar' ? activePostmortem.lessonsLearnedAr : activePostmortem.lessonsLearnedEn).map((ls, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{ls}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-bold block">
                5. Preventative Action Items & Status:
              </span>
              <div className="space-y-2 text-xs">
                {activePostmortem.actionItems.map((act) => (
                  <div key={act.id} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{act.status}</span>
                      <span className="text-slate-400">{act.owner}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-sans font-medium">
                      {locale === 'ar' ? act.taskAr : act.taskEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
