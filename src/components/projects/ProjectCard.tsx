'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FolderGit2, 
  ExternalLink, 
  Users, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Project, Locale } from '@/types';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const isConcept = project.status === 'concept' || project.status === 'in_development';

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/80 card-interactive flex flex-col justify-between space-y-5">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
            isConcept
              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
          }`}>
            {project.status.replace('_', ' ')}
          </span>

          <span className="text-[11px] text-slate-400 font-mono">
            {project.startDate.substring(0, 7)} {project.endDate ? `— ${project.endDate.substring(0, 7)}` : '— Present'}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {locale === 'ar' ? project.titleAr : project.titleEn}
          </h3>
          <p className="text-xs font-medium text-blue-600 dark:text-cyan-400 mt-0.5">
            {locale === 'ar' ? project.roleTitleAr : project.roleTitleEn} &bull; {project.teamSize} Member Squad
          </p>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {locale === 'ar' ? project.summaryAr : project.summaryEn}
        </p>

        {/* Domain Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.domainTags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Link & Actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link
          href={locale === 'ar' ? `/ar/projects/${project.slug}` : `/projects/${project.slug}`}
          className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
        >
          <span>{locale === 'ar' ? 'معاينة دراسة الحالة الهندسية' : 'Case Study & Architecture'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            title="Live Demo"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
