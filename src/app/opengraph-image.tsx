import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'CareerProof OS — Abdlrrahman Shibani';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #090D16 50%, #020617 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#FFFFFF',
          border: '8px solid #1E293B',
        }}
      >
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#042F2E',
              border: '2px solid #0D9488',
              borderRadius: '12px',
              padding: '8px 20px',
              color: '#2DD4BF',
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '0.05em',
            }}
          >
            CAREERPROOF OS &bull; VERIFIED EVIDENCE
          </div>
          <div
            style={{
              color: '#94A3B8',
              fontSize: 18,
              fontFamily: 'monospace',
            }}
          >
            Tripoli & Doha (UTC+2 / UTC+3)
          </div>
        </div>

        {/* Main Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            Abdlrrahman Shibani
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: '#38BDF8',
            }}
          >
            Founder & Senior Engineering Lead &bull; AI Systems & Scalable Backends
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#94A3B8',
              maxWidth: '900px',
              lineHeight: 1.5,
            }}
          >
            Bilingual, evidence-driven career operating system answering recruiter qualifications in 60 seconds with mathematical evidence scoring and interactive system blueprints.
          </div>
        </div>

        {/* Bottom Verification Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              borderRadius: '10px',
              padding: '8px 16px',
              color: '#34D399',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ✓ 40% Faster Spatial ML (GeoFusion AI)
          </div>
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid #38BDF8',
              borderRadius: '10px',
              padding: '8px 16px',
              color: '#7DD3FC',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ✓ 15-Person Squad Leadership
          </div>
          <div
            style={{
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid #A855F7',
              borderRadius: '10px',
              padding: '8px 16px',
              color: '#D8B4FE',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ✓ Zero Data Drift (Omega ERP)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
