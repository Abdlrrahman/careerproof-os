'use client';

import React from 'react';
import { db } from '@/lib/db/data-store';
import { OfferEvaluator } from '@/components/dashboard/OfferEvaluator';
import { Locale } from '@/types';

export default function OffersPage() {
  const locale: Locale = 'en';
  const offers = db.getOffers();

  return (
    <div className="space-y-6">
      <OfferEvaluator offers={offers} locale={locale} />
    </div>
  );
}
