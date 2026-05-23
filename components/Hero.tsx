'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import FloatingRobux from './FloatingRobux';

export default function Hero() {
  const [memberCount, setMemberCount] = useState("34,000+");
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const yRobux1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const yRobux2 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const yRobux3 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    fetch('/api/discord')
      .then(res => res.json())
      .then(data => {
        if (data && data.members) {
          setMemberCount(data.members.toLocaleString());
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px', position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Glow */}
      <motion.div 
        className="bg-glow"
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.3, 0.5, 0.3], 
          filter: ["blur(80px)", "blur(100px)", "blur(80px)"] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      
      {/* 3D Floating Elements with Parallax */}
      <motion.div style={{ position: 'absolute', top: '20%', left: '10%', y: yRobux1 }}>
        <FloatingRobux size={90} delay={0.2} />
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '60%', right: '15%', y: yRobux2 }}>
        <FloatingRobux size={120} delay={0.5} />
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '15%', left: '20%', y: yRobux3 }}>
        <FloatingRobux size={60} delay={0.8} />
      </motion.div>

      <motion.div 
        className="container" 
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '800px', y: yText, opacity: opacityText, scale: scaleText }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
        }}
      >
        <motion.div 
          className="badge" 
          style={{ marginBottom: '32px', padding: '8px 16px', background: 'rgba(255,255,255,0.02)' }}
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
          }}
        >
          <div className="badge-dot"></div>
          <span style={{ letterSpacing: '0.5px' }}>{memberCount} Members • Active Community</span>
        </motion.div>
        
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(15px)' },
            visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } }
          }}
          style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '24px', letterSpacing: '-0.05em', lineHeight: 1.05 }}
        >
          Way 2 Eternal <br />
          <span className="font-serif text-accent" style={{ fontWeight: 500 }}>Community</span>
        </motion.h1>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
          }}
          style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '650px', margin: '0 auto 48px auto', textWrap: 'balance', lineHeight: 1.6 }}
        >
          Connecting brands with highly engaged digital audiences through gaming, creators, and culture.
        </motion.p>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
          }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="#contact" className="btn btn-accent" style={{ padding: '16px 32px', fontSize: '1rem', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)', boxShadow: '0 10px 30px rgba(140,82,255,0.4)' }}>
            Partner With Us
          </Link>
          <a href="https://discord.gg/way2eternal" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1rem', textDecoration: 'none' }}>
            Join Community
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0, 0.5, 0], y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5 }}>Scroll to explore</p>
      </motion.div>
    </section>
  );
}
