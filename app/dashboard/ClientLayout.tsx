"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, Trophy, Terminal, Radio, Sparkles } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Music Player", path: "/dashboard", icon: Music },
    { name: "Leaderboard", path: "/dashboard/leaderboard", icon: Trophy },
    { name: "Command Center", path: "/dashboard/command-center", icon: Terminal },
    { name: "Voice Radar", path: "/dashboard/radar", icon: Radio },
    { name: "Gacha Center", path: "/dashboard/gacha", icon: Sparkles },
  ];

  return (
    <>
      <style>{`
        /* Minimal layout resets */
        body { margin: 0; padding: 0; background: #050505; color: white; }
        * { box-sizing: border-box; }
        
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #050505;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.02);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 50;
        }
        
        @media (max-width: 768px) {
          .sidebar { display: none; } /* Basic mobile hide for now */
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .brand-logo {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #a855f7, #6366f1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(168,85,247,0.3);
          font-size: 1.2rem;
          font-weight: 900;
          color: white;
        }

        .brand-text {
          font-size: 1.3rem;
          font-weight: 900;
          background: linear-gradient(to right, #c084fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 1rem;
          text-decoration: none;
          color: #a3a3a3;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          background: rgba(168, 85, 247, 0.1);
          color: #c084fc;
          border-color: rgba(168, 85, 247, 0.2);
          box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.05);
        }

        .nav-icon {
          transition: filter 0.3s;
        }
        
        .nav-link.active .nav-icon {
          filter: drop-shadow(0 0 8px rgba(168,85,247,0.8));
        }
        
        .main-content {
          flex: 1;
          position: relative;
          min-width: 0;
        }
      `}</style>
      
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-logo">W</div>
            <div className="brand-text">W2E Super</div>
          </div>
          
          <nav className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Link href="/admin" className="nav-link" style={{ color: '#ef4444', fontWeight: 600 }}>
               ⬅ Kembali ke Admin Web
            </Link>
          </div>
        </aside>
        
        <main className="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
