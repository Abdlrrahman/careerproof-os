'use client';

import React from 'react';
import { BatchJobMatcher } from '@/components/dashboard/BatchJobMatcher';
import { Locale } from '@/types';

export default function MatcherDashboardPage() {
  const locale: Locale = 'en';
  return (
    <div className="space-y-6">
      <BatchJobMatcher locale={locale} />
    </div>
  );
}
