'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Network, 
  Table, 
  Search, 
  Filter, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Info, 
  Code2, 
  Briefcase, 
  Award, 
  FolderGit2,
  TrendingUp
} from 'lucide-react';
import { Skill, Project, Experience, Credential, MeasurableAchievement, EvidenceItem, Locale } from '@/types';
import { getDictionary } from '@/lib/i18n/translations';

interface ProofGraphProps {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  credentials: Credential[];
  achievements: MeasurableAchievement[];
  evidenceItems: EvidenceItem[];
  locale: Locale;
}

type NodeType = 'skill' | 'project' | 'role' | 'credential' | 'achievement';

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  level?: string;
  isVerified: boolean;
  score?: number;
  data: any;
}

interface GraphLink {
  source: string;
  target: string;
  label?: string;
}

export function ProofGraph({
  skills,
  projects,
  experiences,
  credentials,
  achievements,
  evidenceItems,
  locale,
}: ProofGraphProps) {
  const t = getDictionary(locale);
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // 1. Build Graph Nodes & Links
  const { nodes, links } = useMemo(() => {
    const nList: GraphNode[] = [];
    const lList: GraphLink[] = [];

    // Add Skills
    skills.forEach(s => {
      nList.push({
        id: `skill-${s.id}`,
        label: locale === 'ar' ? s.nameAr : s.nameEn,
        type: 'skill',
        level: s.calculatedLevel,
        isVerified: s.isVerified,
        score: s.calculatedScore,
        data: s,
      });

      // Links from skill to projects
      s.connectedProjectIds.forEach(pId => {
        lList.push({ source: `skill-${s.id}`, target: `project-${pId}`, label: 'Implemented In' });
      });

      // Links from skill to experiences
      s.connectedRoleIds.forEach(rId => {
        lList.push({ source: `skill-${s.id}`, target: `role-${rId}`, label: 'Practiced At' });
      });
    });

    // Add Projects
    projects.forEach(p => {
      nList.push({
        id: `project-${p.id}`,
        label: locale === 'ar' ? p.titleAr : p.titleEn,
        type: 'project',
        isVerified: p.status === 'in_production' || p.status === 'completed',
        data: p,
      });
    });

    // Add Experiences
    experiences.forEach(e => {
      nList.push({
        id: `role-${e.id}`,
        label: locale === 'ar' ? e.roleTitleAr : e.roleTitleEn,
        type: 'role',
        isVerified: true,
        data: e,
      });
    });

    // Add Credentials
    credentials.forEach(c => {
      nList.push({
        id: `cred-${c.id}`,
        label: locale === 'ar' ? c.titleAr : c.titleEn,
        type: 'credential',
        isVerified: c.verificationStatus === 'verified',
        data: c,
      });

      // Link credential to demonstrated skills
      c.skillsDemonstrated.forEach(sId => {
        lList.push({ source: `cred-${c.id}`, target: `skill-${sId}`, label: 'Certifies' });
      });
    });

    return { nodes: nList, links: lList };
  }, [skills, projects, experiences, credentials, locale]);

  // Filter nodes based on search and type
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      const matchesSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedTypeFilter === 'all' || n.type === selectedTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [nodes, searchQuery, selectedTypeFilter]);

  // Set default selected node
  const activeNode = selectedNode || filteredNodes[0] || null;

  // Find linked entities for active node
  const connectedLinks = useMemo(() => {
    if (!activeNode) return [];
    return links.filter(l => l.source === activeNode.id || l.target === activeNode.id);
  }, [activeNode, links]);

  return (
    <div className="space-y-6">
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.proofGraph.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: t.proofGraph.filterAll },
            { id: 'skill', label: t.proofGraph.filterSkills },
            { id: 'project', label: t.proofGraph.filterProjects },
            { id: 'credential', label: t.proofGraph.filterCredentials },
            { id: 'role', label: locale === 'ar' ? 'الأدوار المهنية' : 'Roles Only' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedTypeFilter(f.id)}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                selectedTypeFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle: Interactive SVG vs Accessible Table */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'visual'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{t.proofGraph.toggleVisual}</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>{t.proofGraph.toggleTable}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual Interactive Graph Node Grid */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {filteredNodes.length} {locale === 'ar' ? 'عنصر في الخريطة' : 'Nodes in Topology'}
                </span>
                <span className="text-xs text-slate-500">
                  {locale === 'ar' ? 'انقر على أي عنصر لمعاينة الأدلة المرتبطة' : 'Click any node to inspect attached verification'}
                </span>
              </div>

              {/* Node Chips Mesh */}
              <div className="flex flex-wrap gap-2.5 max-h-[460px] overflow-y-auto p-1">
                {filteredNodes.map((node) => {
                  const isSelected = activeNode?.id === node.id;
                  
                  let badgeColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                  if (node.type === 'skill') {
                    badgeColor = isSelected 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400' 
                      : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border-blue-200 dark:border-blue-800 hover:border-blue-400';
                  } else if (node.type === 'project') {
                    badgeColor = isSelected 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400' 
                      : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400';
                  } else if (node.type === 'role') {
                    badgeColor = isSelected 
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-400' 
                      : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:border-purple-400';
                  } else if (node.type === 'credential') {
                    badgeColor = isSelected 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400' 
                      : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:border-amber-400';
                  }

                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all btn-tactile ${badgeColor}`}
                    >
                      {node.type === 'skill' && <Code2 className="w-3.5 h-3.5" />}
                      {node.type === 'project' && <FolderGit2 className="w-3.5 h-3.5" />}
                      {node.type === 'role' && <Briefcase className="w-3.5 h-3.5" />}
                      {node.type === 'credential' && <Award className="w-3.5 h-3.5" />}
                      <span>{node.label}</span>
                      {node.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Skills</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Projects</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>Roles</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Credentials</span>
              </span>
            </div>
          </div>

          {/* Inspection Panel for Selected Node */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {activeNode ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                      {activeNode.type.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
                      {activeNode.label}
                    </h3>
                  </div>
                  {activeNode.isVerified && (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-lg">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{locale === 'ar' ? 'موثق رسمياً' : 'Verified'}</span>
                    </div>
                  )}
                </div>

                {/* Score & Tier if skill */}
                {activeNode.type === 'skill' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">{locale === 'ar' ? 'مستوى الكفاءة المحسوب' : 'Computed Proficiency'}:</span>
                      <span className="font-bold uppercase text-blue-600 dark:text-cyan-400">{activeNode.level}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">{locale === 'ar' ? 'درجة الإثبات' : 'Evidence Score'}:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{activeNode.score} / 100</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700">
                      {activeNode.data?.verificationRationale}
                    </p>
                  </div>
                )}

                {/* Project Details if project */}
                {activeNode.type === 'project' && (
                  <div className="space-y-3 text-xs">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {locale === 'ar' ? activeNode.data?.summaryAr : activeNode.data?.summaryEn}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeNode.data?.slug && (
                        <Link
                          href={locale === 'ar' ? `/ar/projects/${activeNode.data.slug}` : `/projects/${activeNode.data.slug}`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
                        >
                          <span>{locale === 'ar' ? 'دراسة الحالة الهندسية' : 'Case Study'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Connected Relationships */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {locale === 'ar' ? 'الروابط الهندسية المعتمدة' : 'Verified Graph Connections'} ({connectedLinks.length})
                  </h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {connectedLinks.map((link, idx) => {
                      const otherId = link.source === activeNode.id ? link.target : link.source;
                      const otherNode = nodes.find(n => n.id === otherId);
                      return (
                        <div
                          key={idx}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                            {otherNode?.label}
                          </span>
                          <span className="text-[10px] text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                            {link.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select any node to inspect evidence.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Accessible HTML Table Alternative */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {locale === 'ar' ? 'جدول مصفوفة الأدلة المعتمدة' : 'Accessible Proof & Skill Verification Table'}
            </span>
            <span className="text-xs text-slate-500">
              {filteredNodes.length} {locale === 'ar' ? 'سجل مطابق' : 'matching records'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/40 text-slate-500 font-semibold">
                  <th className="py-3 px-4">{locale === 'ar' ? 'العنصر / المهارة' : 'Entity / Skill'}</th>
                  <th className="py-3 px-4">{locale === 'ar' ? 'النوع' : 'Type'}</th>
                  <th className="py-3 px-4">{locale === 'ar' ? 'مستوى الكفاءة / الحالة' : 'Tier / Status'}</th>
                  <th className="py-3 px-4">{locale === 'ar' ? 'درجة الإثبات' : 'Evidence Score'}</th>
                  <th className="py-3 px-4">{locale === 'ar' ? 'حالة التوثيق' : 'Verification'}</th>
                  <th className="py-3 px-4">{locale === 'ar' ? 'الإجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {node.label}
                    </td>
                    <td className="py-3 px-4 uppercase text-[10px] font-semibold text-slate-500">
                      {node.type}
                    </td>
                    <td className="py-3 px-4">
                      {node.level ? (
                        <span className="uppercase font-bold text-blue-600 dark:text-cyan-400">
                          {node.level}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium">
                      {node.score ? `${node.score}/100` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      {node.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-amber-500 font-medium">Verification Required</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedNode(node);
                          setViewMode('visual');
                        }}
                        className="text-blue-600 dark:text-cyan-400 hover:underline font-semibold"
                      >
                        Inspect Proof
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
