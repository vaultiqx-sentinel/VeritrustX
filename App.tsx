
import React, { useState, useEffect, useCallback } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { VeritrustTheme, VaultRecord } from './types';
import { API_BASE } from './services/gemini';

// --- INSTITUTIONAL COMPONENT MESH ---
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FounderAnalytics from './components/FounderAnalytics';
import IntegrityScanner from './components/IntegrityScanner';
import ForensicLab from './components/ForensicLab';
import GlobalPulse from './components/GlobalPulse';
import ProtocolUpdates from './components/ProtocolUpdates';
import ProofPortal from './components/ProofPortal';
import IntelligenceHub from './components/IntelligenceHub'; // Strategy Hub
import BusinessValue from './components/BusinessValue';
import BGVVault from './components/BGVVault';
import ProxyGuard from './components/ProxyGuard';
import ResourceLedger from './components/ResourceLedger';
import ERPArchitect from './components/ERPArchitect';
import AuditHistory from './components/AuditHistory';
import LicensingHub from './components/LicensingHub';
import PitchDeck from './components/PitchDeck'; // Vision Roadmap
import LegalHub from './components/LegalHub';
import InvoicePortal from './components/InvoicePortal';
import CandidatePortal from './components/CandidatePortal';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import MarketPosition from './components/MarketPosition'; // Strategic Blueprint
import VettingSimulator from './components/VettingSimulator'; // NEW

import { 
  Settings2, Search, Bell, Fingerprint, Menu, Activity, Cpu, Clock, 
  ShieldAlert, CheckCircle2, FileText, ExternalLink, MessageSquare, Info
} from 'lucide-react';

const App: React.FC = () => {
  // --- Global State Management ---
  const [activeView, setActiveView] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [protocolName, setProtocolName] = useState(localStorage.getItem('veritrustx-name') || 'VeriTrustX');
  const [isHibernation, setIsHibernation] = useState(localStorage.getItem('is-hibernation') === 'true');
  // UPDATED: Default to 'onyx' for high-end "Cyber" feel
  const [theme, setTheme] = useState<VeritrustTheme>((localStorage.getItem('veritrust-theme') as VeritrustTheme) || 'onyx');
  const [selectedRecord, setSelectedRecord] = useState<VaultRecord | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- Core Identity Records Mesh ---
  const [records, setRecords] = useState<VaultRecord[]>([]);

  // --- Neural Logs & Alert Feed ---
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Boot', message: 'VeritrustX Neural Logic Core is online.', type: 'info', time: 'Just now' },
    { id: 2, title: 'Registry Link', message: 'Institutional Vault Shards synchronized.', type: 'success', time: '2m ago' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { icon: Cpu, text: "Forensic mesh calibrated", time: "1m" },
    { icon: Clock, text: "Institutional uplink active", time: "5m" },
    { icon: Fingerprint, text: "Identity grounding online", time: "10m" }
  ]);

  // --- 🟢 INSTITUTIONAL DATA FETCH (Real-time Heart Sync) ---
  const fetchGlobalVault = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/records`);
      if (!response.ok) throw new Error("Connection Lost");
      const data = await response.json();
      
      const formatted: VaultRecord[] = data.map((r: any) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        status: r.status === 'GROUNDED' || r.status === 'Verified' ? 'Verified' : r.status === 'TERMINATED' ? 'Failed' : 'Flagged',
        trustScore: r.trustScore,
        created_at: r.created_at,
        // Allows null/undefined to pass through, handled by UI components
        photoUrl: r.photoUrl ?? null,
        entity_verified: r.entity_verified,
        identity_verified: r.identity_verified,
        report: r.report
      }));
      setRecords(formatted);
    } catch (err) {
      console.warn("Institutional Link Fault: Backend unreachable. Switching to Cached/Demo Protocol.");
      // FALLBACK MOCK DATA FOR DEMO STABILITY
      setRecords([
        { id: 'VX-ALPHA-01', name: 'Aditya Challa', role: 'Protocol Founder', status: 'Verified', trustScore: 99, created_at: new Date().toISOString(), entity_verified: true, identity_verified: true, report: "Identity anchored to root authority. No anomalies." },
        { id: 'VX-BETA-02', name: 'Vishal Kumar', role: 'Technical Architect', status: 'Verified', trustScore: 97, created_at: new Date(Date.now() - 100000).toISOString(), entity_verified: true, identity_verified: true, report: "Skills verified via neural logic scan." },
        { id: 'VX-GAMMA-03', name: 'System Test_01', role: 'Shadow Simulation', status: 'Flagged', trustScore: 42, created_at: new Date(Date.now() - 2000000).toISOString(), entity_verified: false, identity_verified: true, report: "Inconsistent timeline detected in employment history." },
        { id: 'VX-DELTA-04', name: 'Ghost Entry', role: 'Unverified Node', status: 'Failed', trustScore: 12, created_at: new Date(Date.now() - 5000000).toISOString(), entity_verified: false, identity_verified: false, report: "Synthetic Identity detected. Terminated." },
      ]);
    }
  }, []);

  useEffect(() => {
    fetchGlobalVault();
    const interval = setInterval(fetchGlobalVault, 60000);
    return () => clearInterval(interval);
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

  const handleAuditCompletion = useCallback((name: string, role: string, score: number, verdict: string, report?: string) => {
    addSystemEvent('New Audit Anchored', `Identity grounding for ${name} verified in Vault.`, score > 50 ? 'success' : 'critical');
    fetchGlobalVault(); 
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

  // --- Neural Router: Handling all 23 views ---
  const renderContent = () => {
    switch (activeView) {
      // Core & Founder
      case 'home': return <Home onEnter={() => setActiveView('truth-engine')} onContact={() => setActiveView('contact-us')} onLegal={() => setActiveView('legal-hub')} />;
      case 'ceo-command': return <FounderAnalytics />;
      
      // The "Neural Mesh" Core Components (CTO Branding)
      case 'truth-engine': return <IntegrityScanner onAuditComplete={handleAuditCompletion} />; // Was IntegrityScanner
      case 'universal-trust': return <GlobalPulse />; // Was GlobalPulse
      
      // Labs & Simulation
      case 'vetting-simulator': return <VettingSimulator />; // NEW Component for Demo
      case 'forensic-lab': return <ForensicLab onVerdict={handleAuditCompletion} />;
      case 'proxy-guard': return <ProxyGuard onFraudDetected={(n, r, s, v) => handleAuditCompletion(n, r, s, v, "Proxy Fraud Attempt")} />;
      
      // Strategy & Vision
      case 'strategic-blueprint': return <MarketPosition />; // Mapped to MarketPosition
      case 'strategy-hub': return <IntelligenceHub />; // Mapped to IntelligenceHub
      case 'vision-roadmap': return <PitchDeck />; // Mapped to PitchDeck
      
      // Ops & System
      case 'bgv-vault': 
        return (
          <BGVVault 
            searchFilter={globalSearch} 
            records={records} 
            onShareRecord={(r: VaultRecord) => { 
                setSelectedRecord(r); 
                setActiveView('shared'); 
            }} 
          />
        );

      case 'audit-history': 
        return (
          <AuditHistory 
            searchFilter={globalSearch} 
            records={records} 
            onViewRecord={(r: VaultRecord) => { 
                setSelectedRecord(r); 
                setActiveView('shared'); 
            }} 
          />
        );

      case 'resource-ledger': return <ResourceLedger />;
      case 'erp-architect': return <ERPArchitect onLogicDeploy={(d) => addSystemEvent('Logic Mutation', d, 'info')} />;
      case 'business-value': return <BusinessValue />;
      case 'updates': return <ProtocolUpdates />;
      case 'candidate-portal': return <CandidatePortal />;
      case 'licensing': return <LicensingHub />;
      case 'invoice-portal': return <InvoicePortal />;
      case 'legal-hub': return <LegalHub />;
      case 'contact-us': return <ContactUs />;
      
      case 'shared': {
        const recordToDisplay = selectedRecord ?? records[0];
        // Guard clause to prevent rendering without a record
        if (!recordToDisplay) {
            return (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-zinc-400">
                <ShieldAlert size={48} className="mb-4 opacity-50" />
                <p className="font-quantum uppercase tracking-widest">No Record Selected</p>
                <button onClick={() => setActiveView('bgv-vault')} className="mt-6 text-sm text-emerald-500 hover:underline">Return to Vault</button>
              </div>
            );
        }
        return <ProofPortal record={recordToDisplay} onClose={() => { setActiveView('bgv-vault'); window.location.hash = ''; }} />;
      }
      
      case 'settings': return (
        <div className={`p-10 rounded-[3rem] border shadow-sm animate-in fade-in duration-500 ${theme === 'onyx' ? 'bg-zinc-900 border-white/5' : 'bg-white border-emerald-50'}`}>
          <h2 className="text-3xl font-black mb-10 font-quantum dark:text-white text-zinc-900 uppercase">System Configuration</h2>
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
            <div className={`p-10 rounded-[3rem] flex flex-col justify-center border ${theme === 'onyx' ? 'bg-zinc-950/50 border-white/10' : 'bg-emerald-50/40 border-emerald-100'}`}>
               <Info className="accent-text mb-6" size={32} />
               <p className="text-sm leading-relaxed font-medium text-zinc-500">
                  VeritrustX is calibrated to the <span className="accent-text font-black">{theme.toUpperCase()}</span> spectrum. Every forensic audit is metadata-tagged and non-repudiable.
               </p>
            </div>
          </div>
        </div>
      );
      default: return <Home onEnter={() => setActiveView('truth-engine')} onContact={() => setActiveView('contact-us')} onLegal={() => setActiveView('legal-hub')} />;
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
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-600 lg:hidden rounded-xl hover:bg-zinc-100"><Menu size={24} /></button>
              <button onClick={() => setActiveView('home')} className="flex items-center gap-3 group">
                <div className="p-2 accent-bg rounded-lg shadow-lg text-white group-hover:rotate-12 transition-transform">
                  <Fingerprint size={18} />
                </div>
                <span className="text-xl font-black font-quantum text-zinc-900">{protocolName.toUpperCase()}</span>
              </button>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl px-10">
              <div className="relative group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:accent-text" size={16} />
                <input 
                  type="text" placeholder="Query institutional ledger..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl text-xs outline-none transition-all font-medium ${theme === 'onyx' ? 'bg-black border-white/10 text-white' : 'bg-emerald-50/30 border-emerald-100 text-zinc-900'}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
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
                                     <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{n.message}</p>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </>
                )}
              </div>
              <button onClick={() => setActiveView('settings')} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-emerald-100 text-emerald-700">
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
           <div className={`text-white rounded-[2rem] shadow-2xl p-6 w-80 border relative group hover:w-96 transition-all overflow-hidden ${theme === 'onyx' ? 'bg-zinc-900 border-white/10' : 'bg-zinc-950 border-white/5'}`}>
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

        {/* 🟢 VERCEL OBSERVABILITY - REAL-TIME TRACKING */}
        <Analytics />
        <SpeedInsights />
      </main>
    </div>
  );
};

export default App;
