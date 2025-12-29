
import React, { useState } from 'react';
import { 
  Cpu, Zap, Binary, Layers, Loader2, Sparkles, Terminal, 
  Play, CheckCircle2, Database, BrainCircuit, Activity, 
  RefreshCcw, Table, Layout, ArrowRightLeft, ShieldCheck,
  Package, History, Code2, DatabaseZap, Server, HardDrive,
  Route, Brackets, Workflow, Network
} from 'lucide-react';
import { executeBusinessDirective } from '../src/services/geminiService';

// Fix: Added ERPArchitectProps interface to correctly type the onLogicDeploy prop used in App.tsx
interface ERPArchitectProps {
  onLogicDeploy?: (directive: string) => void;
}

const ERPArchitect: React.FC<ERPArchitectProps> = ({ onLogicDeploy }) => {
  const [directive, setDirective] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [executionLog, setExecutionLog] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'data' | 'schema' | 'controller'>('blueprint');

  const [erpState, setErpState] = useState([
    { id: "INV-001", entity: "Microchips", qty: 1240, cost: 45.2, vendor: "Silicon Corp", region: "APAC" },
    { id: "INV-002", entity: "Graphic Cards", qty: 85, cost: 1200, vendor: "Nvidia-Dist", region: "EMEA" },
    { id: "ORD-992", entity: "Purchase Order", status: "Pending", amount: 124000, risk: "Low" },
    { id: "SYS-CFG", entity: "Logic Node", auto_restock: true, threshold: 0.15 }
  ]);

  const handleExecute = async () => {
    if (!directive) return;
    setIsProcessing(true);
    setExecutionLog(null);
    try {
      const result = await executeBusinessDirective(directive, JSON.stringify(erpState));
      setExecutionLog(result);
      
      if (result) {
        setIsSyncing(true);
        // Fix: Invoke onLogicDeploy to log the transformation event in the global activity ledger
        if (onLogicDeploy) {
          onLogicDeploy(directive);
        }
        setTimeout(() => setIsSyncing(false), 2500);
      }
    } catch (err: any) {
      setExecutionLog(`### [SYSTEM CRASH]\n${err.message === 'API_KEY_MISSING' ? 'Identity Core Offline: Missing API_KEY.' : 'Neural Mesh Error: Unable to process logic.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-2xl space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <BrainCircuit size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 font-quantum">No-Backend Logic Mesh</span>
           </div>
           <h2 className="text-6xl font-black text-white tracking-tight leading-tight">
              Logic <br />
              <span className="text-indigo-500">Autonomous</span>
           </h2>
           <p className="text-slate-400 font-medium text-lg leading-relaxed">
              In this ERP, backend "code" is obsolete. The AI interprets your business intent and transforms data directly. No Express routes, no SQL queries, just **pure reasoning**.
           </p>
        </div>
        
        <div className="flex flex-col gap-3">
           <div className="px-6 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-3 shadow-xl">
              <Activity size={14} className={isSyncing ? "text-orange-500 animate-pulse" : "text-emerald-500"} /> 
              {isSyncing ? "Logic Commit in Progress..." : "Autonomous Controller: IDLE"}
           </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/5 pb-2 overflow-x-auto custom-scrollbar">
        <TabButton active={activeTab === 'blueprint'} onClick={() => setActiveTab('blueprint')} label="Intent Blueprint" icon={Brackets} />
        <TabButton active={activeTab === 'controller'} onClick={() => setActiveTab('controller')} label="Neural Controller" icon={Route} />
        <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} label="Live State" icon={Database} />
        <TabButton active={activeTab === 'schema'} onClick={() => setActiveTab('schema')} label="Schema Evolution" icon={Network} />
      </div>

      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
              <div className="erp-card p-10 rounded-[3rem] space-y-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32"></div>
                
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Terminal size={16} className="text-indigo-400" /> Natural Intent Input
                    </h3>
                </div>

                <textarea 
                    value={directive}
                    onChange={(e) => setDirective(e.target.value)}
                    placeholder="Describe a business rule... e.g., 'If stock falls below 10%, send a high-priority alert to the EMEA vendor and draft a PO.'"
                    className="w-full h-80 bg-slate-950/80 border border-white/10 rounded-[2.5rem] p-8 text-slate-300 font-medium text-sm focus:border-indigo-500 outline-none transition-all resize-none custom-scrollbar shadow-inner font-mono"
                />

                <div className="space-y-4">
                  <button 
                      onClick={handleExecute}
                      disabled={isProcessing || !directive}
                      className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-900/40 flex items-center justify-center gap-3 disabled:opacity-30 group relative overflow-hidden"
                  >
                      {isProcessing ? <Loader2 className="animate-spin" /> : <Play size={18} />}
                      {isProcessing ? 'Synthesizing Backend...' : 'Deploy Autonomous Logic'}
                  </button>
                </div>
              </div>

              <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-[2.5rem]">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck size={14} /> Traditional Code Replaced
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between text-xs text-slate-400">
                      <span>API Controllers</span>
                      <span className="text-emerald-500 font-black">AI VIRTUALIZED</span>
                    </li>
                    <li className="flex items-center justify-between text-xs text-slate-400">
                      <span>Database Migrations</span>
                      <span className="text-emerald-500 font-black">AI AUTONOMOUS</span>
                    </li>
                    <li className="flex items-center justify-between text-xs text-slate-400">
                      <span>Validation Middleware</span>
                      <span className="text-emerald-500 font-black">NEURAL ENFORCED</span>
                    </li>
                  </ul>
              </div>
          </div>

          <div className="space-y-6">
              {executionLog ? (
                <div className="bg-slate-950 border border-indigo-500/20 rounded-[3.5rem] p-10 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl shadow-indigo-900/10 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Cpu className="text-indigo-500" size={24} />
                          <h3 className="text-2xl font-black text-white tracking-tight">Logic Reflection</h3>
                      </div>
                      <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded border border-emerald-500/20 uppercase">MUTATION SUCCESSFUL</span>
                    </div>

                    <div className="prose prose-invert max-w-none flex-1 overflow-hidden">
                      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium h-[520px] overflow-y-auto custom-scrollbar pr-4 italic font-mono bg-indigo-500/5 p-8 rounded-[2rem] border border-white/5">
                          {executionLog}
                      </div>
                    </div>
                </div>
              ) : (
                <div className="h-full min-h-[600px] border-2 border-dashed border-slate-800 rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center bg-slate-950/20 group hover:border-indigo-500/50 transition-all">
                    <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-slate-700 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                      <Workflow size={48} />
                    </div>
                    <h4 className="text-2xl font-black text-white">Neural Logic Standby</h4>
                    <p className="text-[11px] font-bold text-slate-500 max-w-xs mt-4 uppercase tracking-[0.2em] leading-relaxed italic text-center">
                      Define your rule on the left. Watch as the AI builds the "Backend" routes in real-time.
                    </p>
                </div>
              )}
          </div>
        </div>
      )}

      {activeTab === 'controller' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
           <div className="bg-slate-950 border border-white/10 rounded-[3rem] p-10 space-y-8 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                 <h3 className="text-xl font-black text-white flex items-center gap-3"><Route className="text-indigo-500" /> Virtual Endpoints</h3>
                 <span className="text-[9px] font-black text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded">HEALTHY</span>
              </div>
              
              <div className="space-y-4">
                 <VirtualRoute path="POST /intent/transform" description="Main entry point for business logic mutations." status="Operational" />
                 <VirtualRoute path="GET /state/observable" description="Real-time projection of the neural data mesh." status="Operational" />
                 <VirtualRoute path="PATCH /schema/evolve" description="AI-driven structural update handler." status="Operational" />
              </div>
           </div>

           <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white flex flex-col justify-center space-y-6 shadow-2xl shadow-indigo-900/30">
              <Zap size={48} className="fill-white" />
              <h3 className="text-3xl font-black">Zero-Code API</h3>
              <p className="text-indigo-100 font-medium leading-relaxed">
                Traditional backends require manual mapping of URLs to Database queries. <br/><br/>
                <strong>VeritrustX</strong> does this via <strong>Neural Routing</strong>. When a request comes in, the AI understands the context and fetches the correct data automatically.
              </p>
              <div className="pt-6 border-t border-white/20 flex gap-4">
                 <div className="text-center">
                    <p className="text-2xl font-black">0</p>
                    <p className="text-[10px] uppercase font-black opacity-60">Lines of API Code</p>
                 </div>
                 <div className="text-center">
                    <p className="text-2xl font-black">∞</p>
                    <p className="text-[10px] uppercase font-black opacity-60">Scalable Logic</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="erp-card rounded-[3.5rem] overflow-hidden animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
           <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-indigo-600 rounded-xl text-white"><Table size={24} /></div>
                 <div>
                    <h3 className="text-2xl font-black text-white">Logic Observable</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Live data affected by Neural Logic</p>
                 </div>
              </div>
           </div>
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-950/50 border-b border-white/5">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset UID</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contextual State</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Commit Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {erpState.map((row, i) => (
                     <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="px-10 py-6 font-mono text-xs text-indigo-400">{row.id}</td>
                        <td className="px-10 py-6">
                           <div className="flex gap-2 flex-wrap">
                              {Object.entries(row).map(([k, v]) => (
                                <span key={k} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-slate-400 font-bold">
                                  {k}: <span className="text-slate-200">{String(v)}</span>
                                </span>
                              ))}
                           </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Persisted
                           </span>
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

const VirtualRoute = ({ path, description, status }: { path: string, description: string, status: string }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
     <div className="flex justify-between items-start mb-2">
        <p className="text-xs font-mono text-indigo-400 font-bold tracking-tight">{path}</p>
        <span className="text-[8px] font-black text-emerald-500 uppercase">{status}</span>
     </div>
     <p className="text-[10px] text-slate-500 font-medium">{description}</p>
  </div>
);

const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick} 
    className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 shrink-0 ${active ? 'border-indigo-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
  >
    <Icon size={14} /> {label}
  </button>
);

export default ERPArchitect;
