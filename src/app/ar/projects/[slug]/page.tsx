import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CaseStudyViewer } from '@/components/projects/CaseStudyViewer';
import { Locale } from '@/types';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = db.getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ArabicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = db.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const caseStudy = db.getCaseStudy(project.id);
  const locale: Locale = 'ar';

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CaseStudyViewer project={project} caseStudy={caseStudy} locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
