'use client';

import React, { useState } from 'react';
import { 
  JobOpportunity, 
  PipelineStage, 
  Locale 
} from '@/types';
import { 
  Plus, 
  Sparkles, 
  Building, 
  MapPin, 
  Calendar, 
  MoreVertical, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Trash2,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { db } from '@/lib/db/data-store';

interface PipelineBoardProps {
  opportunities: JobOpportunity[];
  onOpportunityUpdated: () => void;
  onOpenAddModal: () => void;
  locale: Locale;
}

const PIPELINE_STAGES: { id: PipelineStage; labelEn: string; labelAr: string; color: string }[] = [
  { id: 'discovered', labelEn: 'Discovered', labelAr: 'مكتشفة', color: 'border-slate-300 dark:border-slate-700' },
  { id: 'reviewing', labelEn: 'Reviewing', labelAr: 'قيد المراجعة', color: 'border-blue-300 dark:border-blue-800' },
  { id: 'prioritized', labelEn: 'Prioritized', labelAr: 'عالية الأولوية', color: 'border-indigo-300 dark:border-indigo-800' },
  { id: 'preparing', labelEn: 'Preparing Doc', labelAr: 'إعداد الملف', color: 'border-cyan-300 dark:border-cyan-800' },
  { id: 'applied', labelEn: 'Applied', labelAr: 'تم التقديم', color: 'border-purple-300 dark:border-purple-800' },
  { id: 'assessment', labelEn: 'Assessment', labelAr: 'الاختبار التقني', color: 'border-amber-300 dark:border-amber-800' },
  { id: 'interview', labelEn: 'Interviewing', labelAr: 'المقابلات', color: 'border-emerald-400 dark:border-emerald-700' },
  { id: 'offer', labelEn: 'Offer Received', labelAr: 'عرض عمل', color: 'border-emerald-500 bg-emerald-50/20' },
  { id: 'rejected', labelEn: 'Rejected', labelAr: 'مرفوضة', color: 'border-red-300 dark:border-red-900' },
  { id: 'withdrawn', labelEn: 'Withdrawn', labelAr: 'منسحبة', color: 'border-slate-400' },
  { id: 'archived', labelEn: 'Archived', labelAr: 'مؤرشفة', color: 'border-slate-500' },
];

export function PipelineBoard({
  opportunities,
  onOpportunityUpdated,
  onOpenAddModal,
  locale,
}: PipelineBoardProps) {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  const handleMoveStage = (id: string, newStage: PipelineStage) => {
    db.updateOpportunityStage(id, newStage);
    onOpportunityUpdated();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this opportunity?')) {
      db.deleteOpportunity(id);
      onOpportunityUpdated();
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {locale === 'ar' ? 'متابعة خط التقديم للوظائف (Pipeline)' : 'Active Application Pipeline'}
          </h2>
          <p className="text-xs text-slate-500">
            {opportunities.length} {locale === 'ar' ? 'فرصة مسجلة عبر كافة المراحل' : 'tracked opportunities across 11 stages'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                viewMode === 'kanban' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              Table
            </button>
          </div>

          {/* Add Opportunity Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm btn-tactile"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'ar' ? 'إضافة فرصة' : 'New Opportunity'}</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1">
          {PIPELINE_STAGES.map((stage) => {
            const stageOpps = opportunities.filter(o => o.pipelineStage === stage.id);
            return (
              <div 
                key={stage.id}
                className="w-72 shrink-0 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[750px]"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {locale === 'ar' ? stage.labelAr : stage.labelEn}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold flex items-center justify-center text-slate-600 dark:text-slate-300">
                      {stageOpps.length}
                    </span>
                  </div>
                </div>

                {/* Opportunity Cards List */}
                <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1">
                  {stageOpps.map((opp) => (
                    <div
                      key={opp.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-blue-500 card-interactive space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                            {opp.title}
                          </h4>
                          <span className="text-[11px] text-blue-600 dark:text-cyan-400 font-semibold flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" />
                            <span>{opp.companyName}</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800 shrink-0">
                          {opp.matchScore}% Match
                        </span>
                      </div>

                      {opp.salaryMin && (
                        <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                          <DollarSign className="w-3 h-3" />
                          <span>${(opp.salaryMin/1000).toFixed(0)}k - ${(opp.salaryMax!/1000).toFixed(0)}k</span>
                        </div>
                      )}

                      {/* Quick Move Select */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <select
                          value={opp.pipelineStage}
                          onChange={(e) => handleMoveStage(opp.id, e.target.value as PipelineStage)}
                          className="text-[10px] font-semibold py-1 px-1.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-none focus:ring-1 focus:ring-blue-500"
                        >
                          {PIPELINE_STAGES.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.labelEn}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleDelete(opp.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Delete opportunity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageOpps.length === 0 && (
                    <div className="py-8 text-center text-slate-400 text-xs italic">
                      No roles in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Data Table View */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Role Title & Company</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Match Score</th>
                  <th className="py-3 px-4">Salary Range</th>
                  <th className="py-3 px-4">Follow-up Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{opp.title}</div>
                      <div className="text-slate-500">{opp.companyName} &bull; {opp.location}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                        {opp.pipelineStage}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-cyan-400">
                      {opp.matchScore}%
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {opp.salaryMin ? `$${opp.salaryMin.toLocaleString()} - $${opp.salaryMax?.toLocaleString()}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {opp.followUpDate || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(opp.id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
