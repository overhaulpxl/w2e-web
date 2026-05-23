'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FooterProps {
  hideCTA?: boolean;
}

export default function Footer({ hideCTA = false }: FooterProps) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', background: '#050505', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
      {/* Massive CTA for Sponsors */}
      {!hideCTA && (
      <motion.div 
        id="contact" 
        className="container" 
        style={{ position: 'relative', zIndex: 1, marginBottom: '80px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 50, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
        }}
      >
        <motion.div 
          style={{ 
            background: 'var(--surface-color)',
            border: '1px solid rgba(106, 36, 209, 0.3)',
            borderRadius: '32px',
            padding: '80px 40px',
            textAlign: 'center',
            boxShadow: '0 0 80px rgba(106, 36, 209, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.5s ease'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 20px 100px rgba(140, 82, 255, 0.2)',
            borderColor: 'rgba(140, 82, 255, 0.6)'
          }}
        >
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, zIndex: 0, pointerEvents: 'none' }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-background-28495-large.mp4" type="video/mp4" />
          </video>
          
          {/* Subtle Dark Overlay for perfect readablity without hiding video */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.8) 100%)', zIndex: 0 }}></div>

          {/* Top glow on CTA */}
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: '2px', background: 'linear-gradient(90deg, transparent, #8C52FF, transparent)', zIndex: 1 }}></div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '16px', lineHeight: 1.1 }}>
              Let’s Build <span className="font-serif text-accent">Something Together</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              We are open to collaborations, sponsorships, and long-term partnerships.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:eternalhome.eth@gmail.com" 
                className="btn btn-primary" 
                style={{ padding: '16px 40px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <span>📩</span> eternalhome.eth@gmail.com
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://discord.gg/way2eternal" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline" 
                style={{ padding: '16px 40px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)' }}
              >
                <span>🔗</span> Join discord.gg/way2eternal
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}

      {/* Premium Footer Layout */}
      <motion.div 
        className="container" 
        style={{ position: 'relative', zIndex: 1, paddingBottom: '40px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        <div style={{ 
          background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '32px',
          padding: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {/* Logo & Description */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }}>
            <img src="/logo-v2.png" alt="W2E Logo" style={{ height: '64px', objectFit: 'contain', opacity: 0.9, marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(140, 82, 255, 0.3))' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '320px', marginBottom: '32px' }}>
              W2E is a next-generation corporate gaming hub focusing on premium brand activations and creator-led engagements.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <motion.a whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                 <span style={{ color: '#fff' }}>TW</span>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                 <span style={{ color: '#fff' }}>IG</span>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, backgroundColor: 'rgba(140, 82, 255, 0.3)', boxShadow: '0 0 20px rgba(140, 82, 255, 0.5)' }} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(140, 82, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', border: '1px solid rgba(140, 82, 255, 0.4)' }}>
                 <span style={{ color: '#fff' }}>DC</span>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '32px', color: '#fff', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <li><Link href="/#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>About</Link></li>
              <li><Link href="/#team" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Team</Link></li>
              <li><Link href="/#stats" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Stats</Link></li>
              <li><Link href="/#roadmap" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Roadmap</Link></li>
              <li><Link href="/#offer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Services</Link></li>
              <li><Link href="/#partnership" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Partnership</Link></li>
              <li><Link href="/#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Contact Us</Link></li>
            </ul>
          </motion.div>
          
          {/* Legal */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '32px', color: '#fff', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><Link href="/#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>Contact Info</Link></li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px 0', background: '#020202', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Way 2 Eternal. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
               Developed by <span style={{ color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '0.5px' }}>blur / overhaulpxl</span>
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
