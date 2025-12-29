import React, { useState, useEffect } from 'react';
import { Package, Database, TrendingUp, AlertCircle, RefreshCw, Loader2, Sparkles, Cpu, HardDrive, Zap, ShieldCheck, Activity } from 'lucide-react';
import { optimizeResources } from '../src/services/geminiService';

const ResourceLedger: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [selfHealing, setSelfHealing] = useState(true);
  const [loads, setLoads] = useState<Record<string, number>>({ 'ASSET-99': 12, 'ASSET-102': 28, 'GW-01': 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setLoads(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          next[key] = Math.max(5, Math.min(95, next[key] + (Math.random() - 0.5) * 10));
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const result = await optimizeResources(JSON.stringify(loads));
      setReport(result);
    } catch (err) {
      setReport("Optimization failed.");
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white tracking-tight font-quantum">
            Resource <span className="accent-text">Ledger</span>
          </h2>
          <p className="text-slate-400 font-medium">Managing the physical and digital assets of the VeritrustX Mesh.</p>
        </div>
        <div className="flex gap-4">
           <div className="p-1.5 bg-slate-900 rounded-2xl border border-white/5 flex gap-2">
              <button onClick={() => setSelfHealing(true)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selfHealing ? 'accent-bg text-white shadow-lg' : 'text-slate-500'}`}>Self-Healing ON</button>
              <button onClick={() => setSelfHealing(false)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${!selfHealing ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500'}`}>Manual Override</button>
           </div>
           <button onClick={handleOptimize} disabled={isOptimizing} className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 hover:accent-bg hover:text-white transition-all disabled:opacity-50">
             {isOptimizing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
             {isOptimizing ? 'Analyzing...' : 'Optimize Mesh'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <AssetTile id="ASSET-99" name="Neural Cluster Alpha" load={loads['ASSET-99']} icon={Cpu} />
         <AssetTile id="ASSET-102" name="Global Source Mirror" load={loads['ASSET-102']} icon={HardDrive} />
         <AssetTile id="GW-01" name="Pulse Edge Gateway" load={loads['GW-01']} icon={Activity} />
      </div>

      <div className="bg-slate-950 border border-white/10 rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,var(--brand-accent-glow),transparent_60%)] opacity-20"></div>
         <div className="flex items-center gap-4 border-b border-white/5 pb-8 relative z-10">
            <div className="p-3 bg-white/5 rounded-xl accent-text"><ShieldCheck size={24} /></div>
            <div>
               <h3 className="text-xl font-black text-white uppercase tracking-widest">Autonomous Governance Report</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Status: {selfHealing ? 'Actively Balancing' : 'Manual Lock Active'}</p>
            </div>
         </div>
         
         <div className="relative z-10">
            {report ? (
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium italic animate-in slide-in-from-left-4">{report}</p>
            ) : (
              <div className="text-center py-10 opacity-30 grayscale"><TrendingUp size={48} className="mx-auto mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">Execute optimization to generate efficiency report</p></div>
            )}
         </div>
      </div>
    </div>
  );
};

const AssetTile = ({ id, name, load, icon: Icon }: any) => (
  <div className="bg-slate-900 border border-white/5 p-8 rounded-[3rem] space-y-6 hover:border-white/10 transition-all group">
     <div className="flex justify-between items-start">
        <div className="p-4 bg-white/5 rounded-2xl group-hover:accent-bg transition-colors"><Icon size={24} className="text-white" /></div>
        <span className="text-[9px] font-mono text-slate-500">{id}</span>
     </div>
     <div>
        <h4 className="text-lg font-black text-white mb-1">{name}</h4>
        <div className="flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${load > 80 ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse`}></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Health: {load > 80 ? 'Heavy Load' : 'Optimal'}</span>
        </div>
     </div>
     <div className="space-y-2">
        <div className="flex justify-between text-[9px] font-black uppercase text-slate-600">
           <span>Neural Throughput</span>
           <span className={load > 80 ? 'text-rose-500' : 'text-slate-400'}>{load.toFixed(1)}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
           <div className={`h-full transition-all duration-1000 ${load > 80 ? 'bg-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'accent-bg'}`} style={{width: `${load}%`}}></div>
        </div>
     </div>
  </div>
);

export default ResourceLedger;