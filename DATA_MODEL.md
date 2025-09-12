# Database Model & Schema Specification — CareerProof OS

## 1. Schema Overview

```
+----------------+       +-------------------+       +--------------------+
|    profiles    |----<  |    experiences    |       |   skill_categories |
+----------------+       +-------------------+       +--------------------+
        |                          |                           |
        |----< educations          |                           | 1
        |                          |                           v n
        |----< credentials         |                   +--------------------+
        |                          +-----------------> |       skills       |
        |----< achievements                            +--------------------+
        |                                                      |
        |----< projects >-----------------------------+        | 1
                    |                                 |        v n
                    v 1                               | +--------------------+
              case_studies                            +>|   skill_evidence   |
                                                        +--------------------+
                                                               | n
                                                               v 1
                                                        +--------------------+
                                                        |   evidence_items   |
                                                        +--------------------+
```

---

## 2. Table Definitions

### 2.1 Profiles (`profiles`)
- `id`: string (UUID)
- `fullName`: string ("Abdlrrahman Shibani")
- `legalName`: string ("Abdlrrahman Ali Altahir Shibani")
- `primaryTitle`: string ("Founder & Engineering Lead | Software, AI and Digital Transformation")
- `headline`: string
- `bioShort`: string
- `bioLong`: string
- `location`: string ("Tripoli, Libya / Doha, Qatar")
- `workPreference`: string ("Remote and internationally distributed work")
- `languages`: Array<{ language: string; proficiency: string }>
- `email`: string
- `linkedinUrl`: string
- `githubUrl`: string
- `calendlyUrl`: string
- `isPublished`: boolean

### 2.2 Role Lenses (`role_lenses`)
- `id`: string ("ai-ml-engineer", "fullstack-engineer", "backend-engineer", "technical-lead", "engineering-manager", "digital-transformation-lead", "technical-product-manager", "ict-systems-manager", "humanitarian-tech", "technology-consultant")
- `titleEn`: string, `titleAr`: string
- `summaryEn`: string, `summaryAr`: string
- `highlightedSkillIds`: string[]
- `highlightedProjectIds`: string[]
- `orderIndex`: number

### 2.3 Skills (`skills`) & Evidence (`evidence_items`, `skill_evidence`)
- `skills`: `id`, `categoryId`, `nameEn`, `nameAr`, `calculatedLevel` ('familiar' | 'applied' | 'proven' | 'advanced' | 'leadership'), `calculatedScore`, `yearsExperience`, `lastUsedYear`, `isVerified`, `verificationRationale`, `isPublished`
- `evidence_items`: `id`, `title`, `type` ('project' | 'production_system' | 'github_repo' | 'role' | 'achievement' | 'credential' | 'case_study' | 'recommendation' | 'publication'), `url`, `description`, `verificationStatus` ('verified' | 'verification_required' | 'self_reported' | 'concept'), `issuerOrOrg`, `evidenceDate`
- `skill_evidence`: `skillId`, `evidenceId`, `weight` (0.0 to 1.0), `notes`

### 2.4 Projects & Case Studies (`projects`, `case_studies`)
- `projects`: `id`, `titleEn`, `titleAr`, `slug`, `summaryEn`, `summaryAr`, `status` ('completed' | 'in_production' | 'in_development' | 'concept'), `confidentiality` ('public' | 'sanitized_metrics' | 'confidential'), `clientOrOrg`, `roleTitle`, `teamSize`, `startDate`, `endDate`, `demoUrl`, `repoUrl`, `isFeatured`, `isPublished`
- `case_studies`: `projectId`, `problemStatement`, `contextAndConstraints`, `architecturalDecisions`, `techStack`, `securityConsiderations`, `measurableResults`, `lessonsLearned`, `recruiterSummary`, `technicalDeepDive`

### 2.5 Private Command Center Tables
- `job_opportunities`: `id`, `title`, `companyName`, `location`, `workplaceType`, `salaryMin`, `salaryMax`, `currency`, `rawDescription`, `sourceUrl`, `sourcePlatform`, `matchScore`, `pipelineStage`, `appliedAt`, `followUpDate`, `notes`
- `applications`: `id`, `jobId`, `status`, `targetRoleLens`, `createdAt`, `updatedAt`
- `generated_documents`: `id`, `applicationId`, `docType` ('resume_ats' | 'resume_visual' | 'cover_letter' | 'linkedin_outreach' | 'recruiter_email' | 'interview_brief'), `contentMarkdown`, `isReviewedByOwner`, `unsupportedClaimsWarning`
- `interviews`: `id`, `applicationId`, `stage`, `scheduledAt`, `interviewerNames`, `questionsExpected`, `notes`, `status`
- `audit_logs`: `id`, `action`, `entityType`, `entityId`, `performedAt`, `metadata`
