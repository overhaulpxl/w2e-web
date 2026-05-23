import { motion } from 'framer-motion';
import { Megaphone, MessageSquare, Gamepad2, Video } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      title: "Community-based Campaigns",
      desc: "Deep integration into the community ecosystem, ensuring authentic reception.",
      icon: Megaphone
    },
    {
      title: "Discord Activations",
      desc: "Direct announcements and ping events driving instantaneous traffic.",
      icon: MessageSquare
    },
    {
      title: "In-game Presence",
      desc: "Brand placements and sponsored gaming events within Roblox environments.",
      icon: Gamepad2
    },
    {
      title: "Creator Collaborations",
      desc: "Leveraging streamer and creator networks for wider viral exposure.",
      icon: Video
    }
  ];

  return (
    <section id="offer" className="section" style={{ background: 'var(--bg-color)' }}>
      <motion.div 
        className="container"
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
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}
          >
            What We <span className="font-serif text-accent">Offer</span>
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }}
            style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}
          >
            We provide integrated brand exposure through proven modern channels.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }
              }}
              className="card"
              style={{
                transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.4s ease'
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(140, 82, 255, 0.1)', color: 'var(--accent-color)' }}>
                <benefit.icon size={28} strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{benefit.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
