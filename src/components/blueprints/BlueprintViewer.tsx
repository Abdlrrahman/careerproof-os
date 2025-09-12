'use client';

import React, { useState } from 'react';
import { 
  ArchitectureBlueprint, 
  BlueprintNode, 
  Locale 
} from '@/types';
import { 
  Layers, 
  Cpu, 
  Database, 
  Cloud, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Server,
  Zap
} from 'lucide-react';

interface BlueprintViewerProps {
  blueprints: ArchitectureBlueprint[];
  locale: Locale;
}

export function BlueprintViewer({ blueprints, locale }: BlueprintViewerProps) {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(blueprints[0]?.id || '');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeBlueprint = blueprints.find(b => b.id === selectedBlueprintId) || blueprints[0];
  const activeNode = activeBlueprint?.nodes.find(n => n.id === selectedNodeId) || activeBlueprint?.nodes[0];

  const getCategoryIcon = (category: BlueprintNode['category']) => {
    switch (category) {
      case 'ingestion': return Cloud;
      case 'ml_inference': return Cpu;
      case 'database': return Database;
      case 'api_gateway': return Server;
      default: return Layers;
    }
  };

  const getCategoryColor = (category: BlueprintNode['category']) => {
    switch (category) {
      case 'ingestion': return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';
      case 'ml_inference': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'database': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'api_gateway': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Blueprint Selector Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>{locale === 'ar' ? 'مخططات المعمارية وتدفق النظم' : 'Production Architecture Blueprints'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'ar' ? 'استكشف تدفق البيانات، وزمن الاستجابة، وآليات التعامل مع الأعطال في الأنظمة المنفذة' : 'Inspect live data flows, sub-system latencies, and fault-tolerance mitigations'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {blueprints.map(bp => (
              <button
                key={bp.id}
                onClick={() => {
                  setSelectedBlueprintId(bp.id);
                  setSelectedNodeId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedBlueprintId === bp.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {bp.id === 'blueprint-geofusion' ? 'GeoFusion AI Pipeline' : 'Omega ERP Ledger Architecture'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Blueprint Overview Banner */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {locale === 'ar' ? activeBlueprint.titleAr : activeBlueprint.titleEn}
            </span>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              {locale === 'ar' ? activeBlueprint.summaryAr : activeBlueprint.summaryEn}
            </p>
          </div>

          <div className="shrink-0 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold border border-emerald-200 dark:border-emerald-800">
            {locale === 'ar' ? activeBlueprint.throughputMetricAr : activeBlueprint.throughputMetricEn}
          </div>
        </div>
      </div>

      {/* Interactive Topology Graph and Node Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Topology Nodes (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
            <span>System Pipeline Stages ({activeBlueprint.nodes.length})</span>
            <span className="text-[10px] text-blue-600 dark:text-cyan-400">Click node to inspect metrics</span>
          </div>

          <div className="space-y-3">
            {activeBlueprint.nodes.map((node, idx) => {
              const isSelected = activeNode?.id === node.id;
              const Icon = getCategoryIcon(node.category);
              const colorClasses = getCategoryColor(node.category);

              return (
                <div key={node.id} className="relative">
                  {/* Connection arrow between nodes */}
                  {idx > 0 && (
                    <div className="w-0.5 h-3 bg-blue-500/40 mx-auto my-0.5" />
                  )}

                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full p-4 rounded-2xl text-left transition-all border flex items-center justify-between gap-4 card-interactive ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${colorClasses}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${colorClasses}`}>
                            {node.category.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {locale === 'ar' ? node.labelAr : node.labelEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {locale === 'ar' ? node.descriptionAr : node.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {node.latencyProfile}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Deep-Dive Inspector (5 cols) */}
        <div className="lg:col-span-5">
          {activeNode && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 sticky top-24">
              <div className="space-y-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-cyan-400">
                    Component Telemetry & Metrics
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {activeNode.latencyProfile}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {locale === 'ar' ? activeNode.labelAr : activeNode.labelEn}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {locale === 'ar' ? activeNode.descriptionAr : activeNode.descriptionEn}
                </p>
              </div>

              {/* Fault Tolerance & Mitigations */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1.5 text-xs">
                <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'آلية التعامل مع الأعطال (Fault Tolerance)' : 'Failure Mode Mitigation'}</span>
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {locale === 'ar' ? activeNode.failureModeMitigationAr : activeNode.failureModeMitigationEn}
                </p>
              </div>

              {/* Tech Stack Components */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">
                  {locale === 'ar' ? 'التقنيات والمكتبات المستخدمة' : 'Implemented Technologies'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
