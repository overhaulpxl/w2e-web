'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onBuy }: { product: any, onBuy: (p: any) => void }) {
  // Convert standard W2E format to match what Category maps look like
  const priceDisplay = product.priceDisplay || `Rp ${product.price?.toLocaleString('id-ID')}`;

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px', 
        gap: '16px',
        cursor: 'pointer',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        height: '100%'
      }}
      onClick={() => onBuy(product)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', flex: 1, margin: 0, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{product.name || `${product.amount} Robux`}</h3>
        <span className="badge" style={{ fontSize: '0.65rem', padding: '4px 8px', border: 'none', background: 'rgba(140, 82, 255, 0.1)', color: 'var(--accent-color)' }}>
          {product.type || product.category || 'Package'}
        </span>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>Price</p>
        <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{priceDisplay}</p>
      </div>

      <button 
        className="btn btn-outline" 
        style={{ width: '100%', marginTop: '8px', padding: '10px' }}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(product);
        }}
      >
        Buy Now
      </button>
    </motion.div>
  );
}
