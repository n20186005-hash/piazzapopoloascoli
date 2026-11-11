import Link from 'next/link';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {nearbyPlaces, nearbySlugs} from '@/data/nearby';
import {locales} from '@/i18n/config';

const root='https://www.piazzapopoloascoli.com';
const official='https://visitascoli.it/';
export function generateStaticParams(){return locales.flatMap(locale=>nearbySlugs.map(slug=>({locale,slug})));}
export async function generateMetadata({params}:{params:Promise<{locale:string,slug:string}>}){
 const {locale,slug}=await params;const place=nearbyPlaces.find(p=>p.slug===slug);if(!place)notFound();
 return {title:`${place.name} | Vicino a Piazza del Popolo, Ascoli Piceno`,description:`${place.lead} Informazioni per la visita, itinerario e trasporti ad Ascoli Piceno.`,alternates:{canonical:`${root}/it/nearby/${slug}`},robots:locale==='it'?undefined:{index:false,follow:true}};
}
function Section({title,children}:{title:string,children:React.ReactNode}){return <section className="mb-10"><h2 className="text-2xl font-semibold mb-3">{title}</h2><div className="leading-8" style={{color:'var(--text-secondary)'}}>{children}</div></section>;}
export default async function NearbyDetail({params}:{params:Promise<{locale:string,slug:string}>}){
 const {locale,slug}=await params;setRequestLocale(locale);const place=nearbyPlaces.find(p=>p.slug===slug);if(!place)notFound();
 const maps=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, Ascoli Piceno, Italy`)}`;
 const other=nearbyPlaces.filter(p=>p.slug!==slug).slice(0,4);
 return <><article className="max-w-5xl mx-auto px-6 pt-28 pb-12">
  <nav className="text-sm mb-10"><Link href={`/${locale}`} className="underline">Piazza del Popolo</Link> / <Link href={`/${locale}/nearby`} className="underline">Luoghi vicini</Link> / {place.name}</nav>
  <header className="rounded-3xl p-7 md:p-12 mb-12" style={{background:'var(--bg-secondary)'}}>
   <p className="text-sm uppercase tracking-widest mb-3" style={{color:'var(--text-secondary)'}}>{place.kind} · {place.area}</p>
   <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{place.name}</h1><p className="text-xl mb-6">{place.lead}</p>
   <div className="flex flex-wrap gap-3 text-sm"><span className="rounded-full border px-4 py-2">Visita suggerita: {place.minutes}</span><span className="rounded-full border px-4 py-2">Orari: da verificare</span><a className="rounded-full border px-4 py-2 underline" href={maps} target="_blank" rel="noopener noreferrer">Posizione su Google Maps ↗</a></div>
  </header>
  <div className="max-w-3xl mx-auto">
   <Section title={`Scopri ${place.name}`}>{place.lead} {place.experience}</Section>
   <Section title="Consigli per la visita">{place.visit} Tempo indicativo da dedicare alla tappa: {place.minutes}. I tempi sono orientativi e non comprendono code o eventi.</Section>
   <Section title="Punti di interesse e caratteristiche">{place.architecture}</Section>
   <Section title="Informazioni essenziali"><dl className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><dt className="font-semibold">Località</dt><dd>{place.area}, Ascoli Piceno, Marche, Italia</dd></div><div><dt className="font-semibold">Tipologia</dt><dd>{place.kind}</dd></div><div><dt className="font-semibold">Durata consigliata</dt><dd>{place.minutes}</dd></div><div><dt className="font-semibold">Punto di partenza</dt><dd>Piazza del Popolo</dd></div></dl></Section>
   <Section title="Orari di apertura">Per spazi esterni e monumenti osservabili dalla strada, la visita dipende dall’accessibilità pubblica e da eventuali lavori. Gli interni, le funzioni, le mostre e i musei seguono calendari propri: consulta i canali del gestore prima di partire.</Section>
   <Section title="Biglietti e prezzi">L’osservazione delle facciate e degli spazi pubblici non equivale all’ingresso in musei, sale o aree riservate. Eventuali tariffe, prenotazioni e gratuità devono essere verificate direttamente per la data di visita.</Section>
   <Section title="Come arrivare">{place.access} A piedi da Piazza del Popolo segui la segnaletica del centro storico; per spostamenti più lunghi verifica l’itinerario e le condizioni di accessibilità sulla mappa. <a href={maps} className="underline" target="_blank" rel="noopener noreferrer">Apri l’itinerario su Google Maps</a>.</Section>
   <Section title="Storia e cultura">{place.history}</Section>
   <Section title="Architettura e atmosfera">{place.architecture} {place.experience}</Section>
   <Section title="Itinerario a piedi"><ol className="list-decimal pl-6 space-y-2"><li>Raggiungi Piazza del Popolo e orientati tra il Palazzo dei Capitani e i portici.</li><li>{place.route}</li><li>Continua verso una tappa vicina oppure rientra nella piazza per una pausa.</li></ol></Section>
   <Section title="Da sapere prima di partire">{place.visit} Indossa scarpe comode per la pavimentazione storica e verifica meteo, lavori e possibili limitazioni di accesso. Nelle chiese rispetta il culto; nei musei segui le indicazioni del personale.</Section>
   <Section title="Dove fotografare">{place.photo} Evita di bloccare ingressi e passaggi pedonali.</Section>
   <Section title="Dove soggiornare">Il centro storico di Ascoli Piceno è una base pratica per visitare a piedi le piazze principali. Se arrivi in auto, controlla prima zone a traffico limitato e disponibilità di parcheggio presso l’alloggio.</Section>
   <Section title="Esperienza dei visitatori">Questa guida non attribuisce al singolo monumento un punteggio o recensioni non verificati. Per opinioni aggiornate consulta le schede del luogo sulle mappe e considera separatamente recensioni dei musei e valutazioni della piazza.</Section>
   <Section title="Indirizzo e navigazione"><p>{place.name}, {place.area}, Ascoli Piceno, Italia.</p><p className="mt-3"><a href={maps} target="_blank" rel="noopener noreferrer" className="underline">Vedi posizione e percorso su Google Maps ↗</a></p></Section>
   <Section title="Approfondimenti e fonti"><ul className="list-disc pl-6"><li><a className="underline" href={official} target="_blank" rel="noopener noreferrer">Visit Ascoli — portale turistico cittadino</a></li><li><a className="underline" href="https://www.comune.ap.it/" target="_blank" rel="noopener noreferrer">Comune di Ascoli Piceno</a></li></ul></Section>
  </div>
 </article><section className="max-w-6xl mx-auto px-6 pb-20"><h2 className="text-3xl font-semibold mb-6">Altre tappe nelle vicinanze</h2><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{other.map(p=><Link key={p.slug} href={`/${locale}/nearby/${p.slug}`} className="p-5 rounded-xl border hover:underline" style={{borderColor:'var(--border-color)'}}>{p.name} →</Link>)}</div><Link className="block mt-7 underline" href={`/${locale}/nearby`}>Tutti i luoghi nei dintorni →</Link></section></>;
}
