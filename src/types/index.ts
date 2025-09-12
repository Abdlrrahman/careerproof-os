export type Locale = 'en' | 'ar';
export type ViewMode = '60s' | '3m' | '10m';

export type SkillProficiencyLevel = 'familiar' | 'applied' | 'proven' | 'advanced' | 'leadership';

export type VerificationStatus = 'verified' | 'verification_required' | 'self_reported' | 'concept';

export type ProjectStatus = 'completed' | 'in_production' | 'in_development' | 'concept';

export type ConfidentialityStatus = 'public' | 'sanitized_metrics' | 'confidential';

export type PipelineStage = 
  | 'discovered' 
  | 'reviewing' 
  | 'prioritized' 
  | 'preparing' 
  | 'applied' 
  | 'assessment' 
  | 'interview' 
  | 'offer' 
  | 'rejected' 
  | 'withdrawn' 
  | 'archived';

export interface Profile {
  id: string;
  fullName: string;
  fullNameAr: string;
  legalName: string;
  legalNameAr: string;
  primaryTitle: string;
  primaryTitleAr: string;
  supportingTitle: string;
  supportingTitleAr: string;
  headline: string;
  headlineAr: string;
  bioShort: string;
  bioShortAr: string;
  bioLong: string;
  bioLongAr: string;
  location: string;
  locationAr: string;
  workPreference: string;
  workPreferenceAr: string;
  timezone: string;
  timezoneOverlap: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  calendlyUrl: string;
  avatarUrl?: string;
  yearsOfExperience: number;
  languages: {
    language: string;
    languageAr: string;
    level: string;
    levelAr: string;
    isNative?: boolean;
  }[];
  isPublished: boolean;
}

export interface RoleLens {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  summaryEn: string;
  summaryAr: string;
  targetRoleTypes: string[];
  keyStrengthsEn: string[];
  keyStrengthsAr: string[];
  highlightedSkillIds: string[];
  highlightedProjectIds: string[];
  highlightedAchievementIds: string[];
  recommendedResumeSlug: string;
  orderIndex: number;
}

export interface SkillCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  iconName: string;
  orderIndex: number;
}

export interface EvidenceItem {
  id: string;
  title: string;
  titleAr?: string;
  type: 
    | 'project' 
    | 'production_system' 
    | 'github_repo' 
    | 'role' 
    | 'achievement' 
    | 'credential' 
    | 'case_study' 
    | 'recommendation' 
    | 'publication'
    | 'training_delivered';
  url?: string;
  description: string;
  descriptionAr?: string;
  verificationStatus: VerificationStatus;
  issuerOrOrg: string;
  evidenceDate: string;
  complexityWeight?: number; // 1 to 5
  impactScore?: number; // 1 to 5
}

export interface SkillEvidenceLink {
  skillId: string;
  evidenceId: string;
  weight: number; // 0.1 to 1.0
  notes?: string;
}

export interface Skill {
  id: string;
  slug: string;
  categoryId: string;
  nameEn: string;
  nameAr: string;
  calculatedLevel: SkillProficiencyLevel;
  calculatedScore: number; // 0 to 100 based on formula
  yearsExperience: number;
  lastUsedYear: number;
  isVerified: boolean;
  verificationRationale: string;
  verificationRationaleAr?: string;
  evidenceItemIds: string[];
  connectedProjectIds: string[];
  connectedRoleIds: string[];
  isPublished: boolean;
}

export interface Experience {
  id: string;
  roleTitleEn: string;
  roleTitleAr: string;
  companyNameEn: string;
  companyNameAr: string;
  locationEn: string;
  locationAr: string;
  workType: 'remote' | 'hybrid' | 'onsite';
  startDate: string;
  endDate: string | null; // null for present
  isCurrent: boolean;
  isLeadership: boolean;
  teamSize?: number;
  summaryEn: string;
  summaryAr: string;
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  keyOutcomesEn: string[];
  keyOutcomesAr: string[];
  demonstratedSkillIds: string[];
  evidenceItemIds: string[];
  isPublished: boolean;
  orderIndex: number;
}

export interface Education {
  id: string;
  degreeEn: string;
  degreeAr: string;
  fieldEn: string;
  fieldAr: string;
  institutionEn: string;
  institutionAr: string;
  startYear: number;
  endYear: number | null; // null if in progress
  isInProgress: boolean;
  gpa?: string;
  creditsEarned?: string;
  notesEn?: string;
  notesAr?: string;
  isPublished: boolean;
}

export interface Credential {
  id: string;
  titleEn: string;
  titleAr: string;
  issuerEn: string;
  issuerAr: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationStatus: VerificationStatus;
  attachedEvidenceId?: string;
  skillsDemonstrated: string[];
  isPublished: boolean;
}

export interface MeasurableAchievement {
  id: string;
  metricValue: string;
  metricLabelEn: string;
  metricLabelAr: string;
  category: 'scale' | 'efficiency' | 'leadership' | 'impact' | 'financial';
  descriptionEn: string;
  descriptionAr: string;
  verificationStatus: VerificationStatus;
  supportingEvidenceId?: string;
  relatedProjectIds: string[];
  relatedSkillIds: string[];
  isPublished: boolean;
  isFeatured: boolean;
}

export interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  status: ProjectStatus;
  confidentiality: ConfidentialityStatus;
  clientOrOrgEn: string;
  clientOrOrgAr: string;
  roleTitleEn: string;
  roleTitleAr: string;
  teamSize: number;
  startDate: string;
  endDate?: string | null;
  summaryEn: string;
  summaryAr: string;
  demoUrl?: string;
  repoUrl?: string;
  domainTags: string[];
  primarySkillIds: string[];
  allSkillIds: string[];
  evidenceItemIds: string[];
  isFeatured: boolean;
  isPublished: boolean;
  orderIndex: number;
}

export interface CaseStudy {
  projectId: string;
  problemEn: string;
  problemAr: string;
  contextAndConstraintsEn: string;
  contextAndConstraintsAr: string;
  roleAndResponsibilitiesEn: string;
  roleAndResponsibilitiesAr: string;
  architectureEn: string;
  architectureAr: string;
  techStack: string[];
  keyDecisionsEn: { decision: string; rationale: string }[];
  keyDecisionsAr: { decision: string; rationale: string }[];
  securityConsiderationsEn: string;
  securityConsiderationsAr: string;
  resultsEn: string[];
  resultsAr: string[];
  lessonsLearnedEn: string;
  lessonsLearnedAr: string;
  recruiterSummaryEn: string;
  recruiterSummaryAr: string;
  technicalDeepDiveEn: string;
  technicalDeepDiveAr: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitleEn: string;
  authorTitleAr: string;
  organizationEn: string;
  organizationAr: string;
  relationshipEn: string;
  relationshipAr: string;
  quoteEn: string;
  quoteAr: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  isVerified: boolean;
  isPublished: boolean;
}

export interface ResumeVersion {
  id: string;
  slug: string;
  roleLensId: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  featuredSkillIds: string[];
  featuredProjectIds: string[];
  featuredExperienceIds: string[];
  versionDate: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  companyName: string;
  location: string;
  workplaceType: 'remote' | 'hybrid' | 'onsite';
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  rawDescription: string;
  sourceUrl?: string;
  sourcePlatform: 'linkedin' | 'indeed' | 'wellfound' | 'remoteok' | 'direct' | 'other';
  matchScore: number;
  pipelineStage: PipelineStage;
  targetRoleLensId?: string;
  appliedAt?: string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobMatchResult {
  overallScore: number;
  confidenceScore: number;
  requiredSkillsIdentified: string[];
  matchedVerifiedSkills: { skillId: string; name: string; level: SkillProficiencyLevel; evidenceCount: number }[];
  partiallySupportedSkills: { skillId: string; name: string; reason: string }[];
  missingSkills: { name: string; suggestedAlternative?: string }[];
  relevantProjects: { projectId: string; title: string; relevanceReason: string }[];
  relevantAchievements: { achievementId: string; metric: string; label: string }[];
  seniorityAlignment: { level: string; explanation: string; score: number };
  domainAlignment: { domains: string[]; explanation: string; score: number };
  timezoneAndRemoteCompatibility: { isEligible: boolean; overlapHours: number; summary: string };
  recommendedResumeSlug: string;
  interviewTopics: string[];
  honestGapsAndRisks: string[];
}

export interface GeneratedDocument {
  id: string;
  applicationId: string;
  jobId: string;
  docType: 'resume_ats' | 'resume_visual' | 'cover_letter' | 'linkedin_outreach' | 'recruiter_email' | 'interview_brief';
  title: string;
  contentMarkdown: string;
  isReviewedByOwner: boolean;
  unsupportedClaimsWarning: string[];
  createdAt: string;
}

export interface InterviewPrepItem {
  id: string;
  category: 'technical' | 'behavioral' | 'architecture' | 'questions_to_ask';
  questionEn: string;
  questionAr?: string;
  suggestedStarStory?: {
    situation: string;
    task: string;
    action: string;
    result: string;
    relevantProject: string;
  };
  keyPointsToCover: string[];
}

export interface ContactMessage {
  id: string;
  recruiterName: string;
  companyName: string;
  email: string;
  roleTitle?: string;
  message: string;
  preferredTimezone?: string;
  targetSalary?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  details: string;
}

export interface SiteSettings {
  siteUrl: string;
  ownerName: string;
  ownerEmail: string;
  linkedinUrl: string;
  githubUrl: string;
  calendlyUrl: string;
  isAiAssistantEnabled: boolean;
  maintenanceMode: boolean;
}

export type RadarRing = 'adopt' | 'trial' | 'assess' | 'hold';
export type RadarQuadrant = 'languages_frameworks' | 'infrastructure_cloud' | 'data_ai' | 'architecture_techniques';

export interface TechRadarItem {
  id: string;
  name: string;
  quadrant: RadarQuadrant;
  ring: RadarRing;
  summaryEn: string;
  summaryAr: string;
  experienceContextEn: string;
  experienceContextAr: string;
  isNew?: boolean;
}

export interface TechnicalArticle {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  publishedDate: string;
  readTimeMinutes: number;
  tags: string[];
  summaryEn: string;
  summaryAr: string;
  contentMarkdownEn: string;
  contentMarkdownAr: string;
  isFeatured: boolean;
}

export interface RoiScenario {
  id: string;
  bottleneckNameEn: string;
  bottleneckNameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  typicalSprintVelocityGain: string;
  day30MilestoneEn: string;
  day30MilestoneAr: string;
  day60MilestoneEn: string;
  day60MilestoneAr: string;
  day90MilestoneEn: string;
  day90MilestoneAr: string;
  recommendedRoleLensId: string;
}

export interface BlueprintNode {
  id: string;
  labelEn: string;
  labelAr: string;
  category: 'ingestion' | 'ml_inference' | 'database' | 'api_gateway' | 'client';
  descriptionEn: string;
  descriptionAr: string;
  latencyProfile: string;
  failureModeMitigationEn: string;
  failureModeMitigationAr: string;
  techStack: string[];
}

export interface ArchitectureBlueprint {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  projectRefId: string;
  summaryEn: string;
  summaryAr: string;
  throughputMetricEn: string;
  throughputMetricAr: string;
  nodes: BlueprintNode[];
  connectionFlow: string[];
}

export interface ArchitectureDecisionRecord {
  id: string;
  adrNumber: number;
  slug: string;
  titleEn: string;
  titleAr: string;
  status: 'Accepted' | 'Implemented' | 'Superseded';
  decisionDate: string;
  relatedSystemEn: string;
  relatedSystemAr: string;
  contextEn: string;
  contextAr: string;
  decisionEn: string;
  decisionAr: string;
  alternativesConsidered: {
    name: string;
    pros: string[];
    cons: string[];
  }[];
  consequencesEn: string;
  consequencesAr: string;
  tags: string[];
}

export interface AudioBriefing {
  id: string;
  roleLensId: string;
  titleEn: string;
  titleAr: string;
  durationSeconds: number;
  audioVoiceType: string;
  transcriptEn: string;
  transcriptAr: string;
  takeawaysEn: string[];
  takeawaysAr: string[];
}

export interface TelemetryMetric {
  id: string;
  nameEn: string;
  nameAr: string;
  value: string;
  status: 'optimal' | 'warning' | 'info';
  category: 'build' | 'tests' | 'performance' | 'security' | 'grounding';
  descriptionEn: string;
  descriptionAr: string;
  verifiedTimestamp: string;
}

export interface CareerTrackItem {
  id: string;
  trackNameEn: string;
  trackNameAr: string;
  period: string;
  roleTitleEn: string;
  roleTitleAr: string;
  organizationEn: string;
  organizationAr: string;
  keyContributionsEn: string[];
  keyContributionsAr: string[];
  skillsDemonstrated: string[];
  isOngoing: boolean;
}

export interface CompetencyBenchmark {
  id: string;
  domainEn: string;
  domainAr: string;
  candidatePercentile: number; // e.g. 99 for Top 1%
  candidateTier: 'Principal / Top 1%' | 'Staff / Top 3%' | 'Lead / Top 5%' | 'Senior / Top 10%';
  industryBenchmarkMedian: number;
  verifiedEvidenceSummaryEn: string;
  verifiedEvidenceSummaryAr: string;
  productionArtifact: string;
  coreCompetencies: string[];
}

export interface ChaosScenario {
  id: string;
  nameEn: string;
  nameAr: string;
  targetSystem: string;
  threatType: 'Concurrency Overload' | 'Security Context Injection' | 'Data Drift / Float Inbalance' | 'Memory / OOM Spike';
  descriptionEn: string;
  descriptionAr: string;
  simulatedFault: string;
  mitigationMechanismEn: string;
  mitigationMechanismAr: string;
  recoveryLatencyMs: number;
  postRecoveryState: string;
  verifiedTestId: string;
}

export interface TrustControl {
  id: string;
  titleEn: string;
  titleAr: string;
  category: 'Security & SAST' | 'Data Privacy & NDA' | 'International Legal & IP' | 'Operational Resilience';
  complianceStandard: string;
  status: 'Verified Compliant' | 'Certified' | 'Enforced in CI/CD';
  descriptionEn: string;
  descriptionAr: string;
  auditMethod: string;
}

export interface DripSequenceStep {
  dayOffset: number;
  stageNameEn: string;
  stageNameAr: string;
  channel: 'Email' | 'LinkedIn Note' | 'InMail' | 'Calendar Invitation';
  subjectEn: string;
  subjectAr: string;
  bodyEn: string;
  bodyAr: string;
  groundedArtifactUrl: string;
  callToActionEn: string;
  callToActionAr: string;
}

export interface DripCampaign {
  id: string;
  targetRoleLensId: string;
  titleEn: string;
  titleAr: string;
  estimatedResponseRate: string;
  targetRecruiterPersonaEn: string;
  targetRecruiterPersonaAr: string;
  steps: DripSequenceStep[];
}

export interface KnowledgeGraphNode {
  id: string;
  labelEn: string;
  labelAr: string;
  type: 'project' | 'skill' | 'credential' | 'blueprint' | 'track';
  cluster: string;
  size: number;
  connectionsCount: number;
  highlightMetricEn?: string;
  highlightMetricAr?: string;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relationType: 'demonstrates' | 'architected_with' | 'certified_by' | 'governed_under';
  weight: number;
}

export interface ComparisonDimension {
  id: string;
  categoryEn: string;
  categoryAr: string;
  genericEngineerEn: string;
  genericEngineerAr: string;
  seniorSpecialistEn: string;
  seniorSpecialistAr: string;
  shibaniAdvantageEn: string;
  shibaniAdvantageAr: string;
  verifiedEvidenceMetricEn: string;
  verifiedEvidenceMetricAr: string;
  proofRouteUrl: string;
}

export interface OfferEvaluation {
  id: string;
  companyName: string;
  roleTitle: string;
  employmentType: 'B2B Remote Contractor' | 'Direct Employment (W-2 / EoR)';
  currency: string;
  annualBaseSalary: number;
  annualPerformanceBonus: number;
  equityType: 'RSUs' | 'Stock Options (ISOs)' | 'Profit Sharing';
  equityValueAnnual: number;
  vestingSchedule: string;
  effectiveTaxRatePercent: number;
  totalAnnualCompensationGross: number;
  netAnnualTakeHomeEstimated: number;
  negotiationScore: number;
  leveragePoints: string[];
}

export interface WhiteboardBlock {
  id: string;
  titleEn: string;
  titleAr: string;
  roleEn: string;
  roleAr: string;
  technology: string;
  layer: 'Client Edge' | 'API Gateway' | 'Compute & AI' | 'Storage & Ledgers' | 'Worker Queue';
  latencyBudget: string;
  throughputThreshold: string;
  resilienceProtocolEn: string;
  resilienceProtocolAr: string;
}

export interface CompanyProspect {
  id: string;
  companyName: string;
  domain: string;
  industry: 'Spatial AI & Energy' | 'FinTech & Core Banking' | 'Public Sector & GovTech' | 'Cloud Platform & Infrastructure';
  headquarters: string;
  remoteTier: 'Global Remote (Async)' | 'EU/US Timezone Remote' | 'Hybrid Global';
  fundingStage: 'Series B' | 'Series C' | 'Public / Enterprise';
  techStackMatches: string[];
  targetDecisionMakerTitle: string;
  strategicEntryAngleEn: string;
  strategicEntryAngleAr: string;
  fitScore: number;
}

export interface RfcDocument {
  id: string;
  rfcNumber: string;
  titleEn: string;
  titleAr: string;
  status: 'Approved & Implemented' | 'Under Review' | 'Active Standard';
  author: string;
  createdDate: string;
  summaryEn: string;
  summaryAr: string;
  motivationEn: string;
  motivationAr: string;
  technicalProposalEn: string;
  technicalProposalAr: string;
  alternativesConsideredEn: string[];
  alternativesConsideredAr: string[];
  securityImplicationsEn: string;
  securityImplicationsAr: string;
  rolloutPlanEn: string;
  rolloutPlanAr: string;
}

export interface AssessmentRubricCriterion {
  dimension: string;
  weightPercent: number;
  passingThreshold: string;
  candidateEvaluationScore: number;
  evaluatorNotesEn: string;
  evaluatorNotesAr: string;
}

export interface AssessmentRubric {
  id: string;
  trackName: string;
  overallScore: number;
  recommendation: 'Strong Hire (Top 1% Staff Caliber)' | 'Hire (Staff Lead)';
  criteria: AssessmentRubricCriterion[];
}

export interface EngineeringRunbookStep {
  stepNumber: number;
  titleEn: string;
  titleAr: string;
  commandSnippet?: string;
  explanationEn: string;
  explanationAr: string;
  verificationEn: string;
  verificationAr: string;
}

export interface EngineeringRunbook {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  severity: 'Critical (SEV-1)' | 'High (SEV-2)' | 'Standard Maintenance';
  targetSystem: string;
  estimatedTimeToResolve: string;
  summaryEn: string;
  summaryAr: string;
  prerequisitesEn: string[];
  prerequisitesAr: string[];
  steps: EngineeringRunbookStep[];
  rollbackProcedureEn: string;
  rollbackProcedureAr: string;
}

export interface NegotiationScenario {
  id: string;
  scenarioTitleEn: string;
  scenarioTitleAr: string;
  contextEn: string;
  contextAr: string;
  targetFocus: 'Base Salary Expansion' | 'Equity Upside & Acceleration' | 'Signing Bonus & Relocation' | 'B2B SOW Terms & Invoicing';
  suggestedSubjectEn: string;
  suggestedSubjectAr: string;
  emailScriptEn: string;
  emailScriptAr: string;
  phoneTalkingPointsEn: string[];
  phoneTalkingPointsAr: string[];
}

export interface PostmortemTimelineEvent {
  time: string;
  descriptionEn: string;
  descriptionAr: string;
  isMilestone?: boolean;
}

export interface PostmortemActionItem {
  id: string;
  taskEn: string;
  taskAr: string;
  owner: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  preventativeImpact: string;
}

export interface EngineeringPostmortem {
  id: string;
  incidentNumber: string;
  titleEn: string;
  titleAr: string;
  date: string;
  severity: 'SEV-1 (Critical)' | 'SEV-2 (High)' | 'SEV-3 (Moderate)';
  leadInvestigator: string;
  affectedSystems: string[];
  durationMinutes: number;
  userImpactEn: string;
  userImpactAr: string;
  timeline: PostmortemTimelineEvent[];
  fiveWhysEn: string[];
  fiveWhysAr: string[];
  rootCauseEn: string;
  rootCauseAr: string;
  lessonsLearnedEn: string[];
  lessonsLearnedAr: string[];
  actionItems: PostmortemActionItem[];
}

export interface PitchSlide {
  id: string;
  slideNumber: number;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  bulletsEn: string[];
  bulletsAr: string[];
  highlightMetric: {
    value: string;
    labelEn: string;
    labelAr: string;
  };
  keyTakeawayEn: string;
  keyTakeawayAr: string;
}

export interface ServiceLevelObjective {
  id: string;
  serviceName: string;
  targetMetricEn: string;
  targetMetricAr: string;
  targetSloPercent: number;
  currentPerformancePercent: number;
  errorBudgetRemainingPercent: number;
  measuredWindow: string;
  sliDefinitionEn: string;
  sliDefinitionAr: string;
  burnRateAlertThreshold: string;
  mitigationProtocolEn: string;
  mitigationProtocolAr: string;
}

export interface OnboardingPhase {
  phaseRange: string;
  phaseTitleEn: string;
  phaseTitleAr: string;
  themeEn: string;
  themeAr: string;
  keyDeliverablesEn: string[];
  keyDeliverablesAr: string[];
  successMetricsEn: string[];
  successMetricsAr: string[];
}

export interface OnboardingRoadmap {
  id: string;
  roleTrack: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  phases: OnboardingPhase[];
}












