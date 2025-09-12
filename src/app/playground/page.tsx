'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CodePlayground } from '@/components/tools/CodePlayground';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function PlaygroundPage() {
  const locale: Locale = 'en';
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Live Interactive Architecture Simulation
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            API & Code Sandbox
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Test and inspect live request/response data payloads across GeoFusion AI subsurface lithology prediction endpoints and Omega ERP immutable ledger validation services.
          </p>
        </div>

        <CodePlayground locale={locale} />
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
