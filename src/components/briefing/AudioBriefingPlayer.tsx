'use client';

import React, { useState, useEffect } from 'react';
import { 
  AudioBriefing, 
  Locale 
} from '@/types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Globe, 
  Radio 
} from 'lucide-react';

interface AudioBriefingPlayerProps {
  briefings: AudioBriefing[];
  locale: Locale;
}

export function AudioBriefingPlayer({ briefings, locale }: AudioBriefingPlayerProps) {
  const [selectedBriefingId, setSelectedBriefingId] = useState<string>(briefings[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const activeBriefing = briefings.find(b => b.id === selectedBriefingId) || briefings[0];

  useEffect(() => {
    let timer: any = null;
    if (isPlaying && currentTime < activeBriefing.durationSeconds) {
      timer = setInterval(() => {
        setCurrentTime(t => t + 1);
      }, 1000);
    } else if (currentTime >= activeBriefing.durationSeconds) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTime, activeBriefing.durationSeconds]);

  const handleTogglePlay = () => {
    if (currentTime >= activeBriefing.durationSeconds) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progressPercent = Math.min((currentTime / activeBriefing.durationSeconds) * 100, 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Player Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
                60-Second Executive Audio Briefing
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? activeBriefing.titleAr : activeBriefing.titleEn}
            </h2>
          </div>

          {/* Briefing Switcher */}
          <div className="flex gap-2">
            {briefings.map(b => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBriefingId(b.id);
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBriefingId === b.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {b.roleLensId === 'ai-ml-engineer' ? 'AI / ML Track' : 'Tech Lead Track'}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="h-16 flex items-center justify-center gap-1 sm:gap-1.5 px-4 bg-slate-900/80 rounded-2xl border border-slate-800">
          {Array.from({ length: 48 }).map((_, i) => {
            const isBarActive = (i / 48) * 100 <= progressPercent;
            const randomHeight = isPlaying 
              ? Math.floor(Math.sin((i + currentTime * 3) * 0.5) * 16 + 24)
              : Math.floor(Math.sin(i * 0.4) * 8 + 14);

            return (
              <div
                key={i}
                style={{ height: `${randomHeight}px` }}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-150 ${
                  isBarActive ? 'bg-cyan-400' : 'bg-slate-700'
                }`}
              />
            );
          })}
        </div>

        {/* Playback Controls & Progress Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>{Math.floor(activeBriefing.durationSeconds / 60)}:{(activeBriefing.durationSeconds % 60).toString().padStart(2, '0')}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer">
            <div
              className="bg-blue-500 h-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{activeBriefing.audioVoiceType}</span>
            </div>
          </div>
        </div>

        {/* Live Synchronized Transcript */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
            Live Briefing Transcript:
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            &ldquo;{locale === 'ar' ? activeBriefing.transcriptAr : activeBriefing.transcriptEn}&rdquo;
          </p>
        </div>

        {/* Key Takeaways Checklist */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
            Recruiter Key Takeaways (30-Sec Summary):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(locale === 'ar' ? activeBriefing.takeawaysAr : activeBriefing.takeawaysEn).map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
