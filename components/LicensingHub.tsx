import React, { useState } from 'react';
import { 
  Key, CreditCard, ShieldCheck, Zap, Building2, Mail, Bell, X, Send, 
  Loader2, Download, Printer, Shield, Fingerprint, RefreshCcw, 
  TrendingUp, BarChart3, Clock, MoreHorizontal, AlertCircle, 
  ChevronRight, CheckCircle2, DollarSign, Activity, TrendingDown,
  Target, Award, Percent, ArrowUpRight, History as HistoryIcon,
  CalendarCheck, FileText, Check, ReceiptText
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
  const [selectedTier, setSelectedTier] = useState<'transactional' | 'subscription' | 'whitelabel'>('subscription');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [targetClient, setTargetClient] = useState<any>(null);
  const [strategy, setStrategy] = useState<'retention' | 'upsell' | 'aggressive'>('retention');
  const [isSending, setIsSending] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);

  // Enhanced Mock Data with Risk Profiles and Notification History
  const [activeLicenses, setActiveLicenses] = useState([
    { id: 'LIC-772', client: 'TechFlow Series-A', tier: 'Subscription', status: 'Active', expiry: '2024-06-12', revenue: 75000, usage: 85, risk: 'Low', notifications: [] },
    { id: 'LIC-102', client: 'GreenNodes Ltd', tier: 'Whitelabel', status: 'Active', expiry: '2025-01-10', revenue: 1200000, usage: 12, risk: 'High', notifications: [] },
    { id: 'LIC-881', client: 'Arjun Mehra (Solo)', tier: 'Transactional', status: 'Expiring', expiry: '2024-05-28', revenue: 15000, usage: 98, risk: 'Low', notifications: [{ date: '2024-05-15', type: 'System Alert' }] },
    { id: 'LIC-404', client: 'HyperScale AI', tier: 'Subscription', status: 'Suspended', expiry: '2024-04-15', revenue: 75000, usage: 0, risk: 'Lost', notifications: [] },
  ]);

  const handlePrepareRenewalDraft = async (client: any, selectedStrategy: 'retention' | 'upsell' | 'aggressive' = 'retention') => {
    setTargetClient(client);
    setStrategy(selectedStrategy);
    setIsGenerating(true);
    setShowNotificationModal(true);
    
    // Initial template population
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
      const context = `Client ${client.client} has an ${client.tier} license expiring on ${client.expiry}. 
      Usage: ${client.usage}%. Risk: ${client.risk}. 
      Strategy: ${selectedStrategy}. 
      Base Template used: ${initialBody}
      Task: Refine this into a professional, high-conversion email.`;
      
      const refinedDraft = await generateUpdateMessage(context, "Strategic Revenue Renewal Notification");
      setEmailDraft(refinedDraft);
    } catch (err) {
      console.error("AI refinement failed, using base template", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendBroadcast = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const updated = activeLicenses.map(lic => {
        if (bulkMode && lic.status === 'Expiring') {
           return {
            ...lic,
            notifications: [...lic.notifications, { date: new Date().toISOString().split('T')[0], type: 'BULK_' + strategy.toUpperCase() }]
          };
        }
        if (targetClient && lic.id === targetClient.id) {
          return {
            ...lic,
            notifications: [...lic.notifications, { date: new Date().toISOString().split('T')[0], type: strategy.toUpperCase() }]
          };
        }
        return lic;
      });
      setActiveLicenses(updated);
      setShowNotificationModal(false);
      setEmailDraft('');
      setBulkMode(false);
    }, 1500);
  };

  const handleBulkNotify = () => {
    const expiring = activeLicenses.filter(l => l.status === 'Expiring');
    if (expiring.length === 0) return;
    setBulkMode(true);
    setTargetClient({ client: `${expiring.length} Expiring Clients`, tier: 'Various', expiry: 'Multiple', usage: 'High', id: 'BATCH' });
    handlePrepareRenewalDraft(expiring[0], 'retention');
  };

  const totalAtRisk = activeLicenses
    .filter(l => l.status === 'Expiring' || l.risk === 'High')
    .reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header & Revenue Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <TrendingUp size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Strategic Revenue Mesh</span>
           </div>
           <h2 className="text-5xl font-black text-white tracking-tight">
            Revenue <span className="text-indigo-500">Intelligence</span>
          </h2>
          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Protecting protocol revenue by predicting churn and automating notification logic for nearing expirations.
          </p>
        </div>
        
        <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl group-hover:bg-indigo-600/10 transition-all"></div>
           <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Revenue at Risk</p>
              <AlertCircle size={16} className="text-orange-500" />
           </div>
           <div className="mt-6 space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Potential Loss</span>
                <span className="text-xl font-black text-white">₹{totalAtRisk.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                 <div className="h-full bg-indigo-500" style={{ width: '70%' }}></div>
                 <div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]" style={{ width: '30%' }}></div>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
           <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Renewal Yield</p>
              <CalendarCheck size={16} className="text-indigo-500" />
           </div>
           <div className="mt-4">
              <h3 className="text-4xl font-black text-white font-quantum">92%</h3>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">Success Probability</p>
           </div>
        </div>
      </div>

      {/* Active License Management Grid */}
      <div className="bg-slate-900/50 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950/30">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
               <ShieldCheck className="text-indigo-500" /> Commercial Entitlements
            </h3>
            <div className="flex gap-3">
               <button 
                onClick={handleBulkNotify}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
               >
                  <Bell size={14} /> Notify Expiring
               </button>
               <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                  <Download size={14} /> Fiscal Ledger
               </button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                     <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">License Asset</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Usage</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Risk Index</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">History</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {activeLicenses.map((lic) => (
                     <tr key={lic.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-10 py-6">
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl bg-slate-950 border flex items-center justify-center transition-transform group-hover:scale-110 ${lic.status === 'Expiring' ? 'border-orange-500/30 text-orange-500' : 'border-white/5 text-indigo-400'}`}>
                                 <Building2 size={18} />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-white">{lic.client}</p>
                                 <p className={`text-[10px] font-mono ${lic.status === 'Expiring' ? 'text-orange-500' : 'text-slate-500'}`}>{lic.tier} • {lic.id}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <div className="space-y-1.5 w-32">
                              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                 <span className="text-slate-500">Utilization</span>
                                 <span className={lic.usage > 80 ? 'text-orange-500' : 'text-slate-300'}>{lic.usage}%</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                 <div 
                                    className={`h-full transition-all duration-1000 ${lic.usage > 80 ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-indigo-500'}`} 
                                    style={{ width: `${lic.usage}%` }}
                                 ></div>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-6 text-center">
                           <div className="inline-flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full mb-1 ${
                                lic.risk === 'Low' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                                lic.risk === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse' : 
                                'bg-slate-700'
                              }`}></div>
                              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{lic.risk} Risk</span>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <div className="flex -space-x-2">
                              {lic.notifications.length > 0 ? (
                                lic.notifications.map((n, idx) => (
                                  <div key={idx} className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center group/tip relative cursor-help" title={`Sent: ${n.date} (${n.type})`}>
                                     <Mail size={10} className="text-indigo-400" />
                                  </div>
                                ))
                              ) : (
                                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">No history</span>
                              )}
                           </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                              <button 
                                 onClick={() => handlePrepareRenewalDraft(lic, lic.usage > 90 ? 'upsell' : 'retention')}
                                 className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
                                 title="Execute Renewal Strategy"
                              >
                                 <Send size={16} />
                              </button>
                              <button 
                                 className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all"
                                 title="Generate Settlement Invoice"
                              >
                                 <ReceiptText size={16} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/10 rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => { setShowNotificationModal(false); setEmailDraft(''); }}
              className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-12 space-y-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-2xl">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {bulkMode ? 'Bulk Broadcast Protocol' : 'Renewal Notification Broadcast'}
                  </h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                    Target: <span className="text-white">{targetClient?.client}</span>
                  </p>
                </div>
              </div>

              {/* Strategy Selectors */}
              <div className="grid grid-cols-3 gap-3">
                 <button 
                   onClick={() => handlePrepareRenewalDraft(targetClient, 'retention')}
                   className={`px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${strategy === 'retention' ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'bg-white/5 border-white/10 text-slate-400'}`}
                 >
                   Standard Alert
                 </button>
                 <button 
                   onClick={() => handlePrepareRenewalDraft(targetClient, 'upsell')}
                   className={`px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${strategy === 'upsell' ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg' : 'bg-white/5 border-white/10 text-slate-400'}`}
                 >
                   Expansion Plan
                 </button>
                 <button 
                   onClick={() => handlePrepareRenewalDraft(targetClient, 'aggressive')}
                   className={`px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${strategy === 'aggressive' ? 'bg-red-600 text-white border-red-500 shadow-lg' : 'bg-white/5 border-white/10 text-slate-400'}`}
                 >
                   Urgency Notice
                 </button>
              </div>

              <div className="space-y-4">
                <div className="p-8 bg-slate-950 border border-white/10 rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-2xl"></div>
                  
                  {isGenerating ? (
                    <div className="space-y-4 py-8">
                       <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
                       <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse"></div>
                       <div className="h-4 bg-white/5 rounded-full w-4/6 animate-pulse"></div>
                       <p className="text-center text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-6 animate-pulse flex items-center justify-center gap-2">
                          <Loader2 size={12} className="animate-spin" /> Neural Core Refining...
                       </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <span>Draft Package</span>
                          <span className="text-emerald-500 flex items-center gap-1"><Check size={10} /> Editable</span>
                       </div>
                       <textarea 
                        value={emailDraft}
                        onChange={(e) => setEmailDraft(e.target.value)}
                        className="w-full h-64 bg-transparent border-none text-slate-300 text-sm font-medium leading-relaxed italic outline-none resize-none custom-scrollbar font-serif"
                        placeholder="Neural Core is drafting communication package..."
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <Target size={20} className="text-indigo-400" />
                    <div>
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Impact Probability</p>
                       <p className="text-xs font-bold text-emerald-500">82% Success Rate</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <FileText size={20} className="text-emerald-400" />
                    <div>
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Last Interaction</p>
                       <p className="text-xs font-bold text-white">{targetClient?.notifications?.[0]?.date || 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSendBroadcast}
                disabled={isSending || isGenerating || !emailDraft}
                className={`w-full py-5 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-30 ${bulkMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isSending ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {isSending ? 'Dispatching Broadcast...' : bulkMode ? 'Execute Bulk Notification' : 'Authorize Notification Broadcast'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Churn Prevention Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-4 group hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <Award size={24} />
            </div>
            <h4 className="text-xl font-black text-white">Renewal Dashboard</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
               View upcoming expirations for the next 90 days. Predict revenue fluctuations based on client risk indexing.
            </p>
            <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2 pt-4">
               Open Forecast <ArrowUpRight size={14} />
            </button>
         </div>

         <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-4 group hover:border-orange-500/30 transition-all">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
               <TrendingDown size={24} />
            </div>
            <h4 className="text-xl font-black text-white">Churn Safeguards</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
               Autonomous triggers for accounts that have entered the "Danger Zone" (High Risk, Low Usage, Approaching Expiry).
            </p>
            <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-2 pt-4">
               Execute Mitigation <ArrowUpRight size={14} />
            </button>
         </div>

         <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] space-y-4 group hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
               <DollarSign size={24} />
            </div>
            <h4 className="text-xl font-black text-white">License Batching</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
               Apply bulk logic to multiple license assets. Move cohorts of clients to new commercial protocols instantly.
            </p>
            <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 pt-4">
               Manage Cohorts <ArrowUpRight size={14} />
            </button>
         </div>
      </div>
    </div>
  );
}