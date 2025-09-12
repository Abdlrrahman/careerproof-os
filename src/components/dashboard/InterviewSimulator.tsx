'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Play, 
  Square, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Award 
} from 'lucide-react';
import { Locale } from '@/types';

interface InterviewSimulatorProps {
  locale: Locale;
}

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    role: 'AI / Machine Learning Engineer',
    question: 'How did you design the data ingestion and transformer pipeline in GeoFusion AI to handle heterogeneous and sparse geological datasets?',
    targetProject: 'GeoFusion AI (Technopole)',
    suggestedStructure: {
      situation: 'Exploration teams spent 3+ weeks manually cross-referencing incompatible LAS well logs and SEG-Y seismic files.',
      task: 'Design an automated, unified spatial AI ingestion pipeline capable of parsing binary SEG-Y logs and predicting lithology.',
      action: 'Fine-tuned domain GeoBERT transformer models and engineered a hybrid PostGIS + pgvector PostgreSQL cluster with asynchronous FastAPI endpoints.',
      result: 'Reduced manual multi-source correlation time by ~40%, handling 250k+ geological records with 92% classification accuracy.',
    },
    keyKeywords: ['FastAPI', 'PostGIS', 'pgvector', 'GeoBERT', '40% reduction', 'LAS 2.0/3.0'],
  },
  {
    id: 'q2',
    role: 'Staff Backend Engineer / Tech Lead',
    question: 'How do you enforce database transactional integrity and Row-Level Security in multi-tenant financial ledgers?',
    targetProject: 'Omega ERP (Omega-Gate Tech / Technopole)',
    suggestedStructure: {
      situation: 'Enterprise clients suffered from spreadsheet data drift and delayed reconciliation.',
      task: 'Build a zero-drift double-entry ledger with immutable audit constraints and tenant isolation.',
      action: 'Implemented append-only journal tables, database-level debit/credit balance check constraints, and PostgreSQL Row-Level Security (RLS).',
      result: 'Scaled to 150+ daily active users and slashed month-end reconciliation from 5 days to under 2 hours.',
    },
    keyKeywords: ['Row-Level Security', 'Double-Entry', 'Zero-Drift', 'PostgreSQL constraints', 'Audit hash'],
  },
  {
    id: 'q3',
    role: 'Engineering Lead & Founder',
    question: 'How do you structure technical RFCs and sprint delivery when leading distributed squads of up to 15 engineers?',
    targetProject: 'Technopole & Nexora Tech',
    suggestedStructure: {
      situation: 'Rapidly scaling multidisciplinary team with diverging architectural opinions.',
      task: 'Establish predictable 2-week sprint releases with high code quality and clear technical governance.',
      action: 'Instituted structured architectural RFCs before major features, strict TypeScript boundaries, automated CI/CD coverage thresholds, and empathetic 1-on-1 mentorship.',
      result: 'Maintained zero-regression delivery across 10+ concurrent initiatives and high team retention.',
    },
    keyKeywords: ['RFC process', 'TypeScript boundaries', 'CI/CD automation', '1-on-1 mentorship', '15-person squad'],
  },
];

export function InterviewSimulator({ locale }: InterviewSimulatorProps) {
  const [selectedQIdx, setSelectedQIdx] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(120); // 2-min limit
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [feedback, setFeedback] = useState<{ score: number; coveredKeywords: string[]; feedbackText: string } | null>(null);

  const activeQ = MOCK_QUESTIONS[selectedQIdx];

  useEffect(() => {
    let interval: any = null;
    if (isRecording && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isRecording) {
      handleStopRecording();
    }
    return () => clearInterval(interval);
  }, [isRecording, timerSeconds]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimerSeconds(120);
    setUserTranscript('');
    setFeedback(null);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate speech-to-text transcript evaluation
    const sampleSpoken = `In GeoFusion AI at Technopole, our exploration teams spent weeks on manual LAS logs. I architected an asynchronous FastAPI backend and fine-tuned GeoBERT models with a PostGIS and pgvector cluster. This resulted in a 40% reduction in manual exploration time and 92% classification accuracy across 250k records.`;
    setUserTranscript(sampleSpoken);

    // Evaluate against keywords
    const covered = activeQ.keyKeywords.filter(k => sampleSpoken.toLowerCase().includes(k.toLowerCase().split(' ')[0]));
    setFeedback({
      score: Math.min(Math.round((covered.length / activeQ.keyKeywords.length) * 100) + 15, 96),
      coveredKeywords: covered,
      feedbackText: 'Excellent STAR structure! You clearly grounded your response with the exact 40% measured outcome and specific architectural components (FastAPI, PostGIS, GeoBERT).',
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Simulator Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
              Interactive Practice Room
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Live Mock Interview Practice & STAR Evaluator
            </h2>
            <p className="text-xs text-slate-400">
              Practice answering senior technical & architectural interview questions with countdown timers and automated evidence alignment scoring.
            </p>
          </div>

          {/* Question Selector */}
          <div className="flex gap-2">
            {MOCK_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQIdx(idx);
                  setIsRecording(false);
                  setTimerSeconds(120);
                  setUserTranscript('');
                  setFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                  selectedQIdx === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Q{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Question Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-blue-400">{activeQ.role}</span>
            <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded">Target: {activeQ.targetProject}</span>
          </div>
          <h3 className="text-base font-bold text-white leading-relaxed">
            &ldquo;{activeQ.question}&rdquo;
          </h3>
        </div>
      </div>

      {/* Timer & Recording Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Teleprompter & Recording Controls */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-400 uppercase font-mono">Response Timer</span>
              <div className="flex items-center gap-1.5 font-mono text-base font-bold text-cyan-400">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* STAR Story Framework Teleprompter */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">
                Recommended STAR Talking Points:
              </span>
              <div className="space-y-1.5 text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div><strong className="text-amber-400 font-mono">S:</strong> {activeQ.suggestedStructure.situation}</div>
                <div><strong className="text-blue-400 font-mono">T:</strong> {activeQ.suggestedStructure.task}</div>
                <div><strong className="text-purple-400 font-mono">A:</strong> {activeQ.suggestedStructure.action}</div>
                <div><strong className="text-emerald-400 font-mono">R:</strong> {activeQ.suggestedStructure.result}</div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 btn-tactile shadow-md"
              >
                <Mic className="w-4 h-4 text-white animate-pulse" />
                <span>Start Timed Practice Answer</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 btn-tactile shadow-md"
              >
                <Square className="w-4 h-4 text-white" />
                <span>Finish & Evaluate Response</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Evaluator & Transcript */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-400 uppercase font-mono">Transcript & Evidence Alignment</span>
              {feedback && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {feedback.score}% Grounded Score
                </span>
              )}
            </div>

            {userTranscript ? (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic leading-relaxed max-h-36 overflow-y-auto">
                &ldquo;{userTranscript}&rdquo;
              </div>
            ) : (
              <div className="h-36 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-xs">
                <span>Spoken transcript will render here upon completion</span>
              </div>
            )}

            {/* Keyword Checklist */}
            <div className="space-y-1.5 pt-1">
              <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">
                Required Technical Proof Anchors:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeQ.keyKeywords.map((k, idx) => {
                  const isCovered = feedback?.coveredKeywords.includes(k) || false;
                  return (
                    <span
                      key={idx}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                        isCovered
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {k} {isCovered && '✓'}
                    </span>
                  );
                })}
              </div>
            </div>

            {feedback && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 leading-relaxed font-medium">
                {feedback.feedbackText}
              </div>
            )}
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Assists in avoiding ungrounded claims during live recruiter calls.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
