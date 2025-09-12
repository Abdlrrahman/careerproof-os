'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Layers, 
  FileText, 
  HelpCircle, 
  BarChart3, 
  Settings, 
  ArrowLeft, 
  ShieldCheck, 
  Mic,
  DollarSign,
  Sparkles,
  Scale,
  Zap,
  Archive,
  Send,
  Calculator,
  Target,
  Award,
  MessageSquare,
  Presentation,
  Calendar
} from 'lucide-react';
import { Locale } from '@/types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAr = pathname.startsWith('/ar');
  const basePrefix = isAr ? '/ar/dashboard' : '/dashboard';

  const navItems = [
    { label: 'Overview', labelAr: 'نظرة عامة', href: basePrefix, icon: LayoutDashboard },
    { label: 'Application Pipeline', labelAr: 'خط التقديم', href: `${basePrefix}/pipeline`, icon: Layers },
    { label: 'Target Company Prospector', labelAr: 'استكشاف الشركات المستهدفة', href: `${basePrefix}/prospector`, icon: Target },
    { label: 'Application Studio', labelAr: 'استوديو الصياغة', href: `${basePrefix}/studio`, icon: FileText },
    { label: 'Executive Pitch Deck', labelAr: 'عرض التقديم التنفيذي', href: `${basePrefix}/pitch`, icon: Presentation },
    { label: 'Outreach Drip Campaigns', labelAr: 'حملات التواصل المتسلسلة', href: `${basePrefix}/campaigns`, icon: Send },
    { label: 'Batch JD Matcher', labelAr: 'المطابقة المجمعة', href: `${basePrefix}/matcher`, icon: Sparkles },
    { label: 'Contract & SOW Studio', labelAr: 'عقود العمل B2B', href: `${basePrefix}/proposal`, icon: Scale },
    { label: 'Offer & Equity Evaluator', labelAr: 'تقييم العروض والأسهم', href: `${basePrefix}/offers`, icon: Calculator },
    { label: 'Executive Negotiation Playbook', labelAr: 'دليل التفاوض المالي المتقدم', href: `${basePrefix}/negotiator`, icon: MessageSquare },
    { label: 'Technical Assessment Grader', labelAr: 'تقييم التحديات البرمجية', href: `${basePrefix}/grader`, icon: Award },
    { label: '30-60-90 Day Plan', labelAr: 'خطة الـ 90 يوماً القيادية', href: `${basePrefix}/onboarding`, icon: Calendar },
    { label: 'In-Call Q&A Copilot', labelAr: 'مساعد المقابلات الحي', href: `${basePrefix}/copilot`, icon: Zap },
    { label: 'Interview Room', labelAr: 'غرفة المقابلات', href: `${basePrefix}/interview`, icon: HelpCircle },
    { label: 'Mock Practice Simulator', labelAr: 'محاكي المقابلات', href: `${basePrefix}/simulator`, icon: Mic },
    { label: 'Remote Comp & Contracts', labelAr: 'حاسبة الرواتب والعقود', href: `${basePrefix}/compensation`, icon: DollarSign },
    { label: 'Export & Sync Backup', labelAr: 'تصدير وحفظ البيانات', href: `${basePrefix}/export`, icon: Archive },
    { label: 'Search Analytics', labelAr: 'تحليلات التحويل', href: `${basePrefix}/analytics`, icon: BarChart3 },
    { label: 'CMS & Audit Logs', labelAr: 'إدارة المحتوى', href: `${basePrefix}/cms`, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Private Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={isAr ? '/ar' : '/'}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Portfolio</span>
          </Link>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-mono text-xs font-bold text-white">
              CP
            </div>
            <span className="font-bold text-sm tracking-tight">
              Job Command Center
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Workspace (Demo Authenticated)</span>
          </span>
        </div>
      </header>

      {/* Main Body Shell with Navigation Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-800 p-4 space-y-2 shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{isAr ? item.labelAr : item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
