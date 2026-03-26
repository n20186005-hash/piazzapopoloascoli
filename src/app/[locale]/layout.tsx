import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages();
  const meta = (messages as Record<string, Record<string, string>>).meta;

  const baseUrl = 'https://www.piazzapopoloascoli.com';
  
  // Base alternate languages for the home page (or base path)
  const alternateLanguages: Record<string, string> = {
    'it': `${baseUrl}/it`,
    'en': `${baseUrl}/en`,
    'fr': `${baseUrl}/fr`,
    'zh-Hant': `${baseUrl}/zh-hant`,
    'x-default': `${baseUrl}/en`,
  };

  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    title: meta?.title || 'Piazza del Popolo, Ascoli Piceno',
    description: meta?.description || 'Guida turistica indipendente',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === 'zh-hant' ? 'zh-Hant' : locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
