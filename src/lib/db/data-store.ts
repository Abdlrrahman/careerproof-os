import { 
  Profile, 
  RoleLens, 
  SkillCategory, 
  Skill, 
  EvidenceItem, 
  Experience, 
  Education, 
  Credential, 
  MeasurableAchievement, 
  Project, 
  CaseStudy, 
  Testimonial, 
  ResumeVersion, 
  JobOpportunity, 
  GeneratedDocument, 
  SiteSettings, 
  AuditLogEntry,
  PipelineStage,
  TechRadarItem,
  TechnicalArticle,
  RoiScenario,
  ArchitectureBlueprint,
  ArchitectureDecisionRecord,
  AudioBriefing,
  TelemetryMetric,
  CareerTrackItem,
  CompetencyBenchmark,
  ChaosScenario,
  TrustControl,
  DripCampaign,
  KnowledgeGraphNode,
  KnowledgeGraphLink,
  ComparisonDimension,
  OfferEvaluation,
  WhiteboardBlock,
  CompanyProspect,
  RfcDocument,
  AssessmentRubric,
  EngineeringRunbook,
  NegotiationScenario,
  EngineeringPostmortem,
  PitchSlide,
  ServiceLevelObjective,
  OnboardingRoadmap
} from '@/types';

import { 
  initialProfile, 
  initialRoleLenses, 
  initialSkillCategories, 
  initialSkills, 
  initialEvidenceItems, 
  initialExperiences, 
  initialEducation, 
  initialCredentials, 
  initialAchievements, 
  initialProjects, 
  initialCaseStudies, 
  initialTestimonials, 
  initialResumeVersions, 
  initialOpportunities, 
  initialSiteSettings, 
  initialTechRadar,
  initialArticles,
  initialRoiScenarios,
  initialBlueprints,
  initialAdrs,
  initialBriefings,
  initialTelemetryMetrics,
  initialCareerTracks,
  initialBenchmarks,
  initialChaosScenarios,
  initialTrustControls,
  initialDripCampaigns,
  initialKnowledgeNodes,
  initialKnowledgeLinks,
  initialComparisonDimensions,
  initialOffers,
  initialWhiteboardBlocks,
  initialCompanyProspects,
  initialRfcs,
  initialRubrics,
  initialRunbooks,
  initialNegotiationScenarios,
  initialPostmortems,
  initialPitchDeck,
  initialSlos,
  initialOnboardingRoadmaps
} from '@/data/seed-data';

/**
 * Universal In-Memory Data Store with Local Storage persistence capability
 */
class DataStore {
  private profile: Profile = { ...initialProfile };
  private roleLenses: RoleLens[] = [...initialRoleLenses];
  private skillCategories: SkillCategory[] = [...initialSkillCategories];
  private skills: Skill[] = [...initialSkills];
  private evidenceItems: EvidenceItem[] = [...initialEvidenceItems];
  private experiences: Experience[] = [...initialExperiences];
  private education: Education[] = [...initialEducation];
  private credentials: Credential[] = [...initialCredentials];
  private achievements: MeasurableAchievement[] = [...initialAchievements];
  private projects: Project[] = [...initialProjects];
  private caseStudies: Record<string, CaseStudy> = { ...initialCaseStudies };
  private testimonials: Testimonial[] = [...initialTestimonials];
  private resumeVersions: ResumeVersion[] = [...initialResumeVersions];
  private opportunities: JobOpportunity[] = [...initialOpportunities];
  private generatedDocs: GeneratedDocument[] = [];
  private siteSettings: SiteSettings = { ...initialSiteSettings };
  private techRadar: TechRadarItem[] = [...initialTechRadar];
  private articles: TechnicalArticle[] = [...initialArticles];
  private roiScenarios: RoiScenario[] = [...initialRoiScenarios];
  private blueprints: ArchitectureBlueprint[] = [...initialBlueprints];
  private adrs: ArchitectureDecisionRecord[] = [...initialAdrs];
  private briefings: AudioBriefing[] = [...initialBriefings];
  private telemetryMetrics: TelemetryMetric[] = [...initialTelemetryMetrics];
  private careerTracks: CareerTrackItem[] = [...initialCareerTracks];
  private benchmarks: CompetencyBenchmark[] = [...initialBenchmarks];
  private chaosScenarios: ChaosScenario[] = [...initialChaosScenarios];
  private trustControls: TrustControl[] = [...initialTrustControls];
  private dripCampaigns: DripCampaign[] = [...initialDripCampaigns];
  private knowledgeNodes: KnowledgeGraphNode[] = [...initialKnowledgeNodes];
  private knowledgeLinks: KnowledgeGraphLink[] = [...initialKnowledgeLinks];
  private comparisonDimensions: ComparisonDimension[] = [...initialComparisonDimensions];
  private offers: OfferEvaluation[] = [...initialOffers];
  private whiteboardBlocks: WhiteboardBlock[] = [...initialWhiteboardBlocks];
  private companyProspects: CompanyProspect[] = [...initialCompanyProspects];
  private rfcs: RfcDocument[] = [...initialRfcs];
  private rubrics: AssessmentRubric[] = [...initialRubrics];
  private runbooks: EngineeringRunbook[] = [...initialRunbooks];
  private negotiationScenarios: NegotiationScenario[] = [...initialNegotiationScenarios];
  private postmortems: EngineeringPostmortem[] = [...initialPostmortems];
  private pitchDeck: PitchSlide[] = [...initialPitchDeck];
  private slos: ServiceLevelObjective[] = [...initialSlos];
  private onboardingRoadmaps: OnboardingRoadmap[] = [...initialOnboardingRoadmaps];
  private auditLogs: AuditLogEntry[] = [
    {
      id: 'log-01',
      action: 'SYSTEM_INITIALIZED',
      entityType: 'System',
      entityId: 'root',
      timestamp: new Date().toISOString(),
      details: 'CareerProof OS initialized with verified seed dataset for Abdlrrahman Shibani.',
    }
  ];

  // Profile
  getProfile(): Profile {
    return this.profile;
  }

  updateProfile(updates: Partial<Profile>): Profile {
    this.profile = { ...this.profile, ...updates };
    this.addAuditLog('UPDATE_PROFILE', 'Profile', this.profile.id, 'Updated profile information');
    return this.profile;
  }

  // Role Lenses
  getRoleLenses(): RoleLens[] {
    return this.roleLenses.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getRoleLensBySlug(slug: string): RoleLens | undefined {
    return this.roleLenses.find(l => l.slug === slug || l.id === slug);
  }

  // Skills & Categories
  getSkills(): Skill[] {
    return this.skills;
  }

  getSkillCategories(): SkillCategory[] {
    return this.skillCategories.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  updateSkill(id: string, updates: Partial<Skill>): Skill | undefined {
    const idx = this.skills.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.skills[idx] = { ...this.skills[idx], ...updates };
      this.addAuditLog('UPDATE_SKILL', 'Skill', id, `Updated skill ${this.skills[idx].nameEn}`);
      return this.skills[idx];
    }
    return undefined;
  }

  // Evidence
  getEvidenceItems(): EvidenceItem[] {
    return this.evidenceItems;
  }

  getEvidenceById(id: string): EvidenceItem | undefined {
    return this.evidenceItems.find(e => e.id === id);
  }

  // Experiences
  getExperiences(): Experience[] {
    return this.experiences.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  // Education & Credentials
  getEducation(): Education[] {
    return this.education;
  }

  getCredentials(): Credential[] {
    return this.credentials;
  }

  // Achievements
  getAchievements(): MeasurableAchievement[] {
    return this.achievements;
  }

  // Projects & Case Studies
  getProjects(): Project[] {
    return this.projects.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.projects.find(p => p.slug === slug || p.id === slug);
  }

  getCaseStudy(projectId: string): CaseStudy | undefined {
    return this.caseStudies[projectId];
  }

  // Testimonials
  getTestimonials(): Testimonial[] {
    return this.testimonials;
  }

  // Resume Versions
  getResumeVersions(): ResumeVersion[] {
    return this.resumeVersions;
  }

  getResumeVersionBySlug(slug: string): ResumeVersion | undefined {
    return this.resumeVersions.find(r => r.slug === slug);
  }

  // Opportunities & Pipeline
  getOpportunities(): JobOpportunity[] {
    return this.opportunities;
  }

  getOpportunityById(id: string): JobOpportunity | undefined {
    return this.opportunities.find(o => o.id === id);
  }

  createOpportunity(opp: Omit<JobOpportunity, 'id' | 'createdAt' | 'updatedAt'>): JobOpportunity {
    const newOpp: JobOpportunity = {
      ...opp,
      id: `job-opp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.opportunities.unshift(newOpp);
    this.addAuditLog('CREATE_OPPORTUNITY', 'JobOpportunity', newOpp.id, `Added opportunity ${newOpp.title} at ${newOpp.companyName}`);
    return newOpp;
  }

  updateOpportunityStage(id: string, stage: PipelineStage): JobOpportunity | undefined {
    const opp = this.opportunities.find(o => o.id === id);
    if (opp) {
      const oldStage = opp.pipelineStage;
      opp.pipelineStage = stage;
      opp.updatedAt = new Date().toISOString();
      this.addAuditLog('MOVE_PIPELINE_STAGE', 'JobOpportunity', id, `Moved from ${oldStage} to ${stage}`);
      return opp;
    }
    return undefined;
  }

  deleteOpportunity(id: string): boolean {
    const initialLen = this.opportunities.length;
    this.opportunities = this.opportunities.filter(o => o.id !== id);
    if (this.opportunities.length < initialLen) {
      this.addAuditLog('DELETE_OPPORTUNITY', 'JobOpportunity', id, `Deleted opportunity`);
      return true;
    }
    return false;
  }

  // Generated Documents
  getGeneratedDocuments(jobId?: string): GeneratedDocument[] {
    if (jobId) return this.generatedDocs.filter(d => d.jobId === jobId);
    return this.generatedDocs;
  }

  createGeneratedDocument(doc: Omit<GeneratedDocument, 'id' | 'createdAt'>): GeneratedDocument {
    const newDoc: GeneratedDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.generatedDocs.unshift(newDoc);
    this.addAuditLog('GENERATE_DOCUMENT', 'GeneratedDocument', newDoc.id, `Generated ${doc.docType}`);
    return newDoc;
  }

  // Site Settings
  getSiteSettings(): SiteSettings {
    return this.siteSettings;
  }

  updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
    this.siteSettings = { ...this.siteSettings, ...settings };
    this.addAuditLog('UPDATE_SETTINGS', 'SiteSettings', 'global', 'Updated site configuration');
    return this.siteSettings;
  }

  // Tech Radar
  getTechRadar(): TechRadarItem[] {
    return this.techRadar;
  }

  // Technical Articles
  getArticles(): TechnicalArticle[] {
    return this.articles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  }

  getArticleBySlug(slug: string): TechnicalArticle | undefined {
    return this.articles.find(a => a.slug === slug || a.id === slug);
  }

  // ROI Scenarios
  getRoiScenarios(): RoiScenario[] {
    return this.roiScenarios;
  }

  // Architecture Blueprints
  getBlueprints(): ArchitectureBlueprint[] {
    return this.blueprints;
  }

  getBlueprintBySlug(slug: string): ArchitectureBlueprint | undefined {
    return this.blueprints.find(b => b.slug === slug || b.id === slug);
  }

  // Architecture Decision Records (ADRs)
  getAdrs(): ArchitectureDecisionRecord[] {
    return this.adrs.sort((a, b) => a.adrNumber - b.adrNumber);
  }

  getAdrBySlug(slug: string): ArchitectureDecisionRecord | undefined {
    return this.adrs.find(a => a.slug === slug || a.id === slug);
  }

  // Audio Briefings
  getBriefings(): AudioBriefing[] {
    return this.briefings;
  }

  getBriefingByLens(roleLensId: string): AudioBriefing | undefined {
    return this.briefings.find(b => b.roleLensId === roleLensId);
  }

  // System Telemetry Metrics
  getTelemetryMetrics(): TelemetryMetric[] {
    return this.telemetryMetrics;
  }

  // Career Tracks
  getCareerTracks(): CareerTrackItem[] {
    return this.careerTracks;
  }

  // Competency Benchmarks
  getBenchmarks(): CompetencyBenchmark[] {
    return this.benchmarks;
  }

  // Chaos Scenarios
  getChaosScenarios(): ChaosScenario[] {
    return this.chaosScenarios;
  }

  // Trust Controls
  getTrustControls(): TrustControl[] {
    return this.trustControls;
  }

  // Drip Campaigns
  getDripCampaigns(): DripCampaign[] {
    return this.dripCampaigns;
  }

  // Knowledge Graph
  getKnowledgeNodes(): KnowledgeGraphNode[] {
    return this.knowledgeNodes;
  }

  getKnowledgeLinks(): KnowledgeGraphLink[] {
    return this.knowledgeLinks;
  }

  // Comparison Dimensions
  getComparisonDimensions(): ComparisonDimension[] {
    return this.comparisonDimensions;
  }

  // Offer Evaluations
  getOffers(): OfferEvaluation[] {
    return this.offers;
  }

  // Whiteboard Blocks
  getWhiteboardBlocks(): WhiteboardBlock[] {
    return this.whiteboardBlocks;
  }

  // Company Prospects
  getCompanyProspects(): CompanyProspect[] {
    return this.companyProspects;
  }

  // RFCs
  getRfcs(): RfcDocument[] {
    return this.rfcs;
  }

  // Assessment Rubrics
  getRubrics(): AssessmentRubric[] {
    return this.rubrics;
  }

  // Engineering Runbooks
  getRunbooks(): EngineeringRunbook[] {
    return this.runbooks;
  }

  // Negotiation Scenarios
  getNegotiationScenarios(): NegotiationScenario[] {
    return this.negotiationScenarios;
  }

  // Engineering Postmortems & RCAs
  getPostmortems(): EngineeringPostmortem[] {
    return this.postmortems;
  }

  // Executive Pitch Deck
  getPitchDeck(): PitchSlide[] {
    return this.pitchDeck;
  }

  // Service Level Objectives (SLOs)
  getSlos(): ServiceLevelObjective[] {
    return this.slos;
  }

  // 30-60-90 Day Onboarding Roadmaps
  getOnboardingRoadmaps(): OnboardingRoadmap[] {
    return this.onboardingRoadmaps;
  }

  // Audit Logs
  getAuditLogs(): AuditLogEntry[] {
    return this.auditLogs;
  }

  addAuditLog(action: string, entityType: string, entityId: string, details: string) {
    this.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      entityType,
      entityId,
      timestamp: new Date().toISOString(),
      details,
    });
  }
}

// Global Singleton Instance
export const db = new DataStore();
