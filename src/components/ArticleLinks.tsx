import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
export const slugs = ['getting-here', 'walking-route', 'buildings-and-opening'];
export default async function ArticleLinks({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'articles'});
  return <section className="section-spacing"><div className="max-w-6xl mx-auto px-6"><h2 className="text-3xl font-bold mb-6">{t('title')}</h2><div className="grid md:grid-cols-3 gap-6">{slugs.map(slug => <Link className="p-6 rounded-xl border hover:underline" key={slug} href={`/${locale}/${slug}`}>{t(`pages.${slug}.title`)} →</Link>)}</div><Link href={`/${locale}/nearby`} className="inline-block mt-8 rounded-xl px-6 py-4 border font-semibold hover:underline">{locale==='it'?'Scopri 30 luoghi nei dintorni':locale==='fr'?'Découvrir 30 lieux à proximité':locale==='zh-hant'?'探索周邊 30 處景點':'Explore 30 nearby attractions'} →</Link></div></section>;
}
