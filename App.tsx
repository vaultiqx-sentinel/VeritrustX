import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IntegrityScanner from './components/IntegrityScanner';
import ForensicLab from './components/ForensicLab';
import GlobalPulse from './components/GlobalPulse';
import ProtocolUpdates from './components/ProtocolUpdates';
import ProofPortal from './components/ProofPortal';
import StrategyHub from './components/StrategyHub';
import BusinessValue from './components/BusinessValue';
import BGVVault from './components/BGVVault';
import ProxyGuard from './components/ProxyGuard';
import ResourceLedger from './components/ResourceLedger';
import ERPArchitect from './components/ERPArchitect';
import AuditHistory from './components/AuditHistory';
import LicensingHub from './components/LicensingHub';
import VisionRoadmap from './components/VisionRoadmap';
import LegalHub from './components/LegalHub';
import InvoicePortal from './components/InvoicePortal';
import CandidatePortal from './components/CandidatePortal';
import ContactUs from './components/ContactUs'; // Final piece of the Business suite

import { 
  Settings2, Search, AlertCircle, X, Bell, Info, 
  Fingerprint, CheckCircle2, ShieldAlert, Cpu, MessageSquare, Clock, Activity
} from 'lucide-react';

export type VeritrustTheme = 'emerald' | 'indigo' | 'onyx';

export interface VaultRecord {
  id: string;
  name: string;
  role: string;
  status: 'Verified' | 'Flagged' | 'Failed';
  trustScore: number;
  date: string;
  photo: string | null;
}

const App: React.FC = () => {
  // --- Global State & UI Management ---
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');
  const [protocolName, setProtocolName] = useState(localStorage.getItem('veritrustx-name') || 'VERITRUSTX');
  const [isHibernation, setIsHibernation] = useState(localStorage.getItem('is-hibernation') === 'true');
  const [theme, setTheme] = useState<VeritrustTheme>((localStorage.getItem('veritrust-theme') as VeritrustTheme) || 'emerald');
  const [selectedRecord, setSelectedRecord] = useState<VaultRecord | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- Core Identity Vault ---
  const [records, setRecords] = useState<VaultRecord[]>([
    { id: "REC-101", name: "Arjun Mehra", role: "Sr. AI Engineer", status: "Verified", trustScore: 94, date: "2024-05-22", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { id: "REC-102", name: "Priya Sharma", role: "Product Lead", status: "Flagged", trustScore: 42, date: "2024-05-21", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: "REC-103", name: "Rohan Gupta", role: "DevOps Architect", status: "Failed", trustScore: 12, date: "2024-05-20", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" }
  ]);

  // --- Neural Alert Feed & Global Activity Ledger ---
  const [notifications, setNotifications] = useState([
    { id: Date.now(), title: 'Protocol Boot', message: 'Neural Logic Core initialized and secure.', type: 'info', time: 'Just now' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { icon: Cpu, text: "Institutional logic shard deployed", time: "1m" },
    { icon: Clock, text: "Neural Uplink established", time: "5m" }
  ]);

  // --- System Event Handlers ---
  const addSystemEvent = useCallback((title: string, message: string, type: 'info' | 'warning' | 'critical' | 'success') => {
    const newEvent = { id: Date.now(), title, message, type, time: 'Just now' };
    setNotifications(prev => [newEvent, ...prev].slice(0, 10));
    setActivityLog(prev => [{ 
      icon: type === 'critical' ? ShieldAlert : type === 'success' ? CheckCircle2 : Cpu, 
      text: title, 
      time: "0m" 
    }, ...prev].slice(0, 5));
  }, []);

  const addAuditRecord = useCallback((name: string, role: string, score: number, verdict: string) => {
    const status = score > 80 ? 'Verified' : score > 40 ? 'Flagged' : 'Failed';
    const id = `REC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: VaultRecord = { 
      id, name, role, status: status as any, trustScore: score, 
      date: new Date().toISOString().split('T')[0],
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    setRecords(prev => [newRecord, ...prev]);
    addSystemEvent('New Audit Registered', `Forensic deconstruction for ${name} complete.`, score > 50 ? 'success' : 'critical');
  }, [addSystemEvent]);

  const handleThemeChange = (newTheme: VeritrustTheme) => {
    setTheme(newTheme);
    localStorage.setItem('veritrust-theme', newTheme);
  };

  // --- Navigation & Routing Logic ---
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard isHibernation={isHibernation} records={records} />;
      
      // Link the ERP Architect to the global Activity Ledger
      case 'erp-architect': return <ERPArchitect onLogicDeploy={(d) => addSystemEvent('Logic Mutation', `Directive: "${d.substring(0, 20)}..." applied successfully.`, 'info')} />;
      
      case 'integrity-scan': return <IntegrityScanner onAuditComplete={addAuditRecord} />;
      case 'forensic-lab': return <ForensicLab onVerdict={addAuditRecord} />;
      case 'proxy-guard': return <ProxyGuard onFraudDetected={addAuditRecord} />;
      case 'bgv-vault': return <BGVVault searchFilter={globalSearch} records={records} onShareRecord={(r) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      case 'audit-history': return <AuditHistory searchFilter={globalSearch} records={records} onViewRecord={(r) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      
      // Business & Strategy
      case 'client-acquisition': return <StrategyHub />;
      case 'candidate-portal': return <CandidatePortal />;
      case 'business-value': return <BusinessValue />;
      case 'licensing': return <LicensingHub />;
      case 'invoice-portal': return <InvoicePortal />;
      case 'vision-roadmap': return <VisionRoadmap />;
      
      // System & Support
      case 'global-pulse': return <GlobalPulse />;
      case 'resource-ledger': return <ResourceLedger />;
      case 'legal-hub': return <LegalHub />;
      case 'updates': return <ProtocolUpdates />;
      case 'contact-us': return <ContactUs />;

      // Hidden/Shared Views
      case 'shared': return <ProofPortal record={selectedRecord || records[0]} onClose={() => { setActiveView('bgv-vault'); window.location.hash = ''; }} />;
      
      case 'settings': return (
        <div className={`p-10 rounded-[3rem] border shadow-sm animate-in fade-in duration-500 ${theme === 'onyx' ? 'bg-zinc-900 border-white/5' : 'bg-white border-emerald-50'}`}>
          <h2 className="text-3xl font-black mb-6 font-quantum">System Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 accent-text">Protocol Display Name</label>
                <input 
                  type="text" 
                  value={protocolName} 
                  onChange={(e) => { setProtocolName(e.target.value); localStorage.setItem('veritrustx-name', e.target.value); }}
                  className={`w-full px-6 py-4 rounded-2xl font-bold outline-none transition-all font-quantum ${theme === 'onyx' ? 'bg-black border-white/10 text-white' : 'bg-emerald-50/30 border-emerald-100 text-zinc-900'}`}
                />
              </div>
              <div className={`p-8 rounded-[2.5rem] space-y-4 border ${theme === 'onyx' ? 'bg-white/5 border-white/5' : 'bg-emerald-50/20 border-emerald-50'}`}>
                 <div className="flex items-center justify-between">
                    <div>
                       <h4 className="font-black">Presentation Mode</h4>
                       <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mt-1">Freezes background tasks for clean demos</p>
                    </div>
                    <button 
                      onClick={() => { const v = !isHibernation; setIsHibernation(v); localStorage.setItem('is-hibernation', String(v)); }}
                      className={`w-14 h-8 rounded-full transition-all relative ${isHibernation ? 'bg-emerald-600' : 'bg-zinc-200'}`}
                    >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isHibernation ? 'left-7' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>
            </div>
            <div className={`p-10 rounded-[3rem] flex flex-col justify-center border ${theme === 'onyx' ? 'bg-zinc-950/50 border-white/10' : 'bg-emerald-50/40 border-emerald-100'}`}>
              <Info className="accent-text mb-6" size={32} />
              <p className="text-sm leading-relaxed font-medium text-zinc-500">
                VeritrustX is currently calibrated to the <span className="accent-text font-black">{theme.toUpperCase()}</span> spectrum. All forensic data is metadata-tagged and non-repudiable.
              </p>
            </div>
          </div>
        </div>
      );
      default: return <Dashboard isHibernation={isHibernation} records={records} />;
    }
  };

  return (
    <div className={`min-h-screen flex selection:bg-emerald-500/30 font-sans relative theme-${theme}`}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} currentTheme={theme} onThemeChange={handleThemeChange} />

      <main className="flex-1 ml-64 min-h-screen flex flex-col relative z-10 print:ml-0">
        {/* Global sticky header */}
        <header className="sticky top-0 z-[60] glass-panel border-b px-10 py-5 print:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-xl font-black tracking-tighter flex items-center gap-3 font-quantum">
                  <div className="p-2 accent-bg rounded-lg shadow-lg text-white">
                    <Fingerprint size={18} />
                  </div>
                  {protocolName.toUpperCase()}
              </div>
              <div className="h-8 w-px bg-zinc-200/20 mx-2"></div>
              <div className="flex items-center gap-2">
                 <Activity size={14} className="accent-text animate-pulse" />
                 <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Neural Latency: <span className="text-zinc-900 font-bold dark:text-white">14ms</span></span>
              </div>
            </div>
            
            <div className="flex-1 max-w-xl px-10">
              <div className="relative group">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:accent-text`} size={16} />
                <input 
                  type="text" 
                  placeholder="Query institutional ledger..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 py-2.5 rounded-2xl text-xs outline-none transition-all font-medium ${theme === 'onyx' ? 'bg-black border-white/10 text-white' : 'bg-emerald-50/30 border-emerald-100 text-zinc-900'}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 transition-all rounded-xl ${isNotificationsOpen ? 'accent-bg text-white shadow-lg' : 'text-zinc-400 hover:accent-text'}`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 bg-rose-500 animate-pulse`}></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                    <div className={`absolute right-0 mt-4 w-96 rounded-[2.5rem] shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 border ${theme === 'onyx' ? 'bg-zinc-950 border-white/10' : 'bg-white border-emerald-50'}`}>
                       <div className={`p-6 border-b flex justify-between items-center ${theme === 'onyx' ? 'bg-black/50 border-white/5' : 'bg-emerald-50/30 border-emerald-50'}`}>
                          <h4 className="text-sm font-black uppercase tracking-widest">Neural Alert Feed</h4>
                       </div>
                       <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                          {notifications.map(n => (
                            <div key={n.id} className={`p-5 hover:bg-emerald-50/30 border-b transition-colors group ${theme === 'onyx' ? 'border-white/5' : 'border-emerald-50'}`}>
                               <div className="flex gap-4">
                                  <div className={`mt-1 p-2 rounded-lg shrink-0 ${n.type === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                     {n.type === 'critical' ? <ShieldAlert size={16} /> : n.type === 'success' ? <CheckCircle2 size={16} /> : <Cpu size={16} />}
                                  </div>
                                  <div className="flex-1">
                                     <div className="flex justify-between items-start">
                                        <p className="text-xs font-black">{n.title}</p>
                                        <span className="text-[9px] font-bold text-zinc-400">{n.time}</span>
                                     </div>
                                     <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mt-1">{n.message}</p>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => setActiveView('settings')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${theme === 'onyx' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-emerald-50/50 border-emerald-100 text-emerald-700 hover:bg-emerald-100'}`}>
                <Settings2 size={14} /> Config
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="p-10 lg:p-16 max-w-7xl mx-auto w-full flex-1 print:p-0 print:max-w-none">
          {renderContent()}
        </div>

        {/* Global activity indicator (Floating) */}
        <div className="fixed bottom-10 right-10 z-50 print:hidden">
           <div className={`text-white rounded-[2rem] shadow-2xl p-6 w-80 border relative group hover:w-96 transition-all overflow-hidden ${theme === 'onyx' ? 'bg-zinc-900 border-white/10' : 'bg-zinc-950 border-white/5'}`}>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 accent-bg rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Activity Mesh</span>
                 </div>
                 <MessageSquare size={14} className="accent-text" />
              </div>
              <div className="space-y-3 opacity-80">
                 {activityLog.map((log, i) => (
                   <div key={i} className="flex gap-3 items-center">
                      <log.icon size={12} className="accent-text opacity-50" />
                      <p className="text-[10px] font-medium truncate flex-1">{log.text}</p>
                      <span className="text-[9px] font-bold text-zinc-600">{log.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;