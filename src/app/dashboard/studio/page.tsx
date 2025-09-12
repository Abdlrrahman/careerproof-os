'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { ApplicationStudio } from '@/components/dashboard/ApplicationStudio';
import { Locale } from '@/types';

export default function StudioPage() {
  const locale: Locale = 'en';
  const opportunities = db.getOpportunities();

  return (
    <div className="space-y-6">
      <ApplicationStudio opportunities={opportunities} locale={locale} />
    </div>
  );
}
