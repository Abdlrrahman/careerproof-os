'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { TechnicalGrader } from '@/components/dashboard/TechnicalGrader';
import { Locale } from '@/types';

export default function GraderPage() {
  const locale: Locale = 'en';
  const rubrics = db.getRubrics();

  return (
    <div className="space-y-6">
      <TechnicalGrader rubrics={rubrics} locale={locale} />
    </div>
  );
}
