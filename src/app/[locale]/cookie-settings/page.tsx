import { useLocale } from 'next-intl';
import { CookieSettingsClient } from './client';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const baseUrl = 'https://www.piazzapopoloascoli.com';
  const path = '/cookie-settings';

  const alternateLanguages: Record<string, string> = {
    'it': `${baseUrl}/it${path}`,
    'en': `${baseUrl}/en${path}`,
    'fr': `${baseUrl}/fr${path}`,
    'zh-Hant': `${baseUrl}/zh-hant${path}`,
    'x-default': `${baseUrl}/en${path}`,
  };

  return {
    title: 'Cookie Settings - Piazza del Popolo',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: alternateLanguages,
    },
  };
}

export default function CookieSettingsPage() {
  const locale = useLocale();

  // Client-side component for state management
  return <CookieSettingsClient locale={locale} />;
}
