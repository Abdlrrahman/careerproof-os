'use client';

import React, { useState } from 'react';
import { NegotiationScenario, Locale } from '@/types';
import { 
  DollarSign, 
  MessageSquare, 
  Sparkles, 
  Copy, 
  Check, 
  PhoneCall, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Layers
} from 'lucide-react';

interface NegotiationPlaybookProps {
  scenarios: NegotiationScenario[];
  locale: Locale;
}

export function NegotiationPlaybook({ scenarios, locale }: NegotiationPlaybookProps) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic Variables Customizer
  const [variables, setVariables] = useState({
    recruiterName: 'Sarah Jenkins',
    company: 'ScaleAI Systems',
    targetRole: 'Staff Distributed Systems Lead'
  });

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  const interpolate = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\{\{recruiter_name\}\}/g, variables.recruiterName)
      .replace(/\{\{company\}\}/g, variables.company)
      .replace(/\{\{role_title\}\}/g, variables.targetRole);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              Executive Negotiation & Compensation Strategy
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Executive Negotiation Playbook & Counter-Offer Scripts
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Value-anchored negotiation scripts, email counter-proposals, and verbal talking points grounded in verifiable architectural deliverables.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <TrendingUp className="w-4 h-4" />
            <span>High-Leverage Scripts</span>
          </div>
        </div>

        {/* Dynamic Variable Customizer */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              Recruiter / Hiring Manager:
            </label>
            <input
              type="text"
              value={variables.recruiterName}
              onChange={(e) => setVariables({ ...variables, recruiterName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              Target Company:
            </label>
            <input
              type="text"
              value={variables.company}
              onChange={(e) => setVariables({ ...variables, company: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              Target Role Title:
            </label>
            <input
              type="text"
              value={variables.targetRole}
              onChange={(e) => setVariables({ ...variables, targetRole: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            onClick={() => setActiveScenarioId(sc.id)}
            className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
              activeScenarioId === sc.id
                ? 'bg-slate-900 border-cyan-500 text-white shadow-md ring-1 ring-cyan-500/50'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-500 dark:text-cyan-400 uppercase">
                {sc.targetFocus}
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {sc.scenarioTitleEn}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Active Scenario Preview & Script */}
      {activeScenario && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                {activeScenario.targetFocus}
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                {activeScenario.scenarioTitleEn}
              </h3>
            </div>

            <button
              onClick={() => handleCopy(`${interpolate(activeScenario.suggestedSubjectEn)}\n\n${interpolate(activeScenario.emailScriptEn)}`, `full-${activeScenario.id}`)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto transition-all shadow-xs"
            >
              {copiedId === `full-${activeScenario.id}` ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === `full-${activeScenario.id}` ? 'Copied Full Script' : 'Copy Email Script'}</span>
            </button>
          </div>

          {/* Subject Line */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase font-bold">
              <span>Subject Line:</span>
              <button
                onClick={() => handleCopy(interpolate(activeScenario.suggestedSubjectEn), `sub-${activeScenario.id}`)}
                className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                {copiedId === `sub-${activeScenario.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Subject</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-slate-900 dark:text-white">
              {interpolate(activeScenario.suggestedSubjectEn)}
            </div>
          </div>

          {/* Email Script Body */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase font-bold">
              <span>Email Body Script:</span>
              <button
                onClick={() => handleCopy(interpolate(activeScenario.emailScriptEn), `body-${activeScenario.id}`)}
                className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                {copiedId === `body-${activeScenario.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Body</span>
              </button>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {interpolate(activeScenario.emailScriptEn)}
            </div>
          </div>

          {/* Verbal Phone Talking Points */}
          <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-cyan-400 uppercase">
              <PhoneCall className="w-4 h-4" />
              <span>Verbal Phone Discussion Talking Points:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
              {activeScenario.phoneTalkingPointsEn.map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
