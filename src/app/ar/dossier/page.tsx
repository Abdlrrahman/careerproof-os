'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { 
  Printer, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Mail, 
  Briefcase, 
  Award,
  Layers,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function ArabicDossierPage() {
  const locale: Locale = 'ar';
  const profile = db.getProfile();
  const projects = db.getProjects();
  const achievements = db.getAchievements();
  const credentials = db.getCredentials();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
              وثيقة الإيجاز التنفيذي
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              الملف التنفيذي الشامل والملخص المعتمد للمرشح
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm btn-tactile"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كملف PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Executive Dossier Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {profile.fullNameAr || profile.fullName}
              </h2>
              <div className="text-sm font-bold text-blue-600 dark:text-cyan-400">
                {profile.primaryTitleAr || profile.primaryTitle}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>طرابلس والدوحة (UTC+2 / UTC+3)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>توافق زمني كامل مع أوروبا وأمريكا</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>جاهزية كاملة للعمل عن بعد</span>
                </span>
              </div>
            </div>

            <div className="text-left space-y-1 text-xs font-mono">
              <div className="text-slate-600 dark:text-slate-300">المستويات الوظيفية المستهدفة:</div>
              <div className="font-bold text-slate-900 dark:text-white">قائد هندسي &bull; مهندس ذكاء اصطناعي &bull; كبير مهندسي نظم</div>
              <div className="text-emerald-600 font-bold pt-1">نطاق الراتب المستهدف: $150k - $190k USD</div>
            </div>
          </div>

          {/* Executive Summary Narrative */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              الملخص التنفيذي
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              قائد هندسي ومؤسس بخبرة تتجاوز 6 سنوات في معمارية الأنظمة الموزعة، ومنصات الذكاء الاصطناعي الجيومكاني، ودفاتر الحسابات المؤسسية (Omega ERP). سجل حافل في قيادة فرق هندسية تضم حتى 15 مهندساً مع تسليم دورات إطلاق برمجية منتظمة وموثوقة بنسبة 100%.
            </p>
          </div>

          {/* 4 Core Production Systems */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              نماذج من المعماريات المنفذة في بيئات الإنتاج
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {projects.slice(0, 4).map(p => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-start">
                    <strong className="text-slate-900 dark:text-white font-bold">{p.titleAr || p.titleEn}</strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-300">
                      {p.roleTitleAr || p.roleTitleEn}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {p.summaryAr || p.summaryEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantified Business Impact & Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Impact */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                النتائج التشغيلية المقاسة
              </h3>
              <div className="space-y-2 text-xs">
                {achievements.slice(0, 4).map(a => (
                  <div key={a.id} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">{a.metricValue} {a.metricLabelAr || a.metricLabelEn}</strong>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{a.descriptionAr || a.descriptionEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                الشهادات المهنية والأكاديمية
              </h3>
              <div className="space-y-2 text-xs">
                {credentials.slice(0, 4).map(c => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2">
                    <div>
                      <strong className="text-slate-900 dark:text-white block">{c.titleAr || c.titleEn}</strong>
                      <span className="text-slate-500">{c.issuerAr || c.issuerEn} &bull; {c.issueDate}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400">
                      معتمد
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="text-slate-500">
              معرض الأدلة التفاعلي: <a href="https://careerproof.abdlrrahman.dev" className="text-blue-600 dark:text-cyan-400 underline">https://careerproof.abdlrrahman.dev</a>
            </div>

            <a
              href="https://calendly.com/abdlrrahman-shibani"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>حجز مكالمة تعارف تقنية</span>
            </a>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
