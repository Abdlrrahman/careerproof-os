'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  CheckCircle2 
} from 'lucide-react';

export default function CredentialsPage() {
  const locale: Locale = 'en';
  const education = db.getEducation();
  const credentials = db.getCredentials();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Formal Qualifications & Industry Accreditations
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Education & Verified Credentials
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Accredited university degrees, global leadership programs, and professional technology certifications with verifiable credential IDs.
          </p>
        </div>

        {/* Academic Degrees */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              University Degrees & Ongoing Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                      {edu.institutionEn}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {edu.startYear} — {edu.endYear || 'Present'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {edu.degreeEn}
                  </h3>

                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Field: {edu.fieldEn}
                  </div>

                  {edu.gpa && (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg w-fit">
                      {edu.gpa} {edu.creditsEarned && `(${edu.creditsEarned})`}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                    {edu.notesEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Award className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Professional Certifications & Verified Accreditations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                      {cred.issuerEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cred.titleEn}
                  </h3>

                  <div className="text-xs text-slate-500">
                    Issued: {cred.issueDate} {cred.credentialId && `| ID: ${cred.credentialId}`}
                  </div>

                  {/* Skills Demonstrated */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cred.skillsDemonstrated.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {cred.credentialUrl && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={cred.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Verify Certificate Record</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
