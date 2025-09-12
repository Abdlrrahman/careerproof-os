'use client';

import React, { useState } from 'react';
import { WhiteboardBlock, Locale } from '@/types';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Download, 
  Copy, 
  Check, 
  Zap, 
  Server, 
  Database, 
  Globe, 
  Terminal
} from 'lucide-react';

interface SystemArchitectureWhiteboardProps {
  blocks: WhiteboardBlock[];
  locale: Locale;
}

export function SystemArchitectureWhiteboard({ blocks, locale }: SystemArchitectureWhiteboardProps) {
  const [activeBlockId, setActiveBlockId] = useState<string>(blocks[0]?.id || '');
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activeBlock = blocks.find(b => b.id === activeBlockId) || blocks[0];

  const handleCopySpec = () => {
    const spec = JSON.stringify(blocks, null, 2);
    navigator.clipboard.writeText(spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'Client Edge': return Globe;
      case 'API Gateway': return Zap;
      case 'Compute & AI': return Cpu;
      case 'Storage & Ledgers': return Database;
      case 'Worker Queue': return Server;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Live Interview & Architecture Simulator
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {locale === 'ar' ? 'لوحة المحاكاة وتصميم المعماريات التفاعلية' : 'System Architecture Whiteboard & Canvas'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {locale === 'ar' ? 'محاكاة تفاعلية لمسار تدفق البيانات، ميزانيات زمن الاستجابة، وبروتوكولات التعافي الذاتي للأنظمة الموزعة' : 'An interactive technical whiteboard simulating data flow, latency budgets, and disaster resilience protocols.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setIsSimulatingTraffic(!isSimulatingTraffic)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                isSimulatingTraffic
                  ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{isSimulatingTraffic ? 'Traffic Streaming Active' : 'Simulate Live Traffic'}</span>
            </button>

            <button
              onClick={handleCopySpec}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold border border-blue-400 flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Spec' : 'Export Blueprint'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Data Flow Pipeline & Block Spec Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Topology Pipeline */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-white">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Synchronous Ingestion & Asynchronous Dispatch Stream</span>
            <span className="text-cyan-400 font-bold">Select any stage to inspect specs</span>
          </div>

          {/* Sequential Stage Cards */}
          <div className="space-y-3">
            {blocks.map((block, idx) => {
              const isSelected = block.id === activeBlockId;
              const IconComponent = getLayerIcon(block.layer);

              return (
                <div key={block.id} className="relative">
                  <div
                    onClick={() => setActiveBlockId(block.id)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-400 shadow-lg ring-1 ring-cyan-400/50 scale-[1.01]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-950 text-cyan-400' : 'bg-slate-900 text-slate-400'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                            Stage 0{idx + 1} • {block.layer}
                          </span>
                          {isSimulatingTraffic && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          )}
                        </div>
                        <h4 className="text-sm font-black text-white">
                          {locale === 'ar' ? block.titleAr : block.titleEn}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {locale === 'ar' ? block.roleAr : block.roleEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center self-start text-xs font-mono">
                      <span className="text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-900 font-bold">
                        {block.latencyBudget}
                      </span>
                    </div>
                  </div>

                  {idx < blocks.length - 1 && (
                    <div className="flex justify-center my-1 text-slate-600">
                      <div className="h-2 w-0.5 bg-slate-700"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Block Inspection Drawer */}
        <div className="lg:col-span-4 space-y-4">
          {activeBlock && (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-5">
              <div className="space-y-1.5 pb-4 border-b border-slate-800">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
                  {activeBlock.layer}
                </span>

                <h3 className="text-base font-black text-white">
                  {locale === 'ar' ? activeBlock.titleAr : activeBlock.titleEn}
                </h3>

                <div className="text-xs font-mono text-slate-400">
                  Tech: <span className="text-slate-200 font-bold">{activeBlock.technology}</span>
                </div>
              </div>

              {/* Latency & Throughput Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">
                    Latency Budget:
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-black block">
                    {activeBlock.latencyBudget}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">
                    Max Throughput:
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-black block truncate">
                    {activeBlock.throughputThreshold}
                  </span>
                </div>
              </div>

              {/* Resilience & Fault Recovery Protocol */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 uppercase font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Resilience & Failover Protocol:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {locale === 'ar' ? activeBlock.resilienceProtocolAr : activeBlock.resilienceProtocolEn}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
