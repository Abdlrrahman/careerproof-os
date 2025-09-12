'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  Lightbulb, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Locale } from '@/types';

interface InterviewRoomProps {
  locale: Locale;
}

const STAR_STORIES = [
  {
    title: 'Architecting GeoFusion AI & Unifying Subsurface Data Under Uncertainty',
    project: 'GeoFusion AI (Technopole)',
    situation: 'Exploration teams spent 3+ weeks manually cross-referencing incompatible LAS well logs and seismic files.',
    task: 'Design an automated, unified spatial AI ingestion pipeline capable of parsing binary SEG-Y logs and predicting lithology.',
    action: 'Fine-tuned domain GeoBERT transformer models and engineered a hybrid PostGIS + pgvector PostgreSQL cluster with asynchronous FastAPI endpoints.',
    result: 'Reduced manual multi-source correlation time by ~40%, handling 250k+ geological records with 92% classification accuracy.',
  },
  {
    title: 'Scaling Omega ERP Multi-Tenant Financial Ledger With Zero Drift',
    project: 'Omega ERP (Omega-Gate Tech / Technopole)',
    situation: 'Enterprise clients were plagued by spreadsheet data drift and manual procurement approval delays.',
    task: 'Build a high-availability ERP with multi-currency double-entry bookkeeping and role-based access control.',
    action: 'Enforced immutable audit ledger constraints at the database level in PostgreSQL and built optimistic React UI states.',
    result: 'Scaled to 150+ daily active enterprise users and reduced month-end reconciliation time from 5 days to 2 hours.',
  },
  {
    title: 'Leading Municipal Digital Transformation & Capacity Building for 150+ Officers',
    project: 'Municipal Platforms (VNG International)',
    situation: 'Local municipal administrations had zero digital citizen ticketing, leading to high administrative friction.',
    task: 'Deliver citizen service portals and onboard local civil servants with varied initial digital literacy.',
    action: 'Engineered lightweight low-bandwidth portals and designed hands-on training workshops for municipal personnel.',
    result: 'Deployed portals reaching over 200,000 citizens and achieved a 94% post-training competency score among 150+ officers.',
  },
];

const TECH_QUESTIONS = [
  {
    q: 'How do you handle schema migrations and transactional integrity in multi-tenant PostgreSQL systems?',
    talkingPoints: [
      'Tenant isolation strategies (Row-Level Security vs. dedicated schema namespaces)',
      'Immutable audit logging and double-entry accounting constraints',
      'Handling high-concurrency row-level locks for inventory reconciliation',
    ],
  },
  {
    q: 'Why choose fine-tuned domain models (GeoBERT) over generic off-the-shelf LLMs for specialized datasets?',
    talkingPoints: [
      'Domain vocabulary drift (petroleum stratigraphic vs. general English)',
      'Deterministic latency and cost predictability at production scale',
      'Combining dense vector search with exact PostGIS bounding box filters',
    ],
  },
  {
    q: 'How do you structure code quality and sprint delivery across distributed 15-person squads?',
    talkingPoints: [
      'Architectural RFC process before major feature implementation',
      'Strict TypeScript and automated test coverage thresholds in CI/CD',
      'Empathetic 1-on-1 mentorship and blameless post-mortems',
    ],
  },
];

const QUESTIONS_TO_ASK = [
  'What is the highest-friction bottleneck currently slowing down your engineering squad’s sprint velocity?',
  'How is architectural decision-making governed between staff engineers and product management?',
  'What are the core technical outcomes the team expects this hire to achieve in the first 90 days?',
];

export function InterviewRoom({ locale }: InterviewRoomProps) {
  const [activeTab, setActiveTab] = useState<'star' | 'tech' | 'questions' | 'checklist'>('star');
  const [reflectionNote, setReflectionNote] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <span>Interview Preparation Room & STAR Story Studio</span>
          </h2>
          <p className="text-xs text-slate-500">
            Curated behavioral frameworks, architectural talking points, and interviewer questions grounded in verified evidence.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {[
            { id: 'star', label: 'STAR Story Suggestions' },
            { id: 'tech', label: 'Technical Architecture Q&A' },
            { id: 'questions', label: 'Questions to Ask Interviewer' },
            { id: 'checklist', label: 'Company Research Checklist' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* STAR Stories */}
      {activeTab === 'star' && (
        <div className="grid grid-cols-1 gap-6">
          {STAR_STORIES.map((story, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {story.title}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800 shrink-0">
                  {story.project}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px]">
                    Situation (S)
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{story.situation}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-cyan-400 uppercase text-[10px]">
                    Task (T)
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{story.task}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px]">
                    Action (A)
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{story.action}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">
                    Result & Impact (R)
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{story.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Architecture Q&A */}
      {activeTab === 'tech' && (
        <div className="space-y-4">
          {TECH_QUESTIONS.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{item.q}</span>
              </h3>
              <div className="pl-7 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-400 block text-[11px]">Recommended Architectural Talking Points:</span>
                <ul className="list-disc list-inside space-y-1">
                  {item.talkingPoints.map((tp, tpIdx) => (
                    <li key={tpIdx}>{tp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Questions to Ask Interviewer */}
      {activeTab === 'questions' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            High-Signal Questions for Technical Interviewers & Hiring Managers
          </h3>
          <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            {QUESTIONS_TO_ASK.map((q, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Research Checklist */}
      {activeTab === 'checklist' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Pre-Interview Company Research Checklist
          </h3>
          <div className="space-y-2">
            {[
              'Review recent engineering blog posts or architecture announcements',
              'Inspect public GitHub repos and open-source contributions of the team',
              'Understand company business model, recent funding rounds, and main customer segments',
              'Verify tech stack alignment (Python/FastAPI, PostgreSQL, TypeScript, Docker)',
              'Prepare specific 90-day technical value proposition for the hiring manager',
            ].map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
