'use client';

import React from 'react';
import { SalaryCalculator } from '@/components/dashboard/SalaryCalculator';
import { Locale } from '@/types';

export default function CompensationDashboardPage() {
  const locale: Locale = 'en';
  return (
    <div className="space-y-6">
      <SalaryCalculator locale={locale} />
    </div>
  );
}
