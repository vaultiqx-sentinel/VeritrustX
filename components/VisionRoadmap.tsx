import React, { useState } from 'react';
import { 
  CheckCircle2, Rocket, Map, 
  ArrowRight, Globe, ShieldCheck, 
  Cpu, Target, Handshake,
  DollarSign, TrendingUp, Search,
  Zap, AlertCircle
} from 'lucide-react';

export default function VisionRoadmap() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const milestones = [
    {
      stage: "Stage 01",
      title: "Neural Logic Core",
      desc: "Complete architecture of the low-code logic engine. Forensic DNA imaging and Proxy Guard protocols are 100% stable.",
      status: "STABLE",
      readiness: 100,
      investment: "Engineering Complete",
      icon: Cpu,
      color: "bg-emerald-500",
      items: ["Gemini 3 Integration", "Visual DNA Autopsy", "State Observation Table"]
    },
    {
      stage: "Stage 02",
      title: "Strategic Beta Mesh",
      desc: "Closed testing with select high-growth partners. Refining the BGV Vault and Audit History ledger for enterprise scale.",
      status: "ACTIVE",
      readiness: 65,
      investment: "Seeking Strategic Partner",
      icon: ShieldCheck,
      color: "bg-indigo-600",
      items: ["Bulk Forensic Processing", "API Hookup for HRMS", "Custom Logic Designer"]
    },
    {
      stage: "Stage 03",
      title: "Market Expansion",
      desc: "Universal release of the VeritrustX Trust-as-a-Service model. Deployment of the Global Identity Firewall.",
      status: "PLANNED",
      readiness: 0,
      investment: "Series-A Phase",
      icon: Globe,
      color: "bg-slate-700",
      items: ["Multilingual Verification", "Auto-SLA Generation", "Enterprise Trust Token"]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="max-w-2xl space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Map size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-quantum">Official Release Roadmap</span>
           </div>
           <h2 className="text-6xl font-black text-white tracking-tight leading-tight">
              Protocol <br />
              <span className="text-emerald-500">Commercial Vision</span>
           </h2>
           <p className="text-slate-400 font-medium text-lg leading-relaxed">
              VeritrustX is currently in its **Core Protocol Optimization** phase. While the neural logic is fully operational, we are pausing mass-market scaling to align with strategic investment partners.
           </p>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-white/5 space-y-4 w-full lg:w-96 shadow-2xl">
           <div className="flex items-center gap-3 mb-2">
              <Target className="text-indigo-500" />
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Protocol Health</h4>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <span className="text-xs text-slate-500 font-bold uppercase">Logic Engineering</span>
                 <span className="text-xs text-emerald-500 font-black">100% (STABLE)</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                 <span className="text-xs text-slate-500 font-bold uppercase">Global Market Mesh</span>
                 <span className="text-xs text-orange-500 font-black">40% (PAUSED)</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-500" style={{ width: '40%' }}></div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {milestones.map((m, i) => (
          <div 
            key={i} 
            onClick={() => setActiveStage(i)}
            className={`p-10 rounded-[3.5rem] border transition-all cursor-pointer group relative overflow-hidden ${
              activeStage === i ? 'bg-indigo-600/10 border-indigo-500/50 shadow-2xl' : 'bg-slate-900/40 border-white/5 hover:border-white/10'
            }`}
          >
             {m.status === 'STABLE' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
             )}
             <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${m.color} text-white shadow-xl`}><m.icon size={24} /></div>
                <span className={`text-[8px] font-black px-2 py-1 rounded border uppercase tracking-widest ${
                  m.status === 'STABLE' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' :
                  m.status === 'ACTIVE' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20 animate-pulse' :
                  'bg-slate-800 text-slate-500 border-white/5'
                }`}>{m.status}</span>
             </div>
             <h3 className="text-2xl font-black text-white mb-2">{m.title}</h3>
             <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{m.desc}</p>
             
             <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Ready</span>
                   <span className="text-xs font-black text-white">{m.readiness}%</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Funding Goal</span>
                   <span className={`text-xs font-black ${m.investment.includes('Complete') ? 'text-emerald-500' : 'text-indigo-400'}`}>{m.investment}</span>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="p-12 bg-white text-slate-950 rounded-[4rem] text-center space-y-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500"></div>
         <Handshake className="mx-auto text-indigo-600" size={48} />
         <h3 className="text-4xl font-black tracking-tight">Seeking Strategic Anchors</h3>
         <p className="text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
           VeritrustX has achieved **Neural Logic Stability**. We are now selecting strategic partners to transition the protocol from engineering success to market dominance.
         </p>
         <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <button className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl">
              Request Investor Packet <ArrowRight size={18} />
            </button>
            <button className="px-10 py-5 bg-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
              <DollarSign size={18} /> Financial Roadmap
            </button>
         </div>
      </div>
    </div>
  );
}