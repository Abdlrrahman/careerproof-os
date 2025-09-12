import { Skill, EvidenceItem, SkillProficiencyLevel } from '@/types';

export interface ScoreBreakdown {
  score: number;
  level: SkillProficiencyLevel;
  evidenceCount: number;
  verifiedEvidenceCount: number;
  avgComplexity: number;
  avgImpact: number;
  recencyBonus: number;
  leadershipBonus: number;
  rationale: string;
  rationaleAr: string;
}

/**
 * Deterministic Evidence-Based Scoring Algorithm
 * Calculates skill proficiency without arbitrary percentages.
 */
export function calculateSkillEvidenceScore(
  skill: Partial<Skill>,
  evidenceItems: EvidenceItem[],
  isLeadershipRole: boolean = false
): ScoreBreakdown {
  const attachedEvidence = evidenceItems.filter(e => 
    skill.evidenceItemIds?.includes(e.id)
  );

  const evidenceCount = attachedEvidence.length;
  const verifiedItems = attachedEvidence.filter(e => e.verificationStatus === 'verified');
  const verifiedEvidenceCount = verifiedItems.length;

  if (evidenceCount === 0) {
    return {
      score: 35,
      level: 'familiar',
      evidenceCount: 0,
      verifiedEvidenceCount: 0,
      avgComplexity: 1,
      avgImpact: 1,
      recencyBonus: 0,
      leadershipBonus: 0,
      rationale: 'Self-reported capability with coursework or foundational practice; awaiting attached production evidence.',
      rationaleAr: 'مهارة أساسية مكتسبة عبر الدراسة أو التطبيق الذاتي؛ بانتظار إرفاق أدلة إنتاجية موثقة.',
    };
  }

  // Calculate Average Complexity (1-5) & Impact (1-5)
  const totalComplexity = attachedEvidence.reduce((acc, e) => acc + (e.complexityWeight || 3), 0);
  const totalImpact = attachedEvidence.reduce((acc, e) => acc + (e.impactScore || 3), 0);
  const avgComplexity = totalComplexity / evidenceCount;
  const avgImpact = totalImpact / evidenceCount;

  // Recency calculation (current year 2026)
  const lastUsed = skill.lastUsedYear || 2026;
  const recencyDiff = 2026 - lastUsed;
  let recencyBonus = 0;
  if (recencyDiff <= 0) recencyBonus = 10;
  else if (recencyDiff === 1) recencyBonus = 7;
  else if (recencyDiff === 2) recencyBonus = 4;

  // Verification ratio weight
  const verificationRatio = verifiedEvidenceCount / evidenceCount;
  const verificationBonus = verificationRatio * 15;

  // Base score from evidence count (capped at 30)
  const countScore = Math.min(evidenceCount * 10, 30);

  // Complexity & Impact contributions (max 30)
  const qualityScore = ((avgComplexity + avgImpact) / 10) * 30;

  // Leadership bonus (max 15)
  const leadershipBonus = isLeadershipRole ? 15 : 0;

  // Compute final score (0 - 100)
  let rawScore = countScore + qualityScore + verificationBonus + recencyBonus + leadershipBonus;
  const finalScore = Math.min(Math.max(Math.round(rawScore), 20), 100);

  // Derive transparent proficiency tier
  let level: SkillProficiencyLevel = 'familiar';
  let rationale = '';
  let rationaleAr = '';

  if (isLeadershipRole && finalScore >= 85) {
    level = 'leadership';
    rationale = `Demonstrated across ${evidenceCount} verified initiatives while directing engineering architecture, delivery, and team standards.`;
    rationaleAr = `تم إثباتها عبر ${evidenceCount} مبادرات موثقة أثناء قيادة المعمارية الهندسية، والتسليم ومعايير الفريق.`;
  } else if (finalScore >= 85) {
    level = 'advanced';
    rationale = `Extensively proven across ${evidenceCount} production implementations (${verifiedEvidenceCount} externally verified) with high complexity and measurable impact.`;
    rationaleAr = `مثبتة بعمق عبر ${evidenceCount} تطبيقات إنتاجية (${verifiedEvidenceCount} معتمدة رسمياً) ذات تعقيد عالٍ ونتائج ملموسة.`;
  } else if (finalScore >= 70) {
    level = 'proven';
    rationale = `Supported by ${evidenceCount} production deployments with verified outcomes and active use within recent projects.`;
    rationaleAr = `مدعومة بـ ${evidenceCount} تطبيقات إنتاجية مع نتائج موثقة واستخدام نشط في المشاريع الأخيرة.`;
  } else if (finalScore >= 50) {
    level = 'applied';
    rationale = `Applied in production or practical project environment with clear evidence record.`;
    rationaleAr = `مطبقة في بيئة إنتاجية أو مشروع عملي مع وجود سجل أدلة واضح.`;
  } else {
    level = 'familiar';
    rationale = `Foundational competency demonstrated in coursework or limited project scope.`;
    rationaleAr = `كفاءة تأسيسية مثبتة عبر مساقات دراسية أو نطاق مشاريع محدود.`;
  }

  return {
    score: finalScore,
    level,
    evidenceCount,
    verifiedEvidenceCount,
    avgComplexity: Number(avgComplexity.toFixed(1)),
    avgImpact: Number(avgImpact.toFixed(1)),
    recencyBonus,
    leadershipBonus,
    rationale,
    rationaleAr,
  };
}

/**
 * Calculate dynamic skill statistics for the public recruiter dashboard.
 */
export function calculateDynamicSkillMetrics(skills: Skill[], evidenceItems: EvidenceItem[]) {
  const publishedSkills = skills.filter(s => s.isPublished);
  const totalCount = publishedSkills.length;
  const verifiedCount = publishedSkills.filter(s => s.isVerified).length;
  
  const levelDistribution = {
    leadership: publishedSkills.filter(s => s.calculatedLevel === 'leadership').length,
    advanced: publishedSkills.filter(s => s.calculatedLevel === 'advanced').length,
    proven: publishedSkills.filter(s => s.calculatedLevel === 'proven').length,
    applied: publishedSkills.filter(s => s.calculatedLevel === 'applied').length,
    familiar: publishedSkills.filter(s => s.calculatedLevel === 'familiar').length,
  };

  const recentlyUsed = publishedSkills.filter(s => s.lastUsedYear >= 2025);
  const outcomeConnected = publishedSkills.filter(s => s.connectedProjectIds.length > 0 || s.evidenceItemIds.length > 0);

  return {
    totalCount,
    verifiedCount,
    verifiedPercentage: totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0,
    levelDistribution,
    recentlyUsedCount: recentlyUsed.length,
    outcomeConnectedCount: outcomeConnected.length,
    totalEvidenceCount: evidenceItems.length,
    verifiedEvidenceCount: evidenceItems.filter(e => e.verificationStatus === 'verified').length,
  };
}
