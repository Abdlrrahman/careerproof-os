'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { PitchDeckStudio } from '@/components/dashboard/PitchDeckStudio';
import { Locale } from '@/types';

export default function PitchPage() {
  const locale: Locale = 'en';
  const slides = db.getPitchDeck();

  return (
    <div className="space-y-6">
      <PitchDeckStudio slides={slides} locale={locale} />
    </div>
  );
}
