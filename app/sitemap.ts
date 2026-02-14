import type { MetadataRoute } from 'next';
import seo from '@/content/seo.json';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${seo.siteUrl}/`, lastModified: new Date() },
    { url: `${seo.siteUrl}/privacy`, lastModified: new Date() },
    { url: `${seo.siteUrl}/terms`, lastModified: new Date() },
    { url: `${seo.siteUrl}/dakujem`, lastModified: new Date() }
  ];
}
