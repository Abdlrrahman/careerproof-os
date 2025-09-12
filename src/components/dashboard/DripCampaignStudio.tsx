'use client';

import React, { useState } from 'react';
import { DripCampaign, DripSequenceStep, Locale } from '@/types';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Calendar,
  Layers,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Play
} from 'lucide-react';

interface DripCampaignStudioProps {
  campaigns: DripCampaign[];
  locale: Locale;
}

export function DripCampaignStudio({ campaigns, locale }: DripCampaignStudioProps) {
  const [activeCampaignId, setActiveCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic Variable Replacements
  const [variables, setVariables] = useState({
    recruiterName: 'Alex Mercer',
    company: 'NextGen Autonomous',
    roleTitle: 'Staff Spatial AI Architect'
  });

  const activeCampaign = campaigns.find(c => c.id === activeCampaignId) || campaigns[0];
  const activeStep = activeCampaign?.steps[activeStepIndex] || activeCampaign?.steps[0];

  const interpolate = (text: string) => {
    if (!text) return '';
    return text
      .replace(/\{\{recruiter_name\}\}/g, variables.recruiterName)
      .replace(/\{\{company\}\}/g, variables.company)
      .replace(/\{\{role_title\}\}/g, variables.roleTitle);
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
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Automated Grounded Outreach Sequences
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Recruiter Outreach Drip Campaign Sequencer
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Multi-channel, zero-fluff touch cadences designed around verifiable architectural proof, ADR trade-offs, and 60-second executive audio briefings.
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <TrendingUp className="w-4 h-4" />
            <span>{activeCampaign.estimatedResponseRate}</span>
          </div>
        </div>

        {/* Dynamic Variables Customizer */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
              Recruiter / Leader Name:
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
              value={variables.roleTitle}
              onChange={(e) => setVariables({ ...variables, roleTitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Cadence Timeline Steps Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {activeCampaign.steps.map((step, idx) => {
          const isSelected = idx === activeStepIndex;
          return (
            <div
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
              } space-y-1.5 flex flex-col justify-between`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                <span className="text-cyan-600 dark:text-cyan-400">Day {step.dayOffset}</span>
                <span className="text-slate-400">{step.channel}</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {step.stageNameEn.split(':')[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Step Message Preview & Copier */}
      {activeStep && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                {activeStep.channel} • Day {activeStep.dayOffset} Cadence
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                {activeStep.stageNameEn}
              </h3>
            </div>

            <button
              onClick={() => handleCopy(`${interpolate(activeStep.subjectEn)}\n\n${interpolate(activeStep.bodyEn)}\n\nLink: ${activeStep.groundedArtifactUrl}`, `full-step-${activeStepIndex}`)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm btn-tactile shrink-0 self-start sm:self-auto"
            >
              {copiedId === `full-step-${activeStepIndex}` ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === `full-step-${activeStepIndex}` ? 'Copied Full Message!' : 'Copy Full Message'}</span>
            </button>
          </div>

          {/* Subject Line */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase font-bold">
              <span>Subject Line:</span>
              <button
                onClick={() => handleCopy(interpolate(activeStep.subjectEn), `sub-${activeStepIndex}`)}
                className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                {copiedId === `sub-${activeStepIndex}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Subject</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-slate-900 dark:text-white">
              {interpolate(activeStep.subjectEn)}
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase font-bold">
              <span>Message Body:</span>
              <button
                onClick={() => handleCopy(interpolate(activeStep.bodyEn), `body-${activeStepIndex}`)}
                className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                {copiedId === `body-${activeStepIndex}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Body</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {interpolate(activeStep.bodyEn)}
            </div>
          </div>

          {/* Grounded Artifact Link & CTA */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase font-bold text-blue-700 dark:text-cyan-400">
                Grounded Verification Artifact Included:
              </div>
              <div className="font-mono text-slate-700 dark:text-slate-300">
                {activeStep.callToActionEn}: <span className="text-blue-600 dark:text-cyan-300 font-bold">{activeStep.groundedArtifactUrl}</span>
              </div>
            </div>

            <a
              href={activeStep.groundedArtifactUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto hover:bg-blue-500 transition-colors shadow-xs"
            >
              <span>Preview Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
