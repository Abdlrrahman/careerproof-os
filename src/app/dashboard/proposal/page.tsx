'use client';

import React from 'react';
import { ContractProposalStudio } from '@/components/dashboard/ContractProposalStudio';
import { db } from '@/lib/db/data-store';
import { Locale } from '@/types';

export default function ProposalDashboardPage() {
  const locale: Locale = 'en';
  const opportunities = db.getOpportunities();

  return (
    <div className="space-y-6">
      <ContractProposalStudio opportunities={opportunities} locale={locale} />
    </div>
  );
}
