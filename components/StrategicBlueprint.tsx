import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Zap, Cpu, 
  Layers, Database, Network, Rocket,
  ArrowRight, Box, Chrome, Eye, 
  Link as LinkIcon, BarChart3, Lock
} from 'lucide-react';

const StrategicBlueprint: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "The 'Live Sentinel' Mesh",
      icon: Chrome,
      badge: "PRODUCT DEPTH",
      desc: "Moving beyond dashboards into deep environmental integration.",
      features: [
        "VX Browser Extension: Real-time analysis for Zoom/Teams.",
        "Holographic Verification: AI micro-expression stress mapping.",
        "Deepfake Nullifier: Proprietary audio-visual forgery detection."
      ],
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Web3 Integrity Ledger",
      icon: LinkIcon,
      badge: "DECENTRALIZATION",
      desc: "Making professional trust immutable and candidate-owned.",
      features: [
        "VX-Passport: Soulbound NFT credentials for talent.",
        "Distributed Consensus: Blockchain-hashed audit trails.",
        "Zero-Knowledge Vetting: Verify merit without exposing PII."
      ],
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      title: "The Institutional API",
      icon: Network,
      badge: "GLOBAL SCALE",
      desc: "Transitioning from a platform to global infrastructure.",
      features: [
        "VeriTrustX-as-an-API: Plug-and-play for LinkedIn/Naukri.",
        "ATS Integration: Native logic for Workday/Greenhouse.",
        "Verified Badge Logic: Automated truth markers on job boards."
      ],
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Founder Master Control",
      icon: BarChart3,
      badge: "REVENUE GROWTH",
      desc: "Power tools for the next generation of integrity governance.",
      features: [
        "Global Threat Radar: Live map of regional fraud vectors.",
        "The Blacklist Registry: Encrypted high-risk identity database.",
        "Affiliate Logic Mesh: Viral B2B growth loops."
      ],
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-3xl space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              <Rocket size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">VeriTrustX Roadmap: Stages 3 & 4</span>
           </div>
           <h2 className="text-6xl font-black text-zinc-900 tracking-tighter leading-tight font-quantum">
              The Dominance <br /> <span className="text-emerald-600">Blueprint.</span>
           </h2>
           <p className="text-xl text-zinc-500 font-medium leading-relaxed italic">
              "We aren't building a tool. We are building the Internet's Identity Layer."
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {pillars.map((p, i) => (
          <button 
            key={i}
            onClick={() => setActivePillar(i)}
            className={`p-8 rounded-[3rem] border-4 transition-all text-left group relative overflow-hidden ${
              activePillar === i 
              ? 'bg-zinc-950 border-zinc-900 shadow-2xl scale-105' 
              : 'bg-white border-zinc-100 hover:border-emerald-200'
            }`}
          >
             {activePillar === i && (
               <div className="absolute top-0 right-0 p-6 opacity-20"><p.icon size={80} className="text-white" /></div>
             )}
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all ${
               activePillar === i ? 'bg-white text-zinc-950' : p.bg + ' ' + p.color
             }`}>
                <p.icon size={24} />
             </div>
             <span className={`text-[8px] font-black uppercase tracking-widest mb-2 block ${
               activePillar === i ? 'text-zinc-500' : p.color
             }`}>{p.badge}</span>
             <h3 className={`text-xl font-black mb-2 ${activePillar === i ? 'text-white' : 'text-zinc-900'}`}>{p.title}</h3>
          </button>
        ))}
      </div>

      {/* Expanded Logic Shard View */}
      <div className="bg-zinc-950 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden border border-white/5">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,var(--brand-accent-glow),transparent_70%)] opacity-30"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div className="space-y-8">
               <div>
                  <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">Pillar {activePillar + 1} Deep Dive</span>
                  <h3 className="text-4xl font-black font-quantum">{pillars[activePillar].title}</h3>
                  <p className="text-zinc-400 text-lg mt-4 font-medium leading-relaxed">{pillars[activePillar].desc}</p>
               </div>
               
               <div className="space-y-4">
                  {pillars[activePillar].features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                       <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                       <span className="text-sm font-bold text-zinc-200">{f}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center space-y-8">
               <div className="space-y-2">
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-500">Revenue Impact Projection</h4>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: activePillar === 2 ? '100%' : '75%' }}></div>
                  </div>
                  <p className="text-[10px] font-black text-right text-emerald-500 uppercase tracking-widest">
                     {activePillar === 2 ? 'Exponential / Infrastructure Growth' : 'High SaaS Yield'}
                  </p>
               </div>
               
               <div className="p-8 bg-black/40 rounded-3xl border border-white/5 italic text-sm text-zinc-400 leading-relaxed">
                  "By Stage 4, VeriTrustX becomes a non-optional requirement for the global workforce. An identity without a VX-Grounding is a systemic risk."
               </div>

               <button className="w-full py-5 bg-white text-zinc-950 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all">
                  Request Technical Whitepaper <ArrowRight size={20} />
               </button>
            </div>
         </div>
      </div>

      <div className="text-center">
         <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">© 2025 VeriTrustX Protocol • Stage 3 Roadmap • Intellectual Property of Challa Aditya</p>
      </div>
    </div>
  );
};

export default StrategicBlueprint;