'use client';

import React, { useState } from 'react';
import { 
  RadarRing, 
  RadarQuadrant, 
  TechRadarItem, 
  Locale 
} from '@/types';
import { 
  Radar, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Ban, 
  Sparkles, 
  Cpu, 
  Database, 
  Cloud, 
  Code2 
} from 'lucide-react';

interface TechRadarViewerProps {
  items: TechRadarItem[];
  locale: Locale;
}

const RINGS: { id: RadarRing; labelEn: string; labelAr: string; color: string; descEn: string; descAr: string }[] = [
  { 
    id: 'adopt', 
    labelEn: 'Adopt (Core Standard)', 
    labelAr: 'اعتماد أساسي', 
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    descEn: 'Proven in production with high confidence. Default standard for greenfield systems.',
    descAr: 'مثبت في بيئات الإنتاج بثقة عالية، والمعيار الافتراضي للمشاريع الجديدة.'
  },
  { 
    id: 'trial', 
    labelEn: 'Trial (Production Ready)', 
    labelAr: 'قيد التجربة والإنتاج', 
    color: 'bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/30',
    descEn: 'Successfully deployed on select pilot projects with measured high ROI.',
    descAr: 'تم تطبيقه بنجاح على مشاريع نموذجية مع تحقيق عائد استثماري مرتفع.'
  },
  { 
    id: 'assess', 
    labelEn: 'Assess (Research & Prototype)', 
    labelAr: 'قيد التقييم والبحث', 
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    descEn: 'Actively researching, benchmarking, and building proof-of-concepts.',
    descAr: 'قيد البحث وبناء النماذج الأولية والمقارنة المعيارية للأداء.'
  },
  { 
    id: 'hold', 
    labelEn: 'Hold (Avoid / Deprecated)', 
    labelAr: 'تجنب / محظور', 
    color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30',
    descEn: 'Identified as high architectural drift, ungrounded, or prone to runtime failure.',
    descAr: 'ثبت تسببه في انحراف معماري أو أخطاء تشغيلية غير مقبولة.'
  },
];

const QUADRANTS: { id: RadarQuadrant; labelEn: string; labelAr: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'languages_frameworks', labelEn: 'Languages & Frameworks', labelAr: 'اللغات وأطر العمل', icon: Code2 },
  { id: 'data_ai', labelEn: 'Data & Machine Learning', labelAr: 'البيانات والذكاء الاصطناعي', icon: Database },
  { id: 'infrastructure_cloud', labelEn: 'Infrastructure & DevOps', labelAr: 'البنية التحتية والعمليات', icon: Cloud },
  { id: 'architecture_techniques', labelEn: 'Architecture & Patterns', labelAr: 'المعمارية والأنماط', icon: Layers },
];

export function TechRadarViewer({ items, locale }: TechRadarViewerProps) {
  const [selectedRing, setSelectedRing] = useState<RadarRing | 'all'>('all');
  const [selectedQuadrant, setSelectedQuadrant] = useState<RadarQuadrant | 'all'>('all');

  const filteredItems = items.filter(item => {
    if (selectedRing !== 'all' && item.ring !== selectedRing) return false;
    if (selectedQuadrant !== 'all' && item.quadrant !== selectedQuadrant) return false;
    return true;
  });

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Controls: Rings & Quadrants */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Radar className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>{locale === 'ar' ? 'تصنيف رادار التقنيات' : 'Technology Strategy & Maturity Radar'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ar' ? 'المعايير التقنية المعتمدة والمقيمة من واقع الخبرة المباشرة' : 'Architectural evaluation based on 6+ years shipping production systems'}
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
            {filteredItems.length} Technologies Indexed
          </div>
        </div>

        {/* Ring Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setSelectedRing('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedRing === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Rings ({items.length})
          </button>
          {RINGS.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRing(r.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all border ${
                selectedRing === r.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {locale === 'ar' ? r.labelAr : r.labelEn}
            </button>
          ))}
        </div>

        {/* Quadrant Tabs */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setSelectedQuadrant('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              selectedQuadrant === 'all'
                ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Quadrants
          </button>
          {QUADRANTS.map(q => {
            const Icon = q.icon;
            return (
              <button
                key={q.id}
                onClick={() => setSelectedQuadrant(q.id)}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  selectedQuadrant === q.id
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? q.labelAr : q.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Radar Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => {
          const ringObj = RINGS.find(r => r.id === item.ring)!;
          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/80 card-interactive space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border ${ringObj.color}`}>
                    {locale === 'ar' ? ringObj.labelAr : ringObj.labelEn}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.quadrant.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {locale === 'ar' ? item.summaryAr : item.summaryEn}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider block">
                  {locale === 'ar' ? 'سياق التجربة والإنتاج:' : 'Production Experience Context:'}
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {locale === 'ar' ? item.experienceContextAr : item.experienceContextEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
