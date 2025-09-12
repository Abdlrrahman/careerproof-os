'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { GraduationCap, Award, ShieldCheck, ExternalLink } from 'lucide-react';

export default function ArabicCredentialsPage() {
  const locale: Locale = 'ar';
  const education = db.getEducation();
  const credentials = db.getCredentials();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            المؤهلات الأكاديمية والاعتمادات الدولية
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            التعليم والشهادات المعتمدة
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            الشهادات الجامعية وبرامج القيادة العالمية والشهادات الاحترافية مع روابط وأرقام التحقق الرسمية.
          </p>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              المؤهلات الجامعية والأكاديمية
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
                      {edu.institutionAr}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {edu.startYear} — {edu.endYear || 'حتى الآن'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {edu.degreeAr}
                  </h3>

                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    التخصص: {edu.fieldAr}
                  </div>

                  {edu.gpa && (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg w-fit">
                      المعدل التراكمي: {edu.gpa}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                    {edu.notesAr}
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
              الشهادات والبرامج القيادية المعتمدة
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
                      {cred.issuerAr}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span>معتمد</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cred.titleAr}
                  </h3>

                  <div className="text-xs text-slate-500">
                    تاريخ الإصدار: {cred.issueDate} {cred.credentialId && `| المعرف: ${cred.credentialId}`}
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
                      <span>التحقق من الشهادة عبر الجهة المصدرة</span>
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
