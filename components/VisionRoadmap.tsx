import React, { useState } from 'react';
import { 
  CheckCircle2, Rocket, Map, 
  ArrowRight, Globe, ShieldCheck, 
  Cpu, Target, Handshake,
  DollarSign, TrendingUp, Search,
  Zap, AlertCircle, FileText, ChevronRight
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
      items: ["Gemini 1.5 Pro Integration", "Visual DNA Autopsy", "State Observation Table"]
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
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <Map size={14} className="text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 font-quantum">Official Release Roadmap</span>
           </div>
           <h2 className="text-6xl font-black text-zinc-900 tracking-tight leading-tight">
              Protocol <br />
              <span className="text-indigo-600">Commercial Vision</span>
           </h2>
           <p className="text-zinc-500 font-bold text-lg leading-relaxed border-l-4 border-indigo-500 pl-6 italic">
              VeritrustX is moving from engineering success to market dominance.
           </p>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border-4 border-zinc-100 space-y-4 w-full lg:w-96 shadow-sm">
           <div className="flex items-center gap-3 mb-2">
              <Target className="text-indigo-600" />
              <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Protocol Health</h4>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <span className="text-xs text-zinc-400 font-bold uppercase">Logic Engineering</span>
                 <span className="text-xs text-emerald-600 font-black">100% (STABLE)</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                 <span className="text-xs text-zinc-400 font-bold uppercase">Market Adoption</span>
                 <span className="text-xs text-indigo-600 font-black">40% (ACTIVE)</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-600" style={{ width: '40%' }}></div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {milestones.map((m, i) => (
          <div 
            key={i} 
            onClick={() => setActiveStage(i)}
            className={`p-10 rounded-[3.5rem] border-4 transition-all cursor-pointer group relative overflow-hidden ${
              activeStage === i ? 'bg-indigo-50 border-indigo-200 shadow-xl scale-[1.02]' : 'bg-white border-zinc-100 hover:border-zinc-200'
            }`}
          >
             <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${m.color} text-white shadow-lg`}><m.icon size={24} /></div>
                <span className={`text-[8px] font-black px-2 py-1 rounded border uppercase tracking-widest ${
                  m.status === 'STABLE' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  m.status === 'ACTIVE' ? 'bg-indigo-100 text-indigo-700 border-indigo-200 animate-pulse' :
                  'bg-zinc-100 text-zinc-400 border-zinc-200'
                }`}>{m.status}</span>
             </div>
             <h3 className="text-2xl font-black text-zinc-900 mb-2">{m.title}</h3>
             <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6">{m.desc}</p>
             
             <div className="space-y-4 pt-6 border-t-2 border-zinc-50">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Logic Maturity</span>
                   <span className="text-xs font-black text-zinc-900">{m.readiness}%</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Funding Goal</span>
                   <span className={`text-xs font-black ${m.investment.includes('Complete') ? 'text-emerald-600' : 'text-indigo-600'}`}>{m.investment}</span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* 🚀 THE ACTIVATED CTA SECTION */}
      <div className="p-12 bg-zinc-900 text-white rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500"></div>
         <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 shadow-inner">
            <Handshake className="text-emerald-400" size={40} />
         </div>
         <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-4xl font-black tracking-tight font-quantum">Seeking Strategic Anchors</h3>
            <p className="text-lg font-medium text-zinc-400 leading-relaxed">
              VeritrustX has achieved **Neural Logic Stability**. We are now selecting strategic partners to transition the protocol from engineering success to market dominance.
            </p>
         </div>
         
         <div className="flex flex-col md:flex-row gap-6 justify-center pt-4">
            <button 
               onClick={handleRequestPacket}
               className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl group"
            >
              Request Investor Packet 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
               onClick={handleFinancialRoadmap}
               className="px-10 py-5 bg-white/5 border-2 border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <DollarSign size={18} className="text-emerald-400" /> View Financial Roadmap
            </button>
         </div>
         
         <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Non-Disclosure Agreement (NDA) Required for Stage 3 Documentation</p>
      </div>
    </div>
  );
}

export default VisionRoadmap;