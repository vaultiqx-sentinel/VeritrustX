import React, { useState, useEffect } from 'react';
import { 
  Printer, Landmark, ShieldCheck, ArrowLeft, Plus, 
  Trash2, CheckCircle2, Globe, ReceiptText, Zap, Save, Edit3
} from 'lucide-react';

const InvoicePortal: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  
  // 1. Invoice Content State
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `VX-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    items: [{ description: 'VeritrustX Citadel Protocol - Institutional Access', qty: 1, rate: 199000 }],
    notes: 'Neural capacity will be provisioned within 120 minutes of settlement confirmation.',
  });

  // 2. Bank Details State (Saves to your browser automatically)
  const [bankDetails, setBankDetails] = useState(() => {
    const saved = localStorage.getItem('vx-bank-details');
    return saved ? JSON.parse(saved) : {
      holderName: 'CHALLA ADITYA',
      bankName: 'HDFC BANK',
      accountNumber: '9642276736',
      ifscCode: 'VXID0009021',
      upiId: '9642276736@upi',
    };
  });

  // Save bank details to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('vx-bank-details', JSON.stringify(bankDetails));
  }, [bankDetails]);

  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const tax = subtotal * 0.18; 
  const total = subtotal + tax;

  const handlePrint = () => { window.print(); };

  if (showPreview) {
    return (
      /* 📄 THE SIGNED PDF PREVIEW MODE */
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest">
            <Edit3 size={16} /> Return to Editor
          </button>
          <button onClick={handlePrint} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:brightness-110 shadow-2xl transition-all">
            <Printer size={20} /> Save as Forensic PDF
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
              <p className="text-xl font-black">{invoiceData.clientName || 'Unspecified Client'}</p>
              <p className="text-sm text-zinc-500 whitespace-pre-wrap mt-2">{invoiceData.clientAddress || 'Address details pending.'}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Settlement Authority</h3>
              <p className="text-sm font-bold">VeritrustX Global Mesh</p>
              <p className="text-xs text-zinc-400 mt-1">Node-ID: VX-INDIA-9642</p>
            </div>
          </div>

          <table className="w-full mb-12">
            <thead className="border-b-2 border-zinc-900">
              <tr>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Description</th>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Qty</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {invoiceData.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-6 text-sm font-bold text-zinc-800">{item.description}</td>
                  <td className="py-6 text-center text-sm">{item.qty}</td>
                  <td className="py-6 text-right text-sm font-black">₹{(item.qty * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-16">
             <div className="w-80 space-y-2 border-t-2 border-zinc-900 pt-4 text-right">
                <span className="text-xs font-black uppercase tracking-widest">Grand Total: </span>
                <span className="text-3xl font-black text-indigo-600">₹{total.toLocaleString()}</span>
             </div>
          </div>

          <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 mb-12">
             <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2"><Landmark size={18}/> Bank Settlement Details</h4>
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3"><InfoRow label="A/C Holder" value={bankDetails.holderName} /><InfoRow label="Bank Name" value={bankDetails.bankName} /><InfoRow label="A/C Number" value={bankDetails.accountNumber} /></div>
                <div className="space-y-3"><InfoRow label="IFSC Code" value={bankDetails.ifscCode} /><InfoRow label="UPI ID" value={bankDetails.upiId} /></div>
             </div>
          </div>

          {/* 🖋️ CEO SIGNATURE SECTION */}
          <div className="mt-20 grid grid-cols-2 gap-12 border-t-4 border-zinc-900 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Founder's Note</h4>
              <p className="text-xs text-zinc-600 leading-relaxed italic font-medium">"Trust is no longer a human opinion. It is a mathematical certainty. By settling this invoice, your organization is deploying a non-repudiable truth mesh."</p>
            </div>
            <div className="text-right">
               <div className="inline-block relative mb-2">
                  <div className="absolute -top-12 -left-12 w-24 h-24 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm shadow-inner"><ShieldCheck size={28} className="text-emerald-500" /></div>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '54px', color: '#1e1b4b', transform: 'rotate(-2deg)' }}>Challa Aditya</p>
                  <div className="h-0.5 w-64 bg-zinc-900 ml-auto mt-[-5px]"></div>
               </div>
               <p className="text-sm font-black text-zinc-900 uppercase">Challa Aditya</p>
               <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Founder & Chief Executive Officer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    /* 🏗️ THE SETTLEMENT EDITOR MODE (DEFAULT) */
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b-2 border-zinc-100 pb-8">
        <div>
          <h2 className="text-5xl font-black text-zinc-900 tracking-tighter uppercase font-quantum">Settlement <span className="accent-text">Mesh</span></h2>
          <p className="text-zinc-500 font-medium text-lg mt-2">Institutional Invoice & Bank Detail Configuration</p>
        </div>
        <button onClick={() => setShowPreview(true)} className="px-10 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 shadow-xl hover:bg-emerald-600 transition-all">
           <ReceiptText size={20} /> Preview & Sign Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CLIENT & ITEMS EDITOR */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm space-y-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Client Metadata</h4>
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" value={invoiceData.clientName} onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} placeholder="Organization Name" className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                  <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} placeholder="Invoice Number" className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                </div>
                <textarea value={invoiceData.clientAddress} onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})} placeholder="Billing Address..." rows={3} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold resize-none" />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center px-2">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Line Items</h4>
                    <button onClick={() => setInvoiceData({...invoiceData, items: [...invoiceData.items, {description: '', qty: 1, rate: 0}]})} className="text-[10px] font-black text-indigo-600 hover:underline">Add Row +</button>
                 </div>
                 {invoiceData.items.map((item, i) => (
                   <div key={i} className="flex gap-4 items-center">
                      <input className="flex-1 px-6 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl font-bold text-sm" placeholder="Service Desc" value={item.description} onChange={(e) => {
                          const newItems = [...invoiceData.items];
                          newItems[i].description = e.target.value;
                          setInvoiceData({...invoiceData, items: newItems});
                        }} />
                      <input type="number" className="w-32 px-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl font-bold text-sm" value={item.rate} onChange={(e) => {
                          const newItems = [...invoiceData.items];
                          newItems[i].rate = parseInt(e.target.value) || 0;
                          setInvoiceData({...invoiceData, items: newItems});
                        }} />
                      <button onClick={() => setInvoiceData({...invoiceData, items: invoiceData.items.filter((_, idx) => idx !== i)})} className="p-2 text-zinc-300 hover:text-rose-500"><Trash2 size={18} /></button>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* 🏦 YOUR BANK DETAILS EDITOR (FOUNDER ONLY) */}
        <div className="space-y-6">
           <div className="bg-zinc-900 p-10 rounded-[3rem] text-white shadow-2xl border-b-8 border-indigo-600">
              <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-3 mb-8">
                 <Landmark className="text-emerald-500" /> Founder's Treasury
              </h4>
              <div className="space-y-4">
                 <BankInput label="A/C Holder Name" value={bankDetails.holderName} onChange={(val) => setBankDetails({...bankDetails, holderName: val})} />
                 <BankInput label="Bank Name" value={bankDetails.bankName} onChange={(val) => setBankDetails({...bankDetails, bankName: val})} />
                 <BankInput label="Account Number" value={bankDetails.accountNumber} onChange={(val) => setBankDetails({...bankDetails, accountNumber: val})} />
                 <BankInput label="IFSC Code" value={bankDetails.ifscCode} onChange={(val) => setBankDetails({...bankDetails, ifscCode: val})} />
                 <BankInput label="UPI ID" value={bankDetails.upiId} onChange={(val) => setBankDetails({...bankDetails, upiId: val})} />
              </div>
              <div className="mt-8 flex items-center gap-2 text-[8px] font-black text-zinc-500 uppercase">
                 <Save size={12} /> Details Auto-Persist in Mesh
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const BankInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-1">
     <label className="text-[8px] font-black text-zinc-500 uppercase ml-1">{label}</label>
     <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-500 transition-all" />
  </div>
);

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">{label}</span>
    <span className="font-black text-zinc-900">{value}</span>
  </div>
);

export default InvoicePortal;