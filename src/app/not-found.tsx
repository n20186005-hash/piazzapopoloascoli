import type {Metadata} from 'next';
export const metadata: Metadata = {title:'Page not found',robots:{index:false,follow:false}};
export default function NotFound(){return <main className="px-6 pt-28 pb-20"><h1>Page not found</h1><a href="/en">Piazza del Popolo guide</a></main>;}
