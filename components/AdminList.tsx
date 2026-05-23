'use client';
import { useState, useEffect } from 'react';

// Komponen Card yang otomatis Fetch Data Discord dari Lanyard / Bot API
function AdminCard({ uid, role, className }: { uid: string, role: string, className?: string }) {
  const [userData, setUserData] = useState({ 
    name: `Loading...`, 
    image: `https://api.dicebear.com/7.x/initials/svg?seed=${uid}` 
  });

  useEffect(() => {
    fetch(`/api/user?uid=${uid}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          const user = res.data;
          const avatarUrl = user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
            : `https://api.dicebear.com/7.x/initials/svg?seed=${user.username || uid}`;
          
          setUserData({
            name: user.global_name || user.username,
            image: avatarUrl
          });
        } else {
          return fetch(`https://api.lanyard.rest/v1/users/${uid}`).then(r => r.json());
        }
      })
      .then((lanyardRes: any) => {
        if (lanyardRes && lanyardRes.success && lanyardRes.data.discord_user) {
          const user = lanyardRes.data.discord_user;
          const avatarUrl = user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
            : `https://api.dicebear.com/7.x/initials/svg?seed=${user.username || uid}`;
          
          setUserData({
            name: user.display_name || user.username,
            image: avatarUrl
          });
        } else if (lanyardRes) {
          setUserData({
            name: `User ${uid.slice(0, 4)}`,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${uid}`
          });
        }
      })
      .catch((e) => {
        setUserData({
          name: `User ${uid.slice(0, 4)}`,
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${uid}`
        });
      });
  }, [uid]);

  return (
    <div className={`admin-card animate-on-scroll ${className || ''}`} style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      padding: '40px 24px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.borderColor = 'rgba(140, 82, 255, 0.4)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(106, 36, 209, 0.2)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
    }}
    >
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'var(--accent-color)', filter: 'blur(80px)', opacity: 0.15, pointerEvents: 'none' }}></div>
      
      {/* Avatar Container with Gradient Border */}
      <div style={{ 
        width: '120px', 
        height: '120px', 
        margin: '0 auto 24px auto', 
        borderRadius: '50%',
        padding: '4px',
        background: 'linear-gradient(135deg, rgba(140, 82, 255, 0.8), rgba(140, 82, 255, 0.1))',
        position: 'relative'
      }}>
        <img src={userData.image} alt={userData.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', background: '#111' }} />
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: 800, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{userData.name}</h3>
      <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px' }}>{role}</p>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, marginTop: '-12px', background: 'rgba(0,0,0,0.3)', display: 'inline-block', padding: '4px 12px', borderRadius: '8px' }}>Active</p>
    </div>
  );
}

export default function AdminList() {
  // Ganti UID di bawah ini dengan UID Discord asli milik tim!
  const allAdmins = [
    { uid: "529168872696446988", role: "Role 1" }, 
    { uid: "926369560821641227", role: "Role 2" },
    { uid: "388118544698572800", role: "Role 3" }
  ];

  return (
    <section id="team" className="section" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Meet our <span className="font-serif text-accent">Team</span>
          </h2>
          <p className="animate-on-scroll stagger-1" style={{ color: 'var(--text-secondary)' }}>The dedicated people driving the W2E vision forward.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '24px' 
        }}>
          {allAdmins.map((admin, idx) => (
            <AdminCard 
              key={`${admin.uid}-${idx}`} 
              uid={admin.uid} 
              role={admin.role}
              className={`stagger-${(idx % 4) + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
