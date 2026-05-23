'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Users, Volume2, Shield, Settings, Activity, Crown } from 'lucide-react';

export default function BotDashboard() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [apiUrl, setApiUrl] = useState('/api/bot/server');
  const [isEditingApi, setIsEditingApi] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const json = await res.json();
        
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
          setError('');
          setLastUpdated(new Date());
        }
      } catch (err) {
        setError('Connection failed. Make sure the W2E Bot API is accessible.');
      }
    };

    fetchData(); // Initial fetch
    
    interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pb-20 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 pt-24">
        
        {/* Header & Settings */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              W2E Telemetry
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              Live Server Radar • Last sync: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3 w-full md:w-auto shadow-2xl">
            <Settings className="w-5 h-5 text-gray-400" />
            {isEditingApi ? (
              <input 
                type="text" 
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                onBlur={() => setIsEditingApi(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingApi(false)}
                className="bg-black/50 border border-white/20 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 w-64"
                autoFocus
              />
            ) : (
              <div 
                onClick={() => setIsEditingApi(true)}
                className="cursor-pointer text-sm text-gray-300 hover:text-white transition-colors"
              >
                {apiUrl}
              </div>
            )}
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3"
          >
            <Shield className="w-5 h-5" />
            <p>{error}</p>
          </motion.div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Server Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  {data.icon_url ? (
                    <img src={data.icon_url} alt="Server Icon" className="w-24 h-24 rounded-full border-4 border-white/10 shadow-lg mb-4" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg border-4 border-white/10">
                      <Server className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-1">{data.name}</h2>
                  <p className="text-gray-400 text-sm mb-6">{data.description || 'Exclusive Private Server'}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                      <Users className="w-6 h-6 text-blue-400 mb-2 mx-auto" />
                      <div className="text-2xl font-bold">{data.member_count}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Members</div>
                    </div>
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                      <Crown className="w-6 h-6 text-pink-400 mb-2 mx-auto" />
                      <div className="text-2xl font-bold">{data.premium_subscription_count}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Boosts</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                   <Shield className="w-5 h-5 text-purple-400" />
                   Security Roles
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {data.roles?.slice(0, 15).map((role: any) => (
                     <span key={role.id} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/5 text-gray-300">
                       {role.name}
                     </span>
                   ))}
                   {data.roles?.length > 15 && (
                     <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-500">
                       +{data.roles.length - 15} more
                     </span>
                   )}
                 </div>
              </div>
            </motion.div>

            {/* Right Column: Radar Data */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Volume2 className="w-6 h-6 text-green-400" />
                    Live Voice Radar
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-green-400">Scanning</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {data.voice_channels?.map((channel: any) => {
                    const isActive = channel.connected_members > 0;
                    return (
                      <div 
                        key={channel.id} 
                        className={`p-4 rounded-2xl border transition-all duration-500 flex items-center justify-between ${
                          isActive 
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/5 border-green-500/30' 
                            : 'bg-black/20 border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                            <Volume2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className={`font-semibold ${isActive ? 'text-green-300' : 'text-gray-300'}`}>
                              {channel.name}
                            </div>
                            <div className="text-xs text-gray-500 font-mono mt-1">ID: {channel.id}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className={`w-4 h-4 ${isActive ? 'text-green-400' : 'text-gray-600'}`} />
                          <span className={`font-mono text-lg ${isActive ? 'text-white' : 'text-gray-600'}`}>
                            {channel.connected_members}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {data.voice_channels?.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                      No voice channels found.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        )}
        
        {!data && !error && (
          <div className="flex flex-col items-center justify-center py-32 text-gray-500">
            <Activity className="w-12 h-12 mb-4 animate-pulse text-blue-500" />
            <p>Establishing secure connection to W2E Telemetry...</p>
          </div>
        )}
      </div>
    </div>
  );
}
