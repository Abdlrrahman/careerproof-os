import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090D16',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://careerproof.abdlrrahman.dev'),
  title: 'CareerProof OS — Abdlrrahman Shibani | Founder & Engineering Lead',
  description: 'Evidence-driven, bilingual career operating system for AI engineering, full-stack architectures, technical leadership, and digital transformation.',
  keywords: [
    'Abdlrrahman Shibani',
    'AI Engineer',
    'Machine Learning',
    'Tech Lead',
    'Full Stack Engineer',
    'FastAPI',
    'Python',
    'TypeScript',
    'Digital Transformation',
    'GeoFusion AI',
    'Omega ERP',
    'PostGIS',
    'pgvector'
  ],
  authors: [{ name: 'Abdlrrahman Shibani' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'CareerProof OS — Abdlrrahman Shibani',
    description: 'Evidence-driven career operating system with 10 role lenses, interactive Proof Graph, and verified impact.',
    url: 'https://careerproof.abdlrrahman.dev',
    siteName: 'CareerProof OS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerProof OS — Abdlrrahman Shibani',
    description: 'Evidence-driven career operating system for AI engineering and technical leadership.',
    creator: '@abdlrrahman_dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAFB] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
