import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CareerProof OS — Abdlrrahman Shibani',
    short_name: 'CareerProof',
    description: 'Evidence-driven, bilingual career operating system for AI engineering, backend architectures, technical leadership, and digital transformation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090D16',
    theme_color: '#090D16',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
