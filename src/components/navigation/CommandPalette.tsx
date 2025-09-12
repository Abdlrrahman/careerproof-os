'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  Scale, 
  DollarSign, 
  Mic, 
  Zap, 
  TrendingUp, 
  BookOpen, 
  Activity, 
  GitCommit, 
  Terminal,
  Command,
  X,
  Award,
  Archive,
  Flame,
  Lock,
  Network,
  Send,
  Calculator,
  Target,
  MessageSquare,
  AlertTriangle,
  Presentation,
  Gauge,
  Calendar
} from 'lucide-react';
import { Locale } from '@/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

interface CommandItem {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'Navigation' | 'Role Lenses' | 'Architecture & Proof' | 'Job Command Center' | 'Tools';
  hrefEn: string;
  hrefAr: string;
  icon: any;
  keywords: string[];
}

const COMMAND_ITEMS: CommandItem[] = [
  // Navigation Core
  {
    id: 'cmd-home',
    titleEn: 'Overview & Adaptive Hero',
    titleAr: 'الصفحة الرئيسية والنظرة العامة',
    category: 'Navigation',
    hrefEn: '/',
    hrefAr: '/ar',
    icon: Sparkles,
    keywords: ['home', 'hero', 'overview', 'shibani', 'رئيسية']
  },
  {
    id: 'cmd-dossier',
    titleEn: 'Printable Executive Dossier (One-Pager)',
    titleAr: 'الملف التنفيذي الشامل (قابل للطباعة)',
    category: 'Navigation',
    hrefEn: '/dossier',
    hrefAr: '/ar/dossier',
    icon: FileText,
    keywords: ['dossier', 'pdf', 'executive', 'summary', 'one-pager', 'print', 'ملف', 'طباعة']
  },
  {
    id: 'cmd-resume',
    titleEn: 'Multi-Format Résumé Center (ATS / JSON / PDF)',
    titleAr: 'مركز السيرة الذاتية (ATS / JSON / PDF)',
    category: 'Navigation',
    hrefEn: '/resume',
    hrefAr: '/ar/resume',
    icon: FileText,
    keywords: ['resume', 'cv', 'ats', 'json resume', 'سيرة']
  },
  {
    id: 'cmd-briefing',
    titleEn: '60-Second Executive Audio Briefing',
    titleAr: 'الإيجاز الصوتي للمسؤولين في 60 ثانية',
    category: 'Navigation',
    hrefEn: '/briefing',
    hrefAr: '/ar/briefing',
    icon: Mic,
    keywords: ['audio', 'briefing', 'listen', 'voice', 'recruiter', 'صوتي', 'إيجاز']
  },

  // Architecture & Proof
  {
    id: 'cmd-blueprints',
    titleEn: 'System Architecture Blueprints (GeoFusion & Omega)',
    titleAr: 'مخططات المعمارية والأنظمة',
    category: 'Architecture & Proof',
    hrefEn: '/blueprints',
    hrefAr: '/ar/blueprints',
    icon: Layers,
    keywords: ['blueprints', 'architecture', 'diagram', 'geofusion', 'omega', 'مخططات', 'معمارية']
  },
  {
    id: 'cmd-decisions',
    titleEn: 'Architecture Decision Records (ADRs & RFCs)',
    titleAr: 'سجل القرارات المعمارية (ADRs)',
    category: 'Architecture & Proof',
    hrefEn: '/decisions',
    hrefAr: '/ar/decisions',
    icon: BookOpen,
    keywords: ['adr', 'rfc', 'decisions', 'tradeoffs', 'postgresql', 'fastapi', 'قرارات']
  },
  {
    id: 'cmd-rfc',
    titleEn: 'Engineering RFC Governance & Design Proposals',
    titleAr: 'مستودع وثائق طلب التعليقات الهندسية RFC',
    category: 'Architecture & Proof',
    hrefEn: '/rfc',
    hrefAr: '/ar/rfc',
    icon: FileText,
    keywords: ['rfc', 'proposals', 'architecture', 'specifications', 'canary', 'مقترحات']
  },
  {
    id: 'cmd-runbooks',
    titleEn: 'Production Engineering & Incident Response Runbooks',
    titleAr: 'مكتبة أدلة تشغيل وهندسة النظم الحية',
    category: 'Architecture & Proof',
    hrefEn: '/runbooks',
    hrefAr: '/ar/runbooks',
    icon: Terminal,
    keywords: ['runbooks', 'incident', 'operations', 'migrations', 'pgvector', 'أدلة', 'تشغيل']
  },
  {
    id: 'cmd-postmortems',
    titleEn: 'Production Postmortems & Root Cause Analyses (RCAs)',
    titleAr: 'مستودع تحليلات ما بعد الحوادث والأسباب الجذرية',
    category: 'Architecture & Proof',
    hrefEn: '/postmortems',
    hrefAr: '/ar/postmortems',
    icon: AlertTriangle,
    keywords: ['postmortem', 'rca', '5whys', 'incident', 'outage', 'investigation', 'حوادث']
  },
  {
    id: 'cmd-slo',
    titleEn: 'Service Level Objectives (SLOs) & Reliability Engineering',
    titleAr: 'أهداف مستوى الخدمة (SLO) وميزانيات الأخطاء',
    category: 'Architecture & Proof',
    hrefEn: '/slo',
    hrefAr: '/ar/slo',
    icon: Gauge,
    keywords: ['slo', 'sli', 'sre', 'error budget', 'reliability', 'burn rate', 'uptime']
  },
  {
    id: 'cmd-proof',
    titleEn: 'Interactive Evidence Proof Graph',
    titleAr: 'رسم الأدلة والإثباتات التفاعلي',
    category: 'Architecture & Proof',
    hrefEn: '/proof',
    hrefAr: '/ar/proof',
    icon: ShieldCheck,
    keywords: ['proof', 'graph', 'evidence', 'verification', 'nodes', 'أدلة', 'إثبات']
  },
  {
    id: 'cmd-skills',
    titleEn: 'Mathematical Evidence-Based Skill Engine',
    titleAr: 'محرك المهارات المبني على الأدلة',
    category: 'Architecture & Proof',
    hrefEn: '/skills',
    hrefAr: '/ar/skills',
    icon: Cpu,
    keywords: ['skills', 'python', 'fastapi', 'pytorch', 'postgresql', 'مهارات']
  },
  {
    id: 'cmd-graph',
    titleEn: 'Interactive Career Knowledge Graph Explorer',
    titleAr: 'مستكشف رسم المعرفة والأدلة التفاعلي',
    category: 'Architecture & Proof',
    hrefEn: '/graph',
    hrefAr: '/ar/graph',
    icon: Network,
    keywords: ['graph', 'knowledge', 'ontology', 'mesh', 'nodes', 'edges', 'رسم', 'معرفة']
  },
  {
    id: 'cmd-whiteboard',
    titleEn: 'System Architecture Whiteboard & Ingestion Canvas',
    titleAr: 'لوحة محاكاة وتصميم المعماريات التفاعلية',
    category: 'Architecture & Proof',
    hrefEn: '/whiteboard',
    hrefAr: '/ar/whiteboard',
    icon: Terminal,
    keywords: ['whiteboard', 'canvas', 'architecture', 'ingestion', 'celery', 'redis', 'لوحة']
  },
  {
    id: 'cmd-compare',
    titleEn: 'Engineering Candidate Comparison & Differentiation',
    titleAr: 'مصفوفة المقارنة الهندسية والتمايز النوعي',
    category: 'Architecture & Proof',
    hrefEn: '/compare',
    hrefAr: '/ar/compare',
    icon: Scale,
    keywords: ['compare', 'differentiation', 'matrix', 'staff', 'generic', 'مقارنة', 'تمايز']
  },
  {
    id: 'cmd-trajectory',
    titleEn: 'Concurrent Career Trajectory Map',
    titleAr: 'خريطة المسارات المهنية المتوازية',
    category: 'Architecture & Proof',
    hrefEn: '/trajectory',
    hrefAr: '/ar/trajectory',
    icon: GitCommit,
    keywords: ['trajectory', 'timeline', 'career', 'tracks', 'مسار', 'تطور']
  },
  {
    id: 'cmd-telemetry',
    titleEn: 'System Health & DevOps Telemetry Dashboard',
    titleAr: 'لوحة القياسات الحية وهندسة الجودة',
    category: 'Architecture & Proof',
    hrefEn: '/telemetry',
    hrefAr: '/ar/telemetry',
    icon: Activity,
    keywords: ['telemetry', 'ci/cd', 'tests', 'cwv', 'health', 'مؤشرات', 'جودة']
  },
  {
    id: 'cmd-chaos',
    titleEn: 'Production Chaos & Resilience Simulator',
    titleAr: 'محاكي أعطال الأنظمة وهندسة المرونة',
    category: 'Architecture & Proof',
    hrefEn: '/chaos',
    hrefAr: '/ar/chaos',
    icon: Flame,
    keywords: ['chaos', 'failure', 'resilience', 'rls', 'oom', 'fault', 'مرونة', 'أعطال']
  },
  {
    id: 'cmd-trust',
    titleEn: 'Enterprise Trust, Security & Compliance Portal',
    titleAr: 'بوابة الثقة، الأمان، والامتثال القانوني الدولي',
    category: 'Architecture & Proof',
    hrefEn: '/trust',
    hrefAr: '/ar/trust',
    icon: Lock,
    keywords: ['trust', 'security', 'compliance', 'w-8ben', 'nda', 'gdpr', 'أمان', 'امتثال']
  },

  // Tools & Intelligence
  {
    id: 'cmd-fit',
    titleEn: 'Multi-Factor Job-Fit Matcher',
    titleAr: 'محلل مطابقة الوظائف الذكي',
    category: 'Tools',
    hrefEn: '/fit',
    hrefAr: '/ar/fit',
    icon: Sparkles,
    keywords: ['fit', 'matcher', 'jd', 'job', 'compatibility', 'مطابقة']
  },
  {
    id: 'cmd-radar',
    titleEn: 'Technology Radar (Adopt / Trial / Hold)',
    titleAr: 'رادار التقنيات والأدوات',
    category: 'Tools',
    hrefEn: '/radar',
    hrefAr: '/ar/radar',
    icon: TrendingUp,
    keywords: ['radar', 'tech', 'stack', 'adopt', 'trial', 'رادار']
  },
  {
    id: 'cmd-insights',
    titleEn: 'Engineering Insights & Technical Whitepapers',
    titleAr: 'المقالات والأوراق الهندسية',
    category: 'Tools',
    hrefEn: '/insights',
    hrefAr: '/ar/insights',
    icon: BookOpen,
    keywords: ['insights', 'articles', 'whitepapers', 'spatial ml', 'ledgers', 'مقالات']
  },
  {
    id: 'cmd-playground',
    titleEn: 'Interactive API & Architecture Sandbox',
    titleAr: 'مختبر الواجهات البرمجية الحي',
    category: 'Tools',
    hrefEn: '/playground',
    hrefAr: '/ar/playground',
    icon: Terminal,
    keywords: ['playground', 'sandbox', 'api', 'fastapi', 'simulator', 'مختبر']
  },
  {
    id: 'cmd-hire',
    titleEn: '30-60-90 Day Executive ROI Model',
    titleAr: 'نموذج العائد الاستثماري وخطة 90 يوماً',
    category: 'Tools',
    hrefEn: '/hire',
    hrefAr: '/ar/hire',
    icon: DollarSign,
    keywords: ['roi', 'hire', 'cost', 'velocity', '30 60 90', 'عائد', 'استثمار']
  },

  // Job Command Center (Private)
  {
    id: 'cmd-dashboard',
    titleEn: 'Job Command Center Overview',
    titleAr: 'مركز قيادة التقديم والوظائف',
    category: 'Job Command Center',
    hrefEn: '/dashboard',
    hrefAr: '/dashboard',
    icon: Sparkles,
    keywords: ['dashboard', 'command center', 'لوحة']
  },
  {
    id: 'cmd-copilot',
    titleEn: 'In-Call Live Interview Q&A Copilot',
    titleAr: 'مساعد المقابلات الحي والردود المباشرة',
    category: 'Job Command Center',
    hrefEn: '/dashboard/copilot',
    hrefAr: '/dashboard/copilot',
    icon: Zap,
    keywords: ['copilot', 'interview', 'live', 'teleprompter', 'answers', 'مساعد', 'مقابلات']
  },
  {
    id: 'cmd-prospector',
    titleEn: 'Reverse Target Company & Account Prospector',
    titleAr: 'استكشاف الشركات المستهدفة وتحليل التوافق',
    category: 'Job Command Center',
    hrefEn: '/dashboard/prospector',
    hrefAr: '/dashboard/prospector',
    icon: Target,
    keywords: ['prospector', 'companies', 'accounts', 'leads', 'outreach', 'شركات', 'استكشاف']
  },
  {
    id: 'cmd-studio',
    titleEn: 'Application Studio (7 Grounded Templates)',
    titleAr: 'استوديو الصياغة والرسائل المعتمدة',
    category: 'Job Command Center',
    hrefEn: '/dashboard/studio',
    hrefAr: '/dashboard/studio',
    icon: FileText,
    keywords: ['studio', 'cover letter', 'outreach', 'linkedin', 'drip', 'استوديو']
  },
  {
    id: 'cmd-campaigns',
    titleEn: 'Recruiter Outreach Drip Campaign Sequencer',
    titleAr: 'حملات التواصل المتسلسلة للمسؤولين',
    category: 'Job Command Center',
    hrefEn: '/dashboard/campaigns',
    hrefAr: '/dashboard/campaigns',
    icon: Send,
    keywords: ['campaigns', 'drip', 'sequence', 'outreach', 'email', 'follow up', 'حملات']
  },
  {
    id: 'cmd-proposal',
    titleEn: 'Contract & SOW Agreement Generator',
    titleAr: 'مولد عقود العمل المستقل B2B و SOW',
    category: 'Job Command Center',
    hrefEn: '/dashboard/proposal',
    hrefAr: '/dashboard/proposal',
    icon: Scale,
    keywords: ['proposal', 'contract', 'sow', 'msa', 'w-8ben', 'عقود']
  },
  {
    id: 'cmd-offers',
    titleEn: 'Intelligent Offer & Equity Package Evaluator',
    titleAr: 'تقييم العروض والأسهم وحساب الضرائب',
    category: 'Job Command Center',
    hrefEn: '/dashboard/offers',
    hrefAr: '/dashboard/offers',
    icon: Calculator,
    keywords: ['offers', 'equity', 'rsus', 'bonus', 'salary', 'tax', 'vesting', 'عروض']
  },
  {
    id: 'cmd-pitch',
    titleEn: 'Executive Technical Pitch Deck & Presentation',
    titleAr: 'عرض التقديم التقني التنفيذي',
    category: 'Job Command Center',
    hrefEn: '/dashboard/pitch',
    hrefAr: '/dashboard/pitch',
    icon: Presentation,
    keywords: ['pitch', 'deck', 'presentation', 'slides', 'executive', 'c-suite', 'عرض']
  },
  {
    id: 'cmd-negotiator',
    titleEn: 'Executive Negotiation Playbook & Counter-Offer Generator',
    titleAr: 'دليل التفاوض المالي المتقدم ونصوص الردود',
    category: 'Job Command Center',
    hrefEn: '/dashboard/negotiator',
    hrefAr: '/dashboard/negotiator',
    icon: MessageSquare,
    keywords: ['negotiation', 'counter', 'scripts', 'salary', 'equity', 'b2b', 'تفاوض']
  },
  {
    id: 'cmd-grader',
    titleEn: 'Technical Assessment & Coding Rubric Grader',
    titleAr: 'تقييم التحديات البرمجية ومعايير القياس',
    category: 'Job Command Center',
    hrefEn: '/dashboard/grader',
    hrefAr: '/dashboard/grader',
    icon: Award,
    keywords: ['grader', 'rubric', 'assessment', 'coding', 'test', 'takehome', 'تقييم']
  },
  {
    id: 'cmd-onboarding',
    titleEn: '30-60-90 Day Executive Onboarding Roadmap',
    titleAr: 'خطة الـ 90 يوماً القيادية للمهندس التنفيذي',
    category: 'Job Command Center',
    hrefEn: '/dashboard/onboarding',
    hrefAr: '/dashboard/onboarding',
    icon: Calendar,
    keywords: ['onboarding', '30-60-90', 'roadmap', 'execution', 'milestones', 'staff', 'خطة']
  },
  {
    id: 'cmd-compensation',
    titleEn: 'Remote Compensation, Invoicing & Geo-Arbitrage',
    titleAr: 'حاسبة الرواتب والضرائب والفواتير',
    category: 'Job Command Center',
    hrefEn: '/dashboard/compensation',
    hrefAr: '/dashboard/compensation',
    icon: DollarSign,
    keywords: ['compensation', 'salary', 'tax', 'arbitrage', 'invoice', 'رواتب', 'ضرائب']
  },
  {
    id: 'cmd-matcher',
    titleEn: 'Automated Batch JD Matcher & Ingestion',
    titleAr: 'المطابقة المجمعة للوظائف',
    category: 'Job Command Center',
    hrefEn: '/dashboard/matcher',
    hrefAr: '/dashboard/matcher',
    icon: Layers,
    keywords: ['matcher', 'batch', 'pipeline', 'import', 'مجمعة']
  },
  {
    id: 'cmd-benchmark',
    titleEn: 'Industry Competency & Percentile Benchmarks',
    titleAr: 'مصفوفة المقارنة المعيارية العالمية',
    category: 'Architecture & Proof',
    hrefEn: '/benchmark',
    hrefAr: '/ar/benchmark',
    icon: Award,
    keywords: ['benchmark', 'percentile', 'tier', 'principal', 'staff', 'معايير', 'تقييم']
  },
  {
    id: 'cmd-simulator',
    titleEn: 'Timed Mock Interview Practice Simulator',
    titleAr: 'محاكي المقابلات التقنية التفاعلي',
    category: 'Job Command Center',
    hrefEn: '/dashboard/simulator',
    hrefAr: '/dashboard/simulator',
    icon: Mic,
    keywords: ['simulator', 'practice', 'mock', 'teleprompter', 'محاكي']
  },
  {
    id: 'cmd-export',
    titleEn: 'Data Export, Portable Sync & Backup Suite',
    titleAr: 'تصدير وحفظ البيانات والنسخ الاحتياطي',
    category: 'Job Command Center',
    hrefEn: '/dashboard/export',
    hrefAr: '/dashboard/export',
    icon: Archive,
    keywords: ['export', 'backup', 'json resume', 'sync', 'download', 'تصدير', 'نسخ']
  }
];

export function CommandPalette({ isOpen, onClose, locale }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return COMMAND_ITEMS;
    const query = search.toLowerCase();
    return COMMAND_ITEMS.filter(item => {
      const matchTitleEn = item.titleEn.toLowerCase().includes(query);
      const matchTitleAr = item.titleAr.toLowerCase().includes(query);
      const matchCategory = item.category.toLowerCase().includes(query);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
      return matchTitleEn || matchTitleAr || matchCategory || matchKeywords;
    });
  }, [search]);

  // Keyboard navigation inside list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const handleSelect = (item: CommandItem) => {
    const targetUrl = locale === 'ar' ? item.hrefAr : item.hrefEn;
    router.push(targetUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Palette Container */}
      <div 
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 font-sans"
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mx-2" />
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={locale === 'ar' ? 'ابحث في كل أقسام المنصة، المعماريات، الأدلة، والأدوات...' : 'Type a command, role, skill, blueprint, or ADR...'}
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-medium"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700 shrink-0 ml-2">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs font-mono">
              {locale === 'ar' ? 'لم يتم العثور على نتائج تطابق بحثك' : 'No commands or pages matching your search.'}
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer text-xs transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border border-blue-500/50'
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-cyan-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-bold block truncate">
                        {locale === 'ar' ? item.titleAr : item.titleEn}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected && (
                      <span className="hidden sm:inline text-[10px] font-mono text-cyan-400 font-bold">
                        Press Enter ↵
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400 font-bold">CareerProof OS v2.0</span>
        </div>
      </div>
    </div>
  );
}
