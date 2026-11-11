import {MetadataRoute} from 'next';
import {locales} from '@/i18n/config';
import {nearbySlugs} from '@/data/nearby';
export default function sitemap(): MetadataRoute.Sitemap {
 const base='https://www.piazzapopoloascoli.com';
 const existing=['', '/getting-here', '/walking-route', '/buildings-and-opening', '/privacy-policy', '/terms-of-service', '/cookie-settings'];
 return [...existing.flatMap(path=>locales.map(locale=>({url:`${base}/${locale}${path}`,alternates:{languages:Object.fromEntries(locales.map(l=>[l==='zh-hant'?'zh-Hant':l,`${base}/${l}${path}`]))}}))),...['/nearby',...nearbySlugs.map(slug=>`/nearby/${slug}`)].map(path=>({url:`${base}/it${path}`}))];
}
