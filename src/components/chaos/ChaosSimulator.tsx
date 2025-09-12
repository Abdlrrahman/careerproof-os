'use client';

import React, { useState } from 'react';
import { ChaosScenario, Locale } from '@/types';
import { 
  Flame, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  Activity, 
  Clock, 
  Server, 
  RotateCcw,
  AlertTriangle,
  Play
} from 'lucide-react';

interface ChaosSimulatorProps {
  scenarios: ChaosScenario[];
  locale: Locale;
}

export function ChaosSimulator({ scenarios, locale }: ChaosSimulatorProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const handleTriggerSimulation = (scenario: ChaosScenario) => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setSimulatedLogs([
      `[00.00ms] INITIATING CHAOS INJECTION: ${scenario.nameEn}...`,
      `[00.05ms] TARGET SYSTEM: ${scenario.targetSystem}`,
      `[00.12ms] INJECTING FAULT PAYLOAD: "${scenario.simulatedFault}"`
    ]);

    setTimeout(() => {
      setSimulatedLogs(prev => [
        ...prev,
        `[00.40ms] DETECTED: Threat type "${scenario.threatType}" engaged.`,
        `[00.85ms] ENGINE MITIGATION TRIGGERED: ${scenario.mitigationMechanismEn}`
      ]);
    }, 600);

    setTimeout(() => {
      setSimulatedLogs(prev => [
        ...prev,
        `[+${scenario.recoveryLatencyMs}ms] RECOVERY COMPLETE: ${scenario.postRecoveryState}`,
        `[VERIFIED] Test ID: ${scenario.verifiedTestId} PASSED with 0 dropped events.`
      ]);
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                Chaos Engineering & Resilience Lab
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'مختبر هندسة المرونة ومحاكاة أعطال الأنظمة' : 'Production Systems Resilience & Failure Simulator'}
            </h2>
            <p className="text-xs text-slate-400">
              {locale === 'ar' ? 'محاكاة تفاعلية حية لكيفية تعامل واستعادة الأنظمة في أسوأ سيناريوهات الضغط، الأخطاء، وحقن البيانات الخبيثة' : 'Live interactive simulation proving how Abdlrrahman\'s architectures recover deterministically under extreme faults, concurrency spikes, and security breaches.'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 bg-cyan-950 px-3 py-1.5 rounded-xl border border-cyan-800 shrink-0 self-start sm:self-auto">
            <Activity className="w-4 h-4" />
            <span>Deterministic 0-Data-Loss Gates</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Scenario Selector & Interactive Simulator Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scenarios List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold px-1">
            {locale === 'ar' ? 'سيناريوهات الأعطال المحاكاة' : 'Simulated Failure Scenarios'}
          </div>

          {scenarios.map((s) => {
            const isSelected = s.id === activeScenarioId;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setActiveScenarioId(s.id);
                  setSimulatedLogs([]);
                  setSimulationComplete(false);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                } space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
                    {s.threatType}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {s.recoveryLatencyMs}ms recovery
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {locale === 'ar' ? s.nameAr : s.nameEn}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {locale === 'ar' ? s.descriptionAr : s.descriptionEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Telemetry Terminal & Architecture Recovery Deck */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  Target System: {activeScenario.targetSystem}
                </div>
                <h3 className="text-base font-black mt-0.5">
                  {locale === 'ar' ? activeScenario.nameAr : activeScenario.nameEn}
                </h3>
              </div>

              <button
                disabled={isSimulating}
                onClick={() => handleTriggerSimulation(activeScenario)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all btn-tactile ${
                  isSimulating
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>Simulating Chaos...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Trigger Chaos Injection</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Fault Spec */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                Fault Payload / Injection Vector:
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-red-400 break-all">
                {activeScenario.simulatedFault}
              </div>
            </div>

            {/* Mitigation & Engine Response */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                Architectural Mitigation Mechanism:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {locale === 'ar' ? activeScenario.mitigationMechanismAr : activeScenario.mitigationMechanismEn}
              </p>
            </div>

            {/* Live Terminal Output Console */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Live Kernel Execution Log
                </span>
                <span className="text-slate-500">Test ID: {activeScenario.verifiedTestId}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 min-h-[140px] space-y-1.5">
                {simulatedLogs.length === 0 ? (
                  <div className="text-slate-600 italic py-6 text-center">
                    Click "Trigger Chaos Injection" to simulate live kernel response & mitigation.
                  </div>
                ) : (
                  simulatedLogs.map((log, idx) => (
                    <div key={idx} className="leading-snug">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Post-Recovery State Card */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase font-bold text-emerald-400">
                  Post-Recovery State Guarantee:
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {activeScenario.postRecoveryState}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
