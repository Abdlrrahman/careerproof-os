'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Globe, 
  Calendar, 
  Award, 
  Cpu, 
  Code2, 
  Building, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';

export default function AboutPage() {
  const locale: Locale = 'en';
  const profile = db.getProfile();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            Executive Narrative & Engineering Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Who is Abdlrrahman Shibani?
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Founder and Senior Engineering Lead operating across AI pipelines, high-throughput distributed backends, digital transformation, and international development programs.
          </p>
        </div>

        {/* Core Biography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Engineering Leadership & Entrepreneurial Track Record
              </h2>
              <p>
                As founder and CEO of <strong>Technopole</strong> (founded Jan 2023) and <strong>Nexora Tech LLC</strong> (founded Apr 2025), Abdlrrahman has directed cross-functional squads of up to 15 engineers, shipping mission-critical systems for enterprise clients, municipal governance bodies, and the energy sector.
              </p>
              <p>
                His engineering background bridges cutting-edge machine learning and robust distributed software architectures. In <strong>GeoFusion AI</strong>, he architected an end-to-end geospatial exploration intelligence system that harmonized seismic SEG-Y files, LAS drilling logs, and PostGIS spatial data, reducing manual analysis time by approximately 40%.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                International Development & Public Sector Impact
              </h2>
              <p>
                Beyond commercial platforms, Abdlrrahman has spearheaded digital transformation initiatives with leading international agencies, including <strong>VNG International</strong>, <strong>Handicap International</strong>, and programs supporting <strong>Chemonics</strong>.
              </p>
              <p>
                He has led the technical modernization of municipal service portals serving over <strong>200,000 citizens</strong> and conducted digital capacity-building programs that trained more than <strong>150 municipal personnel and community officers</strong>.
              </p>
            </div>
          </div>

          {/* Sidebar Quick Fact Sheet */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">
                Core Identity & Logistics
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 block">Full Legal Name</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profile.legalName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Locations</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profile.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Timezones</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{profile.timezone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Languages</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Arabic (Native), English (Fluent)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Work Preference</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">100% Remote & Distributed</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={profile.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Interview Call</span>
                </a>
              </div>
            </div>

            {/* Academic Standout */}
            <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-blue-800 dark:text-cyan-300 font-bold">
                <Award className="w-4 h-4" />
                <span>Academic Honors</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                BSc Computer Engineering (Univ of Tripoli, 2020) & BSc Computer Science with <strong>3.86 GPA</strong> (University of the People).
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
