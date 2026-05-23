'use client';
import React from 'react';

export default function SearchBar({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '32px' }}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: 'var(--text-secondary)' }}
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        style={{
          width: '100%',
          padding: '14px 16px 14px 44px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          outline: 'none',
          transition: 'all 0.3s'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent-color)';
          e.target.style.boxShadow = '0 0 15px rgba(106, 36, 209, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-color)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
