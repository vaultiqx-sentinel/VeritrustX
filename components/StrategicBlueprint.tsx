import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Zap, Cpu, 
  Layers, Database, Network, Rocket,
  ArrowRight, Box, Chrome, Eye, 
  Link as LinkIcon, BarChart3, Lock,
  Mail, Download, ArrowLeft, Printer,
  FileText, CheckCircle2
} from 'lucide-react';

const StrategicBlueprint: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);
  const [showPDF, setShowPDF] = useState(false);

  const pillars = [
    {
      title: "The 'Live Sentinel' Mesh",
      icon: Chrome,
      badge: "PRODUCT DEPTH",
      desc: "Moving beyond dashboards into deep environmental integration. Real-time scrutiny during the interview event.",
      features: [
        "VX Browser Extension: Real-time biometric analysis for Zoom/Teams.",
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
      desc: "Making professional trust immutable, candidate-owned, and globally portable.",
      features: [
        "VX-Passport: Soulbound NFT credentials for talent ecosystem.",
        "Distributed Consensus: Blockchain-hashed audit trails.",
        "Zero-Knowledge Vetting: Verify merit without exposing raw PII."
      ],
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      title: "The Institutional API",
      icon: Network,
      badge: "GLOBAL SCALE",
      desc: "Transitioning from a platform to global infrastructure. VeriTrustX as the backend of the internet.",
      features: [
        "VeriTrustX-as-an-API: Plug-and-play for LinkedIn/Naukri/Indeed.",
        "ATS Integration: Native logic for Workday, Greenhouse, and Lever.",
        "Verified Badge Logic: Automated truth markers on global job boards."
      ],
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      title: "Founder Master Control",
      icon: BarChart3,
      badge: "REVENUE GROWTH",
      desc: "Governance tools for the next generation of institutional integrity.",
      features: [
        "Global Threat Radar: Live map of regional fraud vectors and trends.",
        "The Blacklist Registry: Encrypted high-risk identity database.",
        "Affiliate Logic Mesh: Viral B2B growth loops for anchor clients."
      ],
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  const handlePrint = () => { window.print(); };

  if (showPDF) {
    return (
      /* 📄 THE INSTITUTIONAL BLUEPRINT PDF VIEW */
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPDF(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest">
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
          <button onClick={handlePrint} className="px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl">
            <Printer size={20} /> Export Strategic PDF
          </button>
        </div>

        <div className="bg-white text-zinc-900 p-16 rounded-[4rem] shadow-2xl max-w-5xl mx-auto border-[12px] border-zinc-50 print:border-none print:shadow-none print:p-0">
          {/* PDF HEADER */}
          <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-zinc-900 rounded-lg text-white shadow-lg"><ShieldCheck size={32} /></div>
                 <h1 className="text-4xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Stage 3 & 4 Dominance Blueprint</p>
            </div>
            <div className="text-right space-y-2">
               <div className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest inline-block">Institutional Confidential</div>
               <p className="text-xs font-bold text-zinc-500">Document ID: VX-STRAT-2026-ALPHA</p>
            </div>
          </div>

          {/* MANIFESTO SUMMARY */}
          <div className="py-12 border-b border-zinc-100">
             <h3 className="text-2xl font-black mb-4">Executive Summary</h3>
             <p className="text-lg text-zinc-600 leading-relaxed font-medium italic">
                "We aren't building a tool. We are building the Internet's Identity Layer. 
                By 2027, an identity without a VX-Grounding will be a non-starter in the 
                global high-privilege talent market."
             </p>
          </div>

          {/* PILLARS FOR PDF */}
          <div className="grid grid-cols-1 gap-12 py-12">
             {pillars.map((p, i) => (
               <div key={i} className="space-y-6">
                  <div className="flex items-center gap-4">
                     <span className="text-5xl font-black text-zinc-100">{i + 1}</span>
                     <h4 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">{p.title}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                     <p className="text-sm text-zinc-500 font-medium leading-relaxed">{p.desc}</p>
                     <div className="space-y-3">
                        {p.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-zinc-800 uppercase tracking-tight">
                             <CheckCircle2 className="text-emerald-500" size={14} /> {f}
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             ))}
          </div>

          {/* SIGNATURE & CONTACT */}
          <div className="mt-20 pt-12 border-t-4 border-zinc-900 grid grid-cols-2 gap-20">
             <div className="space-y-6">
                <div>
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Direct Forensic Uplink</p>
                   <p className="text-lg font-black text-indigo-600">veritrustx.protocol@gmail.com</p>
                </div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase leading-relaxed">
                   © 2026 VeriTrustX Protocol. All intellectual property, neural weights, and logic schemas 
                   contained herein are the property of Challa Aditya.
                </p>
             </div>

             <div className="text-right space-y-4">
                <div className="inline-block relative">
                   <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm">
                      <ShieldCheck size={32} className="text-emerald-500" />
                   </div>
                   <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '56px', color: '#1e1b4b', transform: 'rotate(-2deg)' }}>
                      Challa Aditya
                   </p>
                   <div className="h-0.5 w-64 bg-zinc-900 ml-auto mt-[-10px]"></div>
                </div>
                <div>
                   <p className="text-md font-black text-zinc-900 uppercase">Challa Aditya</p>
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Founder & CEO, VeritrustX</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    /* 🏗️ THE DASHBOARD VIEW (INTERACTIVE) */
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
           <p className="text-xl text-zinc-500 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6">
              "We aren't building a tool. We are building the Internet's Identity Layer."
           </p>
        </div>
        <div className="flex flex-col gap-3">
           <button 
             onClick={() => setShowPDF(true)}
             className="px-8 py-4 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-xl"
           >
              <Download size={18} /> Download Full Blueprint (PDF)
           </button>
           <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase text-zinc-400">
              <Lock size={12} /> Institutional Access Required
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {pillars.map((p, i) => (
          <button 
            key={i}
            onClick={() => setActivePillar(i)}
            className={`p-8 rounded-[3rem] border-4 transition-all text-left group relative overflow-hidden ${
              activePillar === i 
              ? 'bg-zinc-950 border-zinc-900 shadow-2xl scale-105 z-10' 
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

      {/* Expanded Shard View */}
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
               <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-500">Revenue Impact Projection</h4>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: activePillar === 2 ? '100%' : '75%' }}></div>
                  </div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                     {activePillar === 2 ? 'Exponential / Infrastructure Volume' : 'High Performance SaaS Yield'}
                  </p>
               </div>
               
               <div className="p-8 bg-black/40 rounded-3xl border border-white/5 italic text-sm text-zinc-400 leading-relaxed">
                  "By Stage 4, VeriTrustX becomes a non-optional requirement for the global workforce."
               </div>

               <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => window.location.href = 'mailto:veritrustx.protocol@gmail.com?subject=Strategic Anchor Inquiry'}
                    className="w-full py-5 bg-white text-zinc-950 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all"
                  >
                     Request Technical Whitepaper <ArrowRight size={20} />
                  </button>
                  <p className="text-center text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Contact CEO: veritrustx.protocol@gmail.com</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StrategicBlueprint;