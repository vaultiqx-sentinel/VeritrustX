import React, { useState } from 'react';
import { 
  Cpu, Zap, Binary, Layers, Loader2, Sparkles, Terminal, 
  Play, CheckCircle2, Database, BrainCircuit, Activity, 
  RefreshCcw, Table, Layout, ArrowRightLeft, ShieldCheck,
  Package, History, Code2, DatabaseZap, Server, HardDrive,
  Route, Brackets, Workflow, Network, Check, XCircle, AlertCircle,
  Lightbulb
} from 'lucide-react';
import { executeBusinessDirective } from '../src/services/geminiService';

// Data structure for the ERP State
interface ERPAsset {
  id: string;
  entity: string;
  qty?: number;
  cost?: number;
  vendor?: string;
  region?: string;
  status?: string;
  amount?: number;
  risk?: string;
  auto_restock?: boolean;
  threshold?: number;
}

interface ERPArchitectProps {
  onLogicDeploy?: (directive: string) => void;
}

const ERPArchitect: React.FC<ERPArchitectProps> = ({ onLogicDeploy }) => {
  const [directive, setDirective] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [executionLog, setExecutionLog] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'blueprint' | 'data' | 'schema' | 'controller'>('blueprint');

  const [erpState, setErpState] = useState<ERPAsset[]>([
    { id: "INV-001", entity: "Microchips", qty: 1240, cost: 45.2, vendor: "Silicon Corp", region: "APAC" },
    { id: "INV-002", entity: "Graphic Cards", qty: 85, cost: 1200, vendor: "Nvidia-Dist", region: "EMEA" },
    { id: "ORD-992", entity: "Purchase Order", status: "Pending", amount: 124000, risk: "Low" },
    { id: "SYS-CFG", entity: "Logic Node", auto_restock: true, threshold: 0.15 }
  ]);

  const handleCommit = (id: string) => {
    setErpState(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Committed' } : item
    ));
    alert(`Institutional Handshake Complete: Asset ${id} is now committed to the ledger.`);
  };

  const handleExecute = async () => {
    if (!directive) return;
    setIsProcessing(true);
    setExecutionLog(null);
    try {
      const result = await executeBusinessDirective(directive, JSON.stringify(erpState));
      setExecutionLog(result);
      
      if (result) {
        setIsSyncing(true);
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
      {/* HEADER SECTION - High Contrast White Background */}
      <div className="bg-white border-b-4 border-zinc-200 p-8 rounded-t-[3rem] flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-2xl space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-full shadow-lg">
              <BrainCircuit size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest font-quantum">Logic Mesh v2.0 Active</span>
           </div>
           <h2 className="text-6xl font-black text-zinc-900 tracking-tight leading-tight">
              Logic <br />
              <span className="text-indigo-600">Autonomous</span>
           </h2>
           <p className="text-zinc-500 font-bold text-lg leading-relaxed border-l-4 border-indigo-500 pl-6">
              In this environment, "Code" is obsolete. Define your business intent. The AI reconfigures the data architecture instantly.
           </p>
        </div>
        
        <div className="flex flex-col gap-3">
           <button 
             onClick={() => alert("Re-syncing Neural Nodes...")}
             className="px-8 py-5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-zinc-800 transition-all"
           >
              <Activity size={14} className={isSyncing ? "text-orange-400 animate-pulse" : "text-emerald-400"} /> 
              {isSyncing ? "Syncing Logic..." : "System Status: SECURE"}
           </button>
           <button 
            onClick={() => window.location.hash = '#/contact-us'} 
            className="text-[10px] font-black text-indigo-600 uppercase text-center bg-indigo-50 py-3 rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all"
           >
             Direct Support Uplink
           </button>
        </div>
      </div>

      {/* NAVIGATION TABS - VISIBILITY FIX (DARK TABS) */}
      <div className="flex gap-2 bg-zinc-100 p-2 rounded-2xl border-2 border-zinc-200 overflow-x-auto">
        <TabButton active={activeTab === 'blueprint'} onClick={() => setActiveTab('blueprint')} label="Intent Blueprint" icon={Brackets} />
        <TabButton active={activeTab === 'controller'} onClick={() => setActiveTab('controller')} label="Neural Controller" icon={Route} />
        <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} label="Live State" icon={Database} />
        <TabButton active={activeTab === 'schema'} onClick={() => setActiveTab('schema')} label="Schema Evolution" icon={Network} />
      </div>

      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
              <div className="bg-white border-4 border-zinc-100 p-10 rounded-[3.5rem] space-y-8 relative shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Terminal size={18} className="text-indigo-600" /> Command Entry
                    </h3>
                    <button onClick={() => setDirective('')} className="p-2 text-zinc-300 hover:text-rose-500 transition-colors"><RefreshCcw size={16} /></button>
                </div>

                <textarea 
                    value={directive}
                    onChange={(e) => setDirective(e.target.value)}
                    placeholder="Describe a business rule... e.g., 'If stock falls below 10%, send a high-priority alert to the EMEA vendor and draft a PO.'"
                    className="w-full h-80 bg-zinc-50 border-2 border-zinc-200 rounded-[2.5rem] p-8 text-zinc-900 font-bold text-lg focus:border-indigo-600 focus:bg-white outline-none transition-all resize-none shadow-inner leading-relaxed placeholder:text-zinc-300"
                />

                <div className="space-y-4">
                  <button 
                      onClick={handleExecute}
                      disabled={isProcessing || !directive}
                      className="w-full py-6 bg-indigo-600 hover:bg-zinc-900 text-white font-black rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-30 group"
                  >
                      {isProcessing ? <Loader2 className="animate-spin" /> : <Play size={20} />}
                      {isProcessing ? 'PROCESSING LOGIC...' : 'EXECUTE AUTONOMOUS LOGIC'}
                  </button>
                  <p className="text-[10px] text-center text-zinc-400 font-black uppercase tracking-widest">Neural Safety: 100% Guaranteed</p>
                </div>
              </div>
          </div>

          <div className="space-y-6">
              {executionLog ? (
                <div className="bg-zinc-900 border-4 border-zinc-800 rounded-[3.5rem] p-10 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <Cpu className="text-indigo-400" size={24} />
                          <h3 className="text-2xl font-black text-white">Neural Reflection</h3>
                      </div>
                      <span className="text-[10px] font-black bg-emerald-500 text-white px-3 py-1 rounded-full uppercase">DEPLOYED</span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="text-emerald-400 text-sm leading-relaxed whitespace-pre-wrap font-mono h-[520px] overflow-y-auto custom-scrollbar pr-4 italic bg-black/50 p-8 rounded-[2rem] border border-white/5 shadow-inner">
                          {executionLog}
                      </div>
                    </div>
                </div>
              ) : (
                <div className="h-full min-h-[600px] border-4 border-dashed border-zinc-200 rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center bg-white group hover:border-indigo-500 transition-all">
                    <div className="w-24 h-24 bg-zinc-100 border-2 border-zinc-200 rounded-full flex items-center justify-center text-zinc-300 mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                      <Workflow size={48} />
                    </div>
                    <h4 className="text-2xl font-black text-zinc-900 font-quantum">Compiler Awaiting Input</h4>
                    <p className="text-sm font-bold text-zinc-400 max-w-xs mt-4 uppercase tracking-widest leading-relaxed">
                      Logic nodes are on standby. Enter a business directive to begin the mutation.
                    </p>
                </div>
              )}
          </div>
        </div>
      )}

      {activeTab === 'controller' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
           <div className="bg-white border-4 border-zinc-100 rounded-[3rem] p-10 space-y-8 shadow-sm">
              <div className="flex justify-between items-center border-b-2 border-zinc-100 pb-6">
                 <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3"><Route className="text-indigo-500" /> Virtual Handlers</h3>
                 <span className="text-[9px] font-black text-white bg-emerald-600 px-3 py-1 rounded-full uppercase">Operational</span>
              </div>
              <div className="space-y-4">
                 <VirtualRoute onClick={() => alert("Endpoint ACTIVE.")} path="POST /intent/transform" description="Business logic mutation handler." status="Live" />
                 <VirtualRoute onClick={() => alert("Endpoint ACTIVE.")} path="GET /state/observable" description="Real-time data projection." status="Live" />
                 <VirtualRoute onClick={() => alert("Endpoint ACTIVE.")} path="PATCH /schema/evolve" description="AI structural update handler." status="Live" />
              </div>
           </div>

           <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white flex flex-col justify-center space-y-6 shadow-2xl relative overflow-hidden">
              <Zap size={100} className="absolute bottom-0 right-0 opacity-10 translate-x-1/4 translate-y-1/4" />
              <h3 className="text-4xl font-black font-quantum">Zero-Code <br />Production Layer</h3>
              <p className="text-indigo-100 font-bold leading-relaxed text-lg">
                Traditional backends require thousands of lines of SQL and Node.js. <br/><br/>
                **VeritrustX** uses reasoning. We eliminate the middleman between your business ideas and your database.
              </p>
              <div className="pt-8 border-t border-indigo-400 flex gap-10">
                 <div className="text-center">
                    <p className="text-4xl font-black">0</p>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Lines of Code</p>
                 </div>
                 <div className="text-center">
                    <p className="text-4xl font-black">100%</p>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Uptime Mesh</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="bg-white border-4 border-zinc-100 rounded-[3.5rem] overflow-hidden animate-in fade-in shadow-xl">
           <div className="p-10 border-b-2 border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-zinc-900 rounded-xl text-white shadow-lg"><Table size={24} /></div>
                 <div>
                    <h3 className="text-2xl font-black text-zinc-900">Live State Observable</h3>
                    <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mt-1">Real-time Data Mesh Projection</p>
                 </div>
              </div>
              <button onClick={() => alert("Refreshing Logic Mesh...")} className="p-4 bg-white border-2 border-zinc-100 rounded-2xl text-zinc-400 hover:text-indigo-600 transition-all">
                <RefreshCcw size={20} />
              </button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                   <tr className="bg-zinc-100 border-b-2 border-zinc-200">
                      <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Asset UID</th>
                      <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logical State</th>
                      <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Commit Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                   {erpState.map((row, i) => (
                     <tr key={i} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-10 py-6 font-mono text-sm text-indigo-700 font-black">{row.id}</td>
                        <td className="px-10 py-6">
                           <div className="flex gap-2 flex-wrap">
                              {Object.entries(row).map(([k, v]) => (
                                <span key={k} className="px-3 py-1 bg-white border-2 border-zinc-100 rounded-lg text-[10px] text-zinc-700 font-bold shadow-sm">
                                  {k}: <span className="text-indigo-600">{String(v)}</span>
                                </span>
                              ))}
                           </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <button 
                             onClick={() => handleCommit(row.id)}
                             className={`text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all border-2 ${
                               row.status === 'Committed' 
                               ? 'bg-emerald-600 text-white border-emerald-600' 
                               : 'bg-zinc-900 text-white hover:bg-emerald-600 border-zinc-900 hover:border-emerald-600'
                             }`}
                           >
                              {row.status === 'Committed' ? <Check size={12} className="inline mr-2" /> : null}
                              {row.status === 'Committed' ? 'Asset Locked' : 'Commit Logic'}
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="h-96 flex flex-col items-center justify-center bg-white border-4 border-dashed border-zinc-200 rounded-[3.5rem] text-center p-10 space-y-6 shadow-sm">
           <div className="p-8 bg-indigo-50 rounded-full border-2 border-indigo-100 shadow-inner">
            <Network size={64} className="text-indigo-600 animate-pulse" />
           </div>
           <div>
             <h4 className="text-2xl font-black text-zinc-900 font-quantum">Evolution Mesh</h4>
             <p className="text-sm text-zinc-400 max-w-sm mx-auto mt-2 font-bold uppercase tracking-widest">Structural Remediator Sandbox</p>
           </div>
           <button onClick={() => alert("Simulation Phase 1: Analyzing data structure bottlenecks...")} className="px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all">Start Evolution Simulation</button>
        </div>
      )}
    </div>
  );
};

const VirtualRoute = ({ path, description, status, onClick }: { path: string, description: string, status: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full text-left p-6 bg-zinc-50 border-2 border-zinc-100 rounded-2xl hover:border-indigo-600 hover:bg-white transition-all group shadow-sm"
  >
     <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-mono text-indigo-700 font-black tracking-tight">{path}</p>
        <span className="text-[8px] font-black text-white bg-emerald-600 px-3 py-1 rounded-full uppercase">{status}</span>
     </div>
     <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{description}</p>
  </button>
);

// TAB BUTTON FIX FOR MAXIMUM VISIBILITY
const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick} 
    className={`px-10 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl flex items-center gap-3 shrink-0 ${
      active 
        ? 'bg-zinc-900 text-white shadow-2xl scale-105 z-10' // Solid Black Background for Active Tab
        : 'bg-white text-zinc-400 border border-zinc-200 hover:bg-zinc-50'
    }`}
  >
    <Icon size={16} className={active ? 'text-indigo-400' : 'text-zinc-300'} /> 
    {label}
  </button>
);

export default ERPArchitect;