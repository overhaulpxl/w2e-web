"use client";

import { useState } from "react";
import { Sparkles, Coins, Gift } from "lucide-react";

export default function GachaPage() {
  const [discordId, setDiscordId] = useState("");
  const [status, setStatus] = useState<"idle" | "spinning" | "won" | "error">("idle");
  const [resultTitle, setResultTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [remainingCoins, setRemainingCoins] = useState<number | null>(null);

  const handleSpin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordId.trim()) return;
    
    setStatus("spinning");
    setErrorMsg("");
    
    try {
      // Simulate spinning delay for excitement
      await new Promise(r => setTimeout(r, 2000));
      
      const res = await fetch("/api/gacha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discordId })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setResultTitle(data.title);
        setRemainingCoins(data.remainingCoins);
        setStatus("won");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to spin");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to server");
    }
  };

  return (
    <>
      <style>{`
        .gacha-container {
          padding: 3rem;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .gacha-icon-box {
          display: inline-flex;
          background: rgba(16,185,129,0.1);
          padding: 1.5rem;
          border-radius: 2rem;
          border: 1px solid rgba(16,185,129,0.2);
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(16,185,129,0.2);
        }
        .gacha-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin: 0 0 1rem 0;
          background: linear-gradient(135deg, #34d399, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gacha-desc {
          color: #a3a3a3;
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }
        
        .gacha-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2rem;
          padding: 3rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        
        .gacha-input {
          width: 100%;
          max-width: 400px;
          padding: 1.25rem 1.5rem;
          background: rgba(0,0,0,0.5);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          color: white;
          font-size: 1.1rem;
          outline: none;
          text-align: center;
          transition: all 0.3s;
          margin-bottom: 2rem;
        }
        .gacha-input:focus {
          border-color: #34d399;
          box-shadow: 0 0 20px rgba(52,211,153,0.2);
        }
        
        .btn-spin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 1.25rem 3rem;
          border-radius: 1.5rem;
          font-size: 1.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 15px 30px rgba(16,185,129,0.4);
        }
        .btn-spin:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 40px rgba(16,185,129,0.5); }
        .btn-spin:active { transform: translateY(0) scale(0.95); }
        .btn-spin:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; filter: grayscale(1); }
        
        @keyframes fastSpin { 100% { transform: rotate(1080deg); } }
        @keyframes pulseGlow { 50% { box-shadow: 0 0 50px rgba(16,185,129,0.8); transform: scale(1.05); } }
        
        .box-spinning {
          animation: fastSpin 2s cubic-bezier(0.1, 0.7, 0.1, 1), pulseGlow 0.5s infinite;
        }
        
        .result-box {
          margin-top: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.2));
          border: 2px solid #34d399;
          border-radius: 1.5rem;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        
        .won-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #34d399;
          margin: 1rem 0;
          text-shadow: 0 0 20px rgba(52,211,153,0.5);
        }
        
        .status-error {
          background: rgba(239,68,68,0.1); color: #f87171; 
          border: 1px solid rgba(239,68,68,0.2);
          padding: 1rem; border-radius: 1rem; margin-top: 2rem;
          font-weight: 700;
        }
      `}</style>
      
      <div className="gacha-container">
        <div className="gacha-icon-box">
          <Sparkles size={64} color="#34d399" className={status === 'spinning' ? 'box-spinning' : ''} />
        </div>
        <h1 className="gacha-title">Gacha Center</h1>
        <p className="gacha-desc">Gunakan 200 Koin untuk mendapatkan gelar unik secara acak!</p>

        <div className="gacha-card">
          <form onSubmit={handleSpin}>
            <input 
              type="text"
              className="gacha-input" 
              placeholder="Masukkan Discord User ID Kamu"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              required
              disabled={status === 'spinning'}
            />
            <br />
            <button type="submit" className="btn-spin" disabled={status === 'spinning' || !discordId.trim()}>
              {status === 'spinning' ? 'Mengacak...' : 'SPIN (200 Koin)'}
            </button>
          </form>

          {status === 'won' && (
            <div className="result-box">
              <Gift size={48} color="#34d399" style={{ margin: '0 auto' }} />
              <h3 style={{ color: 'white', marginTop: '1rem', fontSize: '1.2rem' }}>SELAMAT! KAMU MENDAPATKAN GELAR:</h3>
              <div className="won-title">"{resultTitle}"</div>
              <div style={{ color: '#a3a3a3', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Coins size={16} /> Sisa Koin Kamu: {remainingCoins}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="status-error">
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
