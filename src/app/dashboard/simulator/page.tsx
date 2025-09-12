'use client';

import React from 'react';
import { InterviewSimulator } from '@/components/dashboard/InterviewSimulator';
import { Locale } from '@/types';

export default function SimulatorDashboardPage() {
  const locale: Locale = 'en';
  return (
    <div className="space-y-6">
      <InterviewSimulator locale={locale} />
    </div>
  );
}
