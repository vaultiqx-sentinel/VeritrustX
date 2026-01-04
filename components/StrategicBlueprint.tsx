import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Zap, Cpu, Database, Network, Rocket,
  ArrowRight, Chrome, Link as LinkIcon, BarChart3, Lock,
  Download, ArrowLeft, Printer, CheckCircle2,
  Award, TrendingUp, Fingerprint, UserCheck, FileSearch, Shield, 
  X, Activity, FileText, AlertTriangle, Scale, Handshake
} from 'lucide-react';

// 🟢 FIX: Define the interface to accept the onAction prop
interface StrategicBlueprintProps {
  onAction?: (view: string) => void;
}

const StrategicBlueprint: React.FC<StrategicBlueprintProps> = ({ onAction }) => {
  const [showPDF, setShowPDF] = useState(false);

  const completedStages = [
    {
      stage: "Stage 01",
      title: "Neural Logic Core",
      status: "STABLE",
      items: ["4000-Point Logic Pattern Match", "Gemini 1.5 Pro Neural Uplink", "Immutable Audit Ledger"],
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      stage: "Stage 02",
      title: "Forensic Mesh",
      status: "LIVE",
      items: ["Digital DNA Pixel-Level Scrutiny", "Biometric Identity Continuity", "Proxy Guard Surveillance"],
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  const futureStages = [
    {
      stage: "Stage 03",
      title: "Strategic Scaling",
      status: "EXPANDING",
      items: ["Global API Gateway (LinkedIn/ATS)", "VX Browser Extension for Live Calls", "Automated Compliance Hub"],
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      stage: "Stage 04",
      title: "Identity Infrastructure",
      status: "VISION",
      items: ["Web3 Trust Passport (Soulbound)", "Global Fraud Threat Heatmap", "Autonomous Schema Evolution"],
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  const handlePrint = () => { window.print(); };

  if (showPDF) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20 print:p-0">
        <style>{`
          @media print {
            @page { size: A4; margin: 0; }
            body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .print-color { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            .no-print { display: none !important; }
          }
        `}</style>
        
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPDF(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest transition-all">
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
          <button onClick={handlePrint} className="px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl">
            <Printer size={20} /> Export Institutional PDF
          </button>
        </div>

        <div className="bg-white text-zinc-900 p-12 md:p-20 rounded-[4rem] shadow-2xl max-w-5xl mx-auto border-[12px] border-zinc-50 print:border-none print:shadow-none print:p-8 print-color">
          <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-12 print-color">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-zinc-900 rounded-xl text-white shadow-lg print-color"><ShieldCheck size={32} /></div>
                 <h1 className="text-4xl font-black tracking-tighter uppercase font-quantum">VeriTrustX</h1>
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Institutional Strategy & Release Roadmap</p>
            </div>
            <div className="text-right">
               <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest inline-block print-color">Core Protocol: STABLE</div>
               <p className="text-xs font-bold text-zinc-400 mt-2 uppercase">v1.18 • Jan 2026</p>
            </div>
          </div>

          <div className="py-12 border-b-2 border-zinc-100">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4">Founder's Proclamation</h3>
             <p className="text-2xl font-black text-zinc-900 leading-tight">
                "We have successfully moved trust from human opinion into immutable forensic logic. Stages 1 and 2 are fully operational. We are now scaling the global mesh."
             </p>
          </div>

          <div className="py-10">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-600 text-white rounded-lg print-color"><CheckCircle2 size={20} /></div>
                <h4 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Deployed Foundation: Stages 1 & 2</h4>
             </div>
             <div className="grid grid-cols-2 gap-8">
                {completedStages.map((s, i) => (
                  <div key={i} className="p-8 bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] print-color">
                     <p className="text-[10px] font-black text-emerald-600 mb-2">{s.stage} • {s.status}</p>
                     <h5 className="font-black text-zinc-900 text-lg mb-4">{s.title}</h5>
                     <ul className="space-y-2">
                        {s.items.map((item, idx) => (
                          <li key={idx} className="text-xs font-medium text-zinc-600 flex items-center gap-2">
                             <div className="w-1 h-1 bg-emerald-400 rounded-full"></div> {item}
                          </li>
                        ))}
                     </ul>
                  </div>
                ))}
             </div>
          </div>

          <div className="py-10">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-600 text-white rounded-lg print-color"><Rocket size={20} /></div>
                <h4 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Expansion Mesh: Stages 3 & 4</h4>
             </div>
             <div className="grid grid-cols-2 gap-8">
                {futureStages.map((s, i) => (
                  <div key={i} className="p-8 bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem] print-color">
                     <p className="text-[10px] font-black text-indigo-600 mb-2">{s.stage} • {s.status}</p>
                     <h5 className="font-black text-zinc-900 text-lg mb-4">{s.title}</h5>
                     <ul className="space-y-2">
                        {s.items.map((item, idx) => (
                          <li key={idx} className="text-xs font-medium text-zinc-600 flex items-center gap-2">
                             <div className="w-1 h-1 bg-indigo-400 rounded-full"></div> {item}
                          </li>
                        ))}
                     </ul>
                  </div>
                ))}
             </div>
          </div>

          <div className="mt-24 pt-12 border-t-4 border-zinc-900 flex justify-between items-end print-color">
             <div className="space-y-4 text-left">
                <p className="text-sm font-black text-indigo-700">veritrustx.protocol@gmail.com</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase leading-relaxed max-w-xs italic">
                   © 2026 VeriTrustX Protocol. All intellectual property, logic schemas, and neural weights are the property of Challa Aditya.
                </p>
             </div>
             <div className="text-right">
                <div className="inline-block relative mb-4">
                   <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm print-color shadow-sm">
                      <ShieldCheck size={28} className="text-emerald-500" />
                   </div>
                   <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '64px', color: '#1e1b4b', transform: 'rotate(-2deg)', lineHeight: '1' }}>
                      Challa Aditya
                   </p>
                   <div className="h-0.5 w-72 bg-zinc-900 ml-auto mt-[-5px]"></div>
                </div>
                <p className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Challa Aditya</p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Founder & Chief Executive Officer</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-zinc-100 pb-12">
        <div className="max-w-3xl space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full shadow-sm">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-700 font-quantum">Core Protocol: STABLE / V1.7</span>
           </div>
           <h2 className="text-6xl font-black text-zinc-900 tracking-tighter leading-[1.1] font-quantum uppercase">
              Strategic <br /> <span className="text-emerald-600">Blueprint.</span>
           </h2>
        </div>
        <div className="flex flex-col gap-4">
           <button onClick={() => setShowPDF(true)} className="px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl scale-105 active:scale-95">
              <Download size={20} /> Download Master 4-Stage PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white border-4 border-zinc-100 rounded-[4rem] p-12 space-y-8 shadow-sm group">
            <h4 className="text-xl font-black text-zinc-900 flex items-center gap-3 font-quantum uppercase tracking-widest"><CheckCircle2 className="text-emerald-500" /> Operational Core</h4>
            <div className="space-y-10">
               {completedStages.map((s, i) => (
                 <div key={i} className="space-y-3 group">
                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{s.stage} • {s.status}</p>
                    <h5 className="font-black text-zinc-900 text-xl uppercase group-hover:text-emerald-600 transition-colors">{s.title}</h5>
                    <div className="grid grid-cols-1 gap-2">
                       {s.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-2 text-xs font-bold text-zinc-400"><div className="w-1.5 h-1.5 bg-zinc-200 rounded-full"></div> {item}</div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-zinc-950 border-4 border-zinc-900 rounded-[4rem] p-12 space-y-8 shadow-2xl text-white group">
            <h4 className="text-xl font-black flex items-center gap-3 font-quantum uppercase tracking-widest"><Network className="text-indigo-400" /> Ecosystem Scaling</h4>
            <div className="space-y-10">
               {futureStages.map((s, i) => (
                 <div key={i} className="space-y-3 group">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{s.stage} • {s.status}</p>
                    <h5 className="font-black text-white text-xl uppercase group-hover:text-indigo-400 transition-colors">{s.title}</h5>
                    <div className="grid grid-cols-1 gap-2">
                       {s.items.map((item, idx) => (
                         <div key={idx} className="flex items-center gap-2 text-xs font-bold text-zinc-500"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> {item}</div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="p-16 bg-white border-4 border-zinc-900 text-slate-950 rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-indigo-600 to-emerald-500"></div>
         <Handshake className="mx-auto text-indigo-600" size={64} />
         <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-4xl font-black tracking-tight font-quantum">Selecting Strategic Anchors</h3>
            <p className="text-xl font-medium text-slate-600 leading-relaxed">
              VeritrustX core mesh is stable. We are currently accepting inquiries from institutional leaders to pilot the protocol in Q1 2026.
            </p>
         </div>
         <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button 
              onClick={() => onAction?.('contact-us')}
              className="px-12 py-6 bg-indigo-600 text-white font-black rounded-3xl hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 shadow-xl group"
            >
              Request Investor Packet <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => onAction?.('licensing')}
              className="px-12 py-6 bg-zinc-50 border-2 border-zinc-200 text-zinc-900 font-black rounded-3xl hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              <Scale size={20} className="text-emerald-600" /> View Licensing Mesh
            </button>
         </div>
      </div>
    </div>
  );
};

export default StrategicBlueprint;