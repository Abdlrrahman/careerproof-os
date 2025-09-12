import { describe, it, expect } from 'vitest';
import { calculateSkillEvidenceScore, calculateDynamicSkillMetrics } from './evidence-scoring';
import { Skill, EvidenceItem } from '@/types';

describe('Evidence-Based Skill Scoring Engine', () => {
  const mockEvidence: EvidenceItem[] = [
    {
      id: 'ev-1',
      title: 'Production Platform 1',
      type: 'production_system',
      description: 'Scaled system with 40% efficiency gains',
      verificationStatus: 'verified',
      issuerOrOrg: 'Org A',
      evidenceDate: '2026-01-01',
      complexityWeight: 5,
      impactScore: 5,
    },
    {
      id: 'ev-2',
      title: 'Open Source Repo',
      type: 'github_repo',
      description: 'Tested library',
      verificationStatus: 'verified',
      issuerOrOrg: 'Org B',
      evidenceDate: '2026-01-01',
      complexityWeight: 5,
      impactScore: 5,
    },
    {
      id: 'ev-3',
      title: 'Enterprise Architecture',
      type: 'production_system',
      description: 'Large enterprise system',
      verificationStatus: 'verified',
      issuerOrOrg: 'Org C',
      evidenceDate: '2026-01-01',
      complexityWeight: 5,
      impactScore: 5,
    },
    {
      id: 'ev-4',
      title: 'Accredited Certification',
      type: 'credential',
      description: 'Google certification',
      verificationStatus: 'verified',
      issuerOrOrg: 'Google',
      evidenceDate: '2026-01-01',
      complexityWeight: 5,
      impactScore: 5,
    },
  ];

  it('should calculate "familiar" tier when zero evidence is attached', () => {
    const unverifiedSkill: Partial<Skill> = {
      id: 'rust',
      evidenceItemIds: [],
      lastUsedYear: 2026,
    };

    const result = calculateSkillEvidenceScore(unverifiedSkill, mockEvidence);
    expect(result.level).toBe('familiar');
    expect(result.score).toBeLessThan(50);
    expect(result.evidenceCount).toBe(0);
  });

  it('should calculate "proven" tier with 2 verified items (score >= 70)', () => {
    const provenSkill: Partial<Skill> = {
      id: 'postgresql',
      evidenceItemIds: ['ev-1', 'ev-2'],
      lastUsedYear: 2026,
    };

    const result = calculateSkillEvidenceScore(provenSkill, mockEvidence);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.level).toBe('proven');
    expect(result.verifiedEvidenceCount).toBe(2);
  });

  it('should calculate "advanced" tier with 4 high-complexity verified items (score >= 85)', () => {
    const advancedSkill: Partial<Skill> = {
      id: 'python',
      evidenceItemIds: ['ev-1', 'ev-2', 'ev-3', 'ev-4'],
      lastUsedYear: 2026,
    };

    const result = calculateSkillEvidenceScore(advancedSkill, mockEvidence);
    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.level).toBe('advanced');
    expect(result.verifiedEvidenceCount).toBe(4);
  });

  it('should compute "leadership" tier when leadership responsibility is active and score >= 85', () => {
    const leadershipSkill: Partial<Skill> = {
      id: 'technical-leadership',
      evidenceItemIds: ['ev-1', 'ev-2', 'ev-3'],
      lastUsedYear: 2026,
    };

    const result = calculateSkillEvidenceScore(leadershipSkill, mockEvidence, true);
    expect(result.level).toBe('leadership');
    expect(result.leadershipBonus).toBe(15);
  });

  it('should compute dynamic skill count metrics accurately', () => {
    const sampleSkills: Skill[] = [
      {
        id: 'python',
        slug: 'python',
        categoryId: 'cat-programming',
        nameEn: 'Python',
        nameAr: 'بايثون',
        calculatedLevel: 'advanced',
        calculatedScore: 92,
        yearsExperience: 6,
        lastUsedYear: 2026,
        isVerified: true,
        verificationRationale: 'Verified',
        evidenceItemIds: ['ev-1'],
        connectedProjectIds: ['p-1'],
        connectedRoleIds: ['r-1'],
        isPublished: true,
      },
      {
        id: 'go',
        slug: 'go',
        categoryId: 'cat-programming',
        nameEn: 'Go',
        nameAr: 'جو',
        calculatedLevel: 'familiar',
        calculatedScore: 40,
        yearsExperience: 1,
        lastUsedYear: 2024,
        isVerified: false,
        verificationRationale: 'Self-reported',
        evidenceItemIds: [],
        connectedProjectIds: [],
        connectedRoleIds: [],
        isPublished: true,
      },
    ];

    const metrics = calculateDynamicSkillMetrics(sampleSkills, mockEvidence);
    expect(metrics.totalCount).toBe(2);
    expect(metrics.verifiedCount).toBe(1);
    expect(metrics.verifiedPercentage).toBe(50);
  });
});
