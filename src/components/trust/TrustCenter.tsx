'use client';

import React, { useState } from 'react';
import { TrustControl, Locale } from '@/types';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Globe2, 
  Server, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Scale,
  Award
} from 'lucide-react';

interface TrustCenterProps {
  controls: TrustControl[];
  locale: Locale;
}

export function TrustCenter({ controls, locale }: TrustCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredControls = selectedCategory === 'all'
    ? controls
    : controls.filter(c => c.category === selectedCategory);

  const trustWhitepaperMarkdown = `# Enterprise Security, Compliance & Trust Whitepaper
## Abdlrrahman Shibani — Principal AI & Systems Architect

### 1. Data Privacy & Sovereign Compliance
* **Zero Data Selling**: Strictly zero user data selling or third-party telemetry harvesting.
* **Bilateral NDAs**: Execution of bilateral non-disclosure agreements under standard international jurisdiction.
* **Sovereign Non-US Compliance**: Full compatibility with EMEA, GCC, and North American enterprise client contracts.

### 2. Code Security & SAST Pipeline Gates
* **Strict Type Safety**: TypeScript boundary enforcement ensuring zero runtime undefined property crashes.
* **Parameterized Queries**: All database mutations utilize parameter binding and Row-Level Security (RLS) policies.
* **Automated CI/CD Auditing**: Continuous automated dependency vulnerability scanning via GitHub Actions.

### 3. International B2B Contracting & Tax Alignment
* **US IRS Form W-8BEN**: Certified foreign contractor status enabling direct zero-withholding B2B billing for US entities.
* **Intellectual Property Work-for-Hire**: Complete bilateral assignment of all client intellectual property upon receipt of payment.
* **Payment Terms**: Standard international SWIFT wire transfers, Wise Business, and USDC corporate settlement on Net-15 terms.

### 4. Operational Redundancy Guarantee
* **Dual-ISP Fiber Internet**: Automatic failover between primary fiber and secondary 5G cellular uplink.
* **Hardware Battery Backup (UPS)**: 4+ hours continuous operation during grid instability.
* **Encrypted Daily Backups**: Offsite AES-256 encrypted repository synchronization.
`;

  const handleDownloadWhitepaper = () => {
    const blob = new Blob([trustWhitepaperMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Abdlrrahman_Shibani_Security_Trust_Whitepaper_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Enterprise Client Governance
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'بوابة الثقة، الأمان، والامتثال القانوني الدولي' : 'Enterprise Trust, Security & Compliance Portal'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'معايير الأمان البرمجي الصارمة، حماية الخصوصية، اتفاقيات السرية، والامتثال الضريبي الدولي للتعاقد المؤسسي B2B' : 'Comprehensive security controls, IP assignment compliance, bilateral NDAs, and international B2B contracting readiness for enterprise partners.'}
            </p>
          </div>

          <button
            onClick={handleDownloadWhitepaper}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm btn-tactile shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>{locale === 'ar' ? 'تحميل وثيقة الأمان (.MD)' : 'Download Trust Whitepaper (.MD)'}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
          {['all', 'Security & SAST', 'Data Privacy & NDA', 'International Legal & IP', 'Operational Resilience'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Controls' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredControls.map((ctrl) => (
          <div
            key={ctrl.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-200 dark:border-cyan-900">
                  {ctrl.category}
                </span>

                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                  <CheckCircle2 className="w-3 h-3" />
                  {ctrl.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {locale === 'ar' ? ctrl.titleAr : ctrl.titleEn}
              </h3>

              <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                Standard: {ctrl.complianceStandard}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {locale === 'ar' ? ctrl.descriptionAr : ctrl.descriptionEn}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px] font-mono">
              <span className="text-slate-400 uppercase text-[10px] font-bold block">
                Verification Audit Method:
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {ctrl.auditMethod}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
