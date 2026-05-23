'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

const packages = [
  {
    name: "Starter",
    price: "Rp 150K",
    desc: "Ideal for emerging brands wanting their first taste of W2E's audience.",
    accent: "#4D88FF",
    features: [
      "1x Discord Announcement (5K reach)",
      "Mention in #general channel",
      "48-hour promo window",
      "Basic analytics report",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "Rp 500K",
    desc: "The most popular choice — full community activation with creator exposure.",
    accent: "#8C52FF",
    features: [
      "3x Discord Announcements (15K+ reach)",
      "@everyone ping privilege",
      "1x TikTok mention from W2E account",
      "Sponsored giveaway event",
      "7-day promo window",
      "Detailed analytics report",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Elite",
    price: "Rp 1.5M",
    desc: "Full-scale brand integration for maximum impact & long-term community presence.",
    accent: "#FF4D88",
    features: [
      "Unlimited announcements",
      "In-game Roblox event branding",
      "3x dedicated TikTok content",
      "Creator collab package",
      "Custom sponsored tournament",
      "30-day promo window",
      "Priority support & custom report",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

// 3D Tilt Card Component
function PackageCard({ pkg }: { pkg: typeof packages[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
      }}
      style={{
        position: 'relative',
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          position: 'relative',
          height: '100%',
          background: pkg.popular
            ? `linear-gradient(145deg, rgba(140,82,255,0.08) 0%, rgba(10,10,10,0.9) 100%)`
            : 'rgba(255,255,255,0.015)',
          border: pkg.popular ? '1px solid rgba(140,82,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '28px',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          transform: "translateZ(30px)",
          backdropFilter: 'blur(10px)',
          transition: 'box-shadow 0.4s ease',
        }}
        whileHover={{
          boxShadow: pkg.popular 
            ? `0 20px 50px rgba(140,82,255,0.2), inset 0 0 20px rgba(140,82,255,0.1)` 
            : `0 20px 40px ${pkg.accent}15, inset 0 0 20px ${pkg.accent}05`
        }}
      >
        {/* Popular badge rendering at a higher Z axis for popout effect! */}
        {pkg.popular && (
          <div style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%) translateZ(40px)',
            background: 'var(--accent-color)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '6px 20px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 25px rgba(140,82,255,0.4)'
          }}>
            ✦ Most Popular
          </div>
        )}

        <div style={{
          width: '100%', height: '2px',
          background: `linear-gradient(90deg, transparent, ${pkg.accent}, transparent)`,
          marginBottom: '32px', borderRadius: '2px', opacity: 0.6,
          transform: 'translateZ(10px)'
        }} />

        <span style={{
          fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '2px', color: pkg.accent, marginBottom: '12px', display: 'block',
          transform: 'translateZ(15px)'
        }}>
          {pkg.name}
        </span>

        <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '12px', letterSpacing: '-0.03em', transform: 'translateZ(25px)' }}>
          {pkg.price}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px', lineHeight: 1.6, transform: 'translateZ(5px)' }}>
          {pkg.desc}
        </p>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '28px' }} />

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, transform: 'translateZ(15px)' }}>
          {pkg.features.map((feat, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '20px', height: '20px', borderRadius: '50%',
                background: `${pkg.accent}20`,
                color: pkg.accent, fontSize: '0.75rem', flexShrink: 0, marginTop: '2px'
              }}>
                ✓
              </span>
              {feat}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '14px 24px',
            borderRadius: '999px',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            background: pkg.popular ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
            border: pkg.popular ? '1px solid transparent' : `1px solid ${pkg.accent}30`,
            color: '#fff',
            transform: 'translateZ(30px)' // Button pops out highest!
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = pkg.popular ? '#9d6df5' : 'rgba(255,255,255,0.1)';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateZ(40px) scale(1.05)';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = pkg.popular ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateZ(30px) scale(1)';
          }}
        >
          {pkg.cta} →
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const [dbPackages, setDbPackages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Parse features string into array for each package
          const parsedData = data.map((pkg: any) => ({
            ...pkg,
            features: pkg.features.split('\n').filter((f: string) => f.trim() !== '')
          }));
          setDbPackages(parsedData);
        }
      })
      .catch(err => console.error("Failed to fetch packages:", err));
  }, []);

  const displayPackages = dbPackages.length > 0 ? dbPackages : packages;

  return (
    <section
      id="packages"
      className="section"
      style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(140,82,255,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0
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
            <div className="badge-dot"></div>
            Sponsorship Tiers
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Choose Your <span className="font-serif text-accent">Package</span>
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '1.05rem' }}>
            Flexible partnership tiers designed for brands of all sizes — from first-time collabs to full-scale community takeovers.
          </motion.p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
          alignItems: 'stretch',
          perspective: 2000 // Needed to make children 3D
        }}>
          {displayPackages.map((pkg, i) => (
            <PackageCard key={i} pkg={pkg} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{
          textAlign: 'center', marginTop: '48px',
          color: 'var(--text-secondary)', fontSize: '0.9rem'
        }}>
          💬 Need something custom? <a href="#contact" style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Contact us</a> for a tailored package.
        </motion.p>
      </motion.div>
    </section>
  );
}
