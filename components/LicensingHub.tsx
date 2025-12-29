import React, { useState } from 'react';
import { 
  Key, ShieldCheck, Zap, Building2, Mail, Bell, X, Send, 
  Loader2, Download, Shield, Fingerprint, RefreshCcw, 
  TrendingUp, BarChart3, Clock, AlertCircle, 
  ChevronRight, CheckCircle2, DollarSign, Activity,
  Target, Award, ArrowUpRight, FileText, Check, ReceiptText,
  UserCheck, ShieldAlert, Plus, Globe, Trash2
} from 'lucide-react';
import { generateUpdateMessage } from '../src/services/geminiService';

const EMAIL_TEMPLATES = {
  retention: {
    subject: "VeritrustX License Renewal: [Client Name]",
    body: "Hi [Name],\n\nWe noticed your [Tier] license is nearing its expiration on [Date]. Your organization has reached a [Usage]% utilization rate, successfully blocking multiple identity threats.\n\nTo ensure uninterrupted protection of your hiring pipeline, please authorize the renewal via your dashboard."
  },
  upsell: {
    subject: "Scaling Your Identity Firewall: [Client Name]",
    body: "Hi [Name],\n\nWith your license renewal approaching on [Date], we've analyzed your high utilization ([Usage]%). You are a perfect candidate for our Enterprise Whitelabel tier, which offers 40% lower transactional costs.\n\nWould you like to review the upgrade path?"
  },
  aggressive: {
    subject: "URGENT: Impending Protocol Suspension - [Client Name]",
    body: "ATTENTION: Your VeritrustX access (License [ID]) is set to expire on [Date]. \n\nFailure to renew within the next 48 hours will result in the immediate deactivation of your Neural Logic nodes and Proxy Guard surveillance. Act now to prevent a trust gap."
  }
};

export default function LicensingHub() {
  const [viewMode, setViewMode] = useState<'founder' | 'client'>('founder');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [targetClient, setTargetClient] = useState<any>(null);
  const [strategy, setStrategy] = useState<'retention' | 'upsell' | 'aggressive'>('retention');
  const [isSending, setIsSending] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  
  // Founder Action State
  const [newLicenseName, setNewLicenseName] = useState('');
  const [generatedID, setGeneratedID] = useState<string | null>(null);

  const [activeLicenses, setActiveLicenses] = useState([
    { id: 'VX-2025-NEXUS-772', client: 'TechFlow Series-A', tier: 'Subscription', status: 'Active', expiry: '2026-06-12', revenue: 75000, usage: 85, risk: 'Low', notifications: [] },
    { id: 'VX-2025-GREEN-102', client: 'GreenNodes Ltd', tier: 'Whitelabel', status: 'Active', expiry: '2026-01-10', revenue: 1200000, usage: 12, risk: 'High', notifications: [] },
    { id: 'VX-2024-ARJUN-881', client: 'Arjun Mehra (Solo)', tier: 'Transactional', status: 'Expiring', expiry: '2025-05-28', revenue: 15000, usage: 98, risk: 'Low', notifications: [] },
  ]);

  const handleGenerateLicense = () => {
    if (!newLicenseName) return;
    setIsGenerating(true);
    setTimeout(() => {
      const id = `VX-2025-${newLicenseName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedID(id);
      setIsGenerating(false);
    }, 1500);
  };

  const handlePrepareRenewalDraft = async (client: any, selectedStrategy: 'retention' | 'upsell' | 'aggressive' = 'retention') => {
    setTargetClient(client);
    setStrategy(selectedStrategy);
    setShowNotificationModal(true);
    
    const template = EMAIL_TEMPLATES[selectedStrategy];
    const initialBody = template.body
      .replace('[Name]', client.client.split(' ')[0])
      .replace('[Client Name]', client.client)
      .replace('[Tier]', client.tier)
      .replace('[Date]', client.expiry)
      .replace('[Usage]', client.usage.toString())
      .replace('[ID]', client.id);
    
    setEmailDraft(`Subject: ${template.subject.replace('[Client Name]', client.client)}\n\n${initialBody}`);
  };

  const handleBulkNotify = () => {
    const expiring = activeLicenses.filter(l => l.status === 'Expiring');
    if (expiring.length === 0) return;
    setBulkMode(true);
    setTargetClient({ client: `${expiring.length} Expiring Clients`, tier: 'Various', expiry: 'Multiple', usage: 'High', id: 'BATCH' });
    handlePrepareRenewalDraft(expiring[0], 'retention');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* TABS: Switch between Founder and Client */}
      <div className="flex justify-center">
         <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-2 border border-slate-200">
            <button 
              onClick={() => setViewMode('founder')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'founder' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Founder View (Admin)
            </button>
            <button 
              onClick={() => setViewMode('client')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'client' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Client View (Nexus Fintech)
            </button>
         </div>
      </div>

      {viewMode === 'founder' ? (
        /* ==================== FOUNDER MODE ==================== */
        <div className="space-y-10 animate-in slide-in-from-left-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <TrendingUp size={14} className="text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Strategic Revenue Mesh</span>
               </div>
               <h2 className="text-5xl font-black text-slate-900 tracking-tight">
                Revenue <span className="text-indigo-500">Intel</span>
              </h2>
            </div>
            
            <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Annual Revenue</p>
               <div className="mt-4">
                  <h3 className="text-3xl font-black text-white font-quantum">₹14.5L</h3>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">Synced to Ledger</p>
               </div>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">At Churn Risk</p>
               <div className="mt-4">
                  <h3 className="text-3xl font-black text-orange-500 font-quantum">₹1.1L</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Expiring in 30d</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* New License Issuance */}
            <div className="bg-white border-4 border-slate-100 p-8 rounded-[3rem] space-y-6 shadow-sm">
               <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Plus className="text-indigo-600" size={20} /> Issue New Protocol
               </h4>
               <div className="space-y-4">
                  <input 
                    type="text" 
                    value={newLicenseName}
                    onChange={(e) => setNewLicenseName(e.target.value)}
                    placeholder="Enter Client Name..."
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold"
                  />
                  <button 
                    onClick={handleGenerateLicense}
                    className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-all"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" /> : 'Generate Access Token'}
                  </button>
               </div>
               {generatedID && (
                 <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl animate-in zoom-in-95">
                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Send to Client</p>
                    <p className="text-lg font-mono font-black text-slate-900">{generatedID}</p>
                 </div>
               )}
            </div>

            {/* Active Clients List */}
            <div className="lg:col-span-2 bg-white border-2 border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
               <div className="p-6 border-b-2 border-slate-50 bg-slate-50/50 flex justify-between items-center">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Institutional Registry</h4>
                  <button onClick={handleBulkNotify} className="text-[9px] font-black bg-orange-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Bell size={12} /> Notify Expiring
                  </button>
               </div>
               <div className="divide-y divide-slate-100">
                  {activeLicenses.map((lic) => (
                    <div key={lic.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400"><Building2 size={20} /></div>
                          <div>
                             <p className="text-sm font-black text-slate-900">{lic.client}</p>
                             <p className="text-[10px] font-mono text-slate-400">{lic.id}</p>
                          </div>
                       </div>
                       <button onClick={() => handlePrepareRenewalDraft(lic)} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Send size={18} /></button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== CLIENT MODE ==================== */
        <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-right-4 duration-700">
           <div className="bg-white border-4 border-slate-100 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500"></div>
              
              <div className="w-24 h-24 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-900/20">
                 <Shield size={48} />
              </div>
              
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Institutional Identity Protocol</h3>
              <h4 className="text-5xl font-black text-slate-900 tracking-tight mb-4 font-quantum">Nexus Fintech</h4>
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Tier: Fortress Protocol
              </div>
              
              <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 max-w-lg mx-auto relative group">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Secure Access Token (For Candidates)</p>
                 <p className="text-2xl font-mono font-black text-indigo-600 tracking-tight">VX-2025-NEXUS-9921</p>
                 <button onClick={() => alert("Token copied to clipboard")} className="mt-4 text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase underline tracking-widest cursor-pointer">Copy Token to Onboarding Invite</button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-white border-2 border-slate-100 rounded-[3rem] space-y-6">
                 <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="text-indigo-500" size={18} /> Protocol Utilization
                 </h5>
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-slate-400 uppercase">Verification Shards</span>
                       <span className="text-sm font-black text-slate-900">85 / 100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-600" style={{ width: '85%' }}></div>
                    </div>
                 </div>
                 <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all">Expansion Portal</button>
              </div>

              <div className="p-10 bg-slate-900 text-white rounded-[3rem] space-y-6 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Zap size={100} /></div>
                 <h5 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-emerald-500">
                    <ArrowUpRight size={18} /> Strategic Upgrade
                 </h5>
                 <p className="text-sm font-medium leading-relaxed text-slate-400">Current utilization at 85%. Switch to the **Citadel Tier** for unlimited Forensic DNA Lab throughput and Proxy Guard 24/7 coverage.</p>
                 <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg">Request Citadel Access</button>
              </div>
           </div>
        </div>
      )}

      {/* Notification Modal - FOUNDER MODE ONLY */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white border border-slate-200 rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowNotificationModal(false)}
              className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-12 space-y-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-2xl">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Authorizing Renewal Protocol
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                    Target: <span className="text-indigo-600">{targetClient?.client}</span>
                  </p>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] relative overflow-hidden group">
                 <textarea 
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  className="w-full h-64 bg-transparent border-none text-slate-700 text-sm font-medium leading-relaxed italic outline-none resize-none font-serif"
                />
              </div>

              <button 
                onClick={() => {alert("Broadcast Dispatched"); setShowNotificationModal(false);}}
                className={`w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl`}
              >
                <Send size={18} /> Authorize Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}