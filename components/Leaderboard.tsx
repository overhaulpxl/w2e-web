'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';

interface LeaderboardUser {
  userId: string;
  name: string;
  image: string | null;
  totalRp: number;
  totalRobux: number;
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-8 mt-4 text-white/50">Memuat Leaderboard...</div>;
  if (data.length === 0) return null;

  return (
    <div className="w-full bg-white/[0.01] backdrop-blur-2xl border border-white/5 rounded-3xl p-8 mt-8 relative overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02]">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-glow rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="flex items-center gap-4 mb-8">
        <Trophy className="text-amber-400 opacity-90" size={24} />
        <h2 className="text-xl font-bold tracking-tight text-white">
          Sultan of the Month
        </h2>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        {data.map((user, index) => {
          // Mask the name slightly except for first 3 chars
          const maskedName = user.name.length > 3 
            ? user.name.substring(0, 3) + '***' 
            : user.name + '***';

          return (
            <motion.div
              key={user.userId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:bg-white/[0.03] ${
                index === 0 ? 'bg-amber-500/[0.02] border-amber-500/10' :
                index === 1 ? 'bg-white/[0.01] border-white/[0.05]' :
                index === 2 ? 'bg-orange-500/[0.01] border-orange-500/[0.05]' :
                'bg-transparent border-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center w-8 font-bold">
                  {index === 0 ? <Trophy className="text-amber-400" size={24} /> :
                   index === 1 ? <Medal className="text-gray-300" size={24} /> :
                   index === 2 ? <Medal className="text-orange-500" size={24} /> :
                   <span className="text-white/40">#{index + 1}</span>}
                </div>
                
                <img 
                  src={user.image || 'https://cdn.discordapp.com/embed/avatars/0.png'} 
                  alt="avatar" 
                  className={`w-10 h-10 rounded-full border-2 ${
                    index === 0 ? 'border-amber-400' :
                    index === 1 ? 'border-gray-300' :
                    index === 2 ? 'border-orange-500' :
                    'border-transparent'
                  }`}
                />
                
                <div>
                  <div className="font-semibold text-white/90">{maskedName}</div>
                  <div className="text-xs text-white/50 flex items-center gap-1 mt-1">
                    <Star size={12} className="text-amber-400" /> W2E VIP
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-amber-400">{user.totalRobux.toLocaleString()} R$</div>
                <div className="text-sm text-white/40">Rp {user.totalRp.toLocaleString()}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
