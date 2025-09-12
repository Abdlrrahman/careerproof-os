'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Building, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  Scale, 
  Printer,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Locale, JobOpportunity } from '@/types';

interface ContractProposalStudioProps {
  opportunities: JobOpportunity[];
  locale: Locale;
}

export function ContractProposalStudio({ opportunities, locale }: ContractProposalStudioProps) {
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || '');
  const [clientEntityName, setClientEntityName] = useState<string>('Veritas AI Intelligence Inc.');
  const [clientCountry, setClientCountry] = useState<string>('United States (Delaware)');
  const [monthlyRetainerUSD, setMonthlyRetainerUSD] = useState<number>(13333); // $160k / 12
  const [noticePeriodDays, setNoticePeriodDays] = useState<number>(30);
  const [startDate, setStartDate] = useState<string>('2026-09-01');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedOpp = opportunities.find(o => o.id === selectedOppId);

  const handleSelectOpp = (oppId: string) => {
    setSelectedOppId(oppId);
    const opp = opportunities.find(o => o.id === oppId);
    if (opp) {
      setClientEntityName(opp.companyName);
      if (opp.salaryMin) {
        setMonthlyRetainerUSD(Math.round(opp.salaryMin / 12));
      }
    }
  };

  const agreementText = `MASTER SERVICES AGREEMENT (MSA) & STATEMENT OF WORK (SOW)
DOCUMENT ID: MSA-2026-SHIBANI-${selectedOppId || 'DIRECT'}
EFFECTIVE DATE: ${startDate}

PARTIES:
1. CONTRACTOR: Abdlrrahman Shibani (Full Legal: Abdlrrahman Ali Altahir Shibani), Founder & Senior Engineering Lead, residing in Tripoli, Libya / Doha, Qatar.
2. CLIENT: ${clientEntityName}, organized under the laws of ${clientCountry}.

1. ENGAGEMENT & ROLE:
Client hereby engages Contractor as an Independent Technical Lead & Principal Systems Architect. Contractor shall direct production machine learning pipelines, scalable async backend services (FastAPI/PyTorch/PostgreSQL), and engineering squad delivery.

2. COMPENSATION & INVOICING:
- Retainer Fee: $${monthlyRetainerUSD.toLocaleString()} USD per calendar month (equivalent to $${(monthlyRetainerUSD * 12).toLocaleString()} USD annualized).
- Payment Terms: Invoices issued on the 1st of each calendar month, payable Net-15 days via International Swift Wire Transfer or Wise Business.
- Tax Treatment: Contractor is an independent non-US foreign entity. Services performed outside the United States. Form W-8BEN shall be executed to certify non-US tax status with zero federal withholding.

3. INTELLECTUAL PROPERTY & WORK-FOR-HIRE:
All software code, architecture diagrams, APIs, and intellectual property produced by Contractor specifically for Client under this Agreement shall constitute Work-For-Hire and become the exclusive property of Client upon settlement of corresponding monthly invoices.

4. CONFIDENTIALITY & NON-DISCLOSURE:
Contractor agrees to maintain strict confidentiality regarding Client’s proprietary codebase, trade secrets, business strategies, and user data during and following the termination of this agreement.

5. AVAILABILITY & TIMEZONE COMMITMENT:
Contractor guarantees a minimum of 8 daily working hours aligned with EMEA (GMT/CET) and a minimum of 5 daily overlap hours with US East Coast (EST) operations.

6. TERMINATION & NOTICE:
Either party may terminate this Agreement without cause upon providing ${noticePeriodDays} days written notice. Immediate termination is permitted in cases of material breach.

IN WITNESS WHEREOF, the Parties execute this Master Services Agreement as of the Effective Date.

CONTRACTOR:                             CLIENT:
_________________________               _________________________
Abdlrrahman Shibani                     Authorized Representative
Founder & Engineering Lead              ${clientEntityName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(agreementText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([agreementText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `B2B_Contract_Agreement_${clientEntityName.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
              Contract Governance
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              B2B Contractor Agreement & SOW Generator
            </h2>
            <p className="text-xs text-slate-400">
              Generate legally sound Master Services Agreements (MSA) and Statements of Work (SOW) ready for client signature.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm btn-tactile"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Contract!' : 'Copy Agreement'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 btn-tactile"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download .MD</span>
            </button>
          </div>
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-400 block mb-1">Target Pipeline Role</label>
            <select
              value={selectedOppId}
              onChange={(e) => handleSelectOpp(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            >
              {opportunities.map(opp => (
                <option key={opp.id} value={opp.id}>
                  {opp.companyName} ({opp.title})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-400 block mb-1">Client Entity Name</label>
            <input
              type="text"
              value={clientEntityName}
              onChange={(e) => setClientEntityName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-400 block mb-1">Monthly Retainer (USD)</label>
            <input
              type="number"
              step={500}
              value={monthlyRetainerUSD}
              onChange={(e) => setMonthlyRetainerUSD(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-400 block mb-1">Notice Period (Days)</label>
            <input
              type="number"
              value={noticePeriodDays}
              onChange={(e) => setNoticePeriodDays(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contract Viewer */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400 font-mono">
          <span>Agreement Output Preview</span>
          <span>Form W-8BEN & Net-15 Compliant</span>
        </div>

        <pre className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
          {agreementText}
        </pre>
      </div>
    </div>
  );
}
