import React, { useState } from 'react';
import { 
  FileText, Printer, Download, Landmark, ShieldCheck, 
  ArrowLeft, Plus, Trash2, CheckCircle2, Globe, ReceiptText 
} from 'lucide-react';

const InvoicePortal: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `VX-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    items: [{ description: 'VeritrustX Citadel License - Annual Access', qty: 1, rate: 199000 }],
    notes: 'Access will be provisioned within 2 hours of payment settlement.',
  });

  // Load bank details from local storage or use defaults
  const bankDetails = JSON.parse(localStorage.getItem('vx-bank-details') || '{}');
  const defaultBank = {
    holderName: bankDetails.holderName || 'CHALLA ADITYA',
    bankName: bankDetails.bankName || 'HDFC BANK',
    accountNumber: bankDetails.accountNumber || 'XXXXXXXXXXXX',
    ifscCode: bankDetails.ifscCode || 'HDFC0001234',
    upiId: bankDetails.upiId || 'challa@upi',
  };

  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handlePrint = () => { window.print(); };

  if (showPreview) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 font-black uppercase text-[10px] tracking-widest">
            <ArrowLeft size={16} /> Edit Details
          </button>
          <button onClick={handlePrint} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:brightness-110 shadow-2xl">
            <Printer size={20} /> Generate Official PDF
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
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Institutional Integrity Standard</p>
            </div>
            <div className="text-right">
              <h2 className="text-6xl font-black text-zinc-100 uppercase leading-none mb-4">Invoice</h2>
              <div className="space-y-1">
                <p className="text-sm font-black">NO: {invoiceData.invoiceNumber}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ISSUED: {invoiceData.date}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 py-16">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Client Entity</h3>
              <p className="text-xl font-black">{invoiceData.clientName || 'Unspecified Client'}</p>
              <p className="text-sm text-zinc-500 whitespace-pre-wrap mt-2 leading-relaxed">{invoiceData.clientAddress || 'Address not provided.'}</p>
            </div>
            <div className="text-right">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Settlement Authority</h3>
              <p className="text-sm font-bold">VeritrustX Neural Mesh</p>
              <p className="text-xs text-zinc-400 mt-1">Node-ID: VX-9021-IN</p>
            </div>
          </div>

          <table className="w-full mb-12">
            <thead>
              <tr className="border-b-2 border-zinc-900">
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Protocol Description</th>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Qty</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Total</th>
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
                   <span className="text-xs font-black uppercase tracking-widest">Grand Total (Inc. Tax)</span>
                   <span className="text-3xl font-black tracking-tighter text-indigo-600">₹{total.toLocaleString()}</span>
                </div>
             </div>
          </div>

          <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 mb-12">
             <div className="flex items-center gap-3 mb-6">
                <Landmark className="text-indigo-600" size={24} />
                <h4 className="text-sm font-black uppercase tracking-widest">Bank Settlement Details</h4>
             </div>
             <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                   <InfoRow label="A/C Holder" value={defaultBank.holderName} />
                   <InfoRow label="Bank Name" value={defaultBank.bankName} />
                   <InfoRow label="A/C Number" value={defaultBank.accountNumber} />
                </div>
                <div className="space-y-2">
                   <InfoRow label="IFSC Code" value={defaultBank.ifscCode} />
                   <InfoRow label="UPI ID" value={defaultBank.upiId} />
                </div>
             </div>
          </div>

          {/* 🖋️ FOUNDER NOTES & SIGNATURE */}
          <div className="mt-20 grid grid-cols-2 gap-12 border-t-2 border-zinc-100 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Founder's Note</h4>
              <p className="text-xs text-zinc-500 leading-relaxed italic">
                "VeritrustX was engineered to eliminate the 'Trust Gap' in global hiring. 
                This invoice represents your commitment to institutional integrity and 
                a future free of professional identity fraud."
              </p>
              <p className="text-[9px] font-bold text-indigo-600 uppercase mt-4">
                © 2025 VeriTrustX Protocol. All Rights Reserved. 
              </p>
            </div>

            <div className="text-right space-y-2">
               <div className="inline-block relative">
                  <p className="text-indigo-600" style={{ fontFamily: 'cursive', fontSize: '32px', transform: 'rotate(-2deg)' }}>
                     Challa Aditya
                  </p>
                  <div className="h-px w-full bg-zinc-900 mt-1"></div>
               </div>
               <div>
                  <p className="text-sm font-black text-zinc-900 uppercase">Challa Aditya</p>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Founder & CEO, VeritrustX</p>
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
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-2 font-quantum">Settlement <span className="accent-text">Generator</span></h2>
          <p className="text-zinc-500 font-medium">Issue institutional invoices for protocol licensing.</p>
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
              <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl font-bold" />
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[8px] font-black text-zinc-400 uppercase ml-2">Date</label>
                    <input type="date" value={invoiceData.date} onChange={(e) => setInvoiceData({...invoiceData, date: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl font-bold" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] font-black text-zinc-400 uppercase ml-2">Due Date</label>
                    <input type="date" value={invoiceData.dueDate} onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl font-bold" />
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-center px-2">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Line Items</h4>
              <button onClick={() => setInvoiceData({...invoiceData, items: [...invoiceData.items, {description: '', qty: 1, rate: 0}]})} className="text-[10px] font-black text-indigo-600 hover:underline">Add Row +</button>
           </div>
           {invoiceData.items.map((item, i) => (
             <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-2">
                <input className="flex-1 px-6 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl font-bold text-sm" placeholder="Description" value={item.description} onChange={(e) => {
                    const newItems = [...invoiceData.items];
                    newItems[i].description = e.target.value;
                    setInvoiceData({...invoiceData, items: newItems});
                  }} />
                <input type="number" className="w-24 px-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl font-bold text-sm" value={item.qty} onChange={(e) => {
                    const newItems = [...invoiceData.items];
                    newItems[i].qty = parseInt(e.target.value) || 0;
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
  );
};

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">{label}</span>
    <span className="font-black text-zinc-900">{value || '---'}</span>
  </div>
);

export default InvoicePortal;