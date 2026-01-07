import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FounderAnalytics from './components/FounderAnalytics';
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
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import StrategicBlueprint from './components/StrategicBlueprint';

import { 
  Settings2, Search, Bell, Fingerprint, CheckCircle2, ShieldAlert, 
  Cpu, MessageSquare, Clock, Activity, FileText, ExternalLink, Menu, Info
} from 'lucide-react';

// --- TYPES & GLOBAL INTERFACES ---
export type VeritrustTheme = 'emerald' | 'indigo' | 'onyx';

export interface VaultRecord {
  id: string;
  name: string;
  role: string;
  status: 'Verified' | 'Flagged' | 'Failed';
  trustScore: number;
  created_at: string;       // Synced with Backend
  photoUrl: string | null;  // Synced with Backend
  report?: string;          // Forensic analysis text
  entity_verified?: boolean; // Trinity of Trust: Company
  identity_verified?: boolean; // Trinity of Trust: Candidate
}

const App: React.FC = () => {
  // --- Global State Management ---
  const [activeView, setActiveView] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [protocolName, setProtocolName] = useState(localStorage.getItem('veritrustx-name') || 'VERITRUSTX');
  const [isHibernation, setIsHibernation] = useState(localStorage.getItem('is-hibernation') === 'true');
  const [theme, setTheme] = useState<VeritrustTheme>((localStorage.getItem('veritrust-theme') as VeritrustTheme) || 'emerald');
  const [selectedRecord, setSelectedRecord] = useState<VaultRecord | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- Core Identity Records Mesh ---
  const [records, setRecords] = useState<VaultRecord[]>([]);

  // --- Neural Logs & Alert Feed ---
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Boot', message: 'VeritrustX Neural Logic Core is online.', type: 'info', time: 'Just now' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { icon: Cpu, text: "Forensic mesh calibrated", time: "1m" },
    { icon: Clock, text: "Institutional uplink active", time: "5m" }
  ]);

  // --- 🟢 INSTITUTIONAL DATA FETCH (Real-time Sync) ---
  const fetchGlobalVault = useCallback(async () => {
    try {
      // Use your Render URL for live or localhost:5000 for local testing
      const response = await fetch('https://veritrustx.onrender.com/api/records');
      const data = await response.json();
      
      const formatted = data.map((r: any) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        // Map DB GROUNDED/TERMINATED to UI Verified/Failed
        status: r.status === 'GROUNDED' || r.status === 'Verified' ? 'Verified' : r.status === 'TERMINATED' ? 'Failed' : 'Flagged',
        trustScore: r.trustScore,
        created_at: r.created_at,
        photoUrl: r.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${r.name}`,
        entity_verified: r.entity_verified,
        identity_verified: r.identity_verified,
        report: r.report
      }));
      setRecords(formatted);
    } catch (err) {
      console.error("Institutional Link Fault: Backend unreachable.");
    }
  }, []);

  useEffect(() => {
    fetchGlobalVault();
  }, [fetchGlobalVault]);

  // --- Logic Handlers ---
  const addSystemEvent = useCallback((title: string, message: string, type: 'info' | 'warning' | 'critical' | 'success') => {
    const newEvent = { id: Date.now(), title, message, type, time: 'Just now' };
    setNotifications(prev => [newEvent, ...prev].slice(0, 10));
    setActivityLog(prev => [{ 
        icon: type === 'critical' ? ShieldAlert : CheckCircle2, 
        text: title, 
        time: "0m" 
    }, ...prev].slice(0, 5));
  }, []);

  // Updated callback for ProxyGuard and ForensicLab to trigger re-fetch
  const handleAuditCompletion = useCallback((name: string, role: string, score: number, verdict: string) => {
    addSystemEvent('New Audit Anchored', `Identity grounding for ${name} verified in Vault.`, score > 50 ? 'success' : 'critical');
    fetchGlobalVault(); // Refresh Vault immediately after audit
  }, [addSystemEvent, fetchGlobalVault]);

  const handleThemeChange = (newTheme: VeritrustTheme) => {
    setTheme(newTheme);
    localStorage.setItem('veritrust-theme', newTheme);
  };

  // --- Hash Change Listener for Deep Linking ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/proof/')) {
        const id = hash.replace('#/proof/', '');
        const record = records.find(r => r.id === id);
        if (record) {
          setSelectedRecord(record);
          setActiveView('shared');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [records]);

  // --- Neural Router: Handling all views ---
  const renderContent = () => {
    switch (activeView) {
      case 'home': return <Home onEnter={() => setActiveView('dashboard')} onContact={() => setActiveView('contact-us')} />;
      case 'ceo-command': return <FounderAnalytics />;
      case 'dashboard': return <Dashboard isHibernation={isHibernation} records={records} />;
      case 'erp-architect': return <ERPArchitect onLogicDeploy={(d) => addSystemEvent('Logic Mutation', d, 'info')} />;
      
      // ✅ BGV Vault with Search & Prop Sync
      case 'bgv-vault': 
        return (
          <BGVVault 
            searchFilter={globalSearch} 
            records={records} 
            onShareRecord={(r: VaultRecord) => { setSelectedRecord(r); setActiveView('shared'); }} 
          />
        );

      case 'audit-history': return <AuditHistory searchFilter={globalSearch} records={records} onViewRecord={(r: VaultRecord) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      case 'integrity-scan': return <IntegrityScanner onAuditComplete={handleAuditCompletion} />;
      
      // ✅ Proxy Guard connected to Backend Sync
      case 'proxy-guard': return <ProxyGuard onFraudDetected={handleAuditCompletion} />;
      case 'forensic-lab': return <ForensicLab onVerdict={handleAuditCompletion} />;
      
      case 'resource-ledger': return <ResourceLedger />;
      case 'strategic-blueprint': return <StrategicBlueprint onAction={(v: any) => setActiveView(v)} />;
      case 'global-pulse': return <GlobalPulse />;
      case 'business-value': return <BusinessValue />;
      case 'updates': return <ProtocolUpdates />;
      case 'client-acquisition': return <StrategyHub />;
      case 'candidate-portal': return <CandidatePortal />;
      case 'licensing': return <LicensingHub />;
      case 'invoice-portal': return <InvoicePortal />;
      case 'vision-roadmap': return <VisionRoadmap onAction={(v) => setActiveView(v)} />;
      case 'legal-hub': return <LegalHub />;
      case 'contact-us': return <ContactUs />;
      
      case 'newsletter':
        return (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="bg-zinc-900 rounded-[4rem] p-12 lg:p-20 text-white text-center border-b-8 border-indigo-600 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10"><FileText size={160} /></div>
              <div className="relative z-10 space-y-6">
                 <h2 className="text-4xl lg:text-6xl font-black font-quantum uppercase tracking-tighter">The Integrity <span className="text-indigo-400">Mesh</span></h2>
                 <p className="text-lg lg:text-xl text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed italic">"Forensic Intelligence on Global Identity Fraud & Neural Scrutiny."</p>
                 <div className="pt-8">
                    <button 
                      onClick={() => window.open('https://www.linkedin.com/newsletters/7212450534571933696/', '_blank')}
                      className="px-10 py-5 bg-white text-zinc-900 font-black rounded-2xl flex items-center gap-3 mx-auto hover:bg-indigo-50 hover:text-white transition-all shadow-xl"
                    >
                       Subscribe on LinkedIn <ExternalLink size={20} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'shared': return <ProofPortal record={selectedRecord || records[0]} onClose={() => { setActiveView('bgv-vault'); window.location.hash = ''; }} />;
      case 'settings': return (
        <div className={`p-10 rounded-[3rem] border shadow-sm animate-in fade-in duration-500 ${theme === 'onyx' ? 'bg-zinc-900 border-white/5' : 'bg-white border-emerald-50'}`}>
          <h2 className="text-3xl font-black mb-10 font-quantum dark:text-white text-zinc-900">System Configuration</h2>
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
                       <h4 className="font-black dark:text-white text-zinc-900">Presentation Hibernation</h4>
                       <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mt-1">Freezes neural logic for demos</p>
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
        </div>
      );
      default: return <Home onEnter={() => setActiveView('dashboard')} onContact={() => setActiveView('contact-us')} />;
    }
  };

  return (
    <div className={`min-h-screen flex selection:bg-emerald-500/30 font-sans relative theme-${theme} overflow-x-hidden`}>
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-[70] lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* SIDEBAR DRAWER */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-[80] lg:z-20`}>
        <Sidebar activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} currentTheme={theme} onThemeChange={handleThemeChange} />
      </div>

      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col relative z-10 print:ml-0">
        
        {/* --- GLOBAL STICKY HEADER --- */}
        <header className="sticky top-0 z-[60] glass-panel border-b px-6 lg:px-10 py-5 print:hidden bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-600 lg:hidden"><Menu size={24} /></button>
              <button onClick={() => setActiveView('home')} className="flex items-center gap-3 group">
                <div className="p-2 accent-bg rounded-lg shadow-lg text-white group-hover:rotate-12 transition-transform">
                  <Fingerprint size={18} />
                </div>
                <span className="text-xl font-black font-quantum text-zinc-900">{protocolName.toUpperCase()}</span>
              </button>
            </div>

            {/* Global Search Field */}
            <div className="hidden md:flex flex-1 max-w-xl px-10">
              <div className="relative group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:accent-text" size={16} />
                <input 
                  type="text" placeholder="Query institutional ledger..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl text-xs outline-none transition-all font-medium ${theme === 'onyx' ? 'bg-black border-white/10 text-white' : 'bg-emerald-50/30 border-emerald-100 text-zinc-900'}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-8">
              <div className="relative">
                <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`p-2 transition-all rounded-xl ${isNotificationsOpen ? 'accent-bg text-white' : 'text-zinc-400 hover:accent-text'}`}>
                  <Bell size={22} />
                  {notifications.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 bg-rose-500 animate-pulse"></span>}
                </button>

                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                    <div className={`absolute right-0 mt-4 w-80 lg:w-96 rounded-[2.5rem] shadow-2xl z-20 overflow-hidden border ${theme === 'onyx' ? 'bg-zinc-950 border-white/10' : 'bg-white border-emerald-50'}`}>
                       <div className="p-6 border-b flex justify-between items-center">
                          <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900">Neural Alert Feed</h4>
                       </div>
                       <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                          {notifications.map(n => (
                            <div key={n.id} className="p-5 hover:bg-emerald-50/30 border-b transition-colors group">
                               <div className="flex gap-4">
                                  <div className={`mt-1 p-2 rounded-lg shrink-0 ${n.type === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                     {n.type === 'critical' ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
                                  </div>
                                  <div className="flex-1">
                                     <p className="text-xs font-black text-zinc-900">{n.title}</p>
                                     <p className="text-[11px] text-zinc-500 mt-1">{n.message}</p>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => setActiveView('settings')} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 text-emerald-700">
                <Settings2 size={16} /> Config
              </button>
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT SLOT --- */}
        <div className="p-6 lg:p-16 max-w-7xl mx-auto w-full flex-1">
          {renderContent()}
        </div>

        {/* GLOBAL ACTIVITY LEDGER WIDGET */}
        <div className="fixed bottom-10 right-10 z-50 print:hidden hidden sm:block">
           <div className={`text-white rounded-[2rem] shadow-2xl p-6 w-80 border relative overflow-hidden ${theme === 'onyx' ? 'bg-zinc-900 border-white/10' : 'bg-zinc-950 border-white/5'}`}>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 accent-bg rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Neural Logic Mesh</span>
                 </div>
                 <MessageSquare size={14} className="accent-text" />
              </div>
              <div className="space-y-3 opacity-80">
                 {activityLog.map((log, i) => (
                   <div key={i} className="flex gap-3 items-center">
                      <log.icon size={12} className="accent-text" />
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