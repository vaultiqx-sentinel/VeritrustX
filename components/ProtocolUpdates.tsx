
import React from 'react';
import { Bell, Zap, Shield, Sparkles, ArrowRight, History, MessageSquare, Info } from 'lucide-react';

const ProtocolUpdates: React.FC = () => {
  const updates = [
    {
      id: 1,
      version: "v2.1.0",
      date: "May 24, 2024",
      title: "Neural Engine Upgrade",
      desc: "Switched to Gemini 3 Flash for 3x faster response times on initial scans. Deep reasoning budget expanded.",
      type: "Performance",
      color: "text-indigo-400",
      bg: "bg-indigo-400/10"
    },
    {
      id: 2,
      version: "v2.0.5",
      date: "May 20, 2024",
      title: "Enhanced PDF Scrutiny",
      desc: "New forensic layer to detect layer-hiding in Adobe-exported documents.",
      type: "Security",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-4xl font-black text-white tracking-tight">
          Protocol <span className="text-indigo-500">Updates</span>
        </h2>
        <p className="text-slate-400 font-medium text-lg leading-relaxed">
          Stay informed about the evolving logic of VeriTrust. We push neural model updates and forensic patch notes here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-6">
            {updates.map((update) => (
              <div key={update.id} className="bg-slate-900/50 border border-white/5 p-8 rounded-[2.5rem] hover:bg-slate-900 transition-all group">
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                       <div className={`p-3 rounded-xl ${update.bg} ${update.color}`}>
                          <Zap size={20} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-white">{update.title}</h3>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{update.date} • {update.version}</p>
                       </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${update.bg} ${update.color}`}>
                       {update.type}
                    </span>
                 </div>
                 <p className="text-slate-400 font-medium leading-relaxed mb-8">
                    {update.desc}
                 </p>
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-indigo-400 transition-colors">
                    Read Patch Notes <ArrowRight size={12} />
                 </button>
              </div>
            ))}
         </div>

         <div className="space-y-6">
            <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16"></div>
               <Sparkles className="mb-6 opacity-60" size={32} />
               <h3 className="text-xl font-black mb-2">Beta Access</h3>
               <p className="text-indigo-100/70 text-sm font-medium leading-relaxed mb-6">
                 New forensic models are available for early testers. Toggle 'Experimental Labs' in settings to try.
               </p>
               <button className="w-full py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all text-xs uppercase tracking-widest">
                  Join Beta Mesh
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProtocolUpdates;
