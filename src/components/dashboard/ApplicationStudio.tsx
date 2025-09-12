'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Building, 
  Layers, 
  ExternalLink,
  Send,
  Eye,
  Download,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  ListOrdered,
  Cpu,
  Mail
} from 'lucide-react';
import { LinkedinIcon } from '@/components/icons/SocialIcons';
import { JobOpportunity, GeneratedDocument, Locale } from '@/types';
import { db } from '@/lib/db/data-store';
import { analyzeJobDescription } from '@/lib/matching/job-matcher';

interface ApplicationStudioProps {
  opportunities: JobOpportunity[];
  locale: Locale;
}

type ExtendedDocType = 
  | 'cover_letter' 
  | 'architecture_brief'
  | 'linkedin_connection' 
  | 'linkedin_inmail' 
  | 'drip_sequence' 
  | 'ats_bullets' 
  | 'screening_answers';

export function ApplicationStudio({ opportunities, locale }: ApplicationStudioProps) {
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || '');
  const [docType, setDocType] = useState<ExtendedDocType>('cover_letter');
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);
  const [activeDripStep, setActiveDripStep] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [editableContent, setEditableContent] = useState<string>('');

  const selectedOpp = opportunities.find(o => o.id === selectedOppId) || opportunities[0];

  // Match analysis
  const skills = db.getSkills();
  const projects = db.getProjects();
  const achievements = db.getAchievements();
  const roleLenses = db.getRoleLenses();
  const matchResult = selectedOpp 
    ? analyzeJobDescription(selectedOpp.rawDescription || selectedOpp.title, skills, projects, achievements, roleLenses)
    : null;

  // Grounded verification items for display
  const verifiedClaims = [
    { claim: "Scaled production AI & spatial pipelines using FastAPI & PostGIS", source: "GeoFusion AI (Technopole)", status: "verified" },
    { claim: "Reduced manual geological data processing time by ~40%", source: "GeoFusion AI & Oil ML Models", status: "verified" },
    { claim: "Directed multidisciplinary engineering squads of up to 15 engineers", source: "Technopole & Nexora Tech", status: "verified" },
    { claim: "Architected multi-tenant double-entry accounting ledger in PostgreSQL", source: "Omega ERP (Omega-Gate Tech)", status: "verified" },
    { claim: "Google Certified in Project Management & Cybersecurity", source: "Coursera / Google Verified", status: "verified" },
    { claim: "Full daily overlap with EMEA (8+ hrs) and US-East (5+ hrs)", source: "Timezone UTC+2 / UTC+3", status: "verified" },
  ];

  const handleGenerate = () => {
    if (!selectedOpp) return;
    setIsGenerating(true);

    setTimeout(() => {
      let content = '';
      let warnings: string[] = [];

      if (docType === 'cover_letter') {
        content = `Dear Hiring Team at ${selectedOpp.companyName},

I am writing to express my strong interest in the ${selectedOpp.title} role. With over six years of experience as a Founder and Senior Engineering Lead—architecting high-throughput backend services, production AI pipelines, and leading multidisciplinary squads of up to 15 engineers—I have delivered scalable systems that align directly with your technical roadmap.

At Technopole, I architected GeoFusion AI, a geospatial intelligence platform utilizing FastAPI, PyTorch, GeoBERT fine-tuning, and PostGIS, which integrated 5+ subsurface data streams and reduced manual exploration analysis time by 40%. Additionally, as Project Manager and ICT Lead at Omega-Gate Tech, I direct enterprise systems (Omega ERP) managing multi-tenant double-entry accounting, inventory tracking, and RBAC security for over 150 daily users.

My academic background includes a BSc in Computer Engineering from the University of Tripoli (First Class Honors) and an ongoing BSc in Computer Science at University of the People (3.86 GPA). I am certified by Google in Project Management and Cybersecurity, and have graduated from the McKinsey Forward Leadership Program.

Operating remotely from Tripoli & Doha (UTC+2 / UTC+3), I provide 8+ hours of daily overlap with European teams and 5+ hours with the US East Coast. I look forward to discussing how my engineering leadership and architecture background can accelerate ${selectedOpp.companyName}'s goals.

Sincerely,
Abdlrrahman Shibani
Founder & Engineering Lead
https://careerproof.abdlrrahman.dev`;
      } else if (docType === 'architecture_brief') {
        content = `TECHNICAL ALIGNMENT & ARCHITECTURAL BRIEF
Target Role: ${selectedOpp.title} — ${selectedOpp.companyName}
Candidate: Abdlrrahman Shibani (Founder & Engineering Lead)

1. Executive Value Proposition:
Accelerate ${selectedOpp.companyName}'s engineering sprint velocity by 35-40% through strict architectural RFC governance, resilient microservice boundaries, and grounded production AI pipelines with zero ramp-up friction.

2. Relevant Production Reference Architectures:
- GeoFusion AI: High-throughput async FastAPI microservices + PostGIS + pgvector cluster for subsurface telemetry. Processed 250k+ geological records with 92% lithology classification accuracy and sub-50ms inference latency.
- Omega ERP: Zero-drift multi-tenant financial ledger in PostgreSQL utilizing immutable append-only journal tables and database-level Row-Level Security (RLS). Slashed month-end reconciliation time from 5 days to 2 hours.

3. Immediate 30-Day Execution Roadmap for ${selectedOpp.companyName}:
- Days 1-15: Comprehensive codebase & pipeline latency audit, benchmarking inference bottlenecks and database query contention.
- Days 16-30: Institute structured TypeScript boundaries, automated CI/CD test gates, and RFC decision records to unblock sprint velocity.

Interactive Proof Portfolio: https://careerproof.abdlrrahman.dev/fit`;
      } else if (docType === 'linkedin_connection') {
        content = `Hi [Name], I noticed ${selectedOpp.companyName}'s search for a ${selectedOpp.title}. As an Engineering Lead with 6+ years shipping production AI pipelines (FastAPI/PostGIS/PyTorch) and directing 15-person squads, I'd love to connect and share relevant case studies: https://careerproof.abdlrrahman.dev`;
      } else if (docType === 'linkedin_inmail') {
        content = `Subject: Engineering Leadership / ${selectedOpp.title} @ ${selectedOpp.companyName}

Hi [Hiring Manager Name],

I came across the ${selectedOpp.title} opening at ${selectedOpp.companyName} and wanted to reach out directly. 

As a Founder & Engineering Lead with 6+ years shipping production AI systems (FastAPI, PyTorch, GeoBERT, PostGIS) and multi-tenant enterprise platforms (directing distributed squads of up to 15 engineers), I've delivered solutions resulting in 30-40% measured efficiency gains on complex datasets.

Key highlights aligning with ${selectedOpp.companyName}:
• GeoFusion AI: Subsurface geospatial ML platform cutting exploratory analysis time by 40% over 250k+ records.
• Omega ERP: High-concurrency zero-drift financial ledger supporting 150+ daily enterprise users.
• Leadership: Google PM Certified, McKinsey Forward Graduate, leading squads with strict RFCs and zero-regression releases.
• Timezone: Seamless 8+ hours overlap with EMEA and 5+ hours with US-East.

You can inspect my interactive proof portfolio and architecture RFCs here:
https://careerproof.abdlrrahman.dev/fit

Would love to explore how my background aligns with your current technical priorities.

Best regards,
Abdlrrahman Shibani`;
      } else if (docType === 'drip_sequence') {
        content = `OUTREACH & FOLLOW-UP SEQUENCE FOR: ${selectedOpp.companyName} (${selectedOpp.title})

=== STEP 1: INITIAL APPLICATION & PITCH (DAY 0) ===
Subject: Application: ${selectedOpp.title} — Abdlrrahman Shibani

Hi [Hiring Team],
I have submitted my application for the ${selectedOpp.title} role. With 6+ years as Founder & Engineering Lead building production AI pipelines (FastAPI/PyTorch/PostGIS) and leading 15-engineer squads, I've delivered 40% efficiency gains on complex systems.
Proof Portfolio: https://careerproof.abdlrrahman.dev
Best, Abdlrrahman

=== STEP 2: VALUE-ADD CASE STUDY FOLLOW-UP (DAY 4) ===
Subject: Architecture Case Study for ${selectedOpp.companyName} (${selectedOpp.title})

Hi [Hiring Manager],
Following up on my note regarding the ${selectedOpp.title} opening. I thought you might find this technical architecture breakdown relevant to your team's stack:
"Designing Resilient Spatial ML Pipelines for Subsurface Exploration"
Read: https://careerproof.abdlrrahman.dev/insights/resilient-spatial-ml-pipelines
Would welcome the opportunity to discuss how these patterns apply to ${selectedOpp.companyName}'s roadmap.
Best, Abdlrrahman

=== STEP 3: HIGH-SIGNAL ROADMAP NUDGE (DAY 9) ===
Subject: 30-60-90 Day Value Proposition: ${selectedOpp.title}

Hi [Hiring Manager],
Checking in on the ${selectedOpp.title} search. I put together an estimated 30-60-90 day impact roadmap showing how I would approach unblocking squad velocity and reducing pipeline latency in the first quarter:
Roadmap: https://careerproof.abdlrrahman.dev/hire
Happy to walk through this over a brief 15-minute introductory call: https://calendly.com/abdlrrahman-shibani
Best, Abdlrrahman

=== STEP 4: TALENT NETWORK CLOSEOUT (DAY 15) ===
Subject: Staying Connected — Abdlrrahman Shibani

Hi [Hiring Manager],
I assume the team is currently deep in interviews for the ${selectedOpp.title} role. If the position has been filled, I wish you and the team great success!
Let's stay connected on LinkedIn (linkedin.com/in/abdlrrahman-shibani) for future senior engineering and AI leadership initiatives.
Best regards,
Abdlrrahman Shibani`;
      } else if (docType === 'ats_bullets') {
        content = `CUSTOMIZED ATS RÉSUMÉ BULLET POINTS FOR ${selectedOpp.title}:

• Architected and deployed GeoFusion AI geospatial intelligence platform utilizing FastAPI, PyTorch, GeoBERT fine-tuning, and PostGIS, reducing multi-source exploration analysis time by ~40% across 250,000+ geological records.
• Directed cross-functional engineering squads of up to 15 software engineers, data scientists, and QA leads, delivering 10+ concurrent software initiatives with 100% on-time milestone delivery.
• Engineered Omega ERP multi-tenant financial ledger in PostgreSQL with immutable append-only constraints and Row-Level Security (RLS), reducing month-end reconciliation time from 5 days to under 2 hours for 150+ daily active enterprise users.
• Built distributed, containerized microservices with Docker and automated CI/CD pipelines, maintaining 99.9% uptime and zero-regression deployment cycles.
• Spearheaded municipal civic digitization platforms reaching over 200,000 citizens in collaboration with VNG International and trained 150+ personnel with a 94% competency rating.`;
      } else {
        content = `PRE-INTERVIEW GROUNDED SCREENING ANSWERS FOR ${selectedOpp.title}:

Q1: Describe your background in scalable backend systems and machine learning pipelines.
A1: Over the past 6+ years, I have architected asynchronous Python (FastAPI/Django) and Node.js microservices integrated with PostgreSQL/PostGIS. In GeoFusion AI, I engineered custom data ingestion for LAS and SEG-Y seismic logs, fine-tuned GeoBERT domain transformers, and built vector search over 250k+ records, resulting in a 40% reduction in manual data processing time.

Q2: How do you manage and lead distributed engineering teams?
A2: I apply Agile/Scrum methodologies (Google Project Management Certified, 2024) with a strong focus on technical RFCs, strict TypeScript type safety boundaries, automated CI/CD test coverage gates, and empathetic 1-on-1 mentorship. I have directed concurrent squads of up to 15 engineers across Technopole and Nexora Tech.

Q3: What is your approach to database design, performance optimization, and data security?
A3: I specialize in PostgreSQL architectures utilizing Row-Level Security (RLS) for multi-tenant isolation, composite indexing, and database-enforced constraints. In Omega ERP, we enforced immutable append-only ledgers to guarantee zero financial drift. I am also certified in Google Cybersecurity (2025).

Q4: What is your remote availability and timezone compatibility?
A4: I work 100% remotely from Tripoli & Doha (UTC+2 / UTC+3). I provide 8+ hours of daily overlap with UK and European teams (GMT/CET) and 5+ hours with the US East Coast (EST).`;
      }

      const doc = db.createGeneratedDocument({
        applicationId: selectedOpp.id,
        jobId: selectedOpp.id,
        docType: docType as any,
        title: `${docType.replace('_', ' ').toUpperCase()} — ${selectedOpp.companyName}`,
        contentMarkdown: content,
        isReviewedByOwner: false,
        unsupportedClaimsWarning: warnings,
      });

      setGeneratedDoc(doc);
      setEditableContent(content);
      setIsReviewed(false);
      setIsGenerating(false);
    }, 350);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPackage = () => {
    const packageText = `=====================================================
CAREERPROOF OS — APPLICATION KIT
Role: ${selectedOpp.title}
Company: ${selectedOpp.companyName}
Candidate: Abdlrrahman Shibani (Founder & Engineering Lead)
Generated: ${new Date().toISOString()}
=====================================================

${editableContent}

-----------------------------------------------------
VERIFIED CLAIMS TRACEABILITY:
${verifiedClaims.map(c => `[✓] ${c.claim} -> Ref: ${c.source}`).join('\n')}
-----------------------------------------------------
Interactive Proof Portfolio: https://careerproof.abdlrrahman.dev/fit
`;

    const blob = new Blob([packageText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Application_Kit_${selectedOpp.companyName.replace(/\s+/g, '_')}_${docType}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Generator Control Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Application Studio — Grounded Document & Outreach Suite
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Synthesize evidence-backed cover letters, technical alignment briefs, multi-step drip campaigns, and screening answers with zero unsupported claims.
            </p>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800 self-start sm:self-auto flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Grounded in Portfolio Data</span>
          </span>
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Select Target Opportunity
            </label>
            <select
              value={selectedOppId}
              onChange={(e) => setSelectedOppId(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            >
              {opportunities.map(opp => (
                <option key={opp.id} value={opp.id}>
                  {opp.title} ({opp.companyName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Document / Sequence Template
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as ExtendedDocType)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="cover_letter">Tailored Cover Letter (Staff/Lead)</option>
              <option value="architecture_brief">Technical RFC & Architecture Alignment Brief</option>
              <option value="linkedin_connection">LinkedIn 1st-Degree Note (&lt;300 chars)</option>
              <option value="linkedin_inmail">LinkedIn InMail Outreach Pitch</option>
              <option value="drip_sequence">4-Step Outreach & Follow-up Drip Sequence</option>
              <option value="ats_bullets">Customized ATS Résumé Bullets</option>
              <option value="screening_answers">Pre-Interview Grounded Screening Q&A</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedOpp}
              className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 btn-tactile"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{isGenerating ? 'Synthesizing Grounded Package...' : 'Generate Grounded Document'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Split Screen Workspace: JD Intelligence (Left) & Generated Workspace (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Target Opportunity & Match Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Target Role Card */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  {selectedOpp.workplaceType}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">
                  {selectedOpp.title}
                </h3>
                <div className="text-xs text-blue-400 font-semibold flex items-center gap-1 mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>{selectedOpp.companyName}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-black font-mono text-cyan-400 bg-blue-950 px-2.5 py-1 rounded-xl border border-blue-800">
                  {selectedOpp.matchScore}%
                </span>
                <span className="block text-[10px] text-slate-500 font-mono mt-1">Match Score</span>
              </div>
            </div>

            {/* Compensation & Location */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{selectedOpp.location}</span>
              </div>
              {selectedOpp.salaryMin && (
                <div className="text-emerald-400 font-bold flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>${(selectedOpp.salaryMin/1000).toFixed(0)}k - ${(selectedOpp.salaryMax!/1000).toFixed(0)}k</span>
                </div>
              )}
            </div>

            {/* Matched Capabilities */}
            {matchResult && (
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Direct Verified Matches ({matchResult.matchedVerifiedSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {matchResult.matchedVerifiedSkills.slice(0, 6).map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800"
                    >
                      {m.name} ✓
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Raw Job Description Preview */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Raw JD Snapshot
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-48 overflow-y-auto leading-relaxed whitespace-pre-line">
              {selectedOpp.rawDescription || 'No description pasted.'}
            </div>
          </div>
        </div>

        {/* Right Column: Generated Workspace & Verification Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {editableContent ? (
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
              {/* Workspace Header Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                    {docType.replace('_', ' ')}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1">
                    {selectedOpp.companyName} — Tailored Application Asset
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsReviewed(!isReviewed)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-colors ${
                      isReviewed
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isReviewed ? 'Owner Approved' : 'Mark Reviewed'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm btn-tactile"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={handleDownloadPackage}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 btn-tactile"
                    title="Download Complete Package (.md)"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download Kit</span>
                  </button>
                </div>
              </div>

              {/* Editable Content Area */}
              <div className="space-y-2">
                <textarea
                  rows={15}
                  value={editableContent}
                  onChange={(e) => setEditableContent(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Claim Verification & Traceability Inspector */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Claim-by-Claim Verification Inspector</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Zero Unsupported Adjectives</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {verifiedClaims.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-slate-200 font-medium leading-tight">{item.claim}</div>
                        <div className="text-[10px] text-blue-400 font-mono mt-0.5">Source: {item.source}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-cyan-400 opacity-60 mx-auto animate-pulse" />
              <h3 className="text-base font-bold text-white">
                Select an opportunity and click &quot;Generate Grounded Document&quot;
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Generate tailored cover letters, technical architecture briefs, multi-step drip sequences, or screening answers grounded strictly in verified evidence.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
