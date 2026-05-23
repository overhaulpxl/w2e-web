'use client';
import React, { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hold the splash screen for a short duration
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 800); // smooth fade
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#050505',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 400,
        letterSpacing: '8px',
        color: '#fff',
        marginBottom: '24px',
        animation: 'pulse 2s infinite ease-in-out',
      }}>
        W2E
      </div>
      
      <div style={{
        width: '40px',
        height: '1px',
        background: 'rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, height: '100%',
          width: '50%',
          background: 'var(--accent-color)',
          animation: 'slideRight 1.5s infinite ease-in-out'
        }}></div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}
