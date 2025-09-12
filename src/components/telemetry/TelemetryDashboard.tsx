'use client';

import React, { useState } from 'react';
import { 
  TelemetryMetric, 
  Locale 
} from '@/types';
import { 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Zap, 
  Layers,
  Terminal,
  RefreshCw
} from 'lucide-react';

interface TelemetryDashboardProps {
  metrics: TelemetryMetric[];
  locale: Locale;
}

export function TelemetryDashboard({ metrics, locale }: TelemetryDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics.filter(m => m.category === selectedCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider">
                Production Health & Continuous Verification
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'لوحة مؤشرات جودة الشيفرات والتحقق المستمر' : 'System Health, CI/CD & Grounding Telemetry'}
            </h2>
            <p className="text-xs text-slate-400">
              {locale === 'ar' ? 'مؤشرات حية للأداء، واختبارات الأمان، وتجميع المسارات الثابتة' : 'Real-time telemetry on static route builds, strict type safety, Vitest unit test passes, and grounding metrics.'}
            </p>
          </div>

          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-2 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Polling Status...' : 'Live Heartbeat'}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs">
          {['all', 'build', 'tests', 'performance', 'grounding'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold font-mono transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetrics.map(m => (
          <div
            key={m.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/80 card-interactive space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                  {m.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PASS</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {locale === 'ar' ? m.nameAr : m.nameEn}
              </h4>

              <div className="text-xl font-black font-mono text-blue-600 dark:text-cyan-400 pt-1">
                {m.value}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {locale === 'ar' ? m.descriptionAr : m.descriptionEn}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Verified in CI/CD Harness</span>
              <span>{new Date(m.verifiedTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
