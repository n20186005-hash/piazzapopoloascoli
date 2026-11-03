'use client';
import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={`/${locale}`}  className="text-lg font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Piazza del Popolo
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <a href={`/${locale}#intro`} className="hover:opacity-70 transition-opacity">{t('home')}</a>
          <a href={`/${locale}#gallery`} className="hover:opacity-70 transition-opacity">{t('gallery')}</a>
          <a href={`/${locale}#reviews`} className="hover:opacity-70 transition-opacity">{t('reviews')}</a>
          <a href={`/${locale}#guide`} className="hover:opacity-70 transition-opacity">{t('guide')}</a>
          <a href={`/${locale}#map`} className="hover:opacity-70 transition-opacity">{t('map')}</a>
        </nav>
        <div className="flex items-center gap-1">
          <button className="md:hidden px-2 py-2" aria-label={t('menu')} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
      {menuOpen && <nav id="mobile-nav" className="md:hidden grid grid-cols-2 gap-4 px-6 py-5 border-t" style={{background:'var(--bg-primary)'}}>{['intro','gallery','reviews','guide','map'].map((id,i)=><a key={id} href={`/${locale}#${id}`} onClick={()=>setMenuOpen(false)}>{t(['home','gallery','reviews','guide','map'][i])}</a>)}<a href={`/${locale}/getting-here`}>{t('guide')} →</a></nav>}
    </header>
  );
}
