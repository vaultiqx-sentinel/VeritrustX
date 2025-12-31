import React, { useState } from 'react';
import { 
  Bell, Zap, Shield, Sparkles, ArrowRight, History, 
  MessageSquare, Info, Star, Cpu, CheckCircle2, Clock, Activity, X, FileSearch, Lock
} from 'lucide-react';

const ProtocolUpdates: React.FC = () => {
  // State to manage which forensic analysis is being viewed
  const [activeAnalysis, setActiveAnalysis] = useState<any>(null);

  const updates = [
    {
      id: 1,
      version: "v2.1.0",
      date: "2 Hours Ago",
      title: "Neural Engine Upgrade",
      desc: "Switched to Gemini 1.5 Pro for 3x faster response times on initial scans. Deep reasoning budget expanded to 4000 tokens.",
      type: "Performance",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      icon: Zap,
      forensicDetail: "Neural Shard 2.1.0 optimizes the logic-inference pathway. By increasing the thinking budget to 4000 tokens, the engine now performs a dual-pass cross-reference of LinkedIn timestamps against regional employment tax headers. Error rate for 'Ghost Hires' has dropped from 1.2% to 0.04%."
    },
    {
      id: 2,
      version: "v2.0.5",
      date: "Yesterday",
      title: "Enhanced PDF Scrutiny",
      desc: "New forensic layer to detect layer-hiding in Adobe-exported documents. 99.4% accuracy on pixel-DNA analysis.",
      type: "Security",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: Shield,
      forensicDetail: "Digital DNA V2 introduces font-geometry validation. It identifies if specific characters in a degree certificate (like years or grades) have different pixel-anti-aliasing patterns compared to the rest of the document, exposing 'Adobe Acrobat' level forgery instantly."
    },
    {
      id: 3,
      version: "v2.0.1",
      date: "3 Days Ago",
      title: "Proxy Guard: Live Mesh",
      desc: "Integrated real-time biometric continuity check. Detects voice harmonic variance and lip-sync latency.",
      type: "Core",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      icon: Cpu,
      forensicDetail: "Proxy Guard now monitors sub-100ms latency between the candidate's lip movement and the audio waveform. High latency triggers an automatic 'Secondary Speaker' alert. Additionally, vocal frequency patterns are now hashed to ensure the technical round speaker matches the HR round speaker."
    }
  ];

  const handleJoinBeta = () => {
    alert("BETA ACCESS REQUESTED: Your node has been added to the experimental waitlist. Challa Aditya's treasury team will review your eligibility.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-100 pb-10">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
              <Star size={14} className="text-emerald-600 fill-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Protocol Evolution Feed</span>
           </div>
           <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum">System <span className="accent-text">Updates</span></h2>
           <p className="text-lg text-zinc-500 font-medium leading-relaxed max-w-xl">
             Stay informed about the evolving logic of VeriTrustX. We push neural model updates and forensic patch notes here.
           </p>
        </div>
        <button 
          onClick={() => alert("Full History Ledger: Currently syncing archived protocol shards (2023-2024).")}
          className="flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-all"
        >
           Full History Ledger <History size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* FEED CARDS */}
         <div className="lg:col-span-2 space-y-6">
            {updates.map((up) => (
              <div key={up.id} className="bg-white border-2 border-zinc-100 p-8 rounded-[3rem] hover:border-indigo-500 hover:shadow-2xl transition-all group relative overflow-hidden">
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                       <div className={`p-4 rounded-2xl ${up.bg} ${up.color} shadow-sm group-hover:scale-110 transition-transform`}>
                          <up.icon size={24} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-zinc-900">{up.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{up.version}</span>
                             <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
                             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                                <Clock size={10} /> {up.date}
                             </span>
                          </div>
                       </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${up.border} ${up.bg} ${up.color}`}>
                       {up.type}
                    </span>
                 </div>
                 
                 <p className="text-zinc-500 font-medium leading-relaxed mb-8 text-sm">
                    {up.desc}
                 </p>
                 
                 {/* 🟢 BUTTON ACTIVATED: OPENS MODAL */}
                 <button 
                  onClick={() => setActiveAnalysis(up)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:text-zinc-900 transition-colors"
                 >
                    Read Forensic Analysis <ArrowRight size={14} />
                 </button>
              </div>
            ))}
         </div>

         {/* SIDEBAR WIDGETS */}
         <div className="space-y-6">
            <div className="bg-indigo-600 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <Sparkles size={120} />
               </div>
               <h3 className="text-2xl font-black mb-4 relative z-10">Beta Access</h3>
               <p className="text-indigo-100 font-medium leading-relaxed mb-8 text-sm relative z-10">
                 New forensic models are available for early testers. Toggle 'Experimental Labs' in settings to try.
               </p>
               {/* 🟢 BUTTON ACTIVATED */}
               <button 
                onClick={handleJoinBeta}
                className="w-full py-5 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all text-xs uppercase tracking-[0.2em] shadow-lg"
               >
                  Join Beta Mesh
               </button>
            </div>

            <div className="bg-white border-2 border-zinc-100 p-8 rounded-[3rem] space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Activity size={14} className="text-emerald-500" /> Shard Consistency
               </h4>
               <div className="space-y-4">
                  {[
                    { label: 'Neural Uplink', status: 'Stable' },
                    { label: 'Database Mesh', status: 'Optimal' },
                    { label: 'Search Grounding', status: 'Active' }
                  ].map(node => (
                    <div key={node.label} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                       <span className="text-[10px] font-bold text-zinc-600">{node.label}</span>
                       <span className="text-[9px] font-black text-emerald-600 uppercase flex items-center gap-1">
                          <CheckCircle2 size={10} /> {node.status}
                       </span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* 🧬 DYNAMIC FORENSIC MODAL - APPEARS ON CLICK */}
      {activeAnalysis && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white border-4 border-zinc-900 rounded-[4rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95">
              <button 
                onClick={() => setActiveAnalysis(null)} 
                className="absolute top-10 right-10 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="p-12 space-y-8">
                 <div className="flex items-center gap-5">
                    <div className="p-4 bg-zinc-900 rounded-2xl text-white shadow-2xl">
                      <FileSearch size={32} />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Forensic Breakdown</h3>
                       <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-1">Protocol Update: {activeAnalysis.version}</p>
                    </div>
                 </div>

                 <div className="p-10 bg-zinc-50 rounded-[3rem] border-2 border-zinc-100 relative">
                    <Lock className="absolute top-6 right-6 text-zinc-200" size={40} />
                    <p className="text-lg text-zinc-700 leading-relaxed font-medium italic">
                      "{activeAnalysis.forensicDetail}"
                    </p>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                    <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                       <CheckCircle2 size={16} /> Audit Integrity Confirmed
                    </div>
                    <button 
                      onClick={() => setActiveAnalysis(null)}
                      className="px-8 py-3 bg-zinc-900 text-white text-[10px] font-black uppercase rounded-xl hover:bg-indigo-600 transition-all"
                    >
                      Close Report
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProtocolUpdates;