export default function LogoTicker() {
  const logos = [
    {
      name: 'Shopee',
      icon: <img src="/shopee-logo.png" alt="Shopee" style={{ height: '64px', objectFit: 'contain' }} />,
    }
  ];

  // Duplicate the Shopee logo many times to ensure seamless endless scroll even on ultra-wide screens
  const logoItems = Array(60).fill(logos[0]).map((logo, index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center', opacity: 0.5, filter: 'grayscale(100%)', transition: 'all 0.3s ease', cursor: 'pointer' }}
         onMouseOver={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'none'; }}
         onMouseOut={(e) => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.filter = 'grayscale(100%)'; }}>
      {logo.icon}
    </div>
  ));

  return (
    <section className="section" id="partnerships" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-color)', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '40px' }}>
        <p className="animate-on-scroll" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Partnerships & Trusted By
        </p>
      </div>
      
      <div className="marquee-container animate-on-scroll stagger-1">
        <div className="marquee-content">
          {logoItems}
        </div>
      </div>
    </section>
  );
}
