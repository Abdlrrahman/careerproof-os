'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { CmsManager } from '@/components/dashboard/CmsManager';
import { Locale } from '@/types';

export default function CmsPage() {
  const locale: Locale = 'en';
  const [refreshKey, setRefreshKey] = useState(0);

  const profile = db.getProfile();
  const skills = db.getSkills();
  const projects = db.getProjects();
  const achievements = db.getAchievements();
  const auditLogs = db.getAuditLogs();

  return (
    <div className="space-y-6">
      <CmsManager
        profile={profile}
        skills={skills}
        projects={projects}
        achievements={achievements}
        auditLogs={auditLogs}
        onDataSaved={() => setRefreshKey(k => k + 1)}
        locale={locale}
      />
    </div>
  );
}
