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
import ContactUs from './components/ContactUs';
import Home from './components/Home';

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
  // --- Global State ---
  const [activeView, setActiveView] = useState<string>('home'); // Default set to Home
  const [globalSearch, setGlobalSearch] = useState('');
  const [protocolName, setProtocolName] = useState(localStorage.getItem('veritrustx-name') || 'VERITRUSTX');
  const [isHibernation, setIsHibernation] = useState(localStorage.getItem('is-hibernation') === 'true');
  const [theme, setTheme] = useState<VeritrustTheme>((localStorage.getItem('veritrust-theme') as VeritrustTheme) || 'emerald');
  const [selectedRecord, setSelectedRecord] = useState<VaultRecord | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- Records ---
  const [records, setRecords] = useState<VaultRecord[]>([
    { id: "REC-101", name: "Arjun Mehra", role: "Sr. AI Engineer", status: "Verified", trustScore: 94, date: "2024-05-22", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { id: "REC-102", name: "Priya Sharma", role: "Product Lead", status: "Flagged", trustScore: 42, date: "2024-05-21", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" }
  ]);

  const [notifications, setNotifications] = useState([
    { id: Date.now(), title: 'Protocol Boot', message: 'Neural Logic Core initialized.', type: 'info', time: 'Just now' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { icon: Cpu, text: "Institutional logic shard deployed", time: "1m" }
  ]);

  const addSystemEvent = useCallback((title: string, message: string, type: 'info' | 'warning' | 'critical' | 'success') => {
    const newEvent = { id: Date.now(), title, message, type, time: 'Just now' };
    setNotifications(prev => [newEvent, ...prev].slice(0, 10));
    setActivityLog(prev => [{ icon: Cpu, text: title, time: "0m" }, ...prev].slice(0, 5));
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
    addSystemEvent('New Audit Registered', `Audit for ${name} complete.`, 'success');
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
        if (record) { setSelectedRecord(record); setActiveView('shared'); }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [records]);

  const renderContent = () => {
    switch (activeView) {
      case 'home': return <Home onEnter={() => setActiveView('dashboard')} onContact={() => setActiveView('contact-us')} />;
      case 'dashboard': return <Dashboard isHibernation={isHibernation} records={records} />;
      case 'erp-architect': return <ERPArchitect onLogicDeploy={(d) => addSystemEvent('Logic Mutation', d, 'info')} />;
      case 'integrity-scan': return <IntegrityScanner onAuditComplete={addAuditRecord} />;
      case 'forensic-lab': return <ForensicLab onVerdict={addAuditRecord} />;
      case 'proxy-guard': return <ProxyGuard onFraudDetected={addAuditRecord} />;
      case 'bgv-vault': return <BGVVault searchFilter={globalSearch} records={records} onShareRecord={(r) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      case 'audit-history': return <AuditHistory searchFilter={globalSearch} records={records} onViewRecord={(r) => { setSelectedRecord(r); setActiveView('shared'); }} />;
      case 'client-acquisition': return <StrategyHub />;
      case 'candidate-portal': return <CandidatePortal />;
      case 'licensing': return <LicensingHub />;
      case 'invoice-portal': return <InvoicePortal />;
      case 'vision-roadmap': return <VisionRoadmap onAction={(v) => setActiveView(v)} />;
      case 'legal-hub': return <LegalHub />;
      case 'global-pulse': return <GlobalPulse />;
      case 'resource-ledger': return <ResourceLedger />;
      case 'updates': return <ProtocolUpdates />;
      case 'contact-us': return <ContactUs />;
      case 'shared': return <ProofPortal record={selectedRecord || records[0]} onClose={() => { setActiveView('bgv-vault'); window.location.hash = ''; }} />;
      case 'settings': return (
        <div className="p-10 rounded-[3rem] border bg-white border-emerald-50 shadow-sm">
          <h2 className="text-3xl font-black mb-6 font-quantum">System Configuration</h2>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Protocol Name</label>
               <input type="text" value={protocolName} onChange={(e) => setProtocolName(e.target.value)} className="w-full px-6 py-4 bg-zinc-50 rounded-2xl font-bold border-2 border-zinc-100" />
            </div>
          </div>
        </div>
      );
      default: return <Home onEnter={() => setActiveView('dashboard')} onContact={() => setActiveView('contact-us')} />;
    }
  };

  return (
    <div className={`min-h-screen flex selection:bg-emerald-500/30 font-sans relative theme-${theme}`}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} currentTheme={theme} onThemeChange={handleThemeChange} />
      <main className="flex-1 ml-64 min-h-screen flex flex-col relative z-10 print:ml-0">
        <header className="sticky top-0 z-[60] glass-panel border-b px-10 py-5 print:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-xl font-black tracking-tighter flex items-center gap-3 font-quantum">
                  <div className="p-2 accent-bg rounded-lg text-white"><Fingerprint size={18} /></div>
                  {protocolName.toUpperCase()}
              </div>
            </div>
            <div className="flex items-center gap-6">
               <button onClick={() => setActiveView('settings')} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-emerald-100 text-emerald-700 hover:bg-emerald-50">Config</button>
            </div>
          </div>
        </header>
        <div className="p-10 lg:p-16 max-w-7xl mx-auto w-full flex-1 print:p-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;