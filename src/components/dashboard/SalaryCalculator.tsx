'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  Calculator, 
  Briefcase, 
  Layers, 
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Download,
  Receipt,
  Scale,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Locale } from '@/types';

interface SalaryCalculatorProps {
  locale: Locale;
}

const ROLE_BENCHMARKS = [
  { role: 'Senior AI / Machine Learning Engineer', remoteUSMin: 140000, remoteUSMax: 185000, hourlyMin: 75, hourlyMax: 100 },
  { role: 'Staff Backend & Distributed Systems Lead', remoteUSMin: 150000, remoteUSMax: 195000, hourlyMin: 80, hourlyMax: 110 },
  { role: 'Founder & Engineering Lead (10-15 Squad)', remoteUSMin: 160000, remoteUSMax: 210000, hourlyMin: 85, hourlyMax: 125 },
  { role: 'Digital Transformation / Solutions Architect', remoteUSMin: 135000, remoteUSMax: 175000, hourlyMin: 70, hourlyMax: 95 },
];

type EngagementModel = 'b2b_contractor' | 'eor_employment' | 'sow_milestone';

export function SalaryCalculator({ locale }: SalaryCalculatorProps) {
  const [baseAnnualUSD, setBaseAnnualUSD] = useState<number>(160000);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'QAR'>('USD');
  const [engagementModel, setEngagementModel] = useState<EngagementModel>('b2b_contractor');
  const [activeTab, setActiveTab] = useState<'calc' | 'tax_arbitrage' | 'sow_contract' | 'invoice_preview' | 'negotiation'>('calc');
  const [copied, setCopied] = useState<string | null>(null);

  const exchangeRates = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    QAR: 3.64,
  };

  const currentRate = exchangeRates[currency];
  const convertedAnnual = Math.round(baseAnnualUSD * currentRate);
  const monthlyConverted = Math.round(convertedAnnual / 12);
  const hourlyRate = Math.round(baseAnnualUSD / 1920); // 40 hrs/wk * 48 wks

  // Tax & Purchasing Power Comparison
  const netRetainedB2B = Math.round(baseAnnualUSD * 0.97); // ~3% local effective tax
  const netRetainedSF = Math.round(baseAnnualUSD * 0.59); // ~41% combined Fed+CA tax
  const netRetainedLondon = Math.round(baseAnnualUSD * 0.56); // ~44% UK tax + NI

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sampleSowContract = `STATEMENT OF WORK & B2B INDEPENDENT CONTRACTOR TERMS
Effective Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Contractor: Abdlrrahman Shibani (Founder & Engineering Lead)
Client: [Client Enterprise Name / Legal Entity]

1. ENGAGEMENT SCOPE & SERVICES:
Contractor shall provide senior software engineering leadership, distributed systems architecture, machine learning pipeline development (FastAPI/PyTorch/PostGIS), and technical governance.

2. COMPENSATION & BILLING:
- Retainer Rate: ${currency} ${monthlyConverted.toLocaleString()} per calendar month (${currency} ${convertedAnnual.toLocaleString()} annualized equivalent).
- Payment Terms: Net-15 days from monthly invoice issuance via Wire Transfer / Swift / Wise.
- Tax Classification: Independent B2B foreign contractor; US withholding exempt under Form W-8BEN / W-8BEN-E.

3. AVAILABILITY & SLA:
- Timezone Overlap: Minimum 8 hours daily overlap with UK/Europe (GMT/CET) and 5 hours with US East Coast (EST).
- Sprint Participation: Full integration into client Agile ceremonies, sprint planning, and architectural RFC reviews.

4. INTELLECTUAL PROPERTY & CONFIDENTIALITY:
All software code, documentation, architecture diagrams, and artifacts created shall constitute Work-For-Hire and become the exclusive property of the Client upon invoice payment. Strict bilateral NDA enforced.`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
              Executive Compensation & Contracts Suite
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
              Remote Compensation, Tax Arbitrage & SOW Agreements
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Calculate global market equivalents, generate legally sound B2B contractor agreements, and model geo-arbitrage net retained income.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['USD', 'EUR', 'GBP', 'QAR'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  currency === curr
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Input Slider */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-300">Target Annual Base Compensation (USD):</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              ${baseAnnualUSD.toLocaleString()} USD
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={250000}
            step={5000}
            value={baseAnnualUSD}
            onChange={(e) => setBaseAnnualUSD(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>$100,000</span>
            <span>$160,000 (Target Baseline)</span>
            <span>$250,000+ (Staff/Principal)</span>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'calc'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Market Converter
          </button>
          <button
            onClick={() => setActiveTab('tax_arbitrage')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'tax_arbitrage'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Geo-Arbitrage & Take-Home
          </button>
          <button
            onClick={() => setActiveTab('sow_contract')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'sow_contract'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            B2B Contract Agreement (SOW)
          </button>
          <button
            onClick={() => setActiveTab('invoice_preview')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'invoice_preview'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Invoice Generator
          </button>
          <button
            onClick={() => setActiveTab('negotiation')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'negotiation'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Offer Negotiation Matrix
          </button>
        </div>
      </div>

      {/* Tab 1: Calculated Conversion Cards & Telemetry */}
      {activeTab === 'calc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Converted Annual</span>
              <div className="text-3xl font-black font-mono text-white">
                {currency} {convertedAnnual.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500">Gross annualized market baseline</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Monthly Retainer</span>
              <div className="text-3xl font-black font-mono text-emerald-400">
                {currency} {monthlyConverted.toLocaleString()} / mo
              </div>
              <p className="text-[11px] text-slate-500">Standard monthly B2B invoice</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Contractor Hourly</span>
              <div className="text-3xl font-black font-mono text-blue-400">
                ${hourlyRate} - ${hourlyRate + 15} / hr
              </div>
              <p className="text-[11px] text-slate-500">Based on 160 billable hrs/mo</p>
            </div>
          </div>

          {/* Role Benchmarks Table */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                International Remote Market Benchmarks (2026 Verified Telemetry)
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {ROLE_BENCHMARKS.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="font-bold text-slate-200">
                    {b.role}
                  </div>
                  <div className="flex items-center gap-4 text-right font-mono">
                    <span className="text-emerald-400 font-bold">
                      ${(b.remoteUSMin/1000).toFixed(0)}k - ${(b.remoteUSMax/1000).toFixed(0)}k USD
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      (${b.hourlyMin} - ${b.hourlyMax}/hr)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Geo-Arbitrage & Take-Home Comparison */}
      {activeTab === 'tax_arbitrage' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <span>Geo-Arbitrage & Net Retained Capital Model</span>
            </h3>
            <p className="text-xs text-slate-400">
              Comparing actual take-home savings of a ${baseAnnualUSD.toLocaleString()} USD remote B2B contractor package vs equivalent on-site salaries in major global hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tripoli / Doha Remote B2B */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-300 uppercase font-mono">Remote B2B (Tripoli/Doha)</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">~3% Tax</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                ${netRetainedB2B.toLocaleString()} / yr
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                <strong>97% Net Cash Retained</strong>. Zero US tax withholding under W-8BEN with optimal capital efficiency.
              </p>
            </div>

            {/* San Francisco W2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase font-mono">San Francisco W2</span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">~41% Tax</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-400">
                ${netRetainedSF.toLocaleString()} / yr
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Heavy federal & state tax drag plus high cost of living eats over \$65k+ in annual savings.
              </p>
            </div>

            {/* London PAYE */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase font-mono">London UK (PAYE)</span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">~44% Tax</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-400">
                ${netRetainedLondon.toLocaleString()} / yr
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                45% upper income bracket plus National Insurance contributions significantly reduces net liquidity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: B2B Contract Agreement (SOW) */}
      {activeTab === 'sow_contract' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Standard B2B Statement of Work (SOW) Agreement</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ready-to-sign independent contractor agreement with IP assignment, Net-15 terms, and timezone SLA.
              </p>
            </div>

            <button
              onClick={() => handleCopyText(sampleSowContract, 'sow')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 btn-tactile shadow-sm"
            >
              {copied === 'sow' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'sow' ? 'Copied SOW!' : 'Copy SOW Terms'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {sampleSowContract}
          </pre>
        </div>
      )}

      {/* Tab 4: Invoice Generator Preview */}
      {activeTab === 'invoice_preview' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span>Monthly Retainer Commercial Invoice</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pre-formatted commercial invoice with international Swift/IBAN wire routing.
              </p>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              INV-2026-0801 &bull; Due Net-15
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white text-slate-900 space-y-6 shadow-md font-sans text-xs">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-black text-slate-900">ABDLRAHMAN SHIBANI</h4>
                <p className="text-slate-500 text-[11px]">Founder & Engineering Lead | Software & AI</p>
                <p className="text-slate-500 text-[11px]">Tripoli, Libya / Doha, Qatar &bull; UTC+2 / UTC+3</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-blue-600 font-mono">INVOICE</span>
                <div className="text-[11px] text-slate-500 font-mono">Invoice Date: Aug 25, 2026</div>
                <div className="text-[11px] text-slate-500 font-mono">Due Date: Sep 09, 2026</div>
              </div>
            </div>

            <div className="border-t border-b border-slate-200 py-3 grid grid-cols-12 gap-2 font-bold text-slate-600">
              <div className="col-span-8">Description of Services</div>
              <div className="col-span-2 text-center">Period</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-slate-800 font-medium">
              <div className="col-span-8">
                <strong>Senior Engineering Leadership & Architecture Retainer</strong>
                <p className="text-slate-500 text-[11px]">Production ML systems, microservice backends & 15-person squad delivery.</p>
              </div>
              <div className="col-span-2 text-center font-mono">1 Month</div>
              <div className="col-span-2 text-right font-mono font-bold text-slate-900">
                {currency} {monthlyConverted.toLocaleString()}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline font-black text-sm">
              <span>Total Balance Due:</span>
              <span className="text-base font-mono text-emerald-600">
                {currency} {monthlyConverted.toLocaleString()}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
              Wire Instructions: Swift/BIC & IBAN routing provided upon signed engagement. Form W-8BEN on file.
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Negotiation Matrix */}
      {activeTab === 'negotiation' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="space-y-1 pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Offer Negotiation & Counter-Strategy Playbook</span>
            </h3>
            <p className="text-xs text-slate-400">
              Evidence-based scripts and counter-proposals to anchor senior compensation without friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">
                Scenario A: Initial Base Offer Below Target ($130k vs $160k)
              </span>
              <p className="text-slate-300 leading-relaxed italic">
                &ldquo;Thank you for the offer. Based on my proven track record leading 15-person squads and architecting platforms that cut analysis time by 40% (GeoFusion AI), my baseline expectation for senior leadership is $160,000 USD. If budget is constrained, I am open to a $145k base with a $15k milestone delivery bonus at 6 months.&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-blue-400 uppercase text-[10px] tracking-wider block">
                Scenario B: Converting W2 Offer to B2B Contractor Retainer
              </span>
              <p className="text-slate-300 leading-relaxed italic">
                &ldquo;To eliminate international payroll friction and employer tax overhead, I can engage as an independent B2B contractor under Form W-8BEN. This saves your finance team approximately 15-20% in payroll taxes while giving you the exact same dedicated 40 hr/week squad leadership.&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
