'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { OnboardingPlanner } from '@/components/dashboard/OnboardingPlanner';
import { Locale } from '@/types';

export default function OnboardingPage() {
  const locale: Locale = 'en';
  const roadmaps = db.getOnboardingRoadmaps();

  return (
    <div className="space-y-6">
      <OnboardingPlanner roadmaps={roadmaps} locale={locale} />
    </div>
  );
}
