'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RoiScenario, Locale } from '@/types';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Users
} from 'lucide-react';

interface RoiCalculatorProps {
  scenarios: RoiScenario[];
  locale: Locale;
}

export function RoiCalculator({ scenarios, locale }: RoiCalculatorProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [teamSize, setTeamSize] = useState<number>(10);
  const [sprintWeeks, setSprintWeeks] = useState<number>(2);

  const scenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  // Calculated estimates
  const estimatedHoursSavedPerSprint = Math.round(teamSize * (sprintWeeks * 4) * 0.25);
  const estimatedAnnualHoursSaved = Math.round(estimatedHoursSavedPerSprint * (52 / sprintWeeks));
  const estimatedSprintAcceleration = scenario.typicalSprintVelocityGain;

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Configuration Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Calculator className="w-4 h-4" />
            <span>{locale === 'ar' ? 'حاسبة العائد الاستثماري الهندسي (Engineering ROI)' : 'Executive Impact & ROI Forecast'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {locale === 'ar' ? 'ما هو التحدي الهندسي الأساسي لفريقك؟' : 'What is your engineering squad’s primary bottleneck?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {locale === 'ar' 
              ? 'اختر التحدي التشغيلي لاحتساب العائد المتوقع وخريطة الأثر لأول 90 يوماً.' 
              : 'Select your team scenario to forecast sprint acceleration and the 30-60-90 day milestone roadmap.'}
          </p>
        </div>

        {/* Bottleneck Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenarios.map(s => {
            const isSelected = s.id === selectedScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedScenarioId(s.id)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className={`text-xs font-bold ${isSelected ? 'text-blue-700 dark:text-cyan-300' : 'text-slate-900 dark:text-white'}`}>
                  {locale === 'ar' ? s.bottleneckNameAr : s.bottleneckNameEn}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {locale === 'ar' ? s.descriptionAr : s.descriptionEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sliders: Team Size & Sprint Length */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>Squad Size: {teamSize} Engineers</span>
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={25}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>3 Engineers</span>
              <span>15 (Squad Lead Avg)</span>
              <span>25+ Engineers</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Sprint Cadence: {sprintWeeks} Weeks</span>
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              value={sprintWeeks}
              onChange={(e) => setSprintWeeks(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Week</span>
              <span>2 Weeks (Standard)</span>
              <span>4 Weeks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Impact Forecast Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Estimated Velocity Gain</span>
          <div className="text-3xl font-black font-mono text-blue-600 dark:text-cyan-400">{estimatedSprintAcceleration}</div>
          <p className="text-[11px] text-slate-500">In team throughput & reliability</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Hours Reclaimed / Sprint</span>
          <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">~{estimatedHoursSavedPerSprint} hrs</div>
          <p className="text-[11px] text-slate-500">From reduced drift & automation</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Annual Reclaimed Capacity</span>
          <div className="text-3xl font-black font-mono text-purple-600 dark:text-purple-400">~{estimatedAnnualHoursSaved.toLocaleString()} hrs</div>
          <p className="text-[11px] text-slate-500">Redirected to core product roadmap</p>
        </div>
      </div>

      {/* 30-60-90 Day Milestone Roadmap */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {locale === 'ar' ? 'خريطة الأثر التقني لأول 90 يوماً' : '30-60-90 Day High-Impact Execution Roadmap'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Day 30 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950">
              Days 1 — 30 (Audit & Align)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-1">
              {locale === 'ar' ? scenario.day30MilestoneAr : scenario.day30MilestoneEn}
            </p>
          </div>

          {/* Day 60 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950">
              Days 31 — 60 (Execute & Optimize)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-1">
              {locale === 'ar' ? scenario.day60MilestoneAr : scenario.day60MilestoneEn}
            </p>
          </div>

          {/* Day 90 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-mono font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950">
              Days 61 — 90 (Scale & Institutionalize)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-1">
              {locale === 'ar' ? scenario.day90MilestoneAr : scenario.day90MilestoneEn}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Recommended Profile Lens: <strong className="text-slate-900 dark:text-white capitalize">{scenario.recommendedRoleLensId.replace('-', ' ')}</strong>
          </div>

          <a
            href="https://calendly.com/abdlrrahman-shibani"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm btn-tactile"
          >
            <Calendar className="w-4 h-4" />
            <span>Discuss This Roadmap on a 30-Min Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
