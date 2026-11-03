import {setRequestLocale} from 'next-intl/server';
import PrivacyInfo from '@/components/PrivacyInfo';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const baseUrl = 'https://www.piazzapopoloascoli.com';
  const path = '/privacy-policy';

  const alternateLanguages: Record<string, string> = {
    'it': `${baseUrl}/it${path}`,
    'en': `${baseUrl}/en${path}`,
    'fr': `${baseUrl}/fr${path}`,
    'zh-Hant': `${baseUrl}/zh-hant${path}`,
    'x-default': `${baseUrl}/en${path}`,
  };

  const canonicalUrl = `${baseUrl}/${locale}${path}`;

  return {
    title: ({"it": "Privacy e dati di navigazione", "en": "Privacy and browsing data", "fr": "Confidentialité et navigation", "zh-hant": "隱私與瀏覽資料"} as Record<string,string>)[locale] + ' | Piazza del Popolo',
    description: ({"it": "Privacy e dati di navigazione", "en": "Privacy and browsing data", "fr": "Confidentialité et navigation", "zh-hant": "隱私與瀏覽資料"} as Record<string,string>)[locale] + ' — Piazza del Popolo, Ascoli Piceno',
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
  };
}

export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <PrivacyInfo locale={locale}/>;}
