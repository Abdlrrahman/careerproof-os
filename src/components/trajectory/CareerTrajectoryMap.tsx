'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CareerTrackItem, 
  Locale 
} from '@/types';
import { 
  GitCommit, 
  Calendar, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  Briefcase
} from 'lucide-react';

interface CareerTrajectoryMapProps {
  tracks: CareerTrackItem[];
  locale: Locale;
}

export function CareerTrajectoryMap({ tracks, locale }: CareerTrajectoryMapProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all');

  const filteredTracks = selectedTrackId === 'all'
    ? tracks
    : tracks.filter(t => t.id === selectedTrackId);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GitCommit className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>{locale === 'ar' ? 'المسارات المهنية المتزامنة والتطور القيادي' : 'Concurrent Engineering & Leadership Tracks'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ar' ? 'استعراض المسارات المتوازية في هندسة البرمجيات، والذكاء الاصطناعي، والقيادة المؤسسية' : 'Explore concurrent specialization tracks demonstrating non-linear growth without timeline gaps.'}
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800">
            {tracks.length} Specialized Tracks
          </div>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setSelectedTrackId('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedTrackId === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Tracks Unified
          </button>
          {tracks.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTrackId(t.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all border ${
                selectedTrackId === t.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {locale === 'ar' ? t.trackNameAr : t.trackNameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Trajectory Cards Timeline */}
      <div className="space-y-6">
        {filteredTracks.map((track, idx) => (
          <div
            key={track.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 card-interactive"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                  {locale === 'ar' ? track.trackNameAr : track.trackNameEn}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {locale === 'ar' ? track.roleTitleAr : track.roleTitleEn}
                </h4>
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? track.organizationAr : track.organizationEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-xl">
                <Calendar className="w-3.5 h-3.5" />
                <span>{track.period}</span>
              </div>
            </div>

            {/* Key Contributions */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">
                {locale === 'ar' ? 'الإسهامات والمخرجات المعمارية الأساسية:' : 'Core Architectural Contributions & Milestones:'}
              </span>
              <ul className="space-y-2">
                {(locale === 'ar' ? track.keyContributionsAr : track.keyContributionsEn).map((c, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Demonstrated Skills */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {track.skillsDemonstrated.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
