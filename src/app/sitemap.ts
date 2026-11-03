import {MetadataRoute} from 'next';
import {locales} from '@/i18n/config';
export default function sitemap(): MetadataRoute.Sitemap {
 const base='https://www.piazzapopoloascoli.com';
 return ['', '/getting-here', '/walking-route', '/buildings-and-opening', '/privacy-policy', '/terms-of-service', '/cookie-settings'].flatMap(path=>locales.map(locale=>({url:`${base}/${locale}${path}`,alternates:{languages:Object.fromEntries(locales.map(l=>[l==='zh-hant'?'zh-Hant':l,`${base}/${l}${path}`]))}})));
}
