import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, FileCode, Lock, Heart } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/icons/SocialIcons';
import { Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/translations';

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getDictionary(locale);
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Identity & Value Prop */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-mono text-xs">
                AS
              </div>
              <span>CareerProof OS — Abdlrrahman Shibani</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              {locale === 'ar'
                ? 'نظام تشغيل مهني مبني على الأدلة الموثقة لإثبات الكفاءة الهندسية والقيادية في الذكاء الاصطناعي، وهندسة البرمجيات، والتحول الرقمي للفرص الدولية عن بُعد.'
                : 'A bilingual, evidence-driven career operating system designed to substantiate senior technical competence and engineering leadership across AI, software architecture, and digital transformation for high-impact remote opportunities.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {locale === 'ar'
                  ? 'جميع المهارات والمقاييس مرتبطة بأدلة معتمدة ومشاريع إنتاجية موثقة.'
                  : 'Zero fabricated claims: Every skill level is dynamically computed from tangible evidence.'}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {locale === 'ar' ? 'التنقل المباشر' : 'Core Architecture'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={locale === 'ar' ? '/ar/skills' : '/skills'} className="hover:text-white transition-colors">
                  {t.nav.skills}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/proof' : '/proof'} className="hover:text-white transition-colors">
                  {t.nav.proof}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/projects' : '/projects'} className="hover:text-white transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/blueprints' : '/blueprints'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مخططات المعمارية' : 'System Blueprints'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/whiteboard' : '/whiteboard'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'لوحة تصميم المعمارية' : 'System Architecture Whiteboard'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/graph' : '/graph'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'رسم المعرفة التفاعلي' : 'Knowledge Graph Explorer'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/compare' : '/compare'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مصفوفة التمايز والمقارنة' : 'Candidate Comparison Matrix'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/benchmark' : '/benchmark'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مصفوفة المقارنة المعيارية' : 'Competency Benchmarks'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/chaos' : '/chaos'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'محاكي أعطال الأنظمة' : 'Chaos Simulator'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/trust' : '/trust'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'بوابة الثقة والأمان' : 'Trust & Compliance'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/trajectory' : '/trajectory'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'خريطة المسارات المهنية' : 'Career Trajectory Map'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/decisions' : '/decisions'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'القرارات المعمارية (ADRs)' : 'Architecture Decisions'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/rfc' : '/rfc'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مقترحات التصميم (RFCs)' : 'Engineering RFCs'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/runbooks' : '/runbooks'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'أدلة التشغيل والطوارئ' : 'Incident Runbooks'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/postmortems' : '/postmortems'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'تحليلات الحوادث والأسباب الجذرية' : 'Postmortems & RCAs'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/slo' : '/slo'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'أهداف مستوى الخدمة (SLO)' : 'Service Level Objectives (SLOs)'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/dossier' : '/dossier'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الملف التنفيذي الشامل' : 'Executive Dossier'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/telemetry' : '/telemetry'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'لوحة القياسات الحية' : 'System Telemetry'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/briefing' : '/briefing'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'الإيجاز الصوتي للمسؤولين' : '60s Audio Briefing'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/radar' : '/radar'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'رادار التقنيات' : 'Tech Radar'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/insights' : '/insights'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'المقالات والأوراق التقنية' : 'Engineering Insights'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/playground' : '/playground'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'مختبر الواجهات البرمجية' : 'API Sandbox'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/hire' : '/hire'} className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'نموذج العائد الاستثماري' : 'ROI & Hiring Model'}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/resume' : '/resume'} className="hover:text-white transition-colors">
                  {t.nav.resume}
                </Link>
              </li>
              <li>
                <Link href={locale === 'ar' ? '/ar/fit' : '/fit'} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  {t.nav.fit}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Channels & Formats */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {locale === 'ar' ? 'قنوات التواصل والتوظيف' : 'Connect & Hire'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://linkedin.com/in/abdlrrahman-shibani" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/abdlrrahman-shibani" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repositories</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://calendly.com/abdlrrahman-shibani" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Interview</span>
                </a>
              </li>
              <li>
                <Link 
                  href={locale === 'ar' ? '/ar/resume' : '/resume'}
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <FileCode className="w-4 h-4" />
                  <span>ATS & JSON Resume</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={locale === 'ar' ? '/ar/dashboard' : '/dashboard'} 
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>{t.nav.commandCenter}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} Abdlrrahman Shibani. Built with Next.js 15 App Router, TypeScript & Tailwind.
          </div>
          <div className="flex items-center gap-4">
            <span>Tripoli &bull; Doha &bull; Remote Globally</span>
            <span>&bull;</span>
            <span>UTC+2 / UTC+3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
