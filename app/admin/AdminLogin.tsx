'use client';

import React, { useState } from 'react';
import { adminLoginAction } from './auth';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await adminLoginAction(email, password);
    
    if (res.success) {
      router.refresh();
    } else {
      setError(res.error || 'Autentikasi gagal!');
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '150px 20px', maxWidth: '500px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(168, 85, 247, 0.1)', color: '#A855F7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '24px' }}>
          🔐
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>Pusat Komando</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>Masukkan kredensial untuk mengakses dasbor W2E CMS.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '1rem', outline: 'none', textAlign: 'center' }}
            required
            autoFocus
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '1rem', outline: 'none', textAlign: 'center' }}
            required
          />
          {error && <p style={{ color: '#FF4D4D', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
          <button 
            type="submit" 
            disabled={loading}
            style={{ background: 'var(--accent-color)', color: '#fff', padding: '16px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s' }}
          >
            {loading ? 'Authenticating...' : 'Unlock Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
