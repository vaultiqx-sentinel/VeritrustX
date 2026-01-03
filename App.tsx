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
  Settings2, Search, AlertCircle, X, Bell, Info, 
  Fingerprint, CheckCircle2, ShieldAlert, Cpu, MessageSquare, Clock, Activity, FileText, ExternalLink, Menu
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
  // --- Global State Management ---
  const [activeView, setActiveView] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 📱 ADDED FOR MOBILE
  const [globalSearch, setGlobalSearch] = useState('');
  const [protocolName, setProtocolName] = useState(localStorage.getItem('veritrustx-name') || 'VERITRUSTX');
  const [isHibernation, setIsHibernation] = useState(localStorage.getItem('is-hibernation') === 'true');
  const [showKeyWarning, setShowKeyWarning] = useState(false);
  const [theme, setTheme] = useState<VeritrustTheme>((localStorage.getItem('veritrust-theme') as VeritrustTheme) || 'emerald');
  const [selectedRecord, setSelectedRecord] = useState<VaultRecord | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- Core Identity Records ---
  const [records, setRecords] = useState<VaultRecord[]>([
    { id: "REC-101", name: "Arjun Mehra", role: "Sr. AI Engineer", status: "Verified", trustScore: 94, date: "2024-05-22", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { id: "REC-102", name: "Priya Sharma", role: "Product Lead", status: "Flagged", trustScore: 42, date: "2024-05-21", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: "REC-103", name: "Rohan Gupta", role: "DevOps Architect", status: "Failed", trustScore: 12, date: "2024-05-20", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" }
  ]);

  // --- Neural Logs & Alerts ---
  const [notifications, setNotifications] = useState([
    { id: Date.now(), title: 'System Boot', message: 'VeritrustX Neural Logic Core is online.', type: 'info', time: 'Just now' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { icon: Cpu, text: "Emerald logic shard deployed", time: "1m" },
    { icon: Clock, text: "Uplink established", time: "5m" }
  ]);

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

  const addAuditRecord = useCallback((name: string, role: string, score: number, verdict: string) => {
    const status = score > 80 ? 'Verified' : score > 40 ? 'Flagged' : 'Failed';
    const id = `REC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: VaultRecord = { 
      id, name, role, status: status as any, trustScore: score, 
      date: new Date().toISOString().split('T')[0],
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    setRecords(prev => [newRecord, ...prev]);
    addSystemEvent('New Audit Registered', `Integrity check for ${name} completed with ${score}% score.`, score > 50 ? 'success' : 'critical');
  }, [addSystemEvent]);

  const handleThemeChange = (newTheme: VeritrustTheme) => {
    setTheme(newTheme);
    localStorage.setItem('veritrust-theme', newTheme);
  };

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

  // --- Neural Router ---
  const renderContent = () => {
    switch (activeView) {
      case 'home': return <Home onEnter={() => setActiveView('dashboard')} onContact={() => setActiveView('contact-us')} />;
      case 'ceo-command': return <FounderAnalytics />;
      case 'dashboard': return <Dashboard isHibernation={isHibernation} records={records} />;
      case 'erp-architect': return <ERPArchitect onLogicDeploy={(d) => addSystemEvent('Logic Mutation', d, 'info')} />;
      case 'bgv-vault': return <BGVVault searchFilter={globalSearch} records={records} onShareRecord={(r) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      case 'audit-history': return <AuditHistory searchFilter={globalSearch} records={records} onViewRecord={(r) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      case 'integrity-scan': return <IntegrityScanner onAuditComplete={addAuditRecord} />;
      case 'proxy-guard': return <ProxyGuard onFraudDetected={addAuditRecord} />;
      case 'resource-ledger': return <ResourceLedger />;
      case 'forensic-lab': return <ForensicLab onVerdict={addAuditRecord} />;
      case 'strategic-blueprint': return <StrategicBlueprint />;
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
            <div className="bg-zinc-900 rounded-[4rem] p-16 text-white text-center border-b-8 border-indigo-600 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10"><FileText size={160} /></div>
              <div className="relative z-10 space-y-6">
                 <h2 className="text-5xl font-black font-quantum uppercase tracking-tighter">The Integrity <span className="text-indigo-400">Mesh</span></h2>
                 <p className="text-xl text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed italic">
                   "Forensic Intelligence on Global Identity Fraud & Neural Scrutiny."
                 </p>
                 <div className="pt-8">
                    <button 
                      onClick={() => window.open('https://www.linkedin.com/newsletters/YOUR_NEWSLETTER_ID', '_blank')}
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
          <h2 className="text-3xl font-black mb-6 font-quantum dark:text-white text-zinc-900">System Configuration</h2>
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
            </div>
          </div>
        </div>
      );
      default: return <Home onEnter={() => setActiveView('dashboard')} onContact={() => setActiveView('contact-us')} />;
    }
  };

  return (
    <div className={`min-h-screen flex selection:bg-emerald-500/30 font-sans relative theme-${theme}`}>
      
      {/* 📱 MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-[70] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 🧭 SIDEBAR - MODIFIED FOR MOBILE SLIDE */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-[80] lg:z-20`}>
        <Sidebar 
          activeView={activeView} 
          setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} 
          currentTheme={theme} 
          onThemeChange={handleThemeChange} 
        />
      </div>

      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col relative z-10 print:ml-0">
        
        {/* --- GLOBAL STICKY HEADER --- */}
        <header className="sticky top-0 z-[60] glass-panel border-b px-6 lg:px-10 py-5 print:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {/* 📱 MOBILE BURGER MENU BUTTON */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-xl lg:hidden transition-all"
              >
                <Menu size={24} />
              </button>

              <button 
                onClick={() => setActiveView('home')}
                className="flex items-center gap-3 group hover:opacity-80 transition-all"
              >
                <div className="p-2 accent-bg rounded-lg shadow-lg text-white group-hover:rotate-12 transition-transform">
                  <Fingerprint size={18} />
                </div>
                <span className="text-lg lg:text-xl font-black font-quantum dark:text-white text-zinc-900">
                  {protocolName.toUpperCase()}
                </span>
              </button>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl px-10">
              <div className="relative group w-full">
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

            <div className="flex items-center gap-3 lg:gap-6">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 transition-all rounded-xl ${isNotificationsOpen ? 'accent-bg text-white shadow-lg' : 'text-zinc-400 hover:accent-text'}`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 bg-rose-500 animate-pulse`}></span>
                  )}
                </button>
                <button onClick={() => setActiveView('settings')} className="hidden sm:flex p-2 text-zinc-400 hover:accent-text transition-all">
                  <Settings2 size={20} />
                </button>
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT SLOT --- */}
        <div className="p-6 lg:p-16 max-w-7xl mx-auto w-full flex-1 print:p-0 print:max-w-none">
          {renderContent()}
        </div>

        {/* --- 📟 GLOBAL ACTIVITY LEDGER WIDGET --- */}
        <div className="fixed bottom-10 right-10 z-50 print:hidden hidden sm:block">
           <div className={`text-white rounded-[2rem] shadow-2xl p-6 w-80 border relative group hover:w-96 transition-all overflow-hidden ${theme === 'onyx' ? 'bg-zinc-900 border-white/10' : 'bg-zinc-950 border-white/5'}`}>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 accent-bg rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Neural Logic Mesh</span>
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