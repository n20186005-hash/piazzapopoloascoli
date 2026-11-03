import Link from 'next/link';
import {getTranslations} from 'next-intl/server';
export const slugs = ['getting-here', 'walking-route', 'buildings-and-opening'];
export default async function ArticleLinks({locale}: {locale: string}) {
  const t = await getTranslations({locale, namespace: 'articles'});
  return <section className="section-spacing"><div className="max-w-6xl mx-auto px-6"><h2 className="text-3xl font-bold mb-6">{t('title')}</h2><div className="grid md:grid-cols-3 gap-6">{slugs.map(slug => <Link className="p-6 rounded-xl border hover:underline" key={slug} href={`/${locale}/${slug}`}>{t(`pages.${slug}.title`)} →</Link>)}</div></div></section>;
}
