import React, { useState } from 'react';
import { 
  Printer, Landmark, ShieldCheck, ArrowLeft, Plus, 
  Trash2, CheckCircle2, Globe, ReceiptText, Zap 
} from 'lucide-react';

const InvoicePortal: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `VX-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    items: [{ description: 'VeritrustX Citadel License - Institutional Access', qty: 1, rate: 199000 }],
    notes: 'Neural capacity will be provisioned within 120 minutes of settlement confirmation.',
  });

  const bankDetails = {
    holderName: 'CHALLA ADITYA',
    bankName: 'VERITRUSTX SETTLEMENT NODE',
    accountNumber: '9642276736',
    ifscCode: 'VXID0009021',
    upiId: '9642276736@upi',
  };

  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const tax = subtotal * 0.18; 
  const total = subtotal + tax;

  const handlePrint = () => { window.print(); };

  if (showPreview) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20 print:p-0">
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest">
            <ArrowLeft size={16} /> Return to Mesh Editor
          </button>
          <button onClick={handlePrint} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:brightness-110 shadow-2xl transition-all">
            <Printer size={20} /> Generate Institutional PDF
          </button>
        </div>

        {/* 📄 THE OFFICIAL PDF DOCUMENT */}
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
              <p className="text-[10px] font-bold text-zinc-400 uppercase">ISSUED: {invoiceData.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 py-16">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Client Entity (Bill To)</h3>
              <p className="text-xl font-black">{invoiceData.clientName || 'Unspecified Client'}</p>
              <p className="text-sm text-zinc-500 whitespace-pre-wrap mt-2 leading-relaxed">{invoiceData.clientAddress || 'Address details pending submission.'}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Settlement Authority</h3>
              <p className="text-sm font-bold">VeritrustX Global Mesh</p>
              <p className="text-xs text-zinc-400 mt-1">Remote-First Neural Operations</p>
              <p className="text-xs text-zinc-400">Hub Node: VX-INDIA-9642</p>
            </div>
          </div>

          <table className="w-full mb-12">
            <thead className="border-b-2 border-zinc-900">
              <tr>
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Protocol Service Description</th>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Qty</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Amount (INR)</th>
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
             <div className="w-80 space-y-4">
                <div className="flex justify-between items-center pt-4 border-t-2 border-zinc-900">
                   <span className="text-xs font-black uppercase tracking-widest">Final Settlement Total</span>
                   <span className="text-3xl font-black tracking-tighter text-indigo-600">₹{total.toLocaleString()}</span>
                </div>
                <p className="text-[9px] text-right text-zinc-400 font-bold uppercase">Inclusive of 18% Institutional GST</p>
             </div>
          </div>

          <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 mb-12">
             <div className="flex items-center gap-3 mb-6">
                <Landmark className="text-indigo-600" size={24} />
                <h4 className="text-sm font-black uppercase tracking-widest">Payment Settlement Instructions</h4>
             </div>
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4"><InfoRow label="A/C Holder" value={bankDetails.holderName} /><InfoRow label="Bank Name" value={bankDetails.bankName} /><InfoRow label="A/C Number" value={bankDetails.accountNumber} /></div>
                <div className="space-y-4"><InfoRow label="IFSC Code" value={bankDetails.ifscCode} /><InfoRow label="UPI ID" value={bankDetails.upiId} /></div>
             </div>
          </div>

          {/* 🖋️ FOUNDER MANIFESTO & EDWARDIAN SIGNATURE */}
          <div className="mt-20 grid grid-cols-2 gap-12 border-t-4 border-zinc-900 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Founder's Note</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium italic">
                "VeritrustX was engineered to move institutional trust from human opinion 
                into immutable neural logic. By settling this invoice, your organization 
                is deploying a non-repudiable truth mesh. Your hiring pipeline is now mathematically secure."
              </p>
              <p className="text-[9px] font-bold text-indigo-600 uppercase mt-4">© 2025 VeriTrustX Protocol. All Rights Reserved.</p>
            </div>

            <div className="text-right">
               <div className="inline-block relative mb-2">
                  <div className="absolute -top-12 -left-12 w-20 h-20 border-2 border-emerald-500/20 rounded-full flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm">
                     <ShieldCheck size={24} className="text-emerald-500" />
                  </div>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '54px', color: '#1e1b4b', transform: 'rotate(-2deg)' }}>
                     Challa Aditya
                  </p>
                  <div className="h-0.5 w-64 bg-zinc-900 ml-auto mt-[-5px]"></div>
               </div>
               <div>
                  <p className="text-sm font-black text-zinc-900 uppercase">Challa Aditya</p>
                  <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Founder & Chief Executive Officer</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-2 font-quantum uppercase">Settlement <span className="accent-text">Mesh</span></h2>
          <p className="text-zinc-500 font-medium">Generate institutional licensing invoices for clients.</p>
        </div>
        <button onClick={() => setShowPreview(true)} className="px-8 py-4 bg-zinc-900 text-white font-black rounded-2xl flex items-center gap-3 shadow-xl hover:bg-emerald-600 transition-all">
           <ReceiptText size={18} /> Review & Generate PDF
        </button>
      </div>

      <div className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-6">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Client Metadata</h4>
              <input type="text" value={invoiceData.clientName} onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})} placeholder="Organization Name" className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
              <textarea value={invoiceData.clientAddress} onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})} placeholder="Full Billing Address" rows={3} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-bold resize-none" />
           </div>
           <div className="space-y-6">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Invoice Logistics</h4>
              <div className="grid grid-cols-2 gap-4">
                 <input type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl font-bold" />
                 <input type="date" value={invoiceData.dueDate} onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl font-bold" />
              </div>
              <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl font-bold" />
           </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">{label}</span>
    <span className="font-black text-zinc-900">{value || '---'}</span>
  </div>
);

export default InvoicePortal;