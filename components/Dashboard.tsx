import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Info, Wallet, UserMinus, ShieldCheck, Handshake, ArrowRight, 
  Loader2, BarChart3, Globe, TrendingUp, Fingerprint
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VaultRecord } from '../types';

export interface DashboardProps {
  isHibernation?: boolean;
  records: VaultRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ isHibernation, records }) => {
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingStats(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => ({
    audits: records?.length || 0,
    failed: records?.filter(r => r.status === 'Failed' || r.trustScore < 30).length || 0,
    val: (records?.length || 0) * 15000,
    speed: "2.4m"
  }), [records]);

  const chartData = [
    { day: 'Mon', audits: 12, fraud: 2 },
    { day: 'Tue', audits: 18, fraud: 1 },
    { day: 'Wed', audits: 15, fraud: 4 },
    { day: 'Thu', audits: 22, fraud: 3 },
    { day: 'Fri', audits: 30, fraud: 5 },
    { day: 'Sat', audits: 25, fraud: 2 },
    { day: 'Sun', audits: stats.audits, fraud: stats.failed },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {isHibernation && (
        <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-900/10">
           <div className="flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-2xl shrink-0"><Handshake size={32} /></div>
              <div>
                 <h3 className="text-xl font-black">Strategic Development Pause</h3>
                 <p className="text-sm font-medium text-emerald-50">Protocol Core is stable.</p>
              </div>
           </div>
           <button className="px-8 py-4 bg-white text-emerald-600 font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-50 transition-all shrink-0">
              Partnership Inquiry <ArrowRight size={14} />
           </button>
        </div>
      )}

      <div className="relative overflow-hidden rounded-[3rem] bg-zinc-950 p-12 lg:p-16 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,var(--brand-accent-glow),transparent_70%)] opacity-40"></div>
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
             <div className="w-2 h-2 rounded-full accent-bg animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Identity Firewall: ARMED</span>
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight font-quantum">
            Identity <span className="accent-text">Integrity</span> <br />
            Command Center.
          </h1>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed">
            Protecting your organization from "Ghost Hires" and Impersonation experts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard isLoading={isLoadingStats} label="Organization Value" value={`₹${(stats.val/100000).toFixed(1)}L`} icon={Wallet} color="accent-text" tip="Capital preserved." />
        <StatCard isLoading={isLoadingStats} label="Identity Audits" value={stats.audits} icon={ShieldCheck} color="accent-text" tip="Total forensic checks." />
        <StatCard isLoading={isLoadingStats} label="Proxy Attempts Blocked" value={stats.failed} icon={UserMinus} color="text-rose-500" tip="Impersonators blocked." />
        <StatCard isLoading={isLoadingStats} label="Verification Speed" value={stats.speed} icon={Zap} color="accent-text" tip="Mean time per audit." />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black flex items-center gap-3 font-quantum text-zinc-900">
                   <TrendingUp className="accent-text" /> Neural Scrutiny Trend
                </h3>
             </div>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorAudits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                      <YAxis hide />
                      <Tooltip />
                      <Area type="monotone" dataKey="audits" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAudits)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 bg-zinc-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-xl font-black flex items-center gap-3 font-quantum mb-8">
                 <Globe className="accent-text" /> Logic Readiness
              </h3>
              <div className="space-y-6">
                 <LogicProg label="Neural Engine" val={100} color="accent-bg" />
                 <LogicProg label="Forensic Imaging" val={100} color="accent-bg" />
                 <LogicProg label="Market Scaling" val={40} color="bg-amber-500" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const LogicProg = ({ label, val, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between items-center text-[10px] font-black uppercase">
        <span className="text-zinc-500">{label}</span>
        <span className={val === 100 ? 'accent-text' : 'text-amber-500'}>{val}%</span>
     </div>
     <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${val}%` }}></div>
     </div>
  </div>
);

const StatCard = ({ label, value, icon: Icon, color, isLoading }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 relative overflow-hidden h-[180px] flex flex-col justify-between shadow-sm">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-zinc-50 ${color}`}><Icon size={24} /></div>
      <Info size={14} className="text-zinc-300 opacity-40" />
    </div>
    <div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
      {isLoading ? <Loader2 className="animate-spin accent-text opacity-20 mt-2" size={16} /> : <h3 className="text-3xl font-black text-zinc-900 mt-1">{value}</h3>}
    </div>
  </div>
);

export default Dashboard;