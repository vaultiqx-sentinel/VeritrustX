import React, { useState, useEffect } from 'react';
import { 
  FileText, Printer, Download, DollarSign, 
  Building2, User, CreditCard, Landmark, 
  CheckCircle2, ArrowLeft, Plus, Trash2, 
  ChevronRight, Save, ShieldCheck, Globe
} from 'lucide-react';

const InvoicePortal: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `VX-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientAddress: '',
    items: [{ description: 'VeritrustX Professional License - Annual', qty: 1, rate: 75000 }],
    notes: 'Please include the Invoice Number as a reference in your transfer.',
  });

  const [bankDetails, setBankDetails] = useState(() => {
    const saved = localStorage.getItem('vx-bank-details');
    return saved ? JSON.parse(saved) : {
      holderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      upiId: '',
      swiftCode: ''
    };
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem('vx-bank-details', JSON.stringify(bankDetails));
  }, [bankDetails]);

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', qty: 1, rate: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.18; // 18% GST example
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  if (showPreview) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center print:hidden">
          <button 
            onClick={() => setShowPreview(false)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Editor
          </button>
          <button 
            onClick={handlePrint}
            className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-indigo-500 transition-all shadow-2xl"
          >
            <Printer size={18} /> Print / Export as PDF
          </button>
        </div>

        {/* Invoice Document */}
        <div className="bg-white text-slate-900 p-12 md:p-16 rounded-[3rem] shadow-2xl max-w-4xl mx-auto print:rounded-none print:shadow-none print:p-0 print:text-black">
          <div className="flex justify-between items-start border-b-2 border-slate-100 pb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase font-quantum mb-1">VeritrustX</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Forensic Identity Protocol</p>
              <div className="mt-6 text-xs text-slate-500 font-medium">
                <p>Digital Truth Infrastructure</p>
                <p>Node #88-AX-091</p>
                <p>Global Settlement Layer</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-5xl font-black text-slate-200 uppercase print:text-slate-100">Invoice</h2>
              <div className="mt-4 space-y-1">
                <p className="text-xs font-black text-slate-900">No. {invoiceData.invoiceNumber}</p>
                <p className="text-[10px] text-slate-500 font-bold">DATE: {invoiceData.date}</p>
                <p className="text-[10px] text-slate-500 font-bold">DUE: {invoiceData.dueDate}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 py-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Bill To:</h3>
              <p className="text-lg font-black">{invoiceData.clientName || 'Unnamed Client'}</p>
              <p className="text-sm text-slate-500 whitespace-pre-wrap mt-1">{invoiceData.clientAddress || 'Client Address Not Provided'}</p>
            </div>
            <div className="text-right flex flex-col items-end">
               <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-2">
                 <ShieldCheck size={32} />
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">VeritrustX Verified Settlement</p>
            </div>
          </div>

          <table className="w-full border-collapse mb-10">
            <thead>
              <tr className="border-b-2 border-slate-900">
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Description</th>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Qty</th>
                <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Rate</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoiceData.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-6 text-sm font-bold">{item.description}</td>
                  <td className="py-6 text-center text-sm">{item.qty}</td>
                  <td className="py-6 text-center text-sm">₹{item.rate.toLocaleString()}</td>
                  <td className="py-6 text-right text-sm font-black">₹{(item.qty * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end pt-6">
            <div className="w-64 space-y-3">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">GST (18%)</span>
                  <span className="font-bold">₹{tax.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center pt-3 border-t-2 border-slate-900">
                  <span className="text-[10px] font-black uppercase tracking-widest">Total Amount</span>
                  <span className="text-2xl font-black">₹{total.toLocaleString()}</span>
               </div>
            </div>
          </div>

          {/* BANK DETAILS - The Requested Part */}
          <div className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-3 mb-6">
                <Landmark className="text-indigo-600" size={24} />
                <h4 className="text-sm font-black uppercase tracking-widest">Payment Settlement Details</h4>
             </div>
             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <DetailRow label="Account Holder" value={bankDetails.holderName} />
                   <DetailRow label="Bank Name" value={bankDetails.bankName} />
                   <DetailRow label="Account Number" value={bankDetails.accountNumber} />
                </div>
                <div className="space-y-4">
                   <DetailRow label="IFSC Code" value={bankDetails.ifscCode} />
                   <DetailRow label="SWIFT Code" value={bankDetails.swiftCode || 'N/A'} />
                   <DetailRow label="UPI ID" value={bankDetails.upiId} />
                </div>
             </div>
          </div>

          <div className="mt-12 text-[10px] text-slate-400 font-medium leading-relaxed italic text-center">
             <p>{invoiceData.notes}</p>
             <p className="mt-2">Thank you for your partnership in securing professional truth.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-start gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">Invoice <span className="text-indigo-500">Generator</span></h2>
          <p className="text-slate-400 font-medium italic">Construct professional billing documents for client settlements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl space-y-8">
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Client Name</label>
                    <input 
                      type="text" 
                      value={invoiceData.clientName}
                      onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-950 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-indigo-500 transition-all"
                      placeholder="e.g. Nexus Fintech"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Invoice Number</label>
                    <input 
                      type="text" 
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-950 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-indigo-500 transition-all"
                    />
                 </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Client Address</label>
                <textarea 
                  value={invoiceData.clientAddress}
                  onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
                  className="w-full h-24 px-5 py-3 bg-slate-950 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-indigo-500 transition-all resize-none"
                  placeholder="Street Address, City, ZIP..."
                />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Line Items</h4>
                    <button 
                      onClick={addItem}
                      className="text-[10px] font-black text-indigo-500 hover:text-white flex items-center gap-1 uppercase transition-all"
                    >
                      <Plus size={12} /> Add Row
                    </button>
                 </div>
                 <div className="space-y-3">
                    {invoiceData.items.map((item, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <input 
                          type="text" 
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...invoiceData.items];
                            newItems[i].description = e.target.value;
                            setInvoiceData({...invoiceData, items: newItems});
                          }}
                          className="flex-1 px-4 py-2 bg-slate-950 border border-white/5 rounded-lg text-xs text-white outline-none"
                        />
                        <input 
                          type="number" 
                          placeholder="Qty"
                          value={item.qty}
                          onChange={(e) => {
                            const newItems = [...invoiceData.items];
                            newItems[i].qty = parseInt(e.target.value);
                            setInvoiceData({...invoiceData, items: newItems});
                          }}
                          className="w-20 px-4 py-2 bg-slate-950 border border-white/5 rounded-lg text-xs text-white outline-none"
                        />
                        <input 
                          type="number" 
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => {
                            const newItems = [...invoiceData.items];
                            newItems[i].rate = parseFloat(e.target.value);
                            setInvoiceData({...invoiceData, items: newItems});
                          }}
                          className="w-32 px-4 py-2 bg-slate-950 border border-white/5 rounded-lg text-xs text-white outline-none"
                        />
                        <button 
                          onClick={() => removeItem(i)}
                          className="p-2 text-slate-600 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                 </div>
              </div>

              <button 
                onClick={() => setShowPreview(true)}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all shadow-xl"
              >
                <Globe size={18} /> Preview Settlement Invoice
              </button>
           </div>
        </div>

        {/* Bank Details Config Side Panel */}
        <div className="space-y-8">
           <div className="p-8 bg-slate-900 border border-indigo-500/20 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-600 rounded-xl text-white"><CreditCard size={20} /></div>
                <h3 className="text-xl font-black text-white">Bank Details</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Enter your personal bank details here. They will be included at the bottom of the invoice for the client's reference.</p>
              
              <div className="space-y-4">
                 <ConfigInput label="Account Holder" value={bankDetails.holderName} onChange={(val: string) => setBankDetails({...bankDetails, holderName: val})} />
                 <ConfigInput label="Bank Name" value={bankDetails.bankName} onChange={(val: string) => setBankDetails({...bankDetails, bankName: val})} />
                 <ConfigInput label="Account Number" value={bankDetails.accountNumber} onChange={(val: string) => setBankDetails({...bankDetails, accountNumber: val})} />
                 <ConfigInput label="IFSC Code" value={bankDetails.ifscCode} onChange={(val: string) => setBankDetails({...bankDetails, ifscCode: val})} />
                 <ConfigInput label="UPI ID / VPA" value={bankDetails.upiId} onChange={(val: string) => setBankDetails({...bankDetails, upiId: val})} />
                 <ConfigInput label="SWIFT Code (Optional)" value={bankDetails.swiftCode} onChange={(val: string) => setBankDetails({...bankDetails, swiftCode: val})} />
              </div>

              <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                 <CheckCircle2 size={12} /> Data Persisted Locally
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

interface ConfigInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const ConfigInput = ({ label, value, onChange }: ConfigInputProps) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-slate-950 border border-white/5 rounded-lg text-xs text-white outline-none focus:border-indigo-500 transition-all"
    />
  </div>
);

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-slate-400 font-medium">{label}:</span>
    <span className="font-black text-slate-900">{value || '---'}</span>
  </div>
);

export default InvoicePortal;