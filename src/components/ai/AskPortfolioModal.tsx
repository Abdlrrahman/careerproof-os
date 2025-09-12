'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { Locale } from '@/types';
import { askPortfolioAI, AiResponse } from '@/lib/ai/ai-service';
import { getDictionary } from '@/lib/i18n/translations';

interface AskPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

const SAMPLE_QUERIES = [
  'Has Abdlrrahman led engineering teams and what was the max squad size?',
  'What production AI and Python projects has he architected?',
  'Does he have domain experience in Energy, Oil & Gas?',
  'What municipal digital transformation work did he deliver with VNG International?',
  'What certifications and degrees support his qualifications?',
];

const SAMPLE_QUERIES_AR = [
  'هل قاد عبد الرحمن فرقاً هندسية وما هو أكبر حجم فريق أدارَه؟',
  'ما هي مشاريع الذكاء الاصطناعي وبايثون الإنتاجية التي طورها؟',
  'هل يمتلك خبرة في قطاع الطاقة والنفط والغاز؟',
  'ما هي منصات التحول الرقمي البلدي التي قادها مع VNG International؟',
  'ما هي المؤهلات الأكاديمية والشهادات الاحترافية المعتمدة لديه؟',
];

export function AskPortfolioModal({
  isOpen,
  onClose,
  locale,
}: AskPortfolioModalProps) {
  const t = getDictionary(locale);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAsk = async (textToAsk?: string) => {
    const q = textToAsk || query;
    if (!q.trim() || isLoading) return;

    setIsLoading(true);
    setQuery(q);

    try {
      const res = await askPortfolioAI(q, locale);
      setResponse(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleList = locale === 'ar' ? SAMPLE_QUERIES_AR : SAMPLE_QUERIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] popover-enter"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{t.hero.askAi}</span>
                <span className="text-[10px] font-mono font-normal uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded">
                  Grounded RAG
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                {locale === 'ar' 
                  ? 'إجابات موثوقة ومستندة حصرياً إلى سجلات المشاريع والشهادات المعتمدة' 
                  : 'Answers strictly grounded in verified portfolio evidence with inline citations.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Conversation */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Suggestions Chips */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {locale === 'ar' ? 'أسئلة مقترحة سريعة' : 'Recommended Questions'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sampleList.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(sample)}
                  className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Card */}
          {isLoading && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Querying verified portfolio records...
              </span>
            </div>
          )}

          {response && !isLoading && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Answer</span>
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Grounded Proof ({Math.round(response.confidence * 100)}% Confidence)</span>
                </span>
              </div>

              {/* Formatted Markdown Answer */}
              <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
                {response.answer}
              </div>

              {/* Citations List */}
              {response.citations.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    {locale === 'ar' ? 'المراجع والمصادر المستشهد بها' : 'Citations & Referenced Records'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {response.citations.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100/60 dark:bg-blue-950 text-blue-800 dark:text-cyan-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                        <span>{c.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / Input Form */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'اكتب سؤالك عن خبرات ومشاريع عبد الرحمن...' : 'Ask any question about Abdlrrahman\'s skills, projects, or leadership...'}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 btn-tactile shadow-sm"
            >
              <span>{locale === 'ar' ? 'إرسال' : 'Ask'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
