'use client';
import React, { useState } from 'react';
import RobuxCalculator from './RobuxCalculator';
import PaymentModal from './PaymentModal';

export default function Topup() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleBuy = (product: any) => {
    setSelectedProduct(product);
  };

  const premiumProducts = [
    { id: 'p1', name: '10,000 R$ (Premium)', price: 155000, priceDisplay: 'Rp 155.000', buyType: 'gamepass' },
    { id: 'p2', name: '20,000 R$ (Premium)', price: 310000, priceDisplay: 'Rp 310.000', buyType: 'gamepass' }
  ];

  return (
    <section id="topup" className="section" style={{ background: 'var(--bg-color)', position: 'relative' }}>
      {/* Background glow specific to pricing */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(5,5,5,0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge animate-on-scroll" style={{ marginBottom: '16px', display: 'inline-flex' }}>W2E Store</div>
          <h2 className="animate-on-scroll stagger-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '16px' }}>
            Topup <span className="font-serif text-accent">Robux</span>
          </h2>
          <p className="animate-on-scroll stagger-2" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Fast, secure, and reliable Robux topup right from W2E.
          </p>
        </div>

        <div className="animate-on-scroll stagger-3" style={{ maxWidth: '600px', margin: '0 auto 64px auto' }}>
          <RobuxCalculator onBuy={handleBuy} />
        </div>

        {/* Example Static Packages */}
        <div className="animate-on-scroll" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>Best Value Packages</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {premiumProducts.map(p => (
              <div key={p.id} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                borderRadius: '24px', padding: '24px', transition: 'all 0.3s', cursor: 'pointer'
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-color)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
              onClick={() => handleBuy(p)}
              >
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{p.name}</h4>
                <p style={{ color: 'var(--accent-color)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px' }}>{p.priceDisplay}</p>
                <button className="btn btn-outline" style={{ width: '100%' }}>Buy Package</button>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PaymentModal 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </section>
  );
}
