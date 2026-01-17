import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Activity, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { optimizeResources } from '../services/gemini';

const ResourceLedger: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [loads, setLoads] = useState<Record<string, number>>({ 'ASSET-99': 12, 'ASSET-102': 28, 'GW-01': 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setLoads(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => next[key] = Math.max(5, Math.min(95, next[key] + (Math.random() - 0.5) * 10)));
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
    } catch { setReport("Optimization failed."); } finally { setIsOptimizing(false); }
  };

  const AssetTile = ({ id, name, load, icon: Icon }: any) => (
    <div className="bg-slate-900 border border-white/5 p-8 rounded-[3rem] space-y-6">
       <div className="flex justify-between items-start">
          <div className="p-4 bg-white/5 rounded-2xl"><Icon size={24} className="text-white" /></div>
          <span className="text-[9px] font-mono text-slate-500">{id}</span>
       </div>
       <div>
          <h4 className="text-lg font-black text-white mb-1">{name}</h4>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
             <div className={`h-full transition-all duration-1000 ${load > 80 ? 'bg-rose-600' : 'accent-bg'}`} style={{width: `${load}%`}}></div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div><h2 className="text-4xl font-black text-white tracking-tight font-quantum">Resource <span className="accent-text">Ledger</span></h2></div>
        <button onClick={handleOptimize} disabled={isOptimizing} className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 hover:accent-bg hover:text-white transition-all disabled:opacity-50">{isOptimizing ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}{isOptimizing ? 'Analyzing...' : 'Optimize Mesh'}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <AssetTile id="ASSET-99" name="Neural Cluster Alpha" load={loads['ASSET-99']} icon={Cpu} />
         <AssetTile id="ASSET-102" name="Global Source Mirror" load={loads['ASSET-102']} icon={HardDrive} />
         <AssetTile id="GW-01" name="Pulse Edge Gateway" load={loads['GW-01']} icon={Activity} />
      </div>

      <div className="bg-slate-950 border border-white/10 rounded-[3.5rem] p-10 space-y-8 shadow-2xl">
         <div className="flex items-center gap-4 border-b border-white/5 pb-8"><div className="p-3 bg-white/5 rounded-xl accent-text"><ShieldCheck size={24} /></div><h3 className="text-xl font-black text-white uppercase tracking-widest">Autonomous Governance Report</h3></div>
         {report && <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium italic animate-in slide-in-from-left-4">{report}</p>}
      </div>
    </div>
  );
};

export default ResourceLedger;