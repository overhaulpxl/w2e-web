export default function Faq() {
  const faqs = [
    {
      q: "Berapa lama proses masuknya Topup Roblox?",
      a: "Proses topup via W2E otomatis diproses dalam 3-5 menit setelah pembayaran terkonfirmasi oleh Admin."
    },
    {
      q: "Gimana cara dapat Role W2E Premium?",
      a: "Kamu bisa membeli akses role W2E Premium langsung melalui menu Topup di atas, yang akan membuka akses ke channel eksklusif dan giveaway prioritas."
    },
    {
      q: "Bagaimana brand/sponsor bisa bekerja sama dengan W2E?",
      a: "Silakan klik tombol 'Partner with Us' atau hubungi kami via tombol WhatsApp di pojok kanan bawah untuk membahas paket sponsorship (Flash Sale Announcement, Sponsored Tournament, dll)."
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '40px', textAlign: 'center' }}>
          Frequently Asked <span className="font-serif text-accent">Questions</span>
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <details key={idx} className="animate-on-scroll stagger-1" style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              cursor: 'pointer'
            }}>
              <summary style={{ 
                listStyle: 'none', 
                fontSize: '1.1rem', 
                fontWeight: 600, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                {faq.q}
                <span style={{ color: 'var(--accent-color)' }}>+</span>
              </summary>
              <div style={{ 
                marginTop: '16px', 
                lineHeight: '1.6', 
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px'
              }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
