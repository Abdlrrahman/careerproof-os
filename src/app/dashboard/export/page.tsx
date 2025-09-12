'use client';

import React from 'react';
import { DataExportSuite } from '@/components/dashboard/DataExportSuite';
import { Locale } from '@/types';

export default function ExportDashboardPage() {
  const locale: Locale = 'en';
  return (
    <div className="space-y-6">
      <DataExportSuite locale={locale} />
    </div>
  );
}
