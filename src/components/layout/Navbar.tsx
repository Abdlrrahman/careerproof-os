'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Clock, 
  Briefcase, 
  FileText, 
  GitBranch, 
  Search, 
  Lock, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronDown,
  Command
} from 'lucide-react';
import { Locale, ViewMode, RoleLens } from '@/types';
import { getDictionary } from '@/lib/i18n/translations';
import { db } from '@/lib/db/data-store';
import { CommandPalette } from '@/components/navigation/CommandPalette';

interface NavbarProps {
  locale: Locale;
  currentRoleLens?: string;
  onRoleLensChange?: (lensId: string) => void;
  currentViewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onOpenAskAi?: () => void;
}

export function Navbar({
  locale,
  currentRoleLens = 'ai-ml-engineer',
  onRoleLensChange,
  currentViewMode = '60s',
  onViewModeChange,
  onOpenAskAi,
}: NavbarProps) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [roleLenses, setRoleLenses] = useState<RoleLens[]>([]);
  const [isLensDropdownOpen, setIsLensDropdownOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setRoleLenses(db.getRoleLenses());
    // Check dark mode preference
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark') || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'ar' : 'en';
    // Switch path prefix
    if (locale === 'ar') {
      const newPath = pathname.replace(/^\/ar/, '') || '/';
      router.push(newPath);
    } else {
      const newPath = `/ar${pathname === '/' ? '' : pathname}`;
      router.push(newPath);
    }
  };

  const navLinks = [
    { label: t.nav.skills, href: locale === 'ar' ? '/ar/skills' : '/skills' },
    { label: t.nav.projects, href: locale === 'ar' ? '/ar/projects' : '/projects' },
    { label: locale === 'ar' ? 'المخططات' : 'Blueprints', href: locale === 'ar' ? '/ar/blueprints' : '/blueprints' },
    { label: locale === 'ar' ? 'لوحة المحاكاة' : 'Whiteboard', href: locale === 'ar' ? '/ar/whiteboard' : '/whiteboard' },
    { label: locale === 'ar' ? 'رسم المعرفة' : 'Knowledge Graph', href: locale === 'ar' ? '/ar/graph' : '/graph' },
    { label: locale === 'ar' ? 'المقارنة' : 'Compare', href: locale === 'ar' ? '/ar/compare' : '/compare' },
    { label: locale === 'ar' ? 'المعايير' : 'Benchmarks', href: locale === 'ar' ? '/ar/benchmark' : '/benchmark' },
    { label: locale === 'ar' ? 'المرونة' : 'Chaos Lab', href: locale === 'ar' ? '/ar/chaos' : '/chaos' },
    { label: locale === 'ar' ? 'الثقة والأمان' : 'Trust Portal', href: locale === 'ar' ? '/ar/trust' : '/trust' },
    { label: locale === 'ar' ? 'المسار' : 'Trajectory', href: locale === 'ar' ? '/ar/trajectory' : '/trajectory' },
    { label: locale === 'ar' ? 'القرارات' : 'ADRs', href: locale === 'ar' ? '/ar/decisions' : '/decisions' },
    { label: locale === 'ar' ? 'المقترحات' : 'RFCs', href: locale === 'ar' ? '/ar/rfc' : '/rfc' },
    { label: locale === 'ar' ? 'أدلة التشغيل' : 'Runbooks', href: locale === 'ar' ? '/ar/runbooks' : '/runbooks' },
    { label: locale === 'ar' ? 'تحليلات الحوادث' : 'Postmortems', href: locale === 'ar' ? '/ar/postmortems' : '/postmortems' },
    { label: locale === 'ar' ? 'مستويات الخدمة' : 'SLOs & Budgets', href: locale === 'ar' ? '/ar/slo' : '/slo' },
    { label: locale === 'ar' ? 'الملف التنفيذي' : 'Dossier', href: locale === 'ar' ? '/ar/dossier' : '/dossier' },
    { label: locale === 'ar' ? 'المؤشرات' : 'Telemetry', href: locale === 'ar' ? '/ar/telemetry' : '/telemetry' },
    { label: locale === 'ar' ? 'الإيجاز' : 'Briefing', href: locale === 'ar' ? '/ar/briefing' : '/briefing' },
    { label: locale === 'ar' ? 'المختبر' : 'Sandbox', href: locale === 'ar' ? '/ar/playground' : '/playground' },
    { label: locale === 'ar' ? 'العائد' : 'ROI Model', href: locale === 'ar' ? '/ar/hire' : '/hire' },
    { label: t.nav.fit, href: locale === 'ar' ? '/ar/fit' : '/fit', highlight: true },
  ];

  const activeLensObj = roleLenses.find(l => l.id === currentRoleLens || l.slug === currentRoleLens);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-[#090D16]/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Notification / Recruiter Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-white">{t.hero.badge}</span>
          <span className="hidden md:inline text-slate-400">| Tripoli & Doha (UTC+2 / UTC+3) — Full EU & US-East Overlap</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenAskAi}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium btn-tactile"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.askAi}</span>
          </button>
          <Link 
            href={locale === 'ar' ? '/ar/dashboard' : '/dashboard'} 
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span className="hidden sm:inline">{t.nav.commandCenter}</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <Link 
          href={locale === 'ar' ? '/ar' : '/'} 
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 dark:text-white group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-black text-sm shadow-sm group-hover:bg-blue-500 transition-colors">
            AS
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">Abdlrrahman Shibani</span>
            <span className="text-[10px] font-normal tracking-wide text-blue-600 dark:text-cyan-400 uppercase">
              CareerProof OS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  link.highlight 
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800'
                    : isActive 
                      ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Utility Controls (Role Lens, Mode, Language, Theme) */}
        <div className="flex items-center gap-2">
          {/* Role Lens Dropdown (Desktop) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsLensDropdownOpen(!isLensDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-blue-500 btn-tactile"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span className="max-w-[130px] truncate">
                {locale === 'ar' ? activeLensObj?.titleAr || 'العدسة المهنية' : activeLensObj?.titleEn || 'Role Lens'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLensDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 popover-enter"
                onMouseLeave={() => setIsLensDropdownOpen(false)}
              >
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  {t.hero.roleLensLabel}
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {roleLenses.map((lens) => (
                    <button
                      key={lens.id}
                      onClick={() => {
                        if (onRoleLensChange) onRoleLensChange(lens.id);
                        setIsLensDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex flex-col transition-colors ${
                        currentRoleLens === lens.id 
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{locale === 'ar' ? lens.titleAr : lens.titleEn}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recruiter View Mode Selector (60s / 3m / 10m) */}
          <div className="hidden xl:flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            {(['60s', '3m', '10m'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange && onViewModeChange(mode)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentViewMode === mode 
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {mode === '60s' ? '60s' : mode === '3m' ? '3m' : '10m'}
              </button>
            ))}
          </div>

          {/* Command Palette Cmd+K Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:border-blue-500 transition-all shadow-xs"
            title="Open Command Palette (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-mono text-[11px]">{locale === 'ar' ? 'بحث سريع' : 'Quick Search'}</span>
            <kbd className="text-[10px] font-mono font-bold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 btn-tactile"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>{locale === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 btn-tactile"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        locale={locale}
      />

      {/* Mobile Collapsible Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              {t.hero.roleLensLabel}
            </label>
            <div className="grid grid-cols-1 gap-1">
              {roleLenses.map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => {
                    if (onRoleLensChange) onRoleLensChange(lens.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium ${
                    currentRoleLens === lens.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  {locale === 'ar' ? lens.titleAr : lens.titleEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
