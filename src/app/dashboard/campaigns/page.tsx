'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { DripCampaignStudio } from '@/components/dashboard/DripCampaignStudio';
import { Locale } from '@/types';

export default function CampaignsPage() {
  const locale: Locale = 'en';
  const campaigns = db.getDripCampaigns();

  return (
    <div className="space-y-6">
      <DripCampaignStudio campaigns={campaigns} locale={locale} />
    </div>
  );
}
