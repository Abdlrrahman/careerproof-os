'use client';

import React from 'react';
import { InterviewRoom } from '@/components/dashboard/InterviewRoom';
import { Locale } from '@/types';

export default function InterviewDashboardPage() {
  const locale: Locale = 'en';
  return (
    <div className="space-y-6">
      <InterviewRoom locale={locale} />
    </div>
  );
}
