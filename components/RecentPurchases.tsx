'use client';
import React, { useState, useEffect } from 'react';

const buyers = ["Ahmad", "Budi", "Sisca", "Reza", "Fahmi", "Kirana"];
const items = ["1000 Robux", "W2E Premium Role", "344 ML Diamonds", "1250 VP Valorant"];

export default function RecentPurchases() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ buyer: "", item: "" });

  useEffect(() => {
    // Random notification display logic
    const triggerToast = () => {
      const buyer = buyers[Math.floor(Math.random() * buyers.length)];
      const item = items[Math.floor(Math.random() * items.length)];
      setNotification({ buyer, item });
      setShow(true);

      // Hide after 4 seconds
      setTimeout(() => setShow(false), 4000);
    };

    // Trigger every 8-15 seconds
    const loop = () => {
      const ms = Math.floor(Math.random() * 7000) + 8000;
      setTimeout(() => {
        triggerToast();
        loop();
      }, ms);
    };

    // Initial trigger
    setTimeout(() => { triggerToast(); loop(); }, 3000);

    return () => {}; // Basic cleanup
  }, []);

  if (!show) return null;

  return (
    <div className="toast-enter" style={{
      position: 'fixed',
      bottom: '100px',
      left: '24px',
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--accent-color)',
      boxShadow: '0 0 20px rgba(106, 36, 209, 0.2)',
      padding: '16px 20px',
      borderRadius: 'var(--radius-md)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      maxWidth: '300px'
    }}>
      <div style={{ fontSize: '1.5rem' }}>🛍️</div>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Baru saja membeli!</div>
        <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-primary)' }}>{notification.buyer}</span> topup <span style={{ color: 'var(--accent-color)' }}>{notification.item}</span>
        </div>
      </div>
    </div>
  );
}
