'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Plus, 
  Upload, 
  Send,
  Database,
  Building,
  DollarSign
} from 'lucide-react';
import { Locale, JobOpportunity } from '@/types';
import { db } from '@/lib/db/data-store';
import { analyzeJobDescription } from '@/lib/matching/job-matcher';

interface BatchJobMatcherProps {
  locale: Locale;
}

export function BatchJobMatcher({ locale }: BatchJobMatcherProps) {
  const [batchRawText, setBatchRawText] = useState<string>('');
  const [analyzedBatch, setAnalyzedBatch] = useState<{
    id: string;
    title: string;
    company: string;
    matchScore: number;
    skillsCount: number;
    rawText: string;
    imported: boolean;
  }[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const skills = db.getSkills();
  const projects = db.getProjects();
  const achievements = db.getAchievements();
  const roleLenses = db.getRoleLenses();

  const handleProcessBatch = () => {
    if (!batchRawText.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      // Split by double newline or delimiter
      const chunks = batchRawText.split(/\n\s*---\s*\n|\n\s*===+\s*\n/).filter(c => c.trim().length > 20);
      
      const results = chunks.map((chunk, idx) => {
        const lines = chunk.trim().split('\n');
        const firstLine = lines[0].replace(/^(job|title|role|position):\s*/i, '').trim();
        const secondLine = lines.length > 1 ? lines[1].replace(/^(company|org):\s*/i, '').trim() : 'Tech Talent Partner';

        const match = analyzeJobDescription(chunk, skills, projects, achievements, roleLenses);
        return {
          id: `batch-${Date.now()}-${idx}`,
          title: firstLine || `Role Opportunity #${idx + 1}`,
          company: secondLine.length < 30 ? secondLine : 'Global Enterprise',
          matchScore: match.overallScore,
          skillsCount: match.matchedVerifiedSkills.length,
          rawText: chunk,
          imported: false,
        };
      });

      setAnalyzedBatch(results);
      setIsProcessing(false);
    }, 400);
  };

  const handleImportSingle = (item: typeof analyzedBatch[0]) => {
    db.createOpportunity({
      title: item.title,
      companyName: item.company,
      location: 'Remote (EMEA / US East)',
      workplaceType: 'remote',
      rawDescription: item.rawText,
      sourcePlatform: 'direct',
      matchScore: item.matchScore,
      pipelineStage: 'discovered',
      targetRoleLensId: item.matchScore > 85 ? 'ai-ml-engineer' : 'technical-lead',
    });

    setAnalyzedBatch(prev => prev.map(b => b.id === item.id ? { ...b, imported: true } : b));
  };

  const handleImportAll = () => {
    analyzedBatch.forEach(item => {
      if (!item.imported) {
        db.createOpportunity({
          title: item.title,
          companyName: item.company,
          location: 'Remote (EMEA / US East)',
          workplaceType: 'remote',
          rawDescription: item.rawText,
          sourcePlatform: 'direct',
          matchScore: item.matchScore,
          pipelineStage: 'discovered',
          targetRoleLensId: item.matchScore > 85 ? 'ai-ml-engineer' : 'technical-lead',
        });
      }
    });

    setAnalyzedBatch(prev => prev.map(b => ({ ...b, imported: true })));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
              High-Velocity Ingestion
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Batch Job Description Matcher & Pipeline Importer
            </h2>
            <p className="text-xs text-slate-400">
              Paste multiple job descriptions separated by &apos;---&apos; to bulk-rank match scores and import them into your 11-stage pipeline.
            </p>
          </div>

          <button
            onClick={() => {
              setBatchRawText(`Staff AI / ML Platform Engineer
Veritas AI Intelligence
Remote (US / EMEA)
Looking for a Staff ML Engineer with FastAPI, PostGIS, PyTorch embeddings, and PostgreSQL. Must have experience with high-throughput streaming and leading squads.

---

Principal Backend & Distributed Systems Lead
CloudMatrix Enterprise
Remote (Global)
Seeking a Principal Backend Architect to direct multi-tenant database systems, Row-Level Security in PostgreSQL, and Dockerized microservices.`);
            }}
            className="text-xs font-semibold text-cyan-400 hover:underline shrink-0"
          >
            Load Sample Batch
          </button>
        </div>

        {/* Textarea Input */}
        <textarea
          rows={7}
          value={batchRawText}
          onChange={(e) => setBatchRawText(e.target.value)}
          placeholder="Paste Job Description 1&#10;---&#10;Paste Job Description 2&#10;---&#10;Paste Job Description 3"
          className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-blue-500"
        />

        <div className="flex justify-between items-center pt-1">
          <span className="text-[11px] text-slate-500 font-mono">
            Separate multiple JDs with three dashes (---)
          </span>
          <button
            onClick={handleProcessBatch}
            disabled={isProcessing || !batchRawText.trim()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md btn-tactile"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{isProcessing ? 'Ranking Match Scores...' : 'Score & Rank Batch'}</span>
          </button>
        </div>
      </div>

      {/* Results List */}
      {analyzedBatch.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Processed Opportunities ({analyzedBatch.length})</span>
            </h3>

            <button
              onClick={handleImportAll}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 btn-tactile"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Import All into Pipeline</span>
            </button>
          </div>

          <div className="space-y-3">
            {analyzedBatch.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    <span className="text-xs text-blue-400">({item.company})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    {item.skillsCount} verified skills aligned &bull; Remote Compatible
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-base font-mono font-black text-cyan-400">
                      {item.matchScore}%
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono">Match Score</span>
                  </div>

                  <button
                    onClick={() => handleImportSingle(item)}
                    disabled={item.imported}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      item.imported
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-blue-600 text-white hover:bg-blue-500'
                    }`}
                  >
                    {item.imported ? '✓ In Pipeline' : '+ Add to Pipeline'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
