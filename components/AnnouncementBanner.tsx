'use client';
import React from 'react';

export default function AnnouncementBanner() {
  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(90deg, #6A24D1, #8C52FF)',
      color: 'white',
      padding: '8px 0',
      fontSize: '0.85rem',
      fontWeight: 600,
      zIndex: 1000,
      position: 'relative'
    }}>
      <div className="marquee-container" style={{ width: '100%' }}>
        <p className="marquee-content">
          🎉 SPECIAL OFFER: 10% Discount for Roblox Fast Topup valid until midnight! &nbsp; &mdash; &nbsp; 💸 Exclusive Shopee Flash Sale Voucher dropping in General VC Tonight!
        </p>
      </div>
    </div>
  );
}
