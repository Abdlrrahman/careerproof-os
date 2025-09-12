'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { CompanyProspector } from '@/components/dashboard/CompanyProspector';
import { Locale } from '@/types';

export default function ProspectorPage() {
  const locale: Locale = 'en';
  const prospects = db.getCompanyProspects();

  return (
    <div className="space-y-6">
      <CompanyProspector prospects={prospects} locale={locale} />
    </div>
  );
}
