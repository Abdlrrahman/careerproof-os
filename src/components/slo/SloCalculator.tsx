'use client';

import React, { useState } from 'react';
import { ServiceLevelObjective, Locale } from '@/types';
import { 
  Gauge, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Sliders, 
  RotateCcw
} from 'lucide-react';

interface SloCalculatorProps {
  slos: ServiceLevelObjective[];
  locale: Locale;
}

export function SloCalculator({ slos, locale }: SloCalculatorProps) {
  const [activeSloId, setActiveSloId] = useState<string>(slos[0]?.id || '');
  const [simulatedBurnRate, setSimulatedBurnRate] = useState<number>(1.0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeSlo = slos.find(s => s.id === activeSloId) || slos[0];

  // Dynamic calculation based on simulated burn rate
  const simulatedBudgetRemaining = Math.max(0, Math.min(100, activeSlo.errorBudgetRemainingPercent - (simulatedBurnRate - 1.0) * 8.5));
  const isBudgetCritical = simulatedBudgetRemaining < 20;

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
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Service Level Objectives (SLOs) & Reliability Engineering
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'لوحة أهداف مستوى الخدمة (SLO) وميزانية الأخطاء' : 'Service Level Objectives & Error Budget Simulator'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'مؤشرات أداء كمية لقياس الجاهزية وزمن الاستجابة للأنظمة الحية مع إدارة سياسات استهلاك ميزانية الأخطاء وقواطع النشر' : 'Quantitative SLIs and 30-day rolling SLOs with multi-window burn rate alert thresholds and automated deployment freeze gates.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Google SRE Standards</span>
          </div>
        </div>

        {/* SLO Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
          {slos.map((slo) => (
            <button
              key={slo.id}
              onClick={() => {
                setActiveSloId(slo.id);
                setSimulatedBurnRate(1.0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeSloId === slo.id
                  ? 'bg-blue-600 text-white shadow-xs ring-1 ring-cyan-400/50'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span className="text-cyan-300">{slo.targetSloPercent}%</span>
              <span className="truncate max-w-[200px]">{slo.serviceName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active SLO Dashboard Card */}
      {activeSlo && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          {/* Header Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Target SLO Threshold</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{activeSlo.targetSloPercent}%</div>
              <span className="text-[11px] text-slate-500 font-sans">{activeSlo.measuredWindow}</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold">Current Measured SLI</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{activeSlo.currentPerformancePercent}%</div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-sans font-medium">Within Target Budget</span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-1 ${
              isBudgetCritical
                ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'
                : 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 uppercase font-bold">
                  Error Budget Remaining
                </span>
                {isBudgetCritical && (
                  <span className="text-[9px] font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">
                    Freeze
                  </span>
                )}
              </div>
              <div className={`text-2xl font-black font-mono ${isBudgetCritical ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-cyan-400'}`}>
                {simulatedBudgetRemaining.toFixed(1)}%
              </div>
              <span className="text-[11px] text-slate-500 font-sans">
                {isBudgetCritical ? 'Deployment Gate Freeze Active' : 'Normal Release Flow'}
              </span>
            </div>
          </div>

          {/* Interactive Live Burn Rate Simulator */}
          <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <Sliders className="w-4 h-4" />
                  <span>Interactive Error Budget Burn Rate Simulator:</span>
                </div>
                <p className="text-xs text-slate-400">
                  Slide to simulate traffic surges, transient outages, and test automated deployment freeze thresholds.
                </p>
              </div>

              <button
                onClick={() => setSimulatedBurnRate(1.0)}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to 1.0x</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Simulated Burn Rate: <strong className="text-cyan-400">{simulatedBurnRate.toFixed(1)}x</strong></span>
                <span className={isBudgetCritical ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {isBudgetCritical ? '🚨 Alert: Deployment Freeze Triggered' : '✅ Healthy Operating Margin'}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={simulatedBurnRate}
                onChange={(e) => setSimulatedBurnRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* SLI Definition & Alert Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Mathematical SLI Specification:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {locale === 'ar' ? activeSlo.sliDefinitionAr : activeSlo.sliDefinitionEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Multi-Window Alerting & Mitigation Protocol:
              </span>
              <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                Threshold: {activeSlo.burnRateAlertThreshold}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {locale === 'ar' ? activeSlo.mitigationProtocolAr : activeSlo.mitigationProtocolEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
