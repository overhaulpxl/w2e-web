import { prisma } from "../../../lib/prisma";
import { Trophy, Medal, Star, Flame, Crown } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const stats = await prisma.discordStat.findMany({
    orderBy: [
      { level: 'desc' },
      { xp: 'desc' },
    ],
    take: 50
  });

  return (
    <>
      <style>{`
        .lb-container {
          padding: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .lb-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .lb-icon-box {
          background: rgba(234,179,8,0.1);
          padding: 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(234,179,8,0.2);
        }
        .lb-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(to right, #facc15, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .lb-desc {
          color: #a3a3a3;
          margin-top: 0.5rem;
        }
        
        .lb-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        .lb-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 0.5rem;
        }
        .lb-th {
          text-align: left;
          padding: 1rem;
          color: #a3a3a3;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .lb-tr {
          background: rgba(255,255,255,0.02);
          transition: transform 0.2s, background 0.2s;
        }
        .lb-tr:hover {
          background: rgba(255,255,255,0.05);
          transform: scale(1.01);
        }
        .lb-td {
          padding: 1rem;
          color: white;
          font-weight: 600;
        }
        .lb-td:first-child { border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; }
        .lb-td:last-child { border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; }
        
        .rank-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 50%;
          font-weight: 900; font-size: 1.1rem;
        }
        .rank-1 { background: linear-gradient(135deg, #facc15, #eab308); color: black; box-shadow: 0 0 20px rgba(234,179,8,0.4); }
        .rank-2 { background: linear-gradient(135deg, #e2e8f0, #94a3b8); color: black; }
        .rank-3 { background: linear-gradient(135deg, #fcd34d, #b45309); color: black; }
        .rank-other { background: rgba(255,255,255,0.1); color: #a3a3a3; }
        
        .user-cell {
          display: flex; align-items: center; gap: 1rem;
        }
        .user-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 1rem;
        }
        
        .level-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3);
          color: #c084fc; padding: 0.25rem 0.75rem; border-radius: 999px;
          font-size: 0.85rem;
        }
        .coin-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(234,179,8,0.15); border: 1px solid rgba(234,179,8,0.3);
          color: #facc15; padding: 0.25rem 0.75rem; border-radius: 999px;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="lb-container">
        <div className="lb-header">
          <div className="lb-icon-box">
            <Trophy size={32} color="#facc15" />
          </div>
          <div>
            <h1 className="lb-title">Global Leaderboard</h1>
            <p className="lb-desc">Top active members ranked by Level and XP.</p>
          </div>
        </div>

        <div className="lb-card">
          <table className="lb-table">
            <thead>
              <tr>
                <th className="lb-th" style={{ width: '80px' }}>Rank</th>
                <th className="lb-th">Member</th>
                <th className="lb-th" style={{ width: '150px' }}>Level (XP)</th>
                <th className="lb-th" style={{ width: '150px' }}>Wealth</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, index) => {
                const isRank1 = index === 0;
                const isRank2 = index === 1;
                const isRank3 = index === 2;
                let rankClass = 'rank-other';
                if (isRank1) rankClass = 'rank-1';
                else if (isRank2) rankClass = 'rank-2';
                else if (isRank3) rankClass = 'rank-3';

                return (
                  <tr key={stat.id} className="lb-tr">
                    <td className="lb-td">
                      <div className={`rank-badge ${rankClass}`}>
                        {isRank1 ? <Crown size={20} /> : index + 1}
                      </div>
                    </td>
                    <td className="lb-td">
                      <div className="user-cell">
                        <div className="user-avatar">
                          {(stat.displayName || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                          {stat.displayName || 'Unknown User'}
                        </span>
                      </div>
                    </td>
                    <td className="lb-td">
                      <div className="level-badge">
                        <Star size={16} /> Lvl {stat.level}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#737373', marginTop: '0.25rem', paddingLeft: '0.5rem' }}>
                        {stat.xp} / {stat.level * 100} XP
                      </div>
                    </td>
                    <td className="lb-td">
                      <div className="coin-badge">
                        <Flame size={16} /> {stat.coins} Koin
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {stats.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#a3a3a3' }}>
                    Belum ada data member. Suruh member Anda ketik `!w2edaily`!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
