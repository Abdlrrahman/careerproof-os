import { describe, it, expect } from 'vitest';
import { analyzeJobDescription } from './job-matcher';
import { 
  initialSkills, 
  initialProjects, 
  initialAchievements, 
  initialRoleLenses 
} from '@/data/seed-data';

describe('Job-Fit Matcher & Analyzer', () => {
  it('should identify Python, FastAPI, and PostgreSQL in a senior AI/backend JD', () => {
    const jd = `
      We need a Senior AI / Backend Engineer with strong expertise in Python, FastAPI,
      PostgreSQL database optimization, and Machine Learning pipelines.
    `;

    const result = analyzeJobDescription(
      jd,
      initialSkills,
      initialProjects,
      initialAchievements,
      initialRoleLenses
    );

    expect(result.overallScore).toBeGreaterThan(80);
    expect(result.matchedVerifiedSkills.some(s => s.skillId === 'python')).toBe(true);
    expect(result.matchedVerifiedSkills.some(s => s.skillId === 'fastapi')).toBe(true);
    expect(result.matchedVerifiedSkills.some(s => s.skillId === 'postgresql')).toBe(true);
  });

  it('should flag missing keywords like Kubernetes or Rust with suggested alternatives', () => {
    const jd = `
      Looking for a Rust and Kubernetes specialist to build edge services.
    `;

    const result = analyzeJobDescription(
      jd,
      initialSkills,
      initialProjects,
      initialAchievements,
      initialRoleLenses
    );

    expect(result.missingSkills.some(m => m.name.includes('Kubernetes'))).toBe(true);
    expect(result.missingSkills.some(m => m.name.includes('Rust'))).toBe(true);
  });

  it('should link relevant case studies like GeoFusion AI when geospatial/AI terms match', () => {
    const jd = `
      Lead geospatial AI systems using PostGIS, GeoBERT, and seismic exploration algorithms.
    `;

    const result = analyzeJobDescription(
      jd,
      initialSkills,
      initialProjects,
      initialAchievements,
      initialRoleLenses
    );

    expect(result.relevantProjects.some(p => p.projectId === 'geofusion-ai')).toBe(true);
  });
});
