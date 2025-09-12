'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { Sparkles, Layers, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProjectsPage() {
  const locale: Locale = 'en';
  const projects = db.getProjects();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'production' | 'concepts'>('all');

  const productionProjects = projects.filter(p => p.status === 'in_production' || p.status === 'completed');
  const conceptProjects = projects.filter(p => p.status === 'in_development' || p.status === 'concept');

  const displayedProjects = filter === 'production' 
    ? productionProjects 
    : filter === 'concepts' 
      ? conceptProjects 
      : projects;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Case Studies & Architecture Blueprint Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Production Systems & Deep Dives
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Review detailed architectural RFCs, constraints, security practices, and measured business outcomes. Concepts in active development are explicitly flagged.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('production')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                filter === 'production' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Production Systems ({productionProjects.length})
            </button>
            <button
              onClick={() => setFilter('concepts')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                filter === 'concepts' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Concepts in Development ({conceptProjects.length})
            </button>
          </div>
        </div>

        {/* Production Systems Section */}
        {(filter === 'all' || filter === 'production') && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Completed & Deployed Production Systems
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productionProjects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* Concepts in Development Section */}
        {(filter === 'all' || filter === 'concepts') && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Concepts & Systems in Active Development
                </h2>
              </div>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                Clearly Labeled &bull; Non-Production
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conceptProjects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
