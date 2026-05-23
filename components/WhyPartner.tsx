export default function WhyPartner() {
  const reasons = [
    {
      title: "Direct Access to Gen Z",
      desc: "Tap directly into the highly coveted Gen Z gaming demographic natively where they live.",
      accent: "#FF4D4D"
    },
    {
      title: "High Engagement",
      desc: "We don't serve passive reach. Our members actively engage, converse, and convert.",
      accent: "#4DFF88"
    },
    {
      title: "Organic Growth",
      desc: "Built from genuine gamer interactions, ensuring authentic and trustworthy brand positioning.",
      accent: "#4D88FF"
    },
    {
      title: "Flexible Campaigns",
      desc: "Scalable integrations tailored to your campaign needs, from giveaways to in-game billboards.",
      accent: "#FFB84D"
    }
  ];

  return (
    <section id="partnership" className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px', alignItems: 'center' }}>
          
          <div className="animate-on-scroll">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px' }}>
              Why Partner with <br />
              <span className="font-serif text-accent">Way 2 Eternal?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
              We transform traditional sponsorships into interactive community events. Stop paying for ignored banner ads and start building relationships through active Discord and Roblox ecosystems.
            </p>
            <button className="btn btn-primary" style={{ padding: '12px 24px' }}>View Case Studies</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reasons.map((reason, i) => (
              <div key={i} className={`animate-on-scroll stagger-${(i % 4) + 1}`} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                borderLeft: `4px solid ${reason.accent}`,
                padding: '24px',
                borderRadius: '0 16px 16px 0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{reason.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{reason.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
