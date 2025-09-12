'use client';

import React, { useState } from 'react';
import { X, Sparkles, Plus, Building, MapPin, DollarSign, Globe } from 'lucide-react';
import { JobOpportunity, Locale } from '@/types';
import { db } from '@/lib/db/data-store';
import { analyzeJobDescription } from '@/lib/matching/job-matcher';

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpportunityCreated: () => void;
  locale: Locale;
}

export function OpportunityModal({
  isOpen,
  onClose,
  onOpportunityCreated,
  locale,
}: OpportunityModalProps) {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('Remote (International)');
  const [salaryMin, setSalaryMin] = useState('130000');
  const [salaryMax, setSalaryMax] = useState('170000');
  const [rawDescription, setRawDescription] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState<JobOpportunity['sourcePlatform']>('linkedin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName) return;

    const skills = db.getSkills();
    const projects = db.getProjects();
    const achievements = db.getAchievements();
    const roleLenses = db.getRoleLenses();

    // Compute automatic match score
    const match = analyzeJobDescription(rawDescription || title, skills, projects, achievements, roleLenses);

    db.createOpportunity({
      title,
      companyName,
      location,
      workplaceType: 'remote',
      salaryMin: Number(salaryMin) || undefined,
      salaryMax: Number(salaryMax) || undefined,
      currency: 'USD',
      rawDescription,
      sourcePlatform,
      matchScore: match.overallScore,
      pipelineStage: 'discovered',
      followUpDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes: `Auto-scored with ${match.matchedVerifiedSkills.length} verified direct skill matches.`,
    });

    onOpportunityCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 popover-enter">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Add New Remote Job Opportunity</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Job / Role Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Machine Learning Engineer"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. NextGen AI Labs"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Location / Remote
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Min Salary ($ USD)
              </label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Max Salary ($ USD)
              </label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Raw Job Description (Used for Automatic Match Scoring)
            </label>
            <textarea
              rows={4}
              value={rawDescription}
              onChange={(e) => setRawDescription(e.target.value)}
              placeholder="Paste requirements, stack, and responsibilities here to automatically compute match score..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-sm"
            >
              Save Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
