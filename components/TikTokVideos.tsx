
'use client';

import { useEffect, useState } from 'react';

export default function TikTokVideos() {
  const [videoIds, setVideoIds] = useState<string[]>([
    "7474104460344659205",
    "7533452834897956152"
  ]);

  useEffect(() => {
    fetch('/api/content/tiktok')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setVideoIds(data.map((v: any) => v.value));
        }
      })
      .catch(() => {});
  }, []);

  // Crop values to hide TikTok's top link (~36px) and bottom CTA (~80px)
  const CROP_TOP = 60;
  const CROP_BOTTOM = 130;
  const CARD_HEIGHT = 560;
  const IFRAME_HEIGHT = CARD_HEIGHT + CROP_TOP + CROP_BOTTOM;

  return (
    <section id="tiktok" className="section" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            We&apos;re Viral on <span className="font-serif" style={{ color: '#00f2fe' }}>TikTok</span>
          </h2>
          <p className="animate-on-scroll stagger-1" style={{ color: 'var(--text-secondary)' }}>Check out our most viewed content driving the community.</p>
        </div>

        <div className="animate-on-scroll stagger-2" style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          {videoIds.map((id) => (
            <div key={id} style={{
              width: '100%',
              maxWidth: '325px',
              height: `${CARD_HEIGHT}px`,
              background: '#000',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
              transition: 'transform 0.3s ease',
              position: 'relative',
            }}
            className="tiktok-card"
            >
              {/* Iframe pushed up to crop the top link banner */}
              <div style={{
                position: 'absolute',
                top: `-${CROP_TOP}px`,
                left: 0,
                right: 0,
                height: `${IFRAME_HEIGHT}px`,
              }}>
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${id}?rel=0`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="encrypted-media; autoplay"
                  title={`TikTok Video ${id}`}
                />
                {/* Overlay to block the bottom CTA "Tonton sekarang" */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${CROP_BOTTOM}px`,
                  background: '#000',
                  zIndex: 2,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .tiktok-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
}

