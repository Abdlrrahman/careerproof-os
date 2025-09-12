'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Filter, 
  ExternalLink, 
  Layers, 
  Code2, 
  Cpu, 
  Server, 
  Database, 
  Users, 
  Briefcase,
  X
} from 'lucide-react';
import { Skill, SkillCategory, EvidenceItem, Locale, SkillProficiencyLevel } from '@/types';
import { getDictionary } from '@/lib/i18n/translations';

interface SkillMatrixProps {
  skills: Skill[];
  categories: SkillCategory[];
  evidenceItems: EvidenceItem[];
  locale: Locale;
}

export function SkillMatrix({
  skills,
  categories,
  evidenceItems,
  locale,
}: SkillMatrixProps) {
  const t = getDictionary(locale);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = skills.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.categoryId === selectedCategory;
    const matchesSearch = s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.nameAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getLevelBadgeClass = (level: SkillProficiencyLevel) => {
    switch (level) {
      case 'leadership':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'advanced':
        return 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border-blue-200 dark:border-blue-800';
      case 'proven':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'applied':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const attachedEvidenceForSelected = selectedSkill
    ? evidenceItems.filter(e => selectedSkill.evidenceItemIds.includes(e.id))
    : [];

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث عن مهارة أو تقنية...' : 'Search skills, frameworks, or domain capabilities...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {locale === 'ar' ? 'جميع التصنيفات' : 'All Categories'} ({skills.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {locale === 'ar' ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => setSelectedSkill(skill)}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/80 cursor-pointer card-interactive flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {locale === 'ar' ? skill.nameAr : skill.nameEn}
                </h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border ${getLevelBadgeClass(skill.calculatedLevel)}`}>
                  {skill.calculatedLevel}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {skill.verificationRationale}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="font-mono">
                {skill.yearsExperience} yrs exp &bull; {skill.lastUsedYear}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{skill.evidenceItemIds.length} Proof Items</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence Deep-Dive Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 popover-enter">
            <div className="flex justify-between items-start">
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getLevelBadgeClass(selectedSkill.calculatedLevel)}`}>
                  {selectedSkill.calculatedLevel} Tier
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
                  {locale === 'ar' ? selectedSkill.nameAr : selectedSkill.nameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Rationale Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Deterministic Score:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedSkill.calculatedScore} / 100</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {selectedSkill.verificationRationale}
              </p>
            </div>

            {/* Attached Evidence Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Attached Production Evidence ({attachedEvidenceForSelected.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {attachedEvidenceForSelected.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white flex justify-between">
                      <span>{ev.title}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{ev.issuerOrOrg}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{ev.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
