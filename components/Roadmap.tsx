'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Leaf, History, Gamepad2, Zap, Trophy, Globe, Rocket } from 'lucide-react';

const milestones = [
  {
    year: "Sep 2021",
    title: "Eternal Home (ETH) Founded",
    desc: "Started as a Discord-based community hub built around music, gaming, and digital culture.",
    icon: Leaf,
    accent: "#4DFF88",
    side: "left"
  },
  {
    year: "2022 – 2023",
    title: "Hiatus & Repositioning",
    desc: "A period of inactivity led to a strategic rethink — pivoting toward a focused Roblox gaming ecosystem.",
    icon: History,
    accent: "#4D88FF",
    side: "right"
  },
  {
    year: "Late 2023",
    title: "Gaming Focus",
    desc: "Repositioned as a dedicated gaming community. Roblox became the core platform for community activity.",
    icon: Gamepad2,
    accent: "#FFB84D",
    side: "left"
  },
  {
    year: "Mid 2024",
    title: "W2E is Born",
    desc: "The brand organically evolved into W2E (Wave To Earth), amplified by creator influence and community adoption.",
    icon: Zap,
    accent: "#8C52FF",
    side: "right"
  },
  {
    year: "Aug 2024",
    title: "Formally Established",
    desc: "W2E officially launched as a structured clan and gaming community, with a primary focus on Evade in Roblox.",
    icon: Trophy,
    accent: "#FF4D88",
    side: "left",
  },
  {
    year: "2025",
    title: "Way 2 Eternal",
    desc: "Rebranded from Wave To Earth to Way 2 Eternal — shifting identity from a clan into a full-scale open community, welcoming everyone beyond just competitive players.",
    icon: Globe,
    accent: "#8C52FF",
    side: "right",
  },
  {
    year: "Now",
    title: "Way 2 Eternal Community",
    desc: "A scalable digital platform at the intersection of gaming communities, creator ecosystems, and youth culture.",
    icon: Rocket,
    accent: "#FF4D4D",
    side: "left",
    isCurrent: true
  }
];

// Shared card content
function MilestoneContent({ m, textAlign = 'left' }: { m: typeof milestones[0], textAlign?: 'left' | 'right' }) {
  return (
    <div style={{
      background: m.isCurrent
        ? `linear-gradient(135deg, rgba(255,77,77,0.12) 0%, rgba(0,0,0,0) 100%)`
        : 'rgba(255,255,255,0.02)',
      border: `1px solid ${m.isCurrent ? m.accent + '50' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: '20px',
      padding: '24px',
      maxWidth: '340px',
      textAlign,
      backdropFilter: 'blur(4px)',
      boxShadow: m.isCurrent ? `0 0 30px ${m.accent}20` : 'none',
      transition: 'all 0.3s ease',
      width: '100%',
    }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: m.accent, textTransform: 'uppercase', letterSpacing: '2px' }}>
        {m.year}
      </span>
      <h3 style={{ fontSize: '1.1rem', margin: '8px 0', color: '#fff' }}>{m.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
    </div>
  );
}

// Per-milestone component that reads global scroll direction
function MilestoneCard({ m }: { m: typeof milestones[0] }) {
  const [scrollingDown, setScrollingDown] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrollingDown(latest >= prev);
  });

  const hiddenVariant = scrollingDown
    ? { opacity: 0, x: m.side === 'left' ? -60 : 60, y: 0, scale: 0.95 }
    : { opacity: 0, x: 0, y: 80, scale: 0.95 };

  const iconEl = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        background: `${m.accent}18`, border: `2px solid ${m.accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: m.accent, boxShadow: `0 0 20px ${m.accent}40`,
        position: 'relative', zIndex: 2, flexShrink: 0
      }}>
        <m.icon size={22} strokeWidth={2} />
        {m.isCurrent && (
          <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: `1px solid ${m.accent}40`, animation: 'pulse 2s infinite' }} />
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={{
        hidden: hiddenVariant,
        visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
      }}
    >
      {/* DESKTOP: 3-col zigzag layout */}
      <div className="milestone-desktop" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        alignItems: 'center',
        minHeight: '140px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '40px' }}>
          {m.side === 'left' && <MilestoneContent m={m} textAlign="right" />}
        </div>
        {iconEl}
        <div style={{ paddingLeft: '40px' }}>
          {m.side === 'right' && <MilestoneContent m={m} textAlign="left" />}
        </div>
      </div>

      {/* MOBILE: 2-col, icon left + content right, always visible */}
      <div className="milestone-mobile" style={{ display: 'none', gridTemplateColumns: '52px 1fr', gap: '16px', alignItems: 'center', padding: '12px 0', position: 'relative', zIndex: 1 }}>
        {iconEl}
        <MilestoneContent m={m} textAlign="left" />
      </div>
    </motion.div>
  );
}

export default function Roadmap() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && lineRef.current) {
            lineRef.current.style.height = '100%';
          } else if (!entry.isIntersecting && lineRef.current) {
            lineRef.current.style.height = '0%';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="section"
      style={{ background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', overflow: 'hidden' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '80px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} className="badge" style={{ marginBottom: '20px' }}>
            <div className="badge-dot" style={{ background: '#8C52FF' }}></div>
            Our Journey
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            The W2E <span className="font-serif text-accent">Timeline</span>
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }} style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            From a small Discord server to a thriving 34,000+ member gaming community — here's how we got here.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: '2px',
            height: '100%',
            background: 'rgba(255,255,255,0.06)',
            zIndex: 0
          }}>
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: '0%',
                background: 'linear-gradient(180deg, #8C52FF, #4D88FF, #4DFF88)',
                transition: 'height 2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
            />
          </div>

          {/* Milestones — each one is its own scroll-aware component */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {milestones.map((m, i) => (
              <MilestoneCard key={i} m={m} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .milestone-desktop { display: none !important; }
          .milestone-mobile { display: grid !important; }
        }
        @media (min-width: 641px) {
          .milestone-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
