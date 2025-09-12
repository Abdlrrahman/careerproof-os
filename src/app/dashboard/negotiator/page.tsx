'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { NegotiationPlaybook } from '@/components/dashboard/NegotiationPlaybook';
import { Locale } from '@/types';

export default function NegotiatorPage() {
  const locale: Locale = 'en';
  const scenarios = db.getNegotiationScenarios();

  return (
    <div className="space-y-6">
      <NegotiationPlaybook scenarios={scenarios} locale={locale} />
    </div>
  );
}
