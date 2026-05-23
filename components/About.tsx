'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px', alignItems: 'start' }}>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } } }}
            style={{ paddingRight: '20px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(140, 82, 255, 0.1)', border: '1px solid rgba(140, 82, 255, 0.2)', borderRadius: '20px', marginBottom: '24px' }}>
              <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }}></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>Who We Are</span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '32px', lineHeight: 1.1 }}>
              <span className="font-serif text-accent" style={{ fontStyle: 'italic' }}>About</span> Overview
            </h2>
            
            <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid rgba(140, 82, 255, 0.3)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Founded in 2021, Way 2 Eternal evolved from a Discord-based community into a structured gaming ecosystem within Roblox.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7 }}>
                Today, Way 2 Eternal stands as a fast-growing digital community focused on engagement, scalability, and brand collaboration.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } } }}
          >
            <div style={{ 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(10,10,10,0.8) 100%)', 
              padding: '56px 48px', 
              borderRadius: '32px', 
              border: '1px solid rgba(255,255,255,0.05)', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(140, 82, 255, 0.1) 0%, transparent 70%)', opacity: 0.5, filter: 'blur(40px)' }}></div>
              <div style={{ position: 'absolute', bottom: '-30px', left: '-20px', fontSize: '14rem', fontWeight: 900, color: 'rgba(255,255,255,0.015)', lineHeight: 0, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.05em' }}>W2E</div>

              <h3 style={{ fontSize: '2.5rem', marginBottom: '24px', position: 'relative', zIndex: 1, letterSpacing: '-0.03em' }}>
                Our <span className="font-serif text-accent" style={{ fontStyle: 'italic', fontWeight: 400 }}>Story</span>
              </h3>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                  From <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Eternal Home (ETH)</span> to W2E, our journey reflects continuous adaptation and community-driven growth.
                </p>
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '24px 0' }}></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Officially established in 2024, W2E now operates as a focused gaming community and clan within Roblox, primarily in Evade.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
