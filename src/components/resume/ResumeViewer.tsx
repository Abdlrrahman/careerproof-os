'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Printer, 
  Download, 
  FileCode, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  Calendar, 
  ExternalLink,
  MapPin,
  Mail
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/icons/SocialIcons';
import { 
  Profile, 
  RoleLens, 
  Experience, 
  Education, 
  Credential, 
  Skill, 
  Project, 
  MeasurableAchievement, 
  Locale 
} from '@/types';
import { getDictionary } from '@/lib/i18n/translations';

interface ResumeViewerProps {
  profile: Profile;
  roleLens: RoleLens;
  allRoleLenses: RoleLens[];
  experiences: Experience[];
  education: Education[];
  credentials: Credential[];
  skills: Skill[];
  projects: Project[];
  achievements: MeasurableAchievement[];
  locale: Locale;
  onLensChange?: (lensId: string) => void;
}

type ResumeFormat = 'visual' | 'ats' | 'json';

export function ResumeViewer({
  profile,
  roleLens,
  allRoleLenses,
  experiences,
  education,
  credentials,
  skills,
  projects,
  achievements,
  locale,
  onLensChange,
}: ResumeViewerProps) {
  const t = getDictionary(locale);
  const [format, setFormat] = useState<ResumeFormat>('visual');

  // Filter skills and projects relevant to the current role lens
  const highlightedSkills = skills.filter(s => roleLens.highlightedSkillIds.includes(s.id));
  const otherSkills = skills.filter(s => !roleLens.highlightedSkillIds.includes(s.id)).slice(0, 10);
  const highlightedProjects = projects.filter(p => roleLens.highlightedProjectIds.includes(p.id));

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const jsonResume = {
      basics: {
        name: profile.fullName,
        label: roleLens.titleEn,
        email: profile.email,
        summary: roleLens.summaryEn,
        location: {
          city: 'Tripoli / Doha',
          countryCode: 'LY/QA',
        },
        profiles: [
          { network: 'LinkedIn', url: profile.linkedinUrl },
          { network: 'GitHub', url: profile.githubUrl },
        ],
      },
      work: experiences.map(e => ({
        name: e.companyNameEn,
        position: e.roleTitleEn,
        startDate: e.startDate,
        endDate: e.endDate || 'Present',
        summary: e.summaryEn,
        highlights: e.responsibilitiesEn,
      })),
      education: education.map(edu => ({
        institution: edu.institutionEn,
        area: edu.fieldEn,
        studyType: edu.degreeEn,
        score: edu.gpa,
      })),
      skills: skills.map(s => ({
        name: s.nameEn,
        level: s.calculatedLevel,
      })),
      projects: projects.map(p => ({
        name: p.titleEn,
        description: p.summaryEn,
        url: p.demoUrl,
      })),
    };

    const blob = new Blob([JSON.stringify(jsonResume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resume-${profile.fullName.replace(/\s+/g, '_')}-${roleLens.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Controls Toolbar (No-Print) */}
      <div className="no-print p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Role Lens Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
            {locale === 'ar' ? 'نموذج الدور:' : 'Target Role Lens:'}
          </label>
          <select
            value={roleLens.id}
            onChange={(e) => onLensChange && onLensChange(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          >
            {allRoleLenses.map(lens => (
              <option key={lens.id} value={lens.id}>
                {locale === 'ar' ? lens.titleAr : lens.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* Format Selector: Visual vs ATS vs JSON */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFormat('visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              format === 'visual'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.resume.visualVersion}</span>
          </button>
          <button
            onClick={() => setFormat('ats')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              format === 'ats'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{t.resume.atsVersion}</span>
          </button>
        </div>

        {/* Print & Export Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 btn-tactile"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm btn-tactile"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.resume.printPdf}</span>
          </button>
        </div>
      </div>

      {/* Visual Format Render */}
      {format === 'visual' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-md space-y-10">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {locale === 'ar' ? profile.fullNameAr : profile.fullName}
              </h1>
              <h2 className="text-base font-bold text-blue-600 dark:text-cyan-400">
                {locale === 'ar' ? roleLens.titleAr : roleLens.titleEn}
              </h2>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? profile.locationAr : profile.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>linkedin.com/in/abdlrrahman-shibani</span>
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Career Operating System</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Targeted Version: {roleLens.id} | Updated Aug 2026
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              {t.resume.summaryTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {locale === 'ar' ? roleLens.summaryAr : roleLens.summaryEn}
            </p>
          </div>

          {/* Highlighted Core Competencies */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              {t.resume.skillsTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {highlightedSkills.map(skill => (
                <div 
                  key={skill.id}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs flex items-center gap-1.5"
                >
                  <span className="font-bold text-blue-900 dark:text-cyan-300">
                    {locale === 'ar' ? skill.nameAr : skill.nameEn}
                  </span>
                  <span className="text-[10px] uppercase font-mono bg-blue-200/60 dark:bg-blue-900 text-blue-800 dark:text-cyan-400 px-1 rounded">
                    {skill.calculatedLevel}
                  </span>
                </div>
              ))}
              {otherSkills.map(skill => (
                <span 
                  key={skill.id}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs"
                >
                  {locale === 'ar' ? skill.nameAr : skill.nameEn}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              {t.resume.experienceTitle}
            </h3>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? exp.roleTitleAr : exp.roleTitleEn}{' '}
                      <span className="font-normal text-slate-500">
                        &bull; {locale === 'ar' ? exp.companyNameAr : exp.companyNameEn}
                      </span>
                    </h4>
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {exp.startDate.substring(0, 7)} — {exp.endDate ? exp.endDate.substring(0, 7) : 'Present'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {locale === 'ar' ? exp.summaryAr : exp.summaryEn}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-1">
                    {(locale === 'ar' ? exp.keyOutcomesAr : exp.keyOutcomesEn).map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Case Studies */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              {t.resume.projectsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlightedProjects.map(proj => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? proj.titleAr : proj.titleEn}
                    </h4>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {locale === 'ar' ? proj.summaryAr : proj.summaryEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {t.resume.educationTitle}
              </h3>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? edu.degreeAr : edu.degreeEn}
                    </div>
                    <div className="text-slate-500">
                      {locale === 'ar' ? edu.institutionAr : edu.institutionEn}
                    </div>
                    {edu.gpa && (
                      <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {edu.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {locale === 'ar' ? 'الشهادات الاحترافية' : 'Certifications'}
              </h3>
              <div className="space-y-3">
                {credentials.map(c => (
                  <div key={c.id} className="text-xs space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {locale === 'ar' ? c.titleAr : c.titleEn}
                    </div>
                    <div className="text-slate-500">
                      {locale === 'ar' ? c.issuerAr : c.issuerEn} ({c.issueDate.substring(0, 4)})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATS Single-Column Pure Machine-Readable Format */}
      {format === 'ats' && (
        <div className="bg-white text-black p-8 sm:p-12 border border-slate-300 font-sans text-xs leading-normal max-w-4xl mx-auto shadow-sm">
          <div className="text-center pb-4 border-b border-black">
            <h1 className="text-2xl font-bold uppercase tracking-wide">
              {profile.fullName}
            </h1>
            <p className="font-semibold text-sm mt-1">
              {roleLens.titleEn}
            </p>
            <p className="mt-1">
              Location: {profile.location} | Email: {profile.email} | LinkedIn: {profile.linkedinUrl} | GitHub: {profile.githubUrl}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">
              Professional Summary
            </h2>
            <p>{roleLens.summaryEn}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">
              Core Technical Competencies
            </h2>
            <p>
              <strong>Primary Skills:</strong> {skills.map(s => s.nameEn).join(', ')}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">
              Professional Experience
            </h2>
            {experiences.map(exp => (
              <div key={exp.id} className="mt-2">
                <div className="flex justify-between font-bold">
                  <span>{exp.roleTitleEn} — {exp.companyNameEn}</span>
                  <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                </div>
                <p className="italic">{exp.summaryEn}</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  {exp.keyOutcomesEn.map((out, idx) => (
                    <li key={idx}>{out}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="mt-1">
                <strong>{edu.degreeEn}</strong> — {edu.institutionEn} ({edu.startYear} - {edu.endYear || 'Present'})
                {edu.gpa && <span> | {edu.gpa}</span>}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase border-b border-black pb-0.5 mb-1">
              Certifications
            </h2>
            {credentials.map(c => (
              <div key={c.id} className="mt-0.5">
                <strong>{c.titleEn}</strong> — {c.issuerEn} ({c.issueDate}) [ID: {c.credentialId || 'Verified'}]
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
