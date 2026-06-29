import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Guide from '@/components/Guide';
import MapEmbed from '@/components/MapEmbed';
import Sources from '@/components/Sources';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Intro />
      <Gallery />
      <Reviews />
      <Guide />
      <MapEmbed />
      <Sources />
    </>
  );
}
