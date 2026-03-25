'use client';
import { useTranslations } from 'next-intl';

export default function TermsOfServicePage() {
  const t = useTranslations('terms');
  return (
    <div className="section-spacing">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>{t('title')}</h1>
        <div className="prose" style={{ color: 'var(--text-secondary)' }}>
          <p className="leading-relaxed whitespace-pre-line">{t('content')}</p>
        </div>
      </div>
    </div>
  );
}
