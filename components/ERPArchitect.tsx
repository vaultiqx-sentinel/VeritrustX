import React, { useState } from 'react';
import { 
  Cpu, Zap, Binary, Layers, Loader2, Sparkles, Terminal, 
  Play, CheckCircle2, Database, BrainCircuit, Activity, 
  RefreshCcw, Table, Layout, ArrowRightLeft, ShieldCheck,
  Package, History, Code2, DatabaseZap, Server, HardDrive,
  Route, Brackets, Workflow, Network, Check, XCircle, AlertCircle,
  Lightbulb
} from 'lucide-react';
import { executeBusinessDirective } from '../services/gemini';

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
    alert(`Asset ${id} locked in Neural Mesh.`);
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
      setExecutionLog(`### [SYSTEM CRASH]\n${err.message === 'API_KEY_MISSING' ? 'Identity Core Offline.' : 'Neural Mesh Error.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Header */}
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
        </div>
        
        <div className="flex flex-col gap-3">
           <button className="px-8 py-5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl">
              <Activity size={14} className={isSyncing ? "text-orange-400 animate-pulse" : "text-emerald-400"} /> 
              {isSyncing ? "Syncing Logic..." : "System Status: SECURE"}
           </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-zinc-100 p-2 rounded-2xl border-2 border-zinc-200 overflow-x-auto">
        <TabButton active={activeTab === 'blueprint'} onClick={() => setActiveTab('blueprint')} label="Intent Blueprint" icon={Brackets} />
        <TabButton active={activeTab === 'controller'} onClick={() => setActiveTab('controller')} label="Neural Controller" icon={Route} />
        <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} label="Live State" icon={Database} />
        <TabButton active={activeTab === 'schema'} onClick={() => setActiveTab('schema')} label="Schema Evolution" icon={Network} />
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'blueprint' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
                <div className="bg-white border-4 border-zinc-100 p-10 rounded-[3.5rem] space-y-8 shadow-xl">
                  <h3 className="text-xs font-black text-zinc-900 uppercase flex items-center gap-2">
                    <Terminal size={18} className="text-indigo-600" /> Command Entry
                  </h3>
                  <textarea 
                      value={directive}
                      onChange={(e) => setDirective(e.target.value)}
                      placeholder="Describe a business rule..."
                      className="w-full h-80 bg-zinc-50 border-2 border-zinc-200 rounded-[2.5rem] p-8 text-zinc-900 font-bold text-lg focus:border-indigo-600 outline-none transition-all resize-none shadow-inner"
                  />
                  <button 
                      onClick={handleExecute}
                      disabled={isProcessing || !directive}
                      className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-3"
                  >
                      {isProcessing ? <Loader2 className="animate-spin" /> : <Play size={20} />}
                      DEPLOY LOGIC
                  </button>
                </div>
            </div>
            <div className="bg-zinc-900 border-4 border-zinc-800 rounded-[3.5rem] p-10 text-emerald-400 font-mono text-sm overflow-y-auto max-h-[600px] shadow-2xl">
               {executionLog || "// Awaiting Neural Output..."}
            </div>
          </div>
        )}

        {activeTab === 'controller' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <div className="bg-white border-4 border-zinc-100 rounded-[3rem] p-10 space-y-4">
                <VirtualRoute path="POST /intent/transform" description="Business logic mutation handler." status="Live" onClick={() => {}} />
                <VirtualRoute path="GET /state/observable" description="Real-time data projection." status="Live" onClick={() => {}} />
                <VirtualRoute path="PATCH /schema/evolve" description="AI structural update handler." status="Live" onClick={() => {}} />
             </div>
             <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white">
                <h3 className="text-3xl font-black mb-4">Zero-Code Layer</h3>
                <p className="opacity-80">VeritrustX reasoning eliminates the middleman between business ideas and the database.</p>
             </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="bg-white border-4 border-zinc-100 rounded-[3.5rem] overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-zinc-50 border-b-2 border-zinc-200">
                   <tr>
                      <th className="p-6 text-[10px] font-black uppercase text-zinc-400">Asset UID</th>
                      <th className="p-6 text-[10px] font-black uppercase text-zinc-400">State</th>
                      <th className="p-6 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                   {erpState.map((row) => (
                     <tr key={row.id}>
                        <td className="p-6 font-mono text-indigo-600 font-black">{row.id}</td>
                        <td className="p-6">
                           <div className="flex gap-2 flex-wrap">
                              {Object.entries(row).filter(([k]) => k !== 'id').map(([k, v]) => (
                                <span key={k} className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded text-[9px] font-bold text-zinc-500">
                                  {k}: <span className="text-zinc-900">{String(v)}</span>
                                </span>
                              ))}
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <button 
                             onClick={() => handleCommit(row.id)}
                             className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${row.status === 'Committed' ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-white'}`}
                           >
                             {row.status === 'Committed' ? 'Locked' : 'Commit'}
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="h-[500px] flex flex-col items-center justify-center bg-white border-4 border-dashed border-zinc-200 rounded-[4rem] text-center p-16 space-y-8 animate-in zoom-in-95">
             <div className="relative">
                <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center border-4 border-indigo-100 shadow-inner">
                   <Network size={64} className="text-indigo-600 animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 p-3 bg-emerald-500 rounded-2xl text-white shadow-xl rotate-12">
                   <Zap size={20} />
                </div>
             </div>
             <div className="max-w-xl space-y-4">
               <h4 className="text-3xl font-black text-zinc-900 font-quantum uppercase tracking-tight">Neural Schema Evolution</h4>
               <p className="text-lg text-zinc-500 font-medium leading-relaxed">
                  The VeriTrustX **Neural Schema** is alive.
               </p>
               <div className="p-6 bg-zinc-900 rounded-3xl text-left border-b-4 border-indigo-500 shadow-2xl">
                  <p className="text-xs text-emerald-400 font-mono italic">
                     // [SYSTEM LOG: EVOLUTION_MESH_ACTIVE] <br />
                     // Action: Reconfiguring "Biometric_Node" to track harmonic variance. <br />
                     // Database architecture evolved successfully.
                  </p>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Helper Components ---

const VirtualRoute = ({ path, description, status, onClick }: { path: string, description: string, status: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full text-left p-6 bg-zinc-50 border-2 border-zinc-100 rounded-2xl hover:border-indigo-500 hover:bg-white transition-all group"
  >
     <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-mono text-indigo-700 font-black tracking-tight">{path}</p>
        <span className="text-[8px] font-black text-white bg-emerald-600 px-3 py-1 rounded-full uppercase">{status}</span>
     </div>
     <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{description}</p>
  </button>
);

const TabButton = ({ active, onClick, label, icon: Icon }: any) => (
  <button 
    onClick={onClick} 
    className={`px-10 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl flex items-center gap-3 shrink-0 ${
      active 
        ? 'bg-zinc-900 text-white shadow-2xl scale-105 z-10' 
        : 'bg-white text-zinc-400 border border-zinc-200 hover:bg-zinc-50'
    }`}
  >
    <Icon size={16} className={active ? 'text-indigo-400' : 'text-zinc-300'} /> 
    {label}
  </button>
);

export default ERPArchitect;