'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Layers, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  BarChart3, 
  DollarSign, 
  Building 
} from 'lucide-react';
import { db } from '@/lib/db/data-store';
import { OpportunityModal } from '@/components/dashboard/OpportunityModal';
import { Locale } from '@/types';

export default function DashboardOverviewPage() {
  const locale: Locale = 'en';
  const opportunities = db.getOpportunities();
  const skills = db.getSkills();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const appliedOpps = opportunities.filter(o => o.pipelineStage !== 'discovered' && o.pipelineStage !== 'reviewing');
  const upcomingInterviews = opportunities.filter(o => o.pipelineStage === 'interview');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900/60 via-indigo-950/60 to-slate-900 border border-blue-800/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
            Authenticated Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome back, Abdlrrahman
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Track active remote applications, evaluate JD alignment scores, generate grounded application packages, and manage your portfolio CMS.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2 btn-tactile shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Tracked Roles</span>
          <div className="text-3xl font-black font-mono text-white">{opportunities.length}</div>
          <p className="text-[11px] text-slate-500">In private pipeline</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Active Applications</span>
          <div className="text-3xl font-black font-mono text-blue-400">{appliedOpps.length}</div>
          <p className="text-[11px] text-slate-500">Submitted & tracked</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Upcoming Interviews</span>
          <div className="text-3xl font-black font-mono text-emerald-400">{upcomingInterviews.length}</div>
          <p className="text-[11px] text-slate-500">In interview stage</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Published Skills</span>
          <div className="text-3xl font-black font-mono text-purple-400">{skills.length}</div>
          <p className="text-[11px] text-slate-500">All evidence-connected</p>
        </div>
      </div>

      {/* Main Grid: Priority Action Items & Active Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Follow-Ups & Active Roles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Prioritized & Active Opportunities</span>
            </h3>
            <Link href="/dashboard/pipeline" className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1">
              <span>View Full Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 4).map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{opp.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-blue-800">
                      {opp.matchScore}% Match
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                    <span>{opp.companyName}</span>
                    <span>&bull;</span>
                    <span>{opp.location}</span>
                    {opp.salaryMin && (
                      <>
                        <span>&bull;</span>
                        <span className="text-emerald-400">${(opp.salaryMin/1000).toFixed(0)}k - ${(opp.salaryMax!/1000).toFixed(0)}k</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold uppercase text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                    {opp.pipelineStage}
                  </span>
                  <Link
                    href="/dashboard/studio"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Studio</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch & Tool Hub */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
            Quick Command Actions
          </h3>

          <div className="space-y-3">
            <Link
              href="/dashboard/studio"
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 block transition-colors space-y-1"
            >
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Application Studio</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Generate grounded cover letters, ATS résumés, and LinkedIn outreach drafts.
              </p>
            </Link>

            <Link
              href="/dashboard/interview"
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500 block transition-colors space-y-1"
            >
              <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span>Interview Room & STAR Stories</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Review technical architecture talking points and STAR story cheat sheets.
              </p>
            </Link>

            <Link
              href="/dashboard/cms"
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 block transition-colors space-y-1"
            >
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                <span>Content CMS & Audit Logs</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Edit profile details, add new skills, and review system audit history.
              </p>
            </Link>
          </div>
        </div>
      </div>

      <OpportunityModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onOpportunityCreated={() => setRefreshKey(k => k + 1)}
        locale={locale}
      />
    </div>
  );
}
