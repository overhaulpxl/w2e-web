"use client";

import { useEffect, useState } from "react";
import { Radio, Users, Clock, Headphones } from "lucide-react";

interface RadarData {
  user_id: string;
  username: string;
  channel: string;
  minutes: number;
}

export default function VoiceRadar() {
  const [data, setData] = useState<RadarData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRadar = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/radar");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadar();
    const interval = setInterval(fetchRadar, 5000); // Fetch every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .radar-container {
          padding: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .radar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .radar-icon-box {
          background: rgba(59,130,246,0.1);
          padding: 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(59,130,246,0.2);
          position: relative;
        }
        .radar-pulse {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          border: 2px solid rgba(59,130,246,0.5);
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        .radar-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(to right, #60a5fa, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .radar-desc {
          color: #a3a3a3;
          margin-top: 0.5rem;
        }
        
        .radar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .radar-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1.5rem;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .radar-card:hover {
          border-color: rgba(59,130,246,0.3);
          box-shadow: 0 10px 30px rgba(59,130,246,0.1);
          transform: translateY(-5px);
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .avatar-placeholder {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 1.2rem;
        }
        
        .username {
          font-size: 1.25rem; font-weight: 700; color: white;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        
        .stat-row {
          display: flex; align-items: center; gap: 0.75rem;
          color: #d4d4d4; font-size: 0.95rem; margin-bottom: 0.75rem;
        }
        
        .live-badge {
          position: absolute; top: 1.5rem; right: 1.5rem;
          background: rgba(239,68,68,0.1); color: #ef4444;
          padding: 0.25rem 0.75rem; border-radius: 999px;
          font-size: 0.75rem; font-weight: 800; letter-spacing: 1px;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .live-dot { width: 6px; height: 6px; background: #ef4444; border-radius: 50%; animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        .empty-state {
          grid-column: 1 / -1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 4rem; background: rgba(255,255,255,0.02); border-radius: 2rem; border: 1px dashed rgba(255,255,255,0.1);
          text-align: center;
        }
      `}</style>
      
      <div className="radar-container">
        <div className="radar-header">
          <div className="radar-icon-box">
            <Radio size={32} color="#60a5fa" />
            <div className="radar-pulse"></div>
          </div>
          <div>
            <h1 className="radar-title">Voice Radar</h1>
            <p className="radar-desc">Real-time monitoring of active voice channel participants.</p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            <Radio size={48} color="#3b82f6" style={{ animation: 'ping 2s infinite', marginBottom: '1rem' }} />
            <p style={{ color: '#a3a3a3' }}>Scanning frequencies...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <Headphones size={48} color="#525252" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Active Users</h2>
            <p style={{ color: '#a3a3a3' }}>All voice channels are currently empty.</p>
          </div>
        ) : (
          <div className="radar-grid">
            {data.map((user, idx) => (
              <div key={idx} className="radar-card">
                <div className="live-badge">
                  <div className="live-dot"></div> LIVE
                </div>
                
                <div className="user-info">
                  <div className="avatar-placeholder">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="username" title={user.username}>{user.username}</div>
                </div>
                
                <div className="stat-row">
                  <Headphones size={18} color="#60a5fa" />
                  <span><strong>{user.channel}</strong></span>
                </div>
                
                <div className="stat-row">
                  <Clock size={18} color="#a855f7" />
                  <span>Joined <strong>{user.minutes} min</strong> ago</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
