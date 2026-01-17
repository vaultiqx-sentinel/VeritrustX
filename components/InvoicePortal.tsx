
import React, { useState, useEffect } from 'react';
import { 
  Printer, Landmark, ShieldCheck, ArrowLeft, Plus, 
  Trash2, CheckCircle2, Globe, ReceiptText, Zap, Save, Edit3, Lock, Loader2, Calendar
} from 'lucide-react';
import { VeritrustTheme } from '../types';

const InvoicePortal: React.FC<{ theme?: VeritrustTheme }> = ({ theme = 'emerald' }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isDark = theme === 'onyx';

  // 1. Pricing Logic Table (Base Monthly Rates)
  const TIER_RATES = {
    'Sentinel': 49000,
    'Fortress': 199000,
    'Citadel': 499000
  };

  // 2. Invoice Content State
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `VX-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    selectedTier: 'Fortress' as keyof typeof TIER_RATES,
    durationMonths: 3, // Default to 3 months as per your request
    notes: 'Neural capacity will be provisioned within 120 minutes of settlement confirmation.',
  });

  // 3. Founder Treasury State
  const [bankDetails, setBankDetails] = useState(() => {
    const saved = localStorage.getItem('vx-founder-bank');
    return saved ? JSON.parse(saved) : {
      holderName: 'CHALLA ADITYA',
      bankName: '141701544314 BANK',
      accountNumber: '141701544314',
      ifscCode: 'ICIC0001417',
      upiId: 'challaadityaa326@icici',
      accountType: 'Personal Savings'
    };
  });

  const handleSaveBankDetails = () => {
    setIsSaving(true);
    localStorage.setItem('vx-founder-bank', JSON.stringify(bankDetails));
    setTimeout(() => {
      setIsSaving(false);
      alert("FOUNDER TREASURY: Details committed to secure mesh.");
    }, 800);
  };

  // 📈 AUTOMATIC CALCULATION LOGIC
  const baseMonthlyRate = TIER_RATES[invoiceData.selectedTier];
  const subtotal = baseMonthlyRate * invoiceData.durationMonths;
  const tax = subtotal * 0.18; // 18% GST
  const grandTotal = subtotal + tax;

  if (showPreview) {
    return (
      /* 📄 THE DYNAMIC PDF VIEW (Always White for Print) */
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center print:hidden">
          <button 
            onClick={() => setShowPreview(false)} 
            className={`flex items-center gap-2 font-black uppercase text-[10px] tracking-widest ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}
          >
            <ArrowLeft size={16} /> Return to Configurator
          </button>
          <button onClick={() => window.print()} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:brightness-110 shadow-2xl">
            <Printer size={20} /> Generate Institutional PDF
          </button>
        </div>

        <div className="bg-white text-zinc-900 p-16 rounded-[4rem] shadow-2xl max-w-4xl mx-auto border-8 border-zinc-50 print:border-none print:shadow-none print:p-0 print:m-0">
          <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-zinc-900 rounded-lg text-white"><ShieldCheck size={28} /></div>
                 <h1 className="text-3xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Institutional Integrity Protocol</p>
            </div>
            <div className="text-right">
              <h2 className="text-6xl font-black text-zinc-100 uppercase leading-none mb-4">Invoice</h2>
              <p className="text-sm font-black">NO: {invoiceData.invoiceNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 py-16">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Bill To (Client)</h3>
              <p className="text-xl font-black">{invoiceData.clientName || 'Nexus Fintech Solutions'}</p>
              <p className="text-sm text-zinc-500 whitespace-pre-wrap mt-2">{invoiceData.clientAddress || 'Address pending verification.'}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Protocol Node</h3>
              <p className="text-sm font-bold">VeritrustX Global Mesh</p>
              <p className="text-xs text-zinc-400">Hub: INDIA-9642</p>
              <p className="text-xs text-zinc-400 mt-2">Issued: {invoiceData.date}</p>
            </div>
          </div>

          <table className="w-full mb-12">
            <thead className="border-b-2 border-zinc-900">
              <tr>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Logic Tier & Duration</th>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Monthly Rate</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="py-8">
                  <p className="text-sm font-black text-zinc-800">VeritrustX {invoiceData.selectedTier} Protocol Access</p>
                  <p className="text-xs text-indigo-600 font-bold uppercase mt-1">{invoiceData.durationMonths} Months Institutional License</p>
                </td>
                <td className="py-8 text-center text-sm font-medium">₹{baseMonthlyRate.toLocaleString()}</td>
                <td className="py-8 text-right text-sm font-black">₹{subtotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mb-16">
             <div className="w-80 space-y-3 border-t-2 border-zinc-900 pt-6 text-right">
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><span>Net Shard Value</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><span>GST (18%)</span><span>₹{tax.toLocaleString()}</span></div>
                <div className="flex justify-between items-center pt-2">
                   <span className="text-xs font-black uppercase tracking-widest">Grand Total: </span>
                   <span className="text-3xl font-black text-indigo-600">₹{grandTotal.toLocaleString()}</span>
                </div>
             </div>
          </div>

          {/* BANK SETTLEMENT */}
          <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 mb-12">
             <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2"><Landmark size={18}/> Settlement Instructions</h4>
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                   <InfoRow label="A/C Holder" value={bankDetails.holderName} />
                   <InfoRow label="Bank Name" value={bankDetails.bankName} />
                   <InfoRow label="A/C Number" value={bankDetails.accountNumber} />
                </div>
                <div className="space-y-3">
                   <InfoRow label="IFSC Code" value={bankDetails.ifscCode} />
                   <InfoRow label="UPI ID" value={bankDetails.upiId} />
                   <div className="pt-2"><span className="text-[8px] font-black uppercase bg-zinc-900 text-white px-2 py-1 rounded">{bankDetails.accountType}</span></div>
                </div>
             </div>
          </div>

          {/* CEO SIGNATURE */}
          <div className="mt-20 grid grid-cols-2 gap-12 border-t-4 border-zinc-900 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Founder's Note</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium italic">"By authorizing this settlement, your organization is deploying a non-repudiable truth mesh for {invoiceData.durationMonths} months."</p>
              <p className="text-[9px] font-bold text-indigo-600 uppercase mt-4">© 2025 VeriTrustX Protocol.</p>
            </div>
            <div className="text-right">
               <div className="inline-block relative mb-2">
                  <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm shadow-inner"><ShieldCheck size={28} className="text-emerald-500" /></div>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '54px', color: '#1e1b4b', transform: 'rotate(-2deg)' }}>Challa Aditya</p>
               </div>
               <p className="text-sm font-black text-zinc-900 uppercase">Challa Aditya</p>
               <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Founder & CEO, VeritrustX</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    /* 🏗️ THE DYNAMIC SETTLEMENT CONFIGURATOR (Theme Aware) */
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* 🟢 TOP SECTION: FOUNDER'S TREASURY */}
      <div className={`p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden border-b-8 border-indigo-600 ${isDark ? 'bg-zinc-900 text-white' : 'bg-zinc-900 text-white'}`}>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
            <div>
               <h3 className="text-2xl font-black font-quantum flex items-center gap-3">
                  <Lock className="text-emerald-500" size={28} /> Founder's Settlement Node
               </h3>
               <p className="text-sm text-zinc-400 mt-1">Update your Savings/Business account details for the PDF signature.</p>
            </div>
            <button onClick={handleSaveBankDetails} className="px-10 py-4 bg-emerald-600 text-white font-black rounded-2xl flex items-center gap-3 shadow-xl">{isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Commit Details</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            <EditorInput label="A/C Holder" value={bankDetails.holderName} onChange={(v) => setBankDetails({...bankDetails, holderName: v})} />
            <EditorInput label="Bank Name" value={bankDetails.bankName} onChange={(v) => setBankDetails({...bankDetails, bankName: v})} />
            <EditorInput label="A/C Number" value={bankDetails.accountNumber} onChange={(v) => setBankDetails({...bankDetails, accountNumber: v})} />
            <EditorInput label="IFSC Code" value={bankDetails.ifscCode} onChange={(v) => setBankDetails({...bankDetails, ifscCode: v})} />
            <div className="space-y-1">
               <label className="text-[8px] font-black text-zinc-500 uppercase ml-1">Type</label>
               <select value={bankDetails.accountType} onChange={(e) => setBankDetails({...bankDetails, accountType: e.target.value})} className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none">
                  <option className="bg-zinc-900">Personal Savings</option>
                  <option className="bg-zinc-900">Business Current</option>
               </select>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-8">
            <div className={`border-4 p-10 rounded-[3rem] shadow-sm space-y-10 ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100'}`}>
               <div className={`flex justify-between items-center border-b-2 pb-6 ${isDark ? 'border-white/5' : 'border-zinc-50'}`}>
                  <h4 className={`text-xl font-black flex items-center gap-3 ${isDark ? 'text-white' : 'text-zinc-900'}`}><Edit3 className="text-indigo-600" /> License Configurator</h4>
                  <button onClick={() => setShowPreview(true)} className={`px-10 py-4 font-black rounded-2xl text-[10px] uppercase shadow-lg transition-all ${isDark ? 'bg-white text-zinc-900 hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-emerald-600'}`}>Preview & Sign Invoice</button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CLIENT INFO */}
                  <div className="space-y-6">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Client Metadata</p>
                     <input 
                       type="text" 
                       value={invoiceData.clientName} 
                       onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} 
                       placeholder="Client Name..." 
                       className={`w-full px-6 py-4 border-2 rounded-2xl outline-none focus:border-indigo-500 font-bold ${isDark ? 'bg-black/40 border-white/10 text-white placeholder-zinc-600' : 'bg-zinc-50 border-zinc-100 text-zinc-900'}`} 
                     />
                     <textarea 
                       value={invoiceData.clientAddress} 
                       onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})} 
                       placeholder="Billing Address..." 
                       rows={3} 
                       className={`w-full px-6 py-4 border-2 rounded-2xl outline-none focus:border-indigo-500 font-bold resize-none ${isDark ? 'bg-black/40 border-white/10 text-white placeholder-zinc-600' : 'bg-zinc-50 border-zinc-100 text-zinc-900'}`} 
                     />
                  </div>

                  {/* LICENSE MATH */}
                  <div className="space-y-6">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Shard Selection</p>
                     <div className="space-y-4">
                        <div className="space-y-1">
                           <label className="text-[9px] font-black text-zinc-500 ml-1 uppercase">Access Tier</label>
                           <select 
                             value={invoiceData.selectedTier}
                             onChange={(e) => setInvoiceData({...invoiceData, selectedTier: e.target.value as any})}
                             className={`w-full px-6 py-4 rounded-2xl font-black text-sm outline-none border-2 ${isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-zinc-900 text-white border-zinc-900'}`}
                           >
                              <option value="Sentinel" className="bg-zinc-900">Sentinel Tier (₹49k/mo)</option>
                              <option value="Fortress" className="bg-zinc-900">Fortress Tier (₹199k/mo)</option>
                              <option value="Citadel" className="bg-zinc-900">Citadel Tier (₹499k/mo)</option>
                           </select>
                        </div>
                        <div className="space-y-1">
                           <label className="text-[9px] font-black text-zinc-500 ml-1 uppercase">License Duration</label>
                           <select 
                             value={invoiceData.durationMonths}
                             onChange={(e) => setInvoiceData({...invoiceData, durationMonths: parseInt(e.target.value)})}
                             className={`w-full px-6 py-4 border-2 rounded-2xl font-black text-sm outline-none focus:border-indigo-500 ${isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-zinc-50 border-zinc-100'}`}
                           >
                              <option value={1} className={isDark ? "bg-zinc-900" : ""}>1 Month Protocol Access</option>
                              <option value={3} className={isDark ? "bg-zinc-900" : ""}>3 Months Strategic Term</option>
                              <option value={6} className={isDark ? "bg-zinc-900" : ""}>6 Months Institutional Term</option>
                              <option value={12} className={isDark ? "bg-zinc-900" : ""}>1 Year Performance Term</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* LIVE CALCULATION BOX */}
         <div className={`border-4 p-10 rounded-[3rem] shadow-sm flex flex-col justify-center text-center space-y-6 ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100'}`}>
            <div className={`p-6 rounded-full w-fit mx-auto ${isDark ? 'bg-white/5' : 'bg-indigo-50'}`}><ReceiptText className="text-indigo-600" size={40} /></div>
            <h4 className={`text-xl font-black uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>Calculated Total</h4>
            <div>
               <p className="text-5xl font-black text-indigo-600 tracking-tighter">₹{grandTotal.toLocaleString()}</p>
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-2">Incl. 18% Institutional GST</p>
            </div>
            <div className={`pt-6 border-t ${isDark ? 'border-white/5' : 'border-zinc-50'}`}>
               <p className="text-[10px] font-bold text-emerald-600 uppercase">Current Savings detail will be auto-applied</p>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- HELPERS ---
const EditorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-1">
     <label className="text-[8px] font-black text-zinc-500 uppercase ml-1">{label}</label>
     <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all" />
  </div>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">{label}</span>
    <span className="font-black text-zinc-900">{value || '---'}</span>
  </div>
);

export default InvoicePortal;
