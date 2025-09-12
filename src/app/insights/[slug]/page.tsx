import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Locale } from '@/types';
import { ArrowLeft, Clock, Calendar, BookOpen, Share2 } from 'lucide-react';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = db.getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = db.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const locale: Locale = 'en';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar locale={locale} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Technical Insights</span>
          </Link>
        </div>

        <article className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
          <header className="space-y-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <span>Published: {article.publishedDate}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTimeMinutes} min read</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {article.titleEn}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {article.subtitleEn}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-5 whitespace-pre-line font-sans">
            {article.contentMarkdownEn}
          </div>
        </article>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
