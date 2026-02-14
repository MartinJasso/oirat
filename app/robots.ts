import type { MetadataRoute } from 'next';
import seo from '@/content/seo.json';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dakujem']
      }
    ],
    sitemap: `${seo.siteUrl}/sitemap.xml`
  };
}
