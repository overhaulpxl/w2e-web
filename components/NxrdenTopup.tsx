'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import RobuxCalculator from './RobuxCalculator';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import PaymentModal from './PaymentModal';
import Leaderboard from './Leaderboard';
import FloatingRobux from './FloatingRobux';

export default function NxrdenTopup() {
  const { data: session } = useSession();
  
  // Selection state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Dynamic Data State
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/content/topup')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setPackages(json.data.packages);
          // Rates are fetched automatically by RobuxCalculator.tsx or we could pass them,
          // but RobuxCalculator can handle its own fetch or we pass them if needed.
          // Wait, RobuxCalculator.tsx currently hardcodes rates.
        }
        setIsLoadingContent(false);
      })
      .catch(() => setIsLoadingContent(false));
  }, []);

  const handleBuy = (product: any) => {
    setSelectedProduct(product);
  };

  const filteredProducts = packages.filter(p =>
    (p.name || `${p.amount} Robux`).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const premiumProducts = filteredProducts.filter(p => (p.type || '').toLowerCase() === 'premium');
  const regularProducts = filteredProducts.filter(p => (p.type || '').toLowerCase() === 'regular' || !p.type);
  const otherProducts = filteredProducts.filter(p => (p.type || '').toLowerCase() !== 'premium' && (p.type || '').toLowerCase() !== 'regular' && p.type);

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bg-glow"></div>
      
      {/* 3D Floating Elements */}
      <FloatingRobux top="5%" right="5%" size={80} delay={0.3} />
      <FloatingRobux top="30%" left="2%" size={100} delay={0.6} />

      <div className="container" style={{ maxWidth: '1000px', zIndex: 1, position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="animate-on-scroll stagger-1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
            Roblox <span className="font-serif text-accent">Topup</span>
          </h1>
          <p className="animate-on-scroll stagger-2" style={{ color: 'var(--text-secondary)' }}>Instant & Secure Robux Delivery via W2E</p>
        </div>

        <div className="animate-on-scroll stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
          
          {/* Top: Custom Calculator (Like nxrdenstore) & Leaderboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', width: '100%' }}>
            <div>
               <RobuxCalculator onBuy={handleBuy} />
            </div>
            <div>
               <Leaderboard />
            </div>
          </div>

          {/* Divider & Search */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>All Products</h2>
            </div>
            
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {isLoadingContent ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    
                    {premiumProducts.length > 0 && (
                        <section>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Premium packages</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                                {premiumProducts.map(p => <ProductCard key={p.id} product={p} onBuy={handleBuy} />)}
                            </div>
                        </section>
                    )}

                    {regularProducts.length > 0 && (
                        <section>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Regular packages</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                                {regularProducts.map(p => <ProductCard key={p.id} product={p} onBuy={handleBuy} />)}
                            </div>
                        </section>
                    )}

                    {otherProducts.length > 0 && (
                        <section>
                            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Other packages</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                                {otherProducts.map(p => <ProductCard key={p.id} product={p} onBuy={handleBuy} />)}
                            </div>
                        </section>
                    )}

                    {packages.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '64px 0' }}>
                            No products available yet.
                        </div>
                    )}
                </div>
            )}
          </div>
        </div>

      </div>

      {/* Unified Payment Modal */}
      <PaymentModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />

    </section>
  );
}
