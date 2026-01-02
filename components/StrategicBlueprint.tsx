import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Zap, Cpu, Layers, Database, Network, Rocket,
  ArrowRight, Box, Chrome, Eye, Link as LinkIcon, BarChart3, Lock,
  Mail, Download, ArrowLeft, Printer, FileText, CheckCircle2,
  AlertTriangle, Award, TrendingUp, Fingerprint
} from 'lucide-react';

const StrategicBlueprint: React.FC = () => {
  const [showPDF, setShowPDF] = useState(false);

  // 🟢 DATA: WHAT WE HAVE COMPLETED (STAGES 1 & 2)
  const completedTech = [
    { title: "Neural Scrutiny Engine", icon: Cpu, desc: "4000-point logic matching using Gemini 1.5 Pro to detect narrative fractures." },
    { title: "Digital DNA Lab", icon: FileSearch, desc: "Pixel-level document forensic analysis for detecting Adobe-level forgery." },
    { title: "Proxy Guard (Live)", icon: UserCheck, desc: "Biometric continuity monitoring (Vocal DNA & Lip-Sync) during live assessments." },
    { title: "Institutional Ledger", icon: Database, desc: "Immutable Supabase-backed vault for non-repudiable audit storage." }
  ];

  // 🔵 DATA: FUTURE INFRASTRUCTURE (STAGES 3 & 4)
  const futureTech = [
    { title: "VX Browser Extension", icon: Chrome, desc: "Real-time integrity sitting directly on Zoom, Teams, and Google Meet." },
    { title: "VX-Passport (Web3)", icon: LinkIcon, desc: "Soulbound NFT credentials allowing candidates to own their verified truth." },
    { title: "Institutional API", icon: Network, desc: "Plug-and-play neural backend for LinkedIn, Naukri, and Enterprise ATS." },
    { title: "Global Threat Radar", icon: Globe, desc: "Live heatmap of industrialized fraud vectors for government & MNC intelligence." }
  ];

  const handlePrint = () => { window.print(); };

  if (showPDF) {
    return (
      /* 📄 THE FULL-HISTORY INSTITUTIONAL PDF VIEW */
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <style>{`
          @media print {
            body { background: white !important; }
            .print-color { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        `}</style>
        
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPDF(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest">
            <ArrowLeft size={16} /> Return to Dashboard
          </button>
          <button onClick={handlePrint} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl">
            <Printer size={20} /> Export Full Protocol PDF
          </button>
        </div>

        <div className="bg-white text-zinc-900 p-12 md:p-16 rounded-[4rem] shadow-2xl max-w-5xl mx-auto border-[12px] border-zinc-50 print:border-none print:shadow-none print:p-0 print-color">
          {/* PDF HEADER */}
          <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-zinc-900 rounded-lg text-white shadow-lg print-color"><ShieldCheck size={32} /></div>
                 <h1 className="text-4xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 italic">Full Spectrum Integrity Blueprint</p>
            </div>
            <div className="text-right space-y-2">
               <div className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest inline-block print-color">Institutional Confidential</div>
               <p className="text-xs font-bold text-zinc-500">v1.17 | Jan 2026</p>
            </div>
          </div>

          {/* CEO MANIFESTO */}
          <div className="py-12 border-b-2 border-zinc-100">
             <h3 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4">Founder's Proclamation</h3>
             <p className="text-xl text-zinc-800 leading-relaxed font-medium italic">
                "We have moved trust from human opinion into immutable neural logic. 
                VeriTrustX is not a tool; it is the infrastructure of truth for the 24-hour global economy."
             </p>
             <p className="text-sm text-zinc-500 mt-4 leading-relaxed">— Challa Aditya, Founder & CEO</p>
          </div>

          {/* COMPLETED SECTION (STAGES 1-2) */}
          <div className="py-12">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg print-color"><CheckCircle2 size={18} /></div>
                <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900">Stage 1 & 2: Completed Engineering</h4>
             </div>
             <div className="grid grid-cols-2 gap-8">
                {completedTech.map((tech, i) => (
                  <div key={i} className="p-6 bg-emerald-50/50 border-2 border-emerald-100 rounded-[2rem] print-color">
                     <h5 className="font-black text-emerald-800 text-sm mb-2">{tech.title}</h5>
                     <p className="text-xs text-zinc-600 leading-relaxed">{tech.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* FUTURE SECTION (STAGES 3-4) */}
          <div className="py-12">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg print-color"><Rocket size={18} /></div>
                <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900">Stage 3 & 4: Evolutionary Mesh</h4>
             </div>
             <div className="grid grid-cols-2 gap-8">
                {futureTech.map((tech, i) => (
                  <div key={i} className="p-6 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2rem] print-color">
                     <h5 className="font-black text-indigo-800 text-sm mb-2">{tech.title}</h5>
                     <p className="text-xs text-zinc-600 leading-relaxed">{tech.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* ROI LOGIC SUMMARY */}
          <div className="p-10 bg-zinc-900 text-white rounded-[3rem] mt-10 print-color">
             <div className="flex items-center gap-4 mb-6">
                <TrendingUp className="text-emerald-400" />
                <h4 className="text-lg font-black uppercase">Institutional Value Matrix</h4>
             </div>
             <div className="grid grid-cols-3 gap-6 text-center">
                <div><p className="text-2xl font-black">92%</p><p className="text-[9px] uppercase opacity-60">Time Reduction</p></div>
                <div><p className="text-2xl font-black">₹12Cr+</p><p className="text-[9px] uppercase opacity-60">Annual Savings</p></div>
                <div><p className="text-2xl font-black">99.4%</p><p className="text-[9px] uppercase opacity-60">Audit Accuracy</p></div>
             </div>
          </div>

          {/* FOOTER & SIGNATURE */}
          <div className="mt-20 pt-12 border-t-4 border-zinc-900 flex justify-between items-end">
             <div className="space-y-4">
                <p className="text-sm font-black text-indigo-600">veritrustx.protocol@gmail.com</p>
                <p className="text-[9px] text-zinc-400 uppercase leading-relaxed max-w-xs">
                   © 2026 VeriTrustX Protocol. All intellectual property, logic schemas, and neural weights are the property of Challa Aditya.
                </p>
             </div>
             <div className="text-right space-y-4">
                <div className="inline-block relative">
                   <div className="absolute -top-12 -left-12 w-20 h-20 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm print-color"><ShieldCheck size={28} className="text-emerald-500" /></div>
                   <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '56px', color: '#1e1b4b', transform: 'rotate(-2deg)' }}>Challa Aditya</p>
                   <div className="h-0.5 w-64 bg-zinc-900 ml-auto mt-[-5px]"></div>
                </div>
                <p className="text-sm font-black uppercase">Challa Aditya</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">Founder & CEO, VeritrustX</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    /* 🏗️ INTERACTIVE DASHBOARD VIEW */
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-3xl space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              <Rocket size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">VeriTrustX Strategy & Evolution</span>
           </div>
           <h2 className="text-6xl font-black text-zinc-900 tracking-tighter leading-tight font-quantum">
              Protocol <br /> <span className="text-emerald-600">Blueprint.</span>
           </h2>
           <p className="text-xl text-zinc-500 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6">
              "Mapping the move from <strong>Engineering Success</strong> to <strong>Global Market Dominance</strong>."
           </p>
        </div>
        <div className="flex flex-col gap-3">
           <button 
             onClick={() => setShowPDF(true)}
             className="px-8 py-4 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-xl"
           >
              <Download size={18} /> Download Strategic Blueprint (PDF)
           </button>
           <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase text-zinc-400">
              <Lock size={12} /> Institutional Access Only
           </div>
        </div>
      </div>

      {/* COMPLETED TECHNOLOGY SECTION */}
      <div className="space-y-6">
         <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={16} /> Current Capabilities (Stages 1 & 2)
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {completedTech.map((tech, i) => (
              <div key={i} className="p-8 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm hover:border-emerald-500 transition-all group">
                 <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform"><tech.icon size={24} /></div>
                 <h5 className="font-black text-zinc-900 mb-2 uppercase tracking-tight text-xs">{tech.title}</h5>
                 <p className="text-xs text-zinc-500 leading-relaxed font-medium">{tech.desc}</p>
              </div>
            ))}
         </div>
      </div>

      {/* FUTURE TECHNOLOGY SECTION */}
      <div className="space-y-6">
         <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Zap className="text-indigo-500" size={16} /> Protocol Roadmap (Stages 3 & 4)
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {futureTech.map((tech, i) => (
              <div key={i} className="p-8 bg-zinc-950 border-2 border-zinc-800 rounded-[3rem] shadow-xl hover:border-indigo-500 transition-all group text-white">
                 <div className="p-3 bg-white/5 text-indigo-400 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform"><tech.icon size={24} /></div>
                 <h5 className="font-black text-white mb-2 uppercase tracking-tight text-xs">{tech.title}</h5>
                 <p className="text-xs text-zinc-400 leading-relaxed font-medium">{tech.desc}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

// Placeholder icon if FileSearch/UserCheck are missing from imports
const FileSearch = ({ size, className }: any) => <FileText size={size} className={className} />;
const UserCheck = ({ size, className }: any) => <Shield size={size} className={className} />;

export default StrategicBlueprint;