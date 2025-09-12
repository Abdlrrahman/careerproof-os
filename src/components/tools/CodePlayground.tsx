'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Check, 
  Copy, 
  Cpu, 
  Database, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { Locale } from '@/types';

interface CodePlaygroundProps {
  locale: Locale;
}

const ENDPOINTS = [
  {
    id: 'geofusion-predict',
    title: 'GeoFusion AI — Subsurface Lithology Classification',
    method: 'POST',
    path: '/api/v1/subsurface/predict-lithology',
    description: 'Runs fine-tuned GeoBERT + multi-layer perceptron over LAS curve depths (Gamma Ray, Density, Neutron Porosity).',
    requestPayload: JSON.stringify({
      well_id: "LIBYA-SIRTE-04",
      depth_interval_meters: [2840.5, 2855.0],
      curves: {
        gamma_ray_api: [45.2, 48.0, 52.1, 49.3],
        bulk_density_g_cm3: [2.65, 2.64, 2.62, 2.66],
        neutron_porosity_pct: [0.14, 0.15, 0.16, 0.13]
      },
      spatial_wgs84: {
        latitude: 29.4128,
        longitude: 17.8421
      }
    }, null, 2),
    mockResponse: JSON.stringify({
      status: "success",
      inference_time_ms: 38.4,
      model_version: "geobert-strat-v2.4",
      predictions: [
        {
          depth_m: 2840.5,
          predicted_lithology: "Fine-Grained Sandstone (Reservoir Quality)",
          confidence_score: 0.942,
          permeability_class: "High",
          geological_formation: "Sirtian Clastics"
        },
        {
          depth_m: 2850.0,
          predicted_lithology: "Calcareous Mudstone (Seal/Caprock)",
          confidence_score: 0.918,
          permeability_class: "Impermeable",
          geological_formation: "Upper Kheir Shale"
        }
      ],
      spatial_bounding_block: "BLOCK-NC41-SURVEY-2024",
      verified_by: "Technopole Core AI Engine"
    }, null, 2),
  },
  {
    id: 'ledger-validate',
    title: 'Omega ERP — Double-Entry Transaction Validator',
    method: 'POST',
    path: '/api/v1/ledger/validate-transaction',
    description: 'Enforces zero ledger drift, multi-currency conversion, and Row-Level Security tenant isolation in PostgreSQL.',
    requestPayload: JSON.stringify({
      tenant_id: "tenant-enterprise-88",
      currency: "USD",
      reference: "PO-2026-08-912",
      journal_lines: [
        {
          account_code: "1010-CASH",
          debit_amount: 0.00,
          credit_amount: 45000.00
        },
        {
          account_code: "1500-EQUIPMENT-ASSETS",
          debit_amount: 45000.00,
          credit_amount: 0.00
        }
      ]
    }, null, 2),
    mockResponse: JSON.stringify({
      status: "validated",
      is_balanced: true,
      total_debit: 45000.00,
      total_credit: 45000.00,
      discrepancy: 0.0000,
      immutable_hash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      rls_policy_check: "PASSED (Tenant isolated)",
      audit_logged: true
    }, null, 2),
  },
];

export function CodePlayground({ locale }: CodePlaygroundProps) {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(ENDPOINTS[0].id);
  const [requestText, setRequestText] = useState<string>(ENDPOINTS[0].requestPayload);
  const [responseText, setResponseText] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);

  const endpoint = ENDPOINTS.find(e => e.id === selectedEndpointId) || ENDPOINTS[0];

  const handleSelectEndpoint = (epId: string) => {
    const ep = ENDPOINTS.find(e => e.id === epId)!;
    setSelectedEndpointId(epId);
    setRequestText(ep.requestPayload);
    setResponseText('');
    setLatency(null);
  };

  const handleRunExecution = () => {
    setIsRunning(true);
    setResponseText('');
    const execLatency = Math.floor(Math.random() * 25) + 30; // 30 - 55ms

    setTimeout(() => {
      setResponseText(endpoint.mockResponse);
      setLatency(execLatency);
      setIsRunning(false);
    }, 350);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>Interactive Architecture & Live API Sandbox</span>
            </h2>
            <p className="text-xs text-slate-500">
              Simulate production requests across GeoFusion AI and Omega ERP backend microservices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {ENDPOINTS.map(ep => (
              <button
                key={ep.id}
                onClick={() => handleSelectEndpoint(ep.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedEndpointId === ep.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {ep.id === 'geofusion-predict' ? 'GeoFusion AI API' : 'Omega ERP Ledger API'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              {endpoint.method}
            </span>
            <span className="text-slate-700 dark:text-slate-200 font-bold">{endpoint.path}</span>
          </div>
          <span className="text-slate-400 text-[11px] font-sans">
            {endpoint.description}
          </span>
        </div>
      </div>

      {/* Code / Request / Response Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Request Payload Editor */}
        <div className="p-5 rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-400 uppercase font-mono">Request Payload (JSON)</span>
              <span className="text-[10px] text-slate-500 font-mono">application/json</span>
            </div>

            <textarea
              rows={14}
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-between items-center">
            <span className="text-[11px] text-slate-500 font-mono">Ready for execution</span>
            <button
              onClick={handleRunExecution}
              disabled={isRunning}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm btn-tactile"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isRunning ? 'Processing...' : 'Execute Request'}</span>
            </button>
          </div>
        </div>

        {/* Response Payload Viewer */}
        <div className="p-5 rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
              <span className="font-bold text-slate-400 uppercase font-mono">Live API Response</span>
              {latency && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{latency} ms &bull; HTTP 200 OK</span>
                </span>
              )}
            </div>

            {responseText ? (
              <pre className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 overflow-y-auto max-h-72">
                {responseText}
              </pre>
            ) : (
              <div className="h-72 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-xs space-y-2">
                <Terminal className="w-8 h-8 opacity-40" />
                <span>Click &quot;Execute Request&quot; to inspect live response</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Deterministic Heuristic & Live Microservice Sandbox</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
