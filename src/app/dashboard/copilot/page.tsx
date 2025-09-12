'use client';

import React from 'react';
import { LiveInterviewCopilot } from '@/components/dashboard/LiveInterviewCopilot';
import { Locale } from '@/types';

export default function CopilotDashboardPage() {
  const locale: Locale = 'en';
  return (
    <div className="space-y-6">
      <LiveInterviewCopilot locale={locale} />
    </div>
  );
}
