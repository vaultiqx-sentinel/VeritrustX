import React, { useState } from 'react';
import { 
  Key, ShieldCheck, Zap, Building2, Mail, Bell, X, Send, 
  Loader2, Download, Shield, Fingerprint, RefreshCcw, 
  TrendingUp, Activity, TrendingDown, AlertCircle, 
  ChevronRight, CheckCircle2, DollarSign, Target, Award, 
  ArrowUpRight, FileText, Check, ReceiptText, Plus, EyeOff, Eye, Trash2, Lock
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
  const [showKey, setShowKey] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [targetClient, setTargetClient] = useState<any>(null);
  const [strategy, setStrategy] = useState<'retention' | 'upsell' | 'aggressive'>('retention');
  const [newLicenseName, setNewLicenseName] = useState('');
  const [generatedID, setGeneratedID] = useState<string | null>(null);

  // Client Side State
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmittingUTR, setIsSubmittingUTR] = useState(false);

  // --- MOCK DATABASE WITH CREDITS & PAYMENT LOCKS ---
  const [activeLicenses, setActiveLicenses] = useState([
    { id: 'VX-2025-NEXUS-772', client: 'Nexus Fintech', tier: 'Fortress', status: 'Pending', expiry: 'TBD', revenue: 199000, usage: 0, credits: 0, utr: null },
    { id: 'VX-2025-GREEN-102', client: 'GreenNodes Ltd', tier: 'Whitelabel', status: 'Active', expiry: '2026-01-10', revenue: 1200000, usage: 12, credits: 850, utr: 'BANK9921004' },
    { id: 'VX-2024-SOLO-881', client: 'Arjun Mehra (Solo)', tier: 'Sentinel', status: 'Active', expiry: '2025-05-28', revenue: 49000, usage: 98, credits: 2, utr: 'UPI_009121' },
  ]);

  const handleGenerateLicense = () => {
    if (!newLicenseName) return;
    setIsGenerating(true);
    setTimeout(() => {
      const id = `VX-2025-${newLicenseName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newEntry = { id, client: newLicenseName, tier: 'Sentinel', status: 'Pending', expiry: 'TBD', revenue: 49000, usage: 0, credits: 0, utr: null };
      setActiveLicenses([newEntry, ...activeLicenses]);
      setGeneratedID(id);
      setIsGenerating(false);
      setNewLicenseName('');
    }, 1200);
  };

  const handleActivateLicense = (id: string) => {
    setActiveLicenses(prev => prev.map(lic => 
      lic.id === id ? { ...lic, status: 'Active', credits: 100, expiry: '2026-01-01' } : lic
    ));
    alert("Settlement Verified: Client Neural Shards are now active.");
  };

  const handleClientSubmitUTR = () => {
    if (!utrNumber) return;
    setIsSubmittingUTR(true);
    setTimeout(() => {
      setActiveLicenses(prev => prev.map(lic => 
        lic.client === 'Nexus Fintech' ? { ...lic, utr: utrNumber } : lic
      ));
      setIsSubmittingUTR(false);
      alert("Payment proof submitted to Founder Mesh. Awaiting verification.");
    }, 1500);
  };

  const handlePrepareRenewalDraft = async (client: any, selectedStrategy: 'retention' | 'upsell' | 'aggressive' = 'retention') => {
    setTargetClient(client);
    setStrategy(selectedStrategy);
    setShowNotificationModal(true);
    setIsGenerating(true);
    
    const template = EMAIL_TEMPLATES[selectedStrategy];
    const initialBody = template.body
      .replace('[Name]', client.client.split(' ')[0])
      .replace('[Client Name]', client.client)
      .replace('[Tier]', client.tier)
      .replace('[Date]', client.expiry)
      .replace('[Usage]', client.usage.toString())
      .replace('[ID]', client.id);
    
    setEmailDraft(`Subject: ${template.subject.replace('[Client Name]', client.client)}\n\n${initialBody}`);

    try {
      const refined = await generateUpdateMessage(initialBody, `Institutional ${selectedStrategy} Strategy`);
      setEmailDraft(refined);
    } catch (e) { console.error("Neural core bypass enabled"); }
    finally { setIsGenerating(false); }
  };

  const totalAtRisk = activeLicenses.filter(l => l.status === 'Pending').reduce((a, b) => a + b.revenue, 0);
  const clientDemo = activeLicenses.find(l => l.client === 'Nexus Fintech') || activeLicenses[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* PERSPECTIVE TOGGLE */}
      <div className="flex justify-center">
         <div className="bg-zinc-100 p-1.5 rounded-2xl flex gap-2 border-2 border-zinc-200">
            <button onClick={() => setViewMode('founder')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'founder' ? 'bg-zinc-900 text-white shadow-xl' : 'text-zinc-400 hover:text-zinc-600'}`}>Founder Mesh (Control)</button>
            <button onClick={() => setViewMode('client')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'client' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>Client Portal (Customer)</button>
         </div>
      </div>

      {viewMode === 'founder' ? (
        /* ==================== FOUNDER MODE ==================== */
        <div className="space-y-10 animate-in slide-in-from-left-4 duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2 space-y-2">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                    <TrendingUp size={14} className="text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Founder Intelligence</span>
                 </div>
                 <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum">License <span className="text-indigo-600">Forge</span></h2>
              </div>
              <StatBox label="Pending Activation" value={`₹${(totalAtRisk/1000).toFixed(0)}k`} icon={Lock} color="text-orange-500" />
              <StatBox label="Total Annual Revenue" value="₹14.6L" icon={ShieldCheck} color="text-emerald-500" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Issuance Control */}
              <div className="bg-white border-4 border-zinc-100 p-10 rounded-[3.5rem] space-y-6 shadow-sm">
                 <h4 className="text-lg font-black text-zinc-900 flex items-center gap-2"><Plus className="text-indigo-600" /> New Provision</h4>
                 <div className="space-y-4">
                    <input value={newLicenseName} onChange={(e) => setNewLicenseName(e.target.value)} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" placeholder="Assign Client Name..." />
                    <button onClick={handleGenerateLicense} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-900 transition-all shadow-lg">{isGenerating ? <Loader2 className="animate-spin" /> : 'Issue Token'}</button>
                 </div>
                 {generatedID && <div className="p-4 bg-zinc-100 border-2 border-dashed border-zinc-200 rounded-2xl"><p className="text-xs font-mono font-black text-zinc-400 text-center italic">{generatedID} (UNAUTHORIZED)</p></div>}
              </div>

              {/* Master Ledger */}
              <div className="lg:col-span-2 bg-white border-2 border-zinc-100 rounded-[3.5rem] overflow-hidden shadow-sm">
                 <div className="p-8 bg-zinc-50 border-b-2 border-zinc-100 flex justify-between items-center">
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-quantum">Central Protocol Registry</h4>
                 </div>
                 <div className="divide-y-2 divide-zinc-50">
                    {activeLicenses.map((lic) => (
                      <div key={lic.id} className="p-8 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                         <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${lic.status === 'Active' ? 'border-emerald-100 text-emerald-600' : 'border-orange-100 text-orange-500 shadow-lg animate-pulse'}`}><Building2 size={24} /></div>
                            <div>
                               <p className="text-md font-black text-zinc-900">{lic.client}</p>
                               <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter">{lic.tier} • ID: {lic.id}</p>
                               {lic.utr && <p className="text-[9px] font-black text-emerald-600 uppercase mt-1 bg-emerald-50 w-fit px-2 rounded">UTR Received: {lic.utr}</p>}
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            {lic.status === 'Pending' ? (
                              <button onClick={() => handleActivateLicense(lic.id)} className="px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-emerald-700 shadow-xl">Verify & Activate</button>
                            ) : (
                              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase border border-emerald-100"><Check size={12} /> Access Granted</div>
                            )}
                            <button onClick={() => handlePrepareRenewalDraft(lic)} className="p-3 bg-zinc-100 text-zinc-400 rounded-xl hover:text-indigo-600 transition-all"><Send size={18} /></button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      ) : (
        /* ==================== CLIENT: THE SECURE REVEAL ==================== */
        <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-right-4 duration-700">
           <div className="bg-white border-4 border-zinc-100 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-indigo-500 to-emerald-500"></div>
              
              <div className="w-24 h-24 bg-zinc-100 rounded-[2.5rem] flex items-center justify-center text-zinc-300 mx-auto mb-8 shadow-inner overflow-hidden relative">
                 {clientDemo.status === 'Active' ? <ShieldCheck size={48} className="text-emerald-500" /> : <Lock size={48} className="text-zinc-200" />}
                 {clientDemo.status !== 'Active' && <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>}
              </div>
              
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Institutional Trust Access</h3>
              <h4 className="text-5xl font-black text-zinc-900 tracking-tight mb-4 font-quantum">{clientDemo.client}</h4>
              
              {/* 🛡️ GATEKEEPER UI */}
              <div className={`mt-12 p-12 rounded-[3.5rem] border-4 transition-all relative overflow-hidden ${clientDemo.status === 'Active' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-6">Neural Access Token (Secret Key)</p>
                 
                 {clientDemo.status === 'Active' ? (
                   /* ACTIVE STATE */
                   <div className="space-y-6">
                      <p className={`text-4xl font-mono font-black text-indigo-600 tracking-tighter inline-block px-10 py-6 bg-white rounded-3xl shadow-sm border border-indigo-50 ${showKey ? '' : 'blur-xl select-none'}`}>
                         {clientDemo.id}
                      </p>
                      <div className="flex justify-center gap-6">
                         <button onClick={() => setShowKey(!showKey)} className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-zinc-900 uppercase">
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />} {showKey ? 'Mask' : 'Reveal'}
                         </button>
                         <button onClick={() => {navigator.clipboard.writeText(clientDemo.id); alert("Ready to paste");}} className="text-[10px] font-black text-indigo-600 uppercase underline tracking-widest font-quantum">Copy Token</button>
                      </div>
                   </div>
                 ) : (
                   /* LOCKED STATE */
                   <div className="space-y-8 animate-in zoom-in-95">
                      <div className="flex justify-center gap-4 opacity-20">
                         {[1,2,3,4].map(i => <div key={i} className="w-14 h-14 bg-zinc-400 rounded-2xl"></div>)}
                      </div>
                      <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-100 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-200 shadow-sm">
                         <Lock size={14} /> Settlement Required to Reveal Token
                      </div>

                      {/* Payment Proof Field */}
                      <div className="max-w-xs mx-auto space-y-4">
                         <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-zinc-400 text-left block ml-1">Confirm Payment (Bank UTR / Transaction ID)</label>
                            <input 
                               type="text" 
                               value={utrNumber}
                               onChange={(e) => setUtrNumber(e.target.value)}
                               placeholder="e.g. BANK882100..."
                               className="w-full px-5 py-3 bg-white border-2 border-zinc-100 rounded-xl outline-none focus:border-indigo-500 text-xs font-bold"
                            />
                         </div>
                         <button 
                            onClick={handleClientSubmitUTR}
                            disabled={!utrNumber || isSubmittingUTR}
                            className="w-full py-4 bg-zinc-900 text-white font-black rounded-xl text-[10px] uppercase hover:bg-emerald-600 transition-all disabled:opacity-30"
                         >
                            {isSubmittingUTR ? <Loader2 className="animate-spin" /> : 'Authorize Protocol Uplink'}
                         </button>
                      </div>
                   </div>
                 )}
              </div>
           </div>

           {/* Usage Metrics */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-10 bg-white border-2 border-zinc-100 rounded-[3rem] space-y-6 ${clientDemo.status !== 'Active' ? 'opacity-30' : ''}`}>
                 <h5 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2"><Activity className="text-indigo-500" size={18} /> Dynamic Shard Balance</h5>
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Available Credits</span>
                       <span className="text-xl font-black text-zinc-900">{clientDemo.credits} Shards</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: clientDemo.status === 'Active' ? '85%' : '0%' }}></div>
                    </div>
                 </div>
              </div>
              <div className={`p-10 bg-zinc-900 text-white rounded-[3rem] space-y-6 shadow-xl relative overflow-hidden group ${clientDemo.status !== 'Active' ? 'opacity-30' : ''}`}>
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Zap size={100} /></div>
                 <h5 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-emerald-500"><Award size={18} /> Citadel Enterprise</h5>
                 <p className="text-sm font-medium leading-relaxed text-zinc-400">Your current status is READ-ONLY. Settle invoice to unlock unlimited Forensic scans and global pulses.</p>
                 <button onClick={() => window.location.hash = '#/contact-us'} className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all">Request Citadel Upgrade</button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: AI DRAFT NOTIFICATIONS */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white border-4 border-zinc-200 rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95">
            <button onClick={() => setShowNotificationModal(false)} className="absolute top-10 right-10 text-zinc-400 hover:text-zinc-900 transition-colors"><X size={24} /></button>
            <div className="p-12 space-y-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-2xl"><Mail size={32} /></div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Revenue Protection Protocol</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-1">Authorized Target: <span className="text-indigo-600">{targetClient?.client}</span></p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                 {['retention', 'upsell', 'aggressive'].map(s => (
                   <button key={s} onClick={() => handlePrepareRenewalDraft(targetClient, s as any)} className={`px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${strategy === s ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'bg-white/5 border-zinc-100 text-zinc-400'}`}>{s}</button>
                 ))}
              </div>
              <div className="p-8 bg-zinc-50 border-2 border-zinc-100 rounded-[2.5rem] relative overflow-hidden group">
                 {isGenerating ? (
                   <div className="flex flex-col items-center justify-center py-10 space-y-4"><Loader2 className="animate-spin text-indigo-500" /><p className="text-[10px] font-black text-zinc-400 uppercase animate-pulse">Neural Shard Drafting...</p></div>
                 ) : (
                   <textarea value={emailDraft} onChange={(e) => setEmailDraft(e.target.value)} className="w-full h-64 bg-transparent border-none text-zinc-700 text-sm font-medium leading-relaxed italic outline-none resize-none font-serif p-4" />
                 )}
              </div>
              <button onClick={() => {alert("Communication shard dispatched."); setShowNotificationModal(false);}} className={`w-full py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:bg-emerald-600`}><Send size={18} /> Authorize Dispatch</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const StatBox = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between group relative overflow-hidden">
     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl transition-all"></div>
     <div className="flex justify-between items-start"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p><Icon size={16} className={color} /></div>
     <div className="mt-4"><h3 className={`text-4xl font-black ${color} font-quantum`}>{value}</h3></div>
  </div>
);