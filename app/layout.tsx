import type { Metadata } from 'next';
import './globals.css';
import seo from '@/content/seo.json';

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: seo.brandName,
    locale: 'sk_SK',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
