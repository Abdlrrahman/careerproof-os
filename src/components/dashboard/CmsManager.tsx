'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Code2, 
  FolderGit2, 
  Award, 
  ShieldCheck, 
  Save, 
  Check, 
  History,
  FileText
} from 'lucide-react';
import { Profile, Skill, Project, MeasurableAchievement, AuditLogEntry, Locale } from '@/types';
import { db } from '@/lib/db/data-store';

interface CmsManagerProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  achievements: MeasurableAchievement[];
  auditLogs: AuditLogEntry[];
  onDataSaved: () => void;
  locale: Locale;
}

export function CmsManager({
  profile,
  skills,
  projects,
  achievements,
  auditLogs,
  onDataSaved,
  locale,
}: CmsManagerProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'achievements' | 'logs'>('profile');
  const [saved, setSaved] = useState(false);

  // Profile Form State
  const [primaryTitle, setPrimaryTitle] = useState(profile.primaryTitle);
  const [supportingTitle, setSupportingTitle] = useState(profile.supportingTitle);
  const [location, setLocation] = useState(profile.location);
  const [email, setEmail] = useState(profile.email);
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateProfile({
      primaryTitle,
      supportingTitle,
      location,
      email,
      linkedinUrl,
      githubUrl,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onDataSaved();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>Administrative Content & Portfolio CMS</span>
            </h2>
            <p className="text-xs text-slate-500">
              Manage editable profile seed data, published skill taxonomy, case studies, and inspect audit logs.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
            Admin Mode Active
          </span>
        </div>

        {/* CMS Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {[
            { id: 'profile', label: 'Identity & Links', icon: User },
            { id: 'skills', label: 'Skills Taxonomy', icon: Code2 },
            { id: 'projects', label: 'Projects & Case Studies', icon: FolderGit2 },
            { id: 'achievements', label: 'Measurable Metrics', icon: Award },
            { id: 'logs', label: 'Audit Trail Logs', icon: History },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Title</label>
              <input
                type="text"
                value={primaryTitle}
                onChange={(e) => setPrimaryTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location & Remote Focus</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Supporting Value Proposition</label>
            <textarea
              rows={2}
              value={supportingTitle}
              onChange={(e) => setSupportingTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">GitHub URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-sm btn-tactile"
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Saved Successfully' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Skills Table List */}
      {activeTab === 'skills' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Published Skills ({skills.length})
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Skill Name</th>
                  <th className="py-2.5 px-4">Calculated Tier</th>
                  <th className="py-2.5 px-4">Score</th>
                  <th className="py-2.5 px-4">Evidence Records</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {skills.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{s.nameEn}</td>
                    <td className="py-2.5 px-4 uppercase font-bold text-blue-600 dark:text-cyan-400">{s.calculatedLevel}</td>
                    <td className="py-2.5 px-4 font-mono font-bold">{s.calculatedScore}/100</td>
                    <td className="py-2.5 px-4 font-mono">{s.evidenceItemIds.length} items</td>
                    <td className="py-2.5 px-4">
                      {s.isVerified ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-amber-500 font-medium">Pending Doc</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects List */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-900 dark:text-white">{p.titleEn}</span>
                <span className="uppercase text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {p.status}
                </span>
              </div>
              <p className="text-slate-500 line-clamp-2">{p.summaryEn}</p>
            </div>
          ))}
        </div>
      )}

      {/* Measurable Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map(a => (
            <div key={a.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-baseline font-bold">
                <span className="text-lg text-blue-600 dark:text-cyan-400 font-mono">{a.metricValue}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  a.verificationStatus === 'verified' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'
                }`}>
                  {a.verificationStatus}
                </span>
              </div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">{a.metricLabelEn}</div>
              <p className="text-slate-500 text-[11px]">{a.descriptionEn}</p>
            </div>
          ))}
        </div>
      )}

      {/* Audit Logs Trail */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            System & Security Audit Log
          </h3>
          <div className="space-y-2 font-mono text-[11px] max-h-80 overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-blue-600 dark:text-cyan-400">[{log.action}]</span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">{log.details}</span>
                </div>
                <span className="text-slate-400 shrink-0">{log.timestamp.substring(0, 19).replace('T', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
