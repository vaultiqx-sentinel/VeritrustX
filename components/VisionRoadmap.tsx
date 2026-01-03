import React, { useState } from 'react';
import { 
  CheckCircle2, Rocket, Map, 
  ArrowRight, Globe, ShieldCheck, 
  Cpu, Target, Handshake,
  DollarSign, TrendingUp, Search,
  Zap, AlertCircle, FileText, ChevronRight,
  Lock, Network, Chrome, Link as LinkIcon, BarChart3, Scale
} from 'lucide-react';

interface VisionRoadmapProps {
  onAction?: (view: string) => void;
}

const VisionRoadmap: React.FC<VisionRoadmapProps> = ({ onAction }) => {
  const [activeStage, setActiveStage] = useState<number | null>(0);

  const handleRequestPacket = () => {
    alert("Investor Uplink Initiated. Redirecting to Secure Forensic Desk...");
    if (onAction) onAction('contact-us');
  };

  const handleFinancialRoadmap = () => {
    if (onAction) onAction('licensing');
  };

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
      shards: ["4000-Point Pattern Match", "Gemini 1.5 Pro Uplink", "Non-Repudiable Hashing", "Institutional Ledger Sync"]
    },
    {
      stage: "Stage 02",
      title: "Forensic Mesh",
      desc: "Closed testing with select high-growth partners. Refining the BGV Vault and Audit History ledger for enterprise scale.",
      status: "LIVE",
      readiness: 100,
      investment: "Operational Alpha",
      icon: ShieldCheck,
      color: "bg-emerald-600",
      shards: ["Digital DNA Pixel Scrutiny", "Vocal Harmonic Continuity", "Lip-Sync Latency Forensic", "Proxy Guard Sentinel"]
    },
    {
      stage: "Stage 03",
      title: "Strategic Ecosystem",
      desc: "Universal release of the VeritrustX Trust-as-a-Service model. Deployment of the Global Identity Firewall.",
      status: "SCALING",
      readiness: 45,
      investment: "Series-A Phase",
      icon: Network,
      color: "bg-indigo-600",
      shards: ["Global API Gateway", "VX Browser Extension", "ATS Native Integration", "Automated Compliance Hub"]
    },
    {
      stage: "Stage 04",
      title: "Identity Infrastructure",
      status: "VISION",
      readiness: 10,
      investment: "Global Standard",
      icon: Globe,
      color: "bg-zinc-900",
      shards: ["Web3 Trust Passport", "Global Threat Radar", "Neural Schema Evolution", "Quantum-Safe Ledger"]
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* 🔘 HEADER: EXECUTIVE SUMMARY */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-zinc-100 pb-12">
        <div className="max-w-3xl space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full shadow-sm">
              <Map size={14} className="text-emerald-600" />
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700 font-quantum">Official Release Roadmap v1.18</span>
           </div>
           <h2 className="text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] font-quantum">
              Protocol <br />
              <span className="text-indigo-600">Commercial Vision</span>
           </h2>
           <p className="text-xl text-zinc-500 font-medium leading-relaxed italic border-l-8 border-emerald-500 pl-8">
              VeritrustX is moving from <strong>Engineering Stability</strong> to <strong>Global Market Dominance</strong>. We are building the infrastructure of professional truth.
           </p>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border-4 border-zinc-100 space-y-4 w-full lg:w-96 shadow-sm">
           <div className="flex items-center gap-3 mb-2">
              <Target className="text-indigo-600" />
              <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Protocol Health Index</h4>
           </div>
           <div className="space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-400">
                    <span>Logic Engineering</span>
                    <span className="text-emerald-600">100% (STABLE)</span>
                 </div>
                 <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }}></div>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-400">
                    <span>Market Mesh Expansion</span>
                    <span className="text-indigo-600">42% (ACTIVE)</span>
                 </div>
                 <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: '42%' }}></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 🚀 THE 4-STAGE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, i) => (
          <div 
            key={i} 
            onClick={() => setActiveStage(i)}
            className={`p-8 rounded-[3.5rem] border-4 transition-all cursor-pointer group relative overflow-hidden h-full flex flex-col ${
              activeStage === i ? 'bg-indigo-50 border-indigo-200 shadow-xl scale-[1.03] z-10' : 'bg-white border-zinc-50 hover:border-zinc-100 hover:shadow-md'
            }`}
          >
             <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${m.color} text-white shadow-lg`}><m.icon size={28} /></div>
                <span className={`text-[9px] font-black px-2.5 py-1 rounded border uppercase tracking-widest ${
                  m.status === 'STABLE' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  m.status === 'ACTIVE' || m.status === 'LIVE' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 animate-pulse' :
                  m.status === 'SCALING' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                  'bg-zinc-100 text-zinc-400 border-zinc-200'
                }`}>{m.status}</span>
             </div>
             
             <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black text-zinc-900 leading-tight">{m.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{m.desc}</p>
                
                <div className="pt-4 space-y-2">
                   {m.shards.map((shard, idx) => (
                     <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                        <div className={`w-1 h-1 rounded-full ${activeStage === i ? 'bg-indigo-400' : 'bg-zinc-300'}`}></div> {shard}
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-8 pt-6 border-t-2 border-zinc-50 flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-300 uppercase">{m.stage}</span>
                <span className={`text-[10px] font-black uppercase ${m.readiness === 100 ? 'text-emerald-500' : 'text-indigo-400'}`}>{m.readiness}% READY</span>
             </div>
          </div>
        ))}
      </div>

      {/* 📋 PROTOCOL INTEGRITY AXIOMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="p-10 bg-zinc-50 border-2 border-zinc-100 rounded-[3rem] space-y-4">
            <Lock className="text-indigo-600" size={32} />
            <h4 className="text-xl font-black text-zinc-900 font-quantum uppercase">Immutability</h4>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">Every forensic scan is cryptographically hashed and stored on our distributed ledger, ensuring results cannot be repudiated by candidates or vendors.</p>
         </div>
         <div className="p-10 bg-zinc-50 border-2 border-zinc-100 rounded-[3rem] space-y-4">
            <Scale className="text-emerald-600" size={32} />
            <h4 className="text-xl font-black text-zinc-900 font-quantum uppercase">Neutral Ethics</h4>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">Our logic mesh is calibrated to ignore gender, age, and race markers, focusing exclusively on technical logic and institutional continuity.</p>
         </div>
         <div className="p-10 bg-zinc-50 border-2 border-zinc-100 rounded-[3rem] space-y-4">
            <TrendingUp className="text-indigo-600" size={32} />
            <h4 className="text-xl font-black text-zinc-900 font-quantum uppercase">Capital ROI</h4>
            <p className="text-sm text-zinc-500 font-medium leading-relaxed">By reducing BGV lag from 15 days to under 4 minutes, we preserve firm equity and eliminate the ₹50L+ loss per fraudulent hire.</p>
         </div>
      </div>

      {/* 🚀 THE STRATEGIC ANCHOR CTA */}
      <div className="p-16 bg-zinc-900 text-white rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500"></div>
         <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto border border-white/10 shadow-inner">
            <Handshake className="text-emerald-400" size={48} />
         </div>
         <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-5xl font-black tracking-tight font-quantum">Selecting Strategic Anchors</h3>
            <p className="text-xl font-medium text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              VeritrustX has achieved logic stability. We are now selecting 5 institutional leaders to pilot the protocol and set the new global standard for merit.
            </p>
         </div>
         
         <div className="flex flex-col md:flex-row gap-6 justify-center pt-4">
            <button 
               onClick={handleRequestPacket}
               className="px-12 py-6 bg-indigo-600 text-white font-black rounded-3xl hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl group scale-105"
            >
              Request Investor Packet 
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
               onClick={handleFinancialRoadmap}
               className="px-12 py-6 bg-white/5 border-2 border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <DollarSign size={20} className="text-emerald-400" /> View Financial Roadmap
            </button>
         </div>
      </div>

      {/* 🖋️ INSTITUTIONAL FOOTER */}
      <div className="mt-20 flex flex-col md:flex-row justify-between items-end gap-12 pt-12 border-t-2 border-zinc-100 px-10">
         <div className="space-y-6">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Institutional Direct Uplink</p>
               <p className="text-2xl font-black text-indigo-700">veritrustx.protocol@gmail.com</p>
            </div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase leading-relaxed max-w-sm italic">
               © 2026 VeriTrustX Protocol. All intellectual property, logic weights, and forensic schemas contained herein are the absolute property of Challa Aditya.
            </p>
         </div>
         <div className="text-right">
            <div className="inline-block relative mb-6">
               <div className="absolute -top-16 -left-16 w-32 h-32 border-4 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm shadow-sm">
                  <div className="text-center">
                    <ShieldCheck size={28} className="text-emerald-500 mx-auto" />
                    <p className="text-[8px] font-black text-emerald-600 uppercase mt-1">Verified Node</p>
                  </div>
               </div>
               {/* CEO EDWARDIAN SIGNATURE */}
               <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '72px', color: '#1e1b4b', transform: 'rotate(-2deg)', lineHeight: '1' }}>
                  Challa Aditya
               </p>
               <div className="h-1 w-80 bg-zinc-900 ml-auto mt-2 shadow-sm"></div>
            </div>
            <p className="text-lg font-black text-zinc-900 uppercase tracking-widest">Challa Aditya</p>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mt-1">Founder & Chief Executive Officer</p>
         </div>
      </div>
    </div>
  );
}

export default VisionRoadmap;