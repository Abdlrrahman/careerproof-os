'use client';

import React, { useState, useEffect } from 'react';
import { PitchSlide, Locale } from '@/types';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Check, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Maximize2
} from 'lucide-react';

interface PitchDeckStudioProps {
  slides: PitchSlide[];
  locale: Locale;
}

export function PitchDeckStudio({ slides, locale }: PitchDeckStudioProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSlide, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Presentation className="w-3.5 h-3.5 text-cyan-400" />
              Executive Technical Presentation Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Executive Technical Portfolio & Pitch Deck
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              High-impact presentation deck crafted for C-suite, VP of Engineering, and Head of Talent final-round architectural defenses.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <span className="font-mono text-xs text-slate-400">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Export Slide'}</span>
            </button>
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlideIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Presentation Card */}
      {currentSlide && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 min-h-[460px] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-900">
                {locale === 'ar' ? currentSlide.badgeAr : currentSlide.badgeEn}
              </span>

              <span className="text-xs font-mono text-slate-400">
                0{currentSlide.slideNumber} / 0{slides.length}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {locale === 'ar' ? currentSlide.titleAr : currentSlide.titleEn}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-3xl">
                {locale === 'ar' ? currentSlide.subtitleAr : currentSlide.subtitleEn}
              </p>
            </div>

            {/* Bullets & Metric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="md:col-span-2 space-y-3">
                {(locale === 'ar' ? currentSlide.bulletsAr : currentSlide.bulletsEn).map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Highlight Metric Callout */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white flex flex-col justify-center items-center text-center space-y-1 shadow-lg">
                <span className="text-3xl sm:text-5xl font-black text-cyan-400 font-mono tracking-tight">
                  {currentSlide.highlightMetric.value}
                </span>
                <span className="text-xs text-slate-400 font-sans">
                  {locale === 'ar' ? currentSlide.highlightMetric.labelAr : currentSlide.highlightMetric.labelEn}
                </span>
              </div>
            </div>
          </div>

          {/* Key Takeaway & Navigation Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-500 max-w-xl">
              <span className="font-bold text-slate-700 dark:text-slate-300">Takeaway: </span>
              {locale === 'ar' ? currentSlide.keyTakeawayAr : currentSlide.keyTakeawayEn}
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
