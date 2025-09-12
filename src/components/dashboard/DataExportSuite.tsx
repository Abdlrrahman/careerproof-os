'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Locale } from '@/types';
import { 
  Download, 
  Copy, 
  Check, 
  FileJson, 
  FileText, 
  ShieldCheck, 
  Database, 
  Layers, 
  Share2, 
  Sparkles,
  Archive
} from 'lucide-react';

interface DataExportSuiteProps {
  locale: Locale;
}

export function DataExportSuite({ locale }: DataExportSuiteProps) {
  const profile = db.getProfile();
  const skills = db.getSkills();
  const projects = db.getProjects();
  const achievements = db.getAchievements();
  const credentials = db.getCredentials();
  const adrs = db.getAdrs();
  const benchmarks = db.getBenchmarks();
  const auditLogs = db.getAuditLogs();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'full_graph' | 'json_resume' | 'audit_trail' | 'sow_template'>('full_graph');

  const fullGraphData = {
    exportVersion: '2.0.0',
    exportTimestamp: new Date().toISOString(),
    profile,
    benchmarks,
    skillsCount: skills.length,
    skills,
    projectsCount: projects.length,
    projects,
    achievementsCount: achievements.length,
    achievements,
    credentialsCount: credentials.length,
    credentials,
    adrsCount: adrs.length,
    adrs,
    auditLogs
  };

  const jsonResumeData = {
    basics: {
      name: profile.fullName,
      label: profile.primaryTitle,
      email: profile.email,
      url: profile.linkedinUrl,
      summary: profile.bioShort,
      location: {
        city: profile.location,
        region: profile.timezone
      },
      profiles: [
        { network: 'GitHub', username: 'abdlrrahman-shibani', url: profile.githubUrl },
        { network: 'LinkedIn', username: 'abdlrrahman-shibani', url: profile.linkedinUrl },
        { network: 'Calendly', username: 'abdlrrahman-shibani', url: profile.calendlyUrl }
      ]
    },
    work: projects.map(p => ({
      name: p.clientOrOrgEn,
      position: p.roleTitleEn,
      startDate: p.startDate,
      endDate: p.endDate || 'Present',
      summary: p.summaryEn,
      highlights: [
        `Tech stack: ${p.domainTags.join(', ')}`,
        `Led multidisciplinary squad of ${p.teamSize} engineers.`
      ]
    })),
    skills: skills.slice(0, 15).map(s => ({
      name: s.nameEn,
      level: s.calculatedLevel,
      keywords: [s.categoryId, `Score: ${s.calculatedScore}/100`]
    })),
    certificates: credentials.map(c => ({
      name: c.titleEn,
      issuer: c.issuerEn,
      date: c.issueDate,
      url: c.credentialUrl || ''
    }))
  };

  const activeJsonString = selectedFormat === 'full_graph'
    ? JSON.stringify(fullGraphData, null, 2)
    : selectedFormat === 'json_resume'
    ? JSON.stringify(jsonResumeData, null, 2)
    : JSON.stringify(auditLogs, null, 2);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
              Portable Data & Backup Governance
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Data Export, Portable Sync & Backup Suite
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Export complete deterministic career graphs, standard JSON Resume schemas, and compliance audit records with 1 click.
            </p>
          </div>

          <button
            onClick={() => handleDownload(`CareerProof_OS_Full_Backup_${new Date().toISOString().split('T')[0]}.json`, JSON.stringify(fullGraphData, null, 2), 'application/json')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm btn-tactile self-start sm:self-auto"
          >
            <Archive className="w-4 h-4" />
            <span>Download Full Backup (.JSON)</span>
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
          <button
            onClick={() => setSelectedFormat('full_graph')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedFormat === 'full_graph'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Full Career Graph (JSON)
          </button>
          <button
            onClick={() => setSelectedFormat('json_resume')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedFormat === 'json_resume'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            JSON Resume Standard v1.0.0
          </button>
          <button
            onClick={() => setSelectedFormat('audit_trail')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              selectedFormat === 'audit_trail'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Security Audit Trail Logs
          </button>
        </div>
      </div>

      {/* Code Inspector & Actions Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <span className="font-mono text-slate-400">
            {selectedFormat === 'full_graph' ? 'careerproof_full_graph.json' : selectedFormat === 'json_resume' ? 'resume.json' : 'audit_trail.json'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeJsonString, selectedFormat)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold flex items-center gap-1.5 border border-slate-700 btn-tactile"
            >
              {copiedId === selectedFormat ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === selectedFormat ? 'Copied JSON!' : 'Copy'}</span>
            </button>

            <button
              onClick={() => handleDownload(`${selectedFormat}.json`, activeJsonString, 'application/json')}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm btn-tactile"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 max-h-[500px] overflow-y-auto overflow-x-auto leading-relaxed whitespace-pre">
          {activeJsonString}
        </pre>
      </div>
    </div>
  );
}
