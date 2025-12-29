import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Activity, Cpu, Fingerprint, Info, Wallet, 
  UserMinus, ShieldCheck, Handshake, ArrowRight, 
  BrainCircuit, Loader2, BarChart3, Globe, TrendingUp
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VaultRecord } from '../App';

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

  // Simulated trend data
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
        <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-900/10 animate-in slide-in-from-top-4 duration-500">
           <div className="flex items-center gap-5">
              <div className="p-4 bg-white/20 rounded-2xl shrink-0"><Handshake size={32} /></div>
              <div>
                 <h3 className="text-xl font-black">Strategic Development Pause</h3>
                 <p className="text-sm font-medium text-emerald-50">The protocol core is stable. We are currently accepting inquiries for Series-A partnership.</p>
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
             <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Identity Firewall: ARMED & CALIBRATED</span>
          </div>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight font-quantum">
            Identity <span className="accent-text">Integrity</span> <br />
            Command Center.
          </h1>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed">
            Protecting your organization from "Ghost Hires" and Impersonation experts. We bridge the trust gap where CVs fail.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard isLoading={isLoadingStats} label="Organization Value" value={`₹${(stats.val/100000).toFixed(1)}L`} icon={Wallet} color="accent-text" tip="Calculated capital preserved through fraud detection." />
        <StatCard isLoading={isLoadingStats} label="Identity Audits" value={stats.audits} icon={Fingerprint} color="accent-text" tip="Total forensic checks completed in the current cycle." />
        <StatCard isLoading={isLoadingStats} label="Proxy Attempts Blocked" value={stats.failed} icon={UserMinus} color="text-rose-500" tip="Detections of impersonators or falsified identity vectors." />
        <StatCard isLoading={isLoadingStats} label="Verification Speed" value={stats.speed} icon={Zap} color="accent-text" tip="Mean time taken per forensic deconstruction." />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black flex items-center gap-3 font-quantum">
                   <TrendingUp className="accent-text" /> Neural Scrutiny Trend
                </h3>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full accent-bg"></div> Volume</div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Fractures</div>
                </div>
             </div>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorAudits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--brand-accent)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--brand-accent)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', padding: '1rem'}} 
                        labelStyle={{fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '10px'}}
                      />
                      <Area type="monotone" dataKey="audits" stroke="var(--brand-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorAudits)" />
                      <Area type="monotone" dataKey="fraud" stroke="#f43f5e" strokeWidth={3} fill="transparent" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HealthNode 
              title="Proxy Detection Mesh" 
              desc="Real-time monitoring for lip-sync anomalies and off-camera coaching during interviews." 
              status="Active" 
              icon={UserMinus} 
            />
            <HealthNode 
              title="Integrity Scrutinizer" 
              desc="Deep logic analysis of history timelines against institutional markers and tax data." 
              status="Online" 
              icon={ShieldCheck} 
            />
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 bg-zinc-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black flex items-center gap-3 font-quantum">
                   <Globe className="accent-text" /> Logic Readiness
                </h3>
              </div>
              <div className="space-y-6">
                 <LogicProg label="Neural Engine" val={100} color="accent-bg" />
                 <LogicProg label="Forensic Imaging" val={100} color="accent-bg" />
                 <LogicProg label="Market Scaling" val={40} color="bg-amber-500" />
              </div>
              <p className="text-[10px] font-bold text-zinc-500 mt-12 text-center uppercase tracking-widest leading-relaxed">
                Project is currently in <span className="accent-text underline">Core Logic Maturation</span> phase.
              </p>
           </div>

           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <BarChart3 size={14} className="accent-text" /> System Resources
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'Cluster Alpha', status: 'Optimal', load: '12%' },
                   { label: 'DNA Shard B', status: 'Standby', load: '4%' },
                   { label: 'Pulse Gateway', status: 'Optimal', load: '28%' }
                 ].map(node => (
                   <div key={node.label} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <span className="text-[10px] font-black text-zinc-900">{node.label}</span>
                      <span className="text-[9px] font-bold text-emerald-600">{node.status} • {node.load}</span>
                   </div>
                 ))}
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
        <span className={val === 100 ? 'accent-text' : 'text-amber-500'}>{val}% {val === 100 ? 'Stable' : 'Standby'}</span>
     </div>
     <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${val}%` }}></div>
     </div>
  </div>
);

const StatCard = ({ label, value, icon: Icon, color, tip, isLoading }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 hover:accent-border transition-all group relative overflow-hidden h-[180px] flex flex-col justify-between shadow-sm" title={tip}>
    <div className="absolute top-0 right-0 w-24 h-24 var(--brand-accent-glow) blur-3xl rounded-full translate-x-12 -translate-y-12 opacity-30"></div>
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-zinc-50 ${color} group-hover:accent-bg group-hover:text-white transition-all shadow-sm`}><Icon size={24} /></div>
      <Info size={14} className="text-zinc-300 opacity-40 hover:opacity-100 transition-opacity" />
    </div>
    <div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
      {isLoading ? (
        <div className="flex items-center gap-2 mt-2">
          <Loader2 className="animate-spin accent-text opacity-20" size={16} />
        </div>
      ) : (
        <h3 className="text-3xl font-black text-zinc-900 mt-1 animate-in fade-in slide-in-from-bottom-2 duration-500">{value}</h3>
      )}
    </div>
  </div>
);

const HealthNode = ({ title, desc, status, icon: Icon }: any) => (
  <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] hover:shadow-lg transition-all group cursor-help shadow-sm">
    <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center accent-text mb-6 group-hover:accent-bg group-hover:text-white transition-all shadow-sm border border-zinc-100">
      <Icon size={24} />
    </div>
    <h4 className="text-lg font-black text-zinc-900 mb-2">{title}</h4>
    <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6 font-medium">{desc}</p>
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${status === 'Active' || status === 'Online' ? 'accent-bg' : 'bg-amber-500'} animate-pulse`}></div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Active' || status === 'Online' ? 'accent-text' : 'text-amber-600'}`}>{status}</span>
    </div>
  </div>
);

export default Dashboard;