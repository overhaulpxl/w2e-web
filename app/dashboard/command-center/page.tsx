"use client";

import { useState } from "react";
import { Terminal, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CommandCenter() {
  const [channel, setChannel] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setStatus("sending");
    try {
      const res = await fetch("http://localhost:8081/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, message })
      });
      
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to Bot API on port 8081");
    }
  };

  return (
    <>
      <style>{`
        .cc-container {
          padding: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .cc-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .cc-icon-box {
          background: rgba(168,85,247,0.1);
          padding: 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(168,85,247,0.2);
        }
        .cc-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
        }
        .cc-desc {
          color: #a3a3a3;
          margin-top: 0.5rem;
        }
        .cc-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .form-group {
          margin-bottom: 2rem;
        }
        .form-label {
          display: block;
          font-weight: 700;
          color: #d4d4d4;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        .custom-select {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          outline: none;
          transition: border-color 0.3s;
          appearance: none;
          cursor: pointer;
        }
        .custom-select:focus { border-color: #c084fc; }
        
        .custom-textarea {
          width: 100%;
          padding: 1.25rem;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          color: white;
          font-size: 1rem;
          min-height: 150px;
          outline: none;
          resize: vertical;
          transition: border-color 0.3s;
          font-family: inherit;
        }
        .custom-textarea:focus { border-color: #c084fc; }
        
        .btn-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #a855f7, #6366f1);
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          box-shadow: 0 10px 20px rgba(168,85,247,0.3);
        }
        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 15px 25px rgba(168,85,247,0.4); }
        .btn-submit:active { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .status-msg {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 1rem; border-radius: 0.75rem; margin-top: 1.5rem;
          font-weight: 600;
        }
        .status-success { background: rgba(34,197,94,0.1); color: #4ade80; border: 1px solid rgba(34,197,94,0.2); }
        .status-error { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
      `}</style>
      
      <div className="cc-container">
        <div className="cc-header">
          <div className="cc-icon-box">
            <Terminal size={32} color="#c084fc" />
          </div>
          <div>
            <h1 className="cc-title">Command Center</h1>
            <p className="cc-desc">Broadcast messages to your Discord server directly from the web.</p>
          </div>
        </div>

        <div className="cc-card">
          <form onSubmit={handleSend}>
            <div className="form-group">
              <label className="form-label">Destination Channel</label>
              <div style={{ position: 'relative' }}>
                <select 
                  className="custom-select" 
                  value={channel} 
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <option value="general">#general (General Chat)</option>
                  <option value="bhot">#bhot (Bot Testing)</option>
                  <option value="console">#console (Admin Logs)</option>
                </select>
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  ▼
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Message Content</label>
              <textarea 
                className="custom-textarea" 
                placeholder="Type your message here... Supports Discord Markdown (*bold*, _italic_, etc)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={status === 'sending' || !message.trim()}>
              {status === 'sending' ? 'Broadcasting...' : 'Broadcast Message'}
              <Send size={20} />
            </button>

            {status === 'success' && (
              <div className="status-msg status-success">
                <CheckCircle2 size={20} /> Message broadcasted successfully to #{channel}!
              </div>
            )}
            {status === 'error' && (
              <div className="status-msg status-error">
                <AlertCircle size={20} /> {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
