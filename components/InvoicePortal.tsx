import React, { useState, useEffect } from 'react';
import { 
  Printer, Landmark, ShieldCheck, ArrowLeft, Plus, 
  Trash2, CheckCircle2, Globe, ReceiptText, Zap, Save, Edit3, Lock, Loader2
} from 'lucide-react';

const InvoicePortal: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // 1. Invoice Content State (What the client sees)
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `VX-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    items: [{ description: 'VeritrustX Citadel Protocol - Institutional Access', qty: 1, rate: 199000 }],
    notes: 'Access will be provisioned within 120 minutes of settlement confirmation.',
  });

  // 2. Founder Treasury State (Your Savings/Business Details)
  const [bankDetails, setBankDetails] = useState(() => {
    const saved = localStorage.getItem('vx-founder-bank');
    return saved ? JSON.parse(saved) : {
      holderName: 'CHALLA ADITYA',
      bankName: 'HDFC BANK',
      accountNumber: '9642276736',
      ifscCode: 'VXID0009021',
      upiId: '9642276736@upi',
      accountType: 'Personal Savings'
    };
  });

  // Persist bank details to browser memory
  const handleSaveBankDetails = () => {
    setIsSaving(true);
    localStorage.setItem('vx-founder-bank', JSON.stringify(bankDetails));
    setTimeout(() => {
      setIsSaving(false);
      alert("FOUNDER UPDATED: Savings/Business logic committed to Secure Mesh.");
    }, 800);
  };

  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const total = subtotal * 1.18; // Includes GST

  if (showPreview) {
    return (
      /* 📄 THE SIGNED PDF VIEW (HIDDEN DURING EDITING) */
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest">
            <ArrowLeft size={16} /> Edit Invoice Details
          </button>
          <button onClick={() => window.print()} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:brightness-110 shadow-2xl">
            <Printer size={20} /> Generate Forensic PDF
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
              <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Client Entity</h3>
              <p className="text-xl font-black">{invoiceData.clientName || 'Nexus Fintech Solutions'}</p>
              <p className="text-sm text-zinc-500 whitespace-pre-wrap mt-2">{invoiceData.clientAddress || 'Address pending.'}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Settlement Authority</h3>
              <p className="text-sm font-bold">VeritrustX Global Mesh</p>
              <p className="text-xs text-zinc-400 mt-1">Node: INDIA-9642</p>
            </div>
          </div>

          <table className="w-full mb-12">
            <thead className="border-b-2 border-zinc-900">
              <tr>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Protocol Description</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {invoiceData.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-6 text-sm font-bold text-zinc-800">{item.description}</td>
                  <td className="py-6 text-right text-sm font-black">₹{(item.qty * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-16">
             <div className="w-80 space-y-2 border-t-2 border-zinc-900 pt-4 text-right">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Final Settlement Total: </span>
                <span className="text-3xl font-black text-indigo-600">₹{total.toLocaleString()}</span>
             </div>
          </div>

          <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 mb-12">
             <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2"><Landmark size={18}/> Bank Settlement Details</h4>
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

          <div className="mt-20 grid grid-cols-2 gap-12 border-t-4 border-zinc-900 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Founder's Note</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium italic">"Trust is now a mathematical certainty. By settling this invoice, your organization is deploying a non-repudiable truth mesh."</p>
              <p className="text-[9px] font-bold text-indigo-600 uppercase mt-4">© 2025 VeriTrustX Protocol.</p>
            </div>
            <div className="text-right">
               <div className="inline-block relative mb-2">
                  <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm shadow-inner"><ShieldCheck size={28} className="text-emerald-500" /></div>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '54px', color: '#1e1b4b', transform: 'rotate(-2deg)' }}>Challa Aditya</p>
               </div>
               <p className="text-sm font-black text-zinc-900 uppercase">Challa Aditya</p>
               <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Founder & CEO, VeritrustX</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    /* 🏗️ THE FULL EDITOR MODE (DEFAULT VIEW) */
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* 🟢 TOP SECTION: FOUNDER'S TREASURY CONFIG (EDIT SAVINGS/BUSINESS DETAILS HERE) */}
      <div className="bg-zinc-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
         <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Landmark size={120} /></div>
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
            <div>
               <h3 className="text-2xl font-black font-quantum flex items-center gap-3">
                  <Lock className="text-emerald-500" size={28} /> Founder's Treasury Mesh
               </h3>
               <p className="text-sm text-zinc-400 mt-1">Configure your personal savings or business account for settlements.</p>
            </div>
            <button 
               onClick={handleSaveBankDetails}
               disabled={isSaving}
               className="px-10 py-4 bg-emerald-600 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/40"
            >
               {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
               Commit Details to Mesh
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            <EditorInput label="A/C Holder" value={bankDetails.holderName} onChange={(v) => setBankDetails({...bankDetails, holderName: v})} />
            <EditorInput label="Bank Name" value={bankDetails.bankName} onChange={(v) => setBankDetails({...bankDetails, bankName: v})} />
            <EditorInput label="A/C Number" value={bankDetails.accountNumber} onChange={(v) => setBankDetails({...bankDetails, accountNumber: v})} />
            <EditorInput label="IFSC Code" value={bankDetails.ifscCode} onChange={(v) => setBankDetails({...bankDetails, ifscCode: v})} />
            <div className="space-y-1">
               <label className="text-[8px] font-black text-zinc-500 uppercase ml-1">Account Category</label>
               <select 
                 value={bankDetails.accountType} 
                 onChange={(e) => setBankDetails({...bankDetails, accountType: e.target.value})}
                 className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all"
               >
                  <option className="bg-zinc-900">Personal Savings</option>
                  <option className="bg-zinc-900">Business Checking</option>
                  <option className="bg-zinc-900">Escrow Account</option>
               </select>
            </div>
         </div>
      </div>

      {/* 🔵 BOTTOM SECTION: CLIENT & INVOICE EDITOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm space-y-8">
               <div className="flex justify-between items-center">
                  <h4 className="text-xl font-black text-zinc-900 flex items-center gap-3"><Edit3 className="text-indigo-600" /> Invoice Content</h4>
                  <button onClick={() => setShowPreview(true)} className="px-6 py-3 bg-zinc-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg">Preview & Sign</button>
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <input type="text" value={invoiceData.clientName} onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} placeholder="Client Name..." className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                  <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} placeholder="Invoice NO..." className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
               </div>
               <textarea value={invoiceData.clientAddress} onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})} placeholder="Client Billing Address..." rows={3} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold resize-none" />
            </div>
         </div>

         <div className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm flex flex-col justify-center text-center space-y-6">
            <div className="p-6 bg-indigo-50 rounded-full w-fit mx-auto"><ReceiptText className="text-indigo-600" size={40} /></div>
            <h4 className="text-xl font-black text-zinc-900">Audit Total</h4>
            <p className="text-4xl font-black text-indigo-600 tracking-tighter">₹{total.toLocaleString()}</p>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Including 18% Institutional GST</p>
         </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const EditorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-1">
     <label className="text-[8px] font-black text-zinc-500 uppercase ml-1">{label}</label>
     <input 
       type="text" 
       value={value} 
       onChange={(e) => onChange(e.target.value)} 
       className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all" 
     />
  </div>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">{label}</span>
    <span className="font-black text-zinc-900">{value || '---'}</span>
  </div>
);

export default InvoicePortal;