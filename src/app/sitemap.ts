import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.piazzapopoloascoli.com';

  // Core routes
  const routes = [
    '',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the base url (redirects to default locale or auto-detects)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  });

  // Generate sitemap entries for all locales and routes
  routes.forEach((route) => {
    locales.forEach((locale) => {
      // Prioritize home pages
      const priority = route === '' ? 1 : 0.8;
      
      // Determine frequency
      const changeFrequency = route === '' ? 'weekly' : 'monthly';
      
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    });
  });

  return sitemapEntries;
}