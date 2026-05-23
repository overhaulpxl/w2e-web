'use client';

import React, { useState, useEffect } from 'react';

// Mock data to simulate real-time top-ups
const MOCK_ACTIVITIES = [
  { user: 'xX_Slayer_Xx', action: 'top-up', amount: '5,000 Nxrden', time: 'Baru saja' },
  { user: 'Bella_Gamer', action: 'pembelian', amount: 'Premium Pass', time: '1 mnt lalu' },
  { user: 'FakerFan99', action: 'top-up', amount: '10,000 Nxrden', time: '2 mnt lalu' },
  { user: 'Kuro_Neko', action: 'top-up', amount: '1,500 Nxrden', time: 'Baru saja' },
  { user: 'Aura_Esports', action: 'bulk top-up', amount: '50,000 Nxrden', time: '5 mnt lalu' },
  { user: 'Choco_Moko', action: 'top-up', amount: '3,000 Nxrden', time: 'Beberapa detik lalu' },
];

export default function LiveActivityTicker() {
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start the loop
    const triggerActivity = () => {
      // Pick random activity
      const randomIndex = Math.floor(Math.random() * MOCK_ACTIVITIES.length);
      setCurrentActivity(MOCK_ACTIVITIES[randomIndex]);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Initial delay before first trigger
    const initialTimer = setTimeout(triggerActivity, 2000);

    // Set interval to trigger every 8-15 seconds
    const interval = setInterval(() => {
      triggerActivity();
    }, Math.floor(Math.random() * (15000 - 8000 + 1) + 8000));

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`live-activity-ticker ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="ticker-icon">
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div className="ticker-content">
        {currentActivity && (
          <>
            <p className="ticker-text">
              <span className="ticker-user">{currentActivity.user}</span> {currentActivity.action} <span className="ticker-amount">{currentActivity.amount}</span>
            </p>
            <p className="ticker-time">{currentActivity.time}</p>
          </>
        )}
      </div>
    </div>
  );
}
