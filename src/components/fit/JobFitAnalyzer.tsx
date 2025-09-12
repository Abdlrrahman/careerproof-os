'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  Layers, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Skill, Project, MeasurableAchievement, RoleLens, JobMatchResult, Locale } from '@/types';
import { analyzeJobDescription } from '@/lib/matching/job-matcher';
import { getDictionary } from '@/lib/i18n/translations';

interface JobFitAnalyzerProps {
  skills: Skill[];
  projects: Project[];
  achievements: MeasurableAchievement[];
  roleLenses: RoleLens[];
  locale: Locale;
}

const SAMPLE_JD_AI_BACKEND = `
Position: Senior AI & Distributed Backend Systems Lead (Remote)
Company: NextGen Geospatial Analytics Labs
Location: Remote (Europe / EMEA / US East Overlap)

About the Role:
We are looking for a Senior AI & Backend Lead with strong production experience architecting asynchronous services in Python (FastAPI/Django) and modern TypeScript.
You will direct our ML ingestion pipeline, integrate vector embeddings and domain transformer models (such as GeoBERT or specialized BERT variants), and manage large-scale geospatial datasets in PostgreSQL / PostGIS.

Key Requirements:
- 5+ years of software engineering and backend systems architecture.
- Deep expertise in Python, FastAPI, Docker, and CI/CD pipelines.
- Hands-on machine learning experience: predictive modeling, NLP embeddings, and RAG retrieval workflows.
- Strong SQL proficiency with PostgreSQL, spatial indexing, and database query optimization.
- Experience leading or mentoring engineering squads (5-15 engineers) and managing concurrent delivery milestones.
- Excellent communication and ability to work across distributed international teams.
`;

export function JobFitAnalyzer({
  skills,
  projects,
  achievements,
  roleLenses,
  locale,
}: JobFitAnalyzerProps) {
  const t = getDictionary(locale);
  const [jobText, setJobText] = useState('');
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jobText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeJobDescription(jobText, skills, projects, achievements, roleLenses);
      setMatchResult(result);
      setIsAnalyzing(false);
    }, 350);
  };

  const handleLoadSample = () => {
    setJobText(SAMPLE_JD_AI_BACKEND.trim());
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Info */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{locale === 'ar' ? 'تحليل فوري مبني على الأدلة الحقيقية' : 'Deterministic & Evidence-Grounded Scoring'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.fitAnalyzer.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t.fitAnalyzer.subtitle}
        </p>
      </div>

      {/* Input Box & Action Buttons */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {locale === 'ar' ? 'نص الوصف الوظيفي (Job Description)' : 'Job Description Spec'}
          </label>
          <button
            onClick={handleLoadSample}
            className="text-xs text-blue-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.fitAnalyzer.sampleJdButton}</span>
          </button>
        </div>

        <textarea
          rows={7}
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder={t.fitAnalyzer.pastePlaceholder}
          className="w-full p-4 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-400">
            {locale === 'ar'
              ? 'التقييم يربط المتطلبات بالمشاريع المعتمدة والشهادات وقواعد البيانات الحقيقية.'
              : 'Evaluates against verified codebases, production architectures, and accredited certifications.'}
          </span>
          <button
            onClick={handleAnalyze}
            disabled={!jobText.trim() || isAnalyzing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 btn-tactile"
          >
            {isAnalyzing ? (
              <span>Analyzing Match Matrix...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.fitAnalyzer.analyzeButton}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {matchResult && (
        <div className="space-y-6 pt-4">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Overall Score */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md flex flex-col justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
                {t.fitAnalyzer.overallScore}
              </span>
              <div className="my-2 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold font-mono tracking-tight">
                  {matchResult.overallScore}%
                </span>
                <span className="text-xs text-blue-200 font-medium">Strong Candidate Alignment</span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-cyan-300 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${matchResult.overallScore}%` }}
                />
              </div>
            </div>

            {/* Confidence & Verified Match Count */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                {t.fitAnalyzer.confidence}
              </span>
              <div className="my-2">
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {matchResult.confidenceScore}% High Confidence
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {matchResult.matchedVerifiedSkills.length} verified direct skills confirmed in production.
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Hallucinated Proof</span>
              </div>
            </div>

            {/* Timezone & Remote Compatibility */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                {t.fitAnalyzer.timezoneFit}
              </span>
              <div className="my-2">
                <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <span>{matchResult.timezoneAndRemoteCompatibility.overlapHours}+ Hours Overlap</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {matchResult.timezoneAndRemoteCompatibility.summary}
                </p>
              </div>
              <Link
                href={locale === 'ar' ? `/ar/resume` : `/resume`}
                className="text-xs text-blue-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>View Tailored Résumé</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Skill Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Matched Verified Skills */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-950/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.fitAnalyzer.matchedSkills}</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {matchResult.matchedVerifiedSkills.length}
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {matchResult.matchedVerifiedSkills.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs flex justify-between items-center">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{s.name}</span>
                    <span className="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                      {s.level} ({s.evidenceCount} items)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partially Supported */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-950/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>{t.fitAnalyzer.partialSkills}</span>
                </span>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {matchResult.partiallySupportedSkills.length}
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {matchResult.partiallySupportedSkills.length > 0 ? (
                  matchResult.partiallySupportedSkills.map((s, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{s.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{s.reason}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center">None. High core overlap.</p>
                )}
              </div>
            </div>

            {/* Tooling Gaps & Mitigations */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-950/60 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t.fitAnalyzer.missingSkills}</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {matchResult.missingSkills.length}
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {matchResult.missingSkills.length > 0 ? (
                  matchResult.missingSkills.map((s, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{s.name}</div>
                      {s.suggestedAlternative && (
                        <div className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                          Alternative: {s.suggestedAlternative}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center">No notable gaps detected.</p>
                )}
              </div>
            </div>
          </div>

          {/* Related Case Studies & Interview Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Relevant Projects */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{t.fitAnalyzer.relevantProjects}</span>
              </h4>
              <div className="space-y-2.5">
                {matchResult.relevantProjects.slice(0, 3).map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="font-bold text-slate-900 dark:text-white flex justify-between items-center">
                      <span>{p.title}</span>
                      <Link 
                        href={locale === 'ar' ? `/ar/projects/${p.projectId}` : `/projects/${p.projectId}`}
                        className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <p className="text-slate-500 mt-1">{p.relevanceReason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Interview Topics */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{t.fitAnalyzer.interviewTopics}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {matchResult.interviewTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                    <span className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="leading-tight">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTA: Generate in Application Studio */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/60 to-indigo-950/60 border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                Instant Application Studio Integration
              </span>
              <h4 className="text-sm font-bold text-white">
                Generate a grounded cover letter and tailored ATS résumé for this exact match
              </h4>
            </div>

            <Link
              href={locale === 'ar' ? '/ar/dashboard/studio' : '/dashboard/studio'}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm btn-tactile shrink-0"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Open in Application Studio</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
