import Link from 'next/link';
import {setRequestLocale} from 'next-intl/server';
import {nearbyPlaces} from '@/data/nearby';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;return {title:'Cosa vedere vicino a Piazza del Popolo | Ascoli Piceno',description:'30 luoghi storici, chiese, musei, piazze e percorsi vicino a Piazza del Popolo ad Ascoli Piceno.',alternates:{canonical:'https://www.piazzapopoloascoli.com/it/nearby'},robots:locale==='it'?undefined:{index:false,follow:true}};}
export default async function NearbyIndex({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;setRequestLocale(locale);
  return <main className="max-w-6xl mx-auto px-6 pt-28 pb-16">
    <Link href={`/${locale}`} className="underline text-sm">← Piazza del Popolo</Link>
    <p className="uppercase tracking-widest text-sm mt-10" style={{color:'var(--text-secondary)'}}>Ascoli Piceno · centro storico</p>
    <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-5">Cosa vedere vicino a Piazza del Popolo</h1>
    <p className="max-w-3xl text-lg mb-10" style={{color:'var(--text-secondary)'}}>Dai palazzi e dalle chiese affacciati sulla piazza ai musei di Piazza Arringo, fino ai ponti, alle porte e alle fortificazioni: scegli una tappa e costruisci una passeggiata nel centro di Ascoli Piceno.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{nearbyPlaces.map(place=><Link key={place.slug} href={`/${locale}/nearby/${place.slug}`} className="rounded-2xl p-6 border hover:shadow-md transition-shadow" style={{borderColor:'var(--border-color)',background:'var(--bg-card)'}}><span className="text-sm" style={{color:'var(--text-secondary)'}}>{place.kind} · {place.area}</span><h2 className="text-xl font-semibold my-3">{place.name}</h2><p className="text-sm mb-5" style={{color:'var(--text-secondary)'}}>{place.lead}</p><span className="underline text-sm">Scopri la guida →</span></Link>)}</div>
  </main>;
}
