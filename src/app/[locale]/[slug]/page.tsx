import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import ArticleLinks, {slugs} from '@/components/ArticleLinks';
import {locales} from '@/i18n/config';
const base = 'https://www.piazzapopoloascoli.com';
export function generateStaticParams() {return locales.flatMap(locale => slugs.map(slug => ({locale, slug})));}
export async function generateMetadata({params}: {params: Promise<{locale:string,slug:string}>}) {
 const {locale,slug}=await params; if(!slugs.includes(slug)) notFound();
 const t=await getTranslations({locale,namespace:'articles'});
 return {title:`${t(`pages.${slug}.title`)} | Ascoli Piceno`,description:t(`pages.${slug}.sections.0.1`),alternates:{canonical:`${base}/${locale}/${slug}`,languages:Object.fromEntries([...locales.map(l=>[l==='zh-hant'?'zh-Hant':l,`${base}/${l}/${slug}`]),['x-default',`${base}/en/${slug}`]])}};
}
const sources = [
 ['Comune di Ascoli Piceno — storia','https://www.comune.ap.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/177/UT/systemPrint'],
 ['Comune — aree pedonali','https://www.comune.ap.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11672'],
 ['Italia.it — itinerario Ascoli','https://www.italia.it/it/marche/cosa-fare/itinerario-da-ascoli-al-mare'],
 ['Ricostruzione — Palazzo dei Capitani, 24/07/2026','https://sisma2016.gov.it/2026/07/24/ascoli-lavori-su-palazzo-dei-capitani-dallusr-383-000-euro/']
];
export default async function Page({params}:{params:Promise<{locale:string,slug:string}>}) {
 const {locale,slug}=await params;if(!slugs.includes(slug))notFound();setRequestLocale(locale);
 const t=await getTranslations({locale,namespace:'articles'});const sections=t.raw(`pages.${slug}.sections`) as string[][];
 return <><article className="max-w-3xl mx-auto px-6 pt-28 pb-12"><Link className="underline" href={`/${locale}`}>{t('back')}</Link><h1 className="text-4xl font-bold my-8">{t(`pages.${slug}.title`)}</h1>{sections.map(([heading,text])=><section className="mb-8" key={heading}><h2 className="text-2xl font-semibold mb-3">{heading}</h2><p className="leading-relaxed">{text}</p></section>)}<aside className="border-t pt-6"><p className="font-semibold mb-3">{t('checked')}</p><ul className="space-y-2">{sources.filter((_,i)=>slug==='getting-here'?i===1:slug==='walking-route'?i===0||i===2:i===0||i===3).map(([label,url])=><li key={url}><a className="underline" href={url}>{label}</a></li>)}</ul></aside></article><ArticleLinks locale={locale}/></>;
}
