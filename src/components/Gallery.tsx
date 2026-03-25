'use client';
import { useTranslations } from 'next-intl';

const photos = [
  { src: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80', key: 0 },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', key: 1 },
  { src: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80', key: 2 },
  { src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80', key: 3 },
  { src: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600&q=80', key: 4 },
  { src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80', key: 5 },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const captions = t.raw('photos') as Array<{ caption: string }>;

  return (
    <section id="gallery" className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="gallery-grid">
          {photos.map((photo, i) => (
            <div
              key={photo.key}
              className="relative group overflow-hidden rounded-xl"
              style={{ aspectRatio: i === 0 ? '16/10' : '4/3' }}
            >
              <img
                src={photo.src}
                alt={captions[i]?.caption || ''}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                {captions[i]?.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
