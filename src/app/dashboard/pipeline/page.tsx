'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { PipelineBoard } from '@/components/dashboard/PipelineBoard';
import { OpportunityModal } from '@/components/dashboard/OpportunityModal';
import { Locale } from '@/types';

export default function PipelinePage() {
  const locale: Locale = 'en';
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const opportunities = db.getOpportunities();

  return (
    <div className="space-y-6">
      <PipelineBoard
        opportunities={opportunities}
        onOpportunityUpdated={() => setRefreshKey(k => k + 1)}
        onOpenAddModal={() => setIsAddOpen(true)}
        locale={locale}
      />

      <OpportunityModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onOpportunityCreated={() => setRefreshKey(k => k + 1)}
        locale={locale}
      />
    </div>
  );
}
