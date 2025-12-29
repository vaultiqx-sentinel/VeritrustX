
import React from 'react';
import { Database, Binary, Globe, ScanFace, CheckCircle2, Camera, Search } from 'lucide-react';

const TruthEngine: React.FC = () => {
  const protocols = [
    {
      id: 'ela',
      title: "Error Level Analysis (ELA)",
      icon: Binary,
      desc: "Detects pixel-level compression inconsistencies that occur when text is digitally altered in PDFs.",
      method: "Digital Image Forensics",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      id: 'template',
      title: "Template Fingerprinting",
      icon: ScanFace,
      desc: "Compares document layout against a database of 10,000+ official University & Organization templates.",
      method: "Layout Pattern Matching",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      id: 'source',
      title: "Source-Direct Validation",
      icon: Database,
      desc: "Bypasses the paper copy entirely by connecting directly to University Registrars and EPFO origins.",
      method: "Real-time API Bridge",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      id: 'entity',
      title: "Ghost Employer Detection",
      icon: Globe,
      desc: "Cross-references domain registration and GST filing dates to ensure companies existed during the tenure.",
      method: "Business Registry Audit",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">
          Truth <span className="text-orange-600">Architecture</span>
        </h2>
        <p className="text-lg text-slate-400 font-medium leading-relaxed">
          VeriTrustX doesn't just scan; it performs digital autopsies. Our protocol detects the difference between an old scan and a fresh fabrication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {protocols.map((p) => (
          <div key={p.id} className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 hover:border-orange-500/20 transition-all group">
            <div className={`w-16 h-16 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <p.icon size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">{p.title}</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">{p.desc}</p>
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
               <div>
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Logic Tier</p>
                  <p className="text-sm font-bold text-white">{p.method}</p>
               </div>
               <CheckCircle2 className="text-emerald-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 rounded-[4rem] p-12 text-white border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_50%)]"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-6">
              <h3 className="text-3xl font-black italic">Analog Aging vs Digital Scars</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                 Our neural model is trained to understand how real paper ages vs how pixels are manipulated in software.
              </p>
              <div className="space-y-4">
                 <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex gap-5">
                    <Camera className="text-orange-500 shrink-0" />
                    <div>
                       <h4 className="font-bold text-white">Analog Signature</h4>
                       <p className="text-xs text-slate-500 mt-1">Detects natural grain, micro-folds, and ink bleed typical of physical documents.</p>
                    </div>
                 </div>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex gap-5">
                    <Binary className="text-rose-500 shrink-0" />
                    <div>
                       <h4 className="font-bold text-white">Digital Manipulation</h4>
                       <p className="text-xs text-slate-500 mt-1">Identifies 'Perfect Pixels' that shouldn't exist in a real scan of a physical paper.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                 <Search className="text-orange-600" />
                 <h4 className="font-black text-xl tracking-tight">Forensic Cluster <span className="text-slate-600 text-sm font-medium">#VT-9021</span></h4>
              </div>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-1 h-12 bg-emerald-500 rounded-full"></div>
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scan Authenticity</p>
                       <p className="text-sm font-bold text-emerald-500">Uniform grain across document. Physical paper existence confirmed.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-1 h-12 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                    <div>
                       <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Logic Mismatch</p>
                       <p className="text-sm font-bold text-rose-500">Template Error: 2024 University logo found on a document from 2012.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TruthEngine;
