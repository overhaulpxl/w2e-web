'use client';

import { useEffect, useState } from 'react';

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop"
];

export default function CommunityGallery() {
  const [galleryImages, setGalleryImages] = useState<string[]>(DEFAULT_IMAGES);

  useEffect(() => {
    fetch('/api/content/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryImages(data.map((item: any) => item.value));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="moments" className="section" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Epic <span className="font-serif text-accent">Moments</span>
          </h2>
          <p className="animate-on-scroll stagger-1" style={{ color: 'var(--text-secondary)' }}>Screenshots of our intense mabar sessions.</p>
        </div>

        <div className="animate-on-scroll stagger-2" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {galleryImages.map((src, idx) => (
            <div key={idx} style={{
              background: 'var(--surface-color)',
              height: '250px',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              position: 'relative',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.03) translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
              (e.currentTarget.children[0] as HTMLElement).style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              (e.currentTarget.children[0] as HTMLElement).style.transform = 'scale(1)';
            }}>
              <img src={src} alt={`Moment ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              
              {/* Optional Dark Overlay on hover, or subtle gradient */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)',
                pointerEvents: 'none'
              }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
