import React from 'react';
import { 
  Bell, Zap, Shield, Sparkles, ArrowRight, History, 
  MessageSquare, Info, Star, Cpu, CheckCircle2, Clock, Activity 
} from 'lucide-react';

const ProtocolUpdates: React.FC = () => {
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
      icon: Zap
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
      icon: Shield
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
      icon: Cpu
    }
  ];

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
        <button className="flex items-center gap-2 text-xs font-black text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-all">
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
                 
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:text-zinc-900 transition-colors">
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
               <button className="w-full py-5 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all text-xs uppercase tracking-[0.2em] shadow-lg">
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
    </div>
  );
};

export default ProtocolUpdates;