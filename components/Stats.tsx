'use client';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

export default function Stats() {
  const [stats, setStats] = useState({ members: 34000, dailyUsers: 1540, events: 120 });

  useEffect(() => {
    fetch('/api/discord')
      .then(res => res.json())
      .then(data => {
        if (data && data.members) {
          setStats(prev => ({ ...prev, members: data.members }));
        }
      })
      .catch(err => console.error("Could not load dynamic stats", err));
  }, []);

  const metrics = [
    { label: "Members", value: `${(stats.members / 1000).toFixed(1)}k+`, desc: "Active Discord Community" },
    { label: "Daily Engagement", value: "High", desc: "Active Discord Ecosystem" },
    { label: "Content Creators", value: "50+", desc: "Exclusive W2E Partners" },
    { label: "Daily Active Users", value: `${stats.dailyUsers}+`, desc: "Consistent Base" }
  ];

  return (
    <section id="stats" className="section" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Glow Background */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(140, 82, 255, 0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>

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
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}
          >
            Our <span className="font-serif text-accent">Impact</span>
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }}
            style={{ color: 'var(--text-secondary)' }}
          >
            The numbers driving our thriving community and partners.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {metrics.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
              }}
              style={{ 
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                padding: '48px 24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'rgba(140, 82, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 800, 
                color: 'var(--text-primary)', 
                marginBottom: '16px', 
                lineHeight: 1, 
                textShadow: '0 4px 24px rgba(255,255,255,0.1)' 
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: '1.1rem', 
                fontWeight: 700, 
                color: 'var(--accent-color)', 
                marginBottom: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                {stat.label}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
