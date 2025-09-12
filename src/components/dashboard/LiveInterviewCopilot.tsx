'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Layers, 
  Clock,
  Briefcase
} from 'lucide-react';
import { Locale } from '@/types';

interface LiveInterviewCopilotProps {
  locale: Locale;
}

const TALKING_POINTS = [
  {
    id: 'tp-1',
    category: 'AI / Machine Learning',
    keywords: ['fastapi', 'geobert', 'pytorch', 'ml', 'geofusion', 'subsurface', 'las'],
    triggerQuestion: 'How did you build the spatial ML pipeline in GeoFusion AI?',
    talkingBullets: [
      'Engineered streaming LAS 2.0/3.0 & SEG-Y chunking in Python FastAPI to prevent memory overflow on 50MB+ files.',
      'Fine-tuned domain GeoBERT on 50k+ exploration briefs, achieving 92% classification accuracy.',
      'Unified spatial search (PostGIS) and vector cosine similarity (pgvector) in a single PostgreSQL cluster.',
      'Result: Reduced manual exploratory screening time by ~40% with sub-50ms inference latency.'
    ],
    verifiedMetric: '40% reduction & 250k+ records indexed'
  },
  {
    id: 'tp-2',
    category: 'Backend & Databases',
    keywords: ['postgresql', 'rls', 'row-level security', 'ledger', 'omega erp', 'accounting', 'drift'],
    triggerQuestion: 'How do you guarantee zero data drift and multi-tenant security in financial backends?',
    talkingBullets: [
      'Implemented immutable append-only journal tables in PostgreSQL; blocked UPDATE/DELETE triggers at the engine level.',
      'Enforced atomic balance check constraints: SUM(debits) = SUM(credits) on every committed transaction.',
      'Applied PostgreSQL Row-Level Security (RLS) with session-injected tenant IDs to ensure mathematical tenant isolation.',
      'Result: Scaled to 150+ daily active users and slashed month-end reconciliation from 5 days to 2 hours.'
    ],
    verifiedMetric: '$10M+ balanced volume with 0.00% drift'
  },
  {
    id: 'tp-3',
    category: 'Engineering Leadership',
    keywords: ['squad', 'leadership', 'team size', '15 engineers', 'agile', 'rfc', 'mentorship'],
    triggerQuestion: 'How do you manage and lead distributed squads of up to 15 engineers?',
    talkingBullets: [
      'Instituted lightweight architectural RFC process before any major feature PR, reducing merge rework by 40%.',
      'Enforced strict TypeScript type boundaries and automated CI/CD test gates before production deployment.',
      'Conducted bi-weekly empathetic 1-on-1s and blameless post-mortems to maintain high squad retention and morale.',
      'Result: Maintained 100% on-time milestone delivery across 10+ concurrent initiatives.'
    ],
    verifiedMetric: '15-person squad with 100% on-time delivery'
  },
  {
    id: 'tp-4',
    category: 'Remote & Timezone',
    keywords: ['remote', 'timezone', 'overlap', 'emea', 'us east', 'est', 'gmt', 'hours'],
    triggerQuestion: 'What is your remote setup and timezone availability?',
    talkingBullets: [
      'Operating 100% remotely from Tripoli & Doha (UTC+2 / UTC+3).',
      'Provides 8+ hours of daily overlap with UK and European teams (GMT/CET).',
      'Provides 5+ hours of daily overlap with US East Coast (EST: 9am - 2pm EST window).',
      'Equipped with dedicated fiber connection, backup power UPS, and high-quality audio/video conferencing hardware.'
    ],
    verifiedMetric: '8+ hrs EMEA / 5+ hrs US-East overlap'
  },
  {
    id: 'tp-5',
    category: 'Contract & Tax',
    keywords: ['b2b', 'w-8ben', 'contract', 'rate', 'salary', 'tax', 'hourly', 'retainer'],
    triggerQuestion: 'What is your preferred engagement model and rate?',
    talkingBullets: [
      'Preferred model: Direct B2B independent contractor under Form W-8BEN (exempt from US payroll tax withholding).',
      'Baseline target compensation: $150,000 - $190,000 USD annualized ($12,500 - $15,800 / month retainer).',
      'Standard Net-15 invoicing via Swift / Wise wire transfer with full IP Assignment & Work-For-Hire terms.',
      'Saves the hiring company 15-20% in employer payroll overhead.'
    ],
    verifiedMetric: '$150k - $190k USD B2B Retainer'
  }
];

export function LiveInterviewCopilot({ locale }: LiveInterviewCopilotProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPoints = TALKING_POINTS.filter(tp => {
    if (selectedCategory !== 'all' && tp.category !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      tp.triggerQuestion.toLowerCase().includes(query) ||
      tp.talkingBullets.some(b => b.toLowerCase().includes(query)) ||
      tp.keywords.some(k => k.toLowerCase().includes(query))
    );
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Search Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
              Live In-Call Copilot
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Live Interview Talking Points & Teleprompter
            </h2>
            <p className="text-xs text-slate-400">
              Instant sub-second lookup for exact technical metrics, architectural decisions, and STAR stories during live recruiter calls.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Grounded Answers</span>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type any keyword: 'FastAPI', 'RLS', 'squad size', '40%', 'timezone'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
          {['all', 'AI / Machine Learning', 'Backend & Databases', 'Engineering Leadership', 'Remote & Timezone', 'Contract & Tax'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Talking Points Cards Grid */}
      <div className="space-y-4">
        {filteredPoints.map(tp => (
          <div
            key={tp.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                  {tp.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                  &ldquo;{tp.triggerQuestion}&rdquo;
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                  {tp.verifiedMetric}
                </span>
                <button
                  onClick={() => handleCopy(tp.talkingBullets.join('\n'), tp.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Bullets"
                >
                  {copiedId === tp.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Bullets */}
            <div className="space-y-2">
              {tp.talkingBullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5"></span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
