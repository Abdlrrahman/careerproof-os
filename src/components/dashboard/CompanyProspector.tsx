'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CompanyProspect, Locale } from '@/types';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  TrendingUp, 
  Globe, 
  ExternalLink,
  Target,
  Search,
  Filter
} from 'lucide-react';

interface CompanyProspectorProps {
  prospects: CompanyProspect[];
  locale: Locale;
}

export function CompanyProspector({ prospects, locale }: CompanyProspectorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const industries = ['all', 'Spatial AI & Energy', 'FinTech & Core Banking', 'Public Sector & GovTech'];

  const filteredProspects = prospects.filter(p => {
    const matchesIndustry = selectedIndustry === 'all' || p.industry === selectedIndustry;
    const matchesSearch = p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.techStackMatches.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              Strategic Account Intelligence & Outbound Pipeline
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Reverse Engineering Target Company Prospector
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Identify high-growth global platforms and sovereign technology leaders with matching architectural requirements across PyTorch, PostGIS, and distributed ledgers.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <TrendingUp className="w-4 h-4" />
            <span>{prospects.length} High-Intent Accounts</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, tech stacks (PyTorch, PostGIS, RLS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto text-xs font-mono">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {ind === 'all' ? 'All Sectors' : ind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prospect Account Cards Stack */}
      <div className="space-y-4">
        {filteredProspects.map((p) => (
          <div
            key={p.id}
            className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    {p.industry}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {p.headquarters} • {p.remoteTier}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{p.companyName}</span>
                  <span className="text-xs font-mono font-normal text-slate-400">({p.domain})</span>
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                    Affinity Fit:
                  </span>
                  <span className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {p.fitScore}%
                  </span>
                </div>

                <Link
                  href="/dashboard/campaigns"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch Drip</span>
                </Link>
              </div>
            </div>

            {/* Tech Stack Match Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Matched Core Stack Requirements:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {p.techStackMatches.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Decision Maker & Strategic Entry Angle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-mono text-slate-500">
                <span className="font-bold text-slate-900 dark:text-slate-300">Target Persona:</span>
                <span className="text-blue-600 dark:text-cyan-400">{p.targetDecisionMakerTitle}</span>
              </div>

              <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                <span className="font-bold text-slate-900 dark:text-white font-mono">Recommended Hook: </span>
                {locale === 'ar' ? p.strategicEntryAngleAr : p.strategicEntryAngleEn}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
