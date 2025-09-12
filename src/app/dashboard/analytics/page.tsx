'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { SearchAnalytics } from '@/components/dashboard/SearchAnalytics';
import { Locale } from '@/types';

export default function AnalyticsPage() {
  const locale: Locale = 'en';
  const opportunities = db.getOpportunities();

  return (
    <div className="space-y-6">
      <SearchAnalytics opportunities={opportunities} locale={locale} />
    </div>
  );
}
