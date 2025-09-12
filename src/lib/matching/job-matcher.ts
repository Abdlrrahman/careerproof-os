import { Skill, Project, MeasurableAchievement, JobMatchResult, RoleLens } from '@/types';

// Pre-defined skill taxonomy mappings for intelligent keyword normalization
const SKILL_KEYWORDS_MAP: Record<string, string[]> = {
  'python': ['python', 'py', 'fastapi', 'django', 'flask', 'pytorch', 'pandas', 'numpy'],
  'typescript': ['typescript', 'ts', 'next.js', 'nextjs', 'react', 'node', 'nodejs'],
  'javascript': ['javascript', 'js', 'es6', 'react', 'node', 'frontend', 'fullstack'],
  'react': ['react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'redux', 'frontend'],
  'react-native': ['react native', 'react-native', 'mobile', 'ios', 'android'],
  'nodejs': ['node', 'node.js', 'nodejs', 'express', 'fastify', 'backend'],
  'fastapi': ['fastapi', 'python backend', 'async python', 'uvicorn'],
  'django': ['django', 'django rest framework', 'drf', 'python'],
  'laravel': ['laravel', 'php', 'backend'],
  'postgresql': ['postgresql', 'postgres', 'psql', 'postgis', 'relational database', 'sql'],
  'sql': ['sql', 'mysql', 'postgresql', 'database', 'queries', 'relational'],
  'docker': ['docker', 'container', 'containers', 'containerization', 'compose'],
  'cicd': ['ci/cd', 'cicd', 'github actions', 'pipeline', 'deployment', 'devops'],
  'machine-learning': ['machine learning', 'ml', 'ai', 'artificial intelligence', 'predictive modeling', 'deep learning', 'pytorch', 'scikit-learn'],
  'nlp': ['nlp', 'natural language processing', 'transformers', 'bert', 'geobert', 'llm', 'llms', 'rag'],
  'embeddings': ['embeddings', 'vector search', 'pgvector', 'semantic search', 'retrieval', 'rag'],
  'geobert': ['geobert', 'geological bert', 'domain transformer', 'geospatial ml'],
  'gis-spatial': ['gis', 'geospatial', 'postgis', 'spatial analytics', 'maps', 'shapefile', 'geojson'],
  'backend-architecture': ['system architecture', 'backend architecture', 'microservices', 'distributed systems', 'api design', 'high availability', 'scalability'],
  'technical-leadership': ['tech lead', 'technical lead', 'lead engineer', 'staff engineer', 'principal engineer', 'engineering lead', 'architect', 'mentorship'],
  'engineering-leadership': ['engineering manager', 'head of engineering', 'director of engineering', 'people management', 'sprint leadership', 'agile delivery'],
  'project-management': ['project management', 'program management', 'scrum', 'agile', 'jira', 'kanban', 'delivery manager', 'pmp'],
  'digital-transformation': ['digital transformation', 'digitization', 'modernization', 'enterprise systems', 'change management', 'public sector'],
  'procurement': ['procurement', 'vendor management', 'rfp', 'rfq', 'tenders', 'contracts'],
  'auth-security': ['security', 'oauth', 'oauth2', 'jwt', 'rbac', 'cybersecurity', 'iam', 'auth'],
  'hyper-v': ['hyper-v', 'virtualization', 'vmware', 'datacenter', 'windows server'],
  'active-directory': ['active directory', 'ad', 'domain services', 'gpo', 'azure ad', 'entra id'],
  'm365-admin': ['microsoft 365', 'm365', 'office 365', 'exchange online', 'intune'],
  'linux': ['linux', 'ubuntu', 'debian', 'server administration', 'bash', 'shell'],
  'energy-oil-gas': ['energy', 'oil', 'gas', 'petroleum', 'exploration', 'subsurface', 'drilling', 'upstream'],
  'telecom-domain': ['telecom', 'telecommunications', 'networking', 'snmp', 'fiber', 'cellular'],
  'banking-domain': ['banking', 'fintech', 'financial services', 'payments', 'ledger', 'accounting'],
  'public-sector-digitization': ['public sector', 'government', 'govtech', 'municipal', 'civic tech', 'citizen services'],
  'humanitarian-tech': ['humanitarian', 'ngo', 'international development', 'relief', 'aid', 'beneficiary', 'meal'],
};

/**
 * Deterministic Job Description Analyzer & Matcher
 */
export function analyzeJobDescription(
  jobDescriptionText: string,
  allSkills: Skill[],
  allProjects: Project[],
  allAchievements: MeasurableAchievement[],
  allRoleLenses: RoleLens[]
): JobMatchResult {
  const normalizedText = jobDescriptionText.toLowerCase();

  // 1. Identify Required Skills in the Text
  const identifiedSkillIds = new Set<string>();
  const identifiedSkillNames = new Set<string>();

  for (const [skillId, keywords] of Object.entries(SKILL_KEYWORDS_MAP)) {
    for (const keyword of keywords) {
      // Word boundary regex for accurate keyword matching
      const regex = new RegExp(`\\b${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalizedText)) {
        identifiedSkillIds.add(skillId);
        identifiedSkillNames.add(keyword);
        break;
      }
    }
  }

  // 2. Classify Matched, Partial, and Missing Skills
  const matchedVerifiedSkills: JobMatchResult['matchedVerifiedSkills'] = [];
  const partiallySupportedSkills: JobMatchResult['partiallySupportedSkills'] = [];
  const missingSkills: JobMatchResult['missingSkills'] = [];

  const candidateSkillsMap = new Map(allSkills.map(s => [s.id, s]));

  for (const skillId of identifiedSkillIds) {
    const candidateSkill = candidateSkillsMap.get(skillId);
    if (candidateSkill && candidateSkill.isPublished) {
      if (candidateSkill.isVerified && (candidateSkill.calculatedLevel === 'advanced' || candidateSkill.calculatedLevel === 'leadership' || candidateSkill.calculatedLevel === 'proven')) {
        matchedVerifiedSkills.push({
          skillId: candidateSkill.id,
          name: candidateSkill.nameEn,
          level: candidateSkill.calculatedLevel,
          evidenceCount: candidateSkill.evidenceItemIds.length,
        });
      } else {
        partiallySupportedSkills.push({
          skillId: candidateSkill.id,
          name: candidateSkill.nameEn,
          reason: `Demonstrated at '${candidateSkill.calculatedLevel}' tier with ${candidateSkill.evidenceItemIds.length} evidence records.`,
        });
      }
    }
  }

  // Check for common market keywords that may be missing from profile
  const potentialMissingKeywords = [
    { key: 'kubernetes', name: 'Kubernetes / K8s', alt: 'Extensive Docker orchestration & containerization' },
    { key: 'rust', name: 'Rust', alt: 'High-performance Python C-extensions and strict TypeScript' },
    { key: 'golang', name: 'Go / Golang', alt: 'FastAPI async microservices and Node.js event concurrency' },
    { key: 'kafka', name: 'Apache Kafka', alt: 'Celery/Redis background queues and PostgreSQL pub/sub' },
    { key: 'snowflake', name: 'Snowflake / BigQuery', alt: 'PostgreSQL/PostGIS spatial data pipelines' },
  ];

  for (const item of potentialMissingKeywords) {
    if (new RegExp(`\\b${item.key}\\b`, 'i').test(normalizedText)) {
      missingSkills.push({
        name: item.name,
        suggestedAlternative: item.alt,
      });
    }
  }

  // 3. Find Relevant Projects & Case Studies
  const relevantProjects: JobMatchResult['relevantProjects'] = [];
  for (const project of allProjects.filter(p => p.isPublished)) {
    const overlappingSkills = project.primarySkillIds.filter(id => identifiedSkillIds.has(id));
    if (overlappingSkills.length > 0) {
      relevantProjects.push({
        projectId: project.id,
        title: project.titleEn,
        relevanceReason: `Applies ${overlappingSkills.length} identified core skills (${overlappingSkills.join(', ')}) in production.`,
      });
    }
  }

  // 4. Find Relevant Quantifiable Achievements
  const relevantAchievements: JobMatchResult['relevantAchievements'] = [];
  for (const ach of allAchievements.filter(a => a.isPublished)) {
    const overlaps = ach.relatedSkillIds.some(id => identifiedSkillIds.has(id));
    if (overlaps) {
      relevantAchievements.push({
        achievementId: ach.id,
        metric: ach.metricValue,
        label: ach.metricLabelEn,
      });
    }
  }

  // 5. Seniority & Leadership Alignment
  const hasSeniorityLeadKeywords = /\b(lead|principal|staff|head|manager|architect|director|senior)\b/i.test(normalizedText);
  const seniorityScore = hasSeniorityLeadKeywords ? 95 : 88;
  const seniorityAlignment = {
    level: hasSeniorityLeadKeywords ? 'Staff / Lead / Senior' : 'Mid / Senior Engineer',
    explanation: '6+ years professional experience including founder, CEO, and tech lead roles managing up to 15 engineers concurrently.',
    score: seniorityScore,
  };

  // 6. Domain Alignment
  const detectedDomains: string[] = [];
  if (/energy|oil|gas|exploration|subsurface/i.test(normalizedText)) detectedDomains.push('Energy & Oil/Gas');
  if (/telecom|network|telecommunications/i.test(normalizedText)) detectedDomains.push('Telecom');
  if (/banking|fintech|financial|payment/i.test(normalizedText)) detectedDomains.push('Banking / Fintech');
  if (/municipal|government|public sector|civic/i.test(normalizedText)) detectedDomains.push('Public Sector / GovTech');
  if (/humanitarian|ngo|aid|development/i.test(normalizedText)) detectedDomains.push('Humanitarian / International Dev');

  const domainScore = detectedDomains.length > 0 ? 94 : 85;
  const domainAlignment = {
    domains: detectedDomains.length > 0 ? detectedDomains : ['Enterprise SaaS', 'Distributed Web Platforms'],
    explanation: detectedDomains.length > 0 
      ? `Direct domain experience proven across ${detectedDomains.join(', ')}.`
      : 'Broad enterprise and distributed systems engineering foundation.',
    score: domainScore,
  };

  // 7. Timezone & Remote Compatibility
  const isRemoteMentioned = /remote|distributed|anywhere|emea|europe|uk|us/i.test(normalizedText);
  const timezoneAndRemoteCompatibility = {
    isEligible: true,
    overlapHours: 7,
    summary: 'Full remote readiness with 8+ hours overlap with CET/London and 5+ hours overlap with US East Coast (EST).',
  };

  // 8. Determine Recommended Role Lens and Résumé
  let bestLens = allRoleLenses[0];
  let maxLensMatches = -1;
  for (const lens of allRoleLenses) {
    const matchCount = lens.highlightedSkillIds.filter(id => identifiedSkillIds.has(id)).length;
    if (matchCount > maxLensMatches) {
      maxLensMatches = matchCount;
      bestLens = lens;
    }
  }

  // 9. Compute Overall Score (0-100)
  const totalIdentified = Math.max(identifiedSkillIds.size, 1);
  const verifiedCount = matchedVerifiedSkills.length;
  const partialCount = partiallySupportedSkills.length;

  const skillScore = Math.min(((verifiedCount * 1.0 + partialCount * 0.5) / totalIdentified) * 100, 100);
  const overallScore = Math.min(Math.round((skillScore * 0.5) + (seniorityScore * 0.25) + (domainScore * 0.25)), 98);
  const confidenceScore = verifiedCount >= 3 ? 92 : 82;

  // 10. Generate Interview Prep Topics & Honest Risks
  const interviewTopics = [
    'Subsurface AI and multi-source spatial data engineering (GeoFusion AI architecture)',
    'Scalable PostgreSQL schema modeling and double-entry ledger design (Omega ERP)',
    'Engineering leadership, sprint velocity, and mentoring 15-person distributed teams',
    'Enterprise IT infrastructure, Hyper-V failover, and Active Directory security',
    'International development cooperation, municipal digitization, and capacity building',
  ];

  const honestGapsAndRisks: string[] = [];
  if (missingSkills.length > 0) {
    honestGapsAndRisks.push(`Specific tooling gap on ${missingSkills.map(m => m.name).join(', ')}, though bridged by strong fundamentals in Docker and Python/TypeScript.`);
  }
  if (!detectedDomains.length) {
    honestGapsAndRisks.push('Standard onboarding needed for custom proprietary domain rules.');
  }

  return {
    overallScore: Math.max(overallScore, 65),
    confidenceScore,
    requiredSkillsIdentified: Array.from(identifiedSkillNames),
    matchedVerifiedSkills,
    partiallySupportedSkills,
    missingSkills,
    relevantProjects,
    relevantAchievements,
    seniorityAlignment,
    domainAlignment,
    timezoneAndRemoteCompatibility,
    recommendedResumeSlug: bestLens.recommendedResumeSlug || 'resume-ai-ml',
    interviewTopics,
    honestGapsAndRisks,
  };
}
