'use client';

import React, { useState } from 'react';
import { OfferEvaluation, Locale } from '@/types';
import { 
  DollarSign, 
  TrendingUp, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  PieChart,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface OfferEvaluatorProps {
  offers: OfferEvaluation[];
  locale: Locale;
}

export function OfferEvaluator({ offers, locale }: OfferEvaluatorProps) {
  const [activeOfferId, setActiveOfferId] = useState<string>(offers[0]?.id || '');

  // Interactive Compensation Customizer
  const [baseSalary, setBaseSalary] = useState<number>(145000);
  const [bonus, setBonus] = useState<number>(20000);
  const [equityAnnual, setEquityAnnual] = useState<number>(25000);
  const [taxRatePercent, setTaxRatePercent] = useState<number>(8.5);

  const totalGross = baseSalary + bonus + equityAnnual;
  const estimatedTax = totalGross * (taxRatePercent / 100);
  const netTakeHome = totalGross - estimatedTax;

  const activeOffer = offers.find(o => o.id === activeOfferId) || offers[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              Executive Compensation & Equity Intelligence
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Intelligent Offer & Equity Package Evaluator
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Model total direct compensation, 4-year RSU/Option vesting schedules, and international B2B tax-arbitrage take-home pay.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 shrink-0 self-start sm:self-auto">
            <TrendingUp className="w-4 h-4" />
            <span>Geo-Arbitrage Optimized</span>
          </div>
        </div>

        {/* Live Salary & Equity Sliders */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-400 uppercase font-bold block mb-1">
              Base Salary ($):
            </label>
            <input
              type="number"
              value={baseSalary}
              onChange={(e) => setBaseSalary(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-400 uppercase font-bold block mb-1">
              Performance Bonus ($):
            </label>
            <input
              type="number"
              value={bonus}
              onChange={(e) => setBonus(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-400 uppercase font-bold block mb-1">
              Annual Equity / RSUs ($):
            </label>
            <input
              type="number"
              value={equityAnnual}
              onChange={(e) => setEquityAnnual(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-400 uppercase font-bold block mb-1">
              Effective B2B Tax Rate (%):
            </label>
            <input
              type="number"
              value={taxRatePercent}
              onChange={(e) => setTaxRatePercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Real-time Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-1 shadow-md">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
            Total Annual Gross Package:
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">
            ${totalGross.toLocaleString()} / yr
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            Base + Bonus + Liquid Equity
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-1 shadow-md">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
            Estimated Annual Tax ({taxRatePercent}%):
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
            ${Math.round(estimatedTax).toLocaleString()} / yr
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            Foreign B2B Contractor Rate
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-800/80 text-white space-y-1 shadow-md">
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
            Estimated Net Take-Home:
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
            ${Math.round(netTakeHome).toLocaleString()} / yr
          </div>
          <span className="text-[10px] font-mono text-slate-400 block">
            ~${Math.round(netTakeHome / 12).toLocaleString()} / month net
          </span>
        </div>
      </div>

      {/* Preset Offer Benchmark Models */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold px-1">
          Preset Benchmark Offer Scenarios:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    {offer.employmentType}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
                    Score: {offer.negotiationScore}/100
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {offer.companyName}
                </h3>
                <div className="text-xs font-mono text-slate-500">
                  Role: {offer.roleTitle}
                </div>

                <div className="pt-2 text-xl font-black font-mono text-slate-900 dark:text-white">
                  ${offer.totalAnnualCompensationGross.toLocaleString()} <span className="text-xs font-mono font-normal text-slate-400">Gross / yr</span>
                </div>

                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Net Take-Home: ~${offer.netAnnualTakeHomeEstimated.toLocaleString()} / yr
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  Negotiation Leverage Points:
                </span>
                <ul className="space-y-1">
                  {offer.leveragePoints.map((lp, idx) => (
                    <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{lp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
