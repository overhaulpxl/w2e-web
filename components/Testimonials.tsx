'use client';
import { useEffect, useState } from 'react';
import { ShoppingBag, Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const staticTestimonials = [
  {
    quote: "W2E's engagement is unmatched. During our flash sales, their announcements drove incredible traffic directly to our platforms.",
    name: "Shopee Representative",
    role: "E-commerce Partner",
    icon: ShoppingBag,
    accent: "#EE4D2D",
    bg: "linear-gradient(135deg, #EE4D2D20, transparent)"
  }
];

export default function Testimonials() {
  const [backendReviews, setBackendReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const formattedReviews = data.data.map((r: any) => ({
            quote: r.comment,
            name: r.name,
            role: "Verified Buyer",
            icon: Star,
            rating: r.rating,
            accent: "#8C52FF",
            bg: "linear-gradient(135deg, rgba(140,82,255,0.1), transparent)"
          }));
          setBackendReviews(formattedReviews);
        }
      })
      .catch(console.error);
  }, []);

  const allTestimonials = [...staticTestimonials, ...backendReviews];

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        background: 'var(--surface-color)',
        borderTop: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(140,82,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <motion.div 
        className="container" 
        style={{ position: 'relative', zIndex: 1 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} className="badge" style={{ marginBottom: '20px' }}>
            <div className="badge-dot" style={{ background: '#4DFF88' }}></div>
            Partner Reviews
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Trusted by <span className="font-serif text-accent">Partners</span>
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            Don't take our word for it — hear from the brands that have experienced W2E's reach first-hand.
          </motion.p>
        </div>

        {/* Quote grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center'
        }}>
          {allTestimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
              }}
              style={{
                width: '100%',
                maxWidth: '400px',
                background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.0) 100%)`,
                border: `1px solid rgba(255,255,255,0.05)`,
                borderRadius: '24px',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 50px ${t.accent}10`;
                (e.currentTarget as HTMLDivElement).style.borderColor = `${t.accent}40`;
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(255,255,255,0.05)`;
              }}
            >
              {/* Big quote mark */}
              <div style={{
                position: 'absolute', top: '16px', right: '24px',
                fontSize: '6rem', lineHeight: 1, color: t.accent,
                opacity: 0.1, fontFamily: 'Georgia, serif', fontWeight: 900,
                pointerEvents: 'none', userSelect: 'none'
              }}>
                "
              </div>

              {/* Stars */}
              <div style={{ color: '#FFB84D', fontSize: '1rem', letterSpacing: '4px', display: 'flex' }}>
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                position: 'relative',
                zIndex: 1,
                flex: 1,
                letterSpacing: '-0.01em'
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: '20px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: `${t.accent}15`,
                  border: `1px solid ${t.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.accent, flexShrink: 0
                }}>
                  <t.icon size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
