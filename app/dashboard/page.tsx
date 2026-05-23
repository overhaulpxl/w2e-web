"use client";

import { useEffect, useState } from "react";
import { Play, Pause, SkipForward, Volume2, Music, ListMusic, RefreshCw, VolumeX } from "lucide-react";

interface SongStatus {
  title: string;
  duration: number;
  elapsed: number;
  queue: string[];
  volume: number;
  loop: string;
  is_paused: boolean;
}

export default function W2EDashboard() {
  const [status, setStatus] = useState<Record<string, SongStatus>>({});
  const [loading, setLoading] = useState(true);
  const [localVolume, setLocalVolume] = useState<Record<string, number>>({});

  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/status");
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error("Bot API not running:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 1500);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleAction = async (endpoint: string, gid: string, payload: any = {}) => {
    try {
      await fetch(`http://localhost:8080/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guild_id: gid, ...payload })
      });
      fetchStatus();
    } catch (e) {
      console.error(`Failed to ${endpoint}`, e);
    }
  };

  const onVolumeChange = (gid: string, val: number) => {
    setLocalVolume(prev => ({ ...prev, [gid]: val }));
  };

  const onVolumeCommit = (gid: string, val: number) => {
    handleAction('volume', gid, { volume: val });
  };

  return (
    <>
      <style>{`
        .music-dashboard {
          min-height: 100vh;
          background-color: #050505;
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 2rem 1rem;
          position: relative;
          overflow-x: hidden;
        }
        .bg-ambient {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 50vh;
          background: rgba(140, 82, 255, 0.15);
          filter: blur(120px);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .container-box {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        .header-title {
          font-size: 2.5rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          background: linear-gradient(to bottom right, #c084fc, #60a5fa, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .icon-box {
          padding: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          display: flex;
        }
        .card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2rem;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 0 50px rgba(168,85,247,0.05);
          transition: border-color 0.4s ease;
        }
        .card:hover {
          border-color: rgba(255,255,255,0.2);
        }
        .center-msg {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 40vh;
        }
        .album-art {
          width: 200px;
          height: 200px;
          border-radius: 2rem;
          background: linear-gradient(135deg, #6366f1, #a855f7, #d946ef);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 50px rgba(168,85,247,0.3);
          position: relative;
        }
        @keyframes spinRing {
          100% { transform: rotate(360deg); }
        }
        .spinning-ring {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border: 3px solid rgba(255,255,255,0.2);
          border-top-color: rgba(255,255,255,0.8);
          border-radius: 2rem;
          animation: spinRing 10s linear infinite;
        }
        .flex-row { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
        .flex-col { display: flex; flex-direction: column; flex: 1; }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #c084fc;
          margin-bottom: 1rem;
          width: fit-content;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #a855f7; }
        .dot.paused { background: #737373; }
        .song-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .progress-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: #a3a3a3;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .progress-bar-bg {
          flex: 1;
          height: 10px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(to right, #6366f1, #a855f7, #d946ef);
          border-radius: 999px;
          transition: width 1s linear;
        }
        .controls-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .btn-play {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: white;
          color: black;
          display: flex; align-items: center; justify-content: center;
          border: none; cursor: pointer;
          transition: transform 0.2s;
        }
        .btn-play:hover { transform: scale(1.05); }
        .btn-play:active { transform: scale(0.95); }
        .btn-skip {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          color: white;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; transition: all 0.2s;
        }
        .btn-skip:hover { background: rgba(255,255,255,0.2); transform: scale(1.05); }
        .vol-box {
          display: flex; align-items: center; gap: 1rem;
          background: rgba(255,255,255,0.05);
          padding: 0.75rem 1.25rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .vol-slider {
          -webkit-appearance: none;
          width: 100px;
          height: 6px;
          background: rgba(255,255,255,0.2);
          border-radius: 5px;
          outline: none;
        }
        .vol-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #c084fc;
          cursor: pointer;
        }
        .queue-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .queue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          max-height: 200px;
          overflow-y: auto;
        }
        .queue-item {
          display: flex; align-items: center; gap: 1rem;
          background: rgba(255,255,255,0.03);
          padding: 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
      
      <div className="music-dashboard">
        <div className="bg-ambient" />
        <div className="container-box">
          <header>
            <h1 className="header-title">
              <div className="icon-box"><Music size={28} color="#c084fc"/></div>
              W2E Audio
            </h1>
          </header>

          {loading ? (
            <div className="card center-msg">
              <RefreshCw size={40} color="#a855f7" className="lucide lucide-refresh-cw" style={{ animation: 'spinRing 2s linear infinite', marginBottom: '1rem' }} />
              <p style={{ color: '#a3a3a3' }}>Connecting to Discord Bot...</p>
            </div>
          ) : Object.keys(status).length === 0 ? (
            <div className="card center-msg">
              <ListMusic size={50} color="#525252" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Active Sessions</h2>
              <p style={{ color: '#a3a3a3', maxWidth: '400px' }}>Join a voice channel and play a song using the bot to view your live player here.</p>
            </div>
          ) : (
            Object.entries(status).map(([gid, s]) => {
              const progress = s.duration > 0 ? (s.elapsed / s.duration) * 100 : 0;
              const currentVol = localVolume[gid] !== undefined ? localVolume[gid] : Math.round(s.volume * 100);

              return (
                <div key={gid} className="card">
                  <div className="flex-row">
                    <div className="album-art">
                      <Music size={80} color="rgba(255,255,255,0.8)" />
                      {!s.is_paused && <div className="spinning-ring" />}
                    </div>

                    <div className="flex-col">
                      <div className="badge">
                        <div className={`dot ${s.is_paused ? 'paused' : ''}`} />
                        {s.is_paused ? 'PAUSED' : 'NOW PLAYING'}
                      </div>

                      <h2 className="song-title">{s.title}</h2>

                      <div className="progress-container">
                        <span style={{ width: '40px', textAlign: 'right' }}>{formatTime(s.elapsed)}</span>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <span style={{ width: '40px' }}>{formatTime(s.duration)}</span>
                      </div>

                      <div className="controls-row">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button className="btn-play" onClick={() => handleAction('pause', gid)}>
                            {s.is_paused ? <Play size={26} fill="black" style={{marginLeft: '4px'}} /> : <Pause size={26} fill="black" />}
                          </button>
                          <button className="btn-skip" onClick={() => handleAction('skip', gid)}>
                            <SkipForward size={22} fill="white" />
                          </button>
                        </div>

                        <div className="vol-box">
                          <button onClick={() => onVolumeCommit(gid, currentVol === 0 ? 15 : 0)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a3a3a3' }}>
                            {currentVol === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                          </button>
                          <input 
                            type="range" 
                            min="0" max="100" 
                            value={currentVol}
                            onChange={(e) => onVolumeChange(gid, parseInt(e.target.value))}
                            onMouseUp={(e) => onVolumeCommit(gid, parseInt((e.target as HTMLInputElement).value))}
                            onTouchEnd={(e) => onVolumeCommit(gid, parseInt((e.target as HTMLInputElement).value))}
                            className="vol-slider"
                          />
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#a3a3a3', width: '30px' }}>{currentVol}%</span>
                        </div>

                        <div className="vol-box" style={{ gap: '0.5rem' }}>
                          <RefreshCw size={16} color={s.loop !== 'OFF' ? '#c084fc' : '#737373'} />
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: s.loop !== 'OFF' ? 'white' : '#737373' }}>{s.loop}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {s.queue.length > 0 && (
                    <div className="queue-section">
                      <h3 style={{ fontSize: '0.8rem', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ListMusic size={16} color="#c084fc" /> Next Up
                      </h3>
                      <div className="queue-grid">
                        {s.queue.map((q, i) => (
                          <div key={i} className="queue-item">
                            <span style={{ color: '#c084fc', fontWeight: 'bold', fontSize: '0.8rem' }}>0{i + 1}</span>
                            <span style={{ color: '#d4d4d4', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
