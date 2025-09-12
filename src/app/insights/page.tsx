'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function InsightsPage() {
  const locale: Locale = 'en';
  const articles = db.getArticles();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Technical Publications & System Architecture Deep Dives
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineering Insights & Whitepapers
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practical architectural retrospectives, machine learning engineering breakdowns, and system design patterns derived from production deployments.
          </p>
        </div>

        <div className="space-y-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/80 card-interactive space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                  <span>{art.publishedDate}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTimeMinutes} min read</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                  <Link href={`/insights/${art.slug}`}>
                    {art.titleEn}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {art.subtitleEn}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {art.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/insights/${art.slug}`}
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Read Full Technical Whitepaper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
