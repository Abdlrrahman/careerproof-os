'use client';

import React, { useState } from 'react';
import { KnowledgeGraphNode, KnowledgeGraphLink, Locale } from '@/types';
import { 
  Network, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ExternalLink,
  Info,
  Filter,
  Activity
} from 'lucide-react';

interface CareerKnowledgeGraphProps {
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
  locale: Locale;
}

export function CareerKnowledgeGraph({ nodes, links, locale }: CareerKnowledgeGraphProps) {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [activeNodeId, setActiveNodeId] = useState<string | null>('node-shibani');

  const clusters = ['all', 'Core Identity', 'AI & Spatial ML', 'Distributed Systems', 'Digital Transformation', 'Leadership & Methodologies', 'Architecture & Governance'];

  const filteredNodes = selectedCluster === 'all'
    ? nodes
    : nodes.filter(n => n.cluster === selectedCluster || n.id === 'node-shibani');

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  // Connected links for active node
  const activeLinks = links.filter(l => l.source === activeNode?.id || l.target === activeNode?.id);

  const getClusterColor = (cluster: string) => {
    switch (cluster) {
      case 'Core Identity': return '#38BDF8'; // Cyan
      case 'AI & Spatial ML': return '#10B981'; // Emerald
      case 'Distributed Systems': return '#6366F1'; // Indigo
      case 'Digital Transformation': return '#F59E0B'; // Amber
      case 'Leadership & Methodologies': return '#EC4899'; // Pink
      case 'Architecture & Governance': return '#06B6D4'; // Sky
      default: return '#94A3B8';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              Relational Evidence Ontology
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'مستكشف رسم المعرفة والأدلة المترابطة' : 'Interactive Career Knowledge Graph'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'رسم بياني تفاعلي يوضح الروابط الرياضية والهندسية بين المشاريع، المهارات البرمجية، الشهادات، والقرارات المعمارية' : 'Explore the deterministic relationships interconnecting production systems, spatial ML models, verified credentials, and RFC decision records.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-800 shrink-0 self-start sm:self-auto">
            <Activity className="w-4 h-4" />
            <span>{nodes.length} Nodes • {links.length} Proof Edges</span>
          </div>
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
          {clusters.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCluster(c)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCluster === c
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'All Clusters' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Topology Graph & Node Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Topology Canvas */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>2D Topological Mesh View</span>
            <span className="text-cyan-400 font-bold">Click any node to inspect connections</span>
          </div>

          {/* Node Grid Topology View */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 min-h-[400px]">
            {filteredNodes.map((node) => {
              const isSelected = node.id === activeNodeId;
              const color = getClusterColor(node.cluster);

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-400 shadow-lg ring-1 ring-cyan-400/50 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-600'
                  }`}
                  style={{ borderLeftWidth: '4px', borderLeftColor: color }}
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono uppercase font-bold text-slate-400">
                        {node.type}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-400 font-bold">
                        {node.connectionsCount} edges
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 leading-snug">
                      {locale === 'ar' ? node.labelAr : node.labelEn}
                    </h4>
                  </div>

                  {node.highlightMetricEn && (
                    <div className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900 mt-2 truncate">
                      {locale === 'ar' ? node.highlightMetricAr : node.highlightMetricEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Inspector Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {activeNode && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-5">
              <div className="space-y-1.5 pb-4 border-b border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                    {activeNode.cluster}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Type: {activeNode.type}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">
                  {locale === 'ar' ? activeNode.labelAr : activeNode.labelEn}
                </h3>

                {activeNode.highlightMetricEn && (
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    {locale === 'ar' ? activeNode.highlightMetricAr : activeNode.highlightMetricEn}
                  </div>
                )}
              </div>

              {/* Connected Edges */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Interconnected Graph Edges ({activeLinks.length}):
                </div>

                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {activeLinks.map((link, idx) => {
                    const otherNodeId = link.source === activeNode.id ? link.target : link.source;
                    const otherNode = nodes.find(n => n.id === otherNodeId);

                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveNodeId(otherNodeId)}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer flex justify-between items-center text-xs transition-all"
                      >
                        <div className="truncate min-w-0 pr-2">
                          <span className="text-[9px] font-mono text-slate-500 uppercase block">
                            {link.relationType}
                          </span>
                          <span className="font-bold text-slate-200 truncate block">
                            {locale === 'ar' ? otherNode?.labelAr : otherNode?.labelEn}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 shrink-0 font-bold">
                          {Math.round(link.weight * 100)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
