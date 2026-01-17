
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Printer, Lock, Globe, Fingerprint, Binary, Check, Copy } from 'lucide-react';
import { VaultRecord } from '../types';

interface ProofPortalProps {
  record: VaultRecord;
  onClose?: () => void;
}

const ProofPortal: React.FC<ProofPortalProps> = ({ record, onClose }) => {
  const [computedHash, setComputedHash] = useState<string>('');

  // 🔒 SIMULATE DETERMINISTIC HASH RETRIEVAL FOR THE RECORD
  useEffect(() => {
    const generateStaticHash = async () => {
        // In a real app, this hash comes from the database. 
        // Here we generate a stable hash based on ID + Date to simulate the stored proof.
        const input = `${record.id}-${record.created_at}-${record.name}`;
        const msgBuffer = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        setComputedHash(hashHex);
    };
    generateStaticHash();
  }, [record]);

  return (
    <div className="min-h-screen bg-white rounded-[4rem] text-slate-700 p-8 md:p-16 animate-in fade-in duration-700 border-4 border-zinc-50 shadow-2xl">
      <div className="flex justify-between items-center mb-12">
         <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-2"><ArrowLeft size={14} /> Back to Vault</button>
         <button onClick={() => window.print()} className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl"><Printer size={16} /> Save Forensic PDF</button>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-10">
          <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-900 rounded-xl text-white shadow-xl shadow-zinc-900/20"><ShieldCheck size={32} /></div>
              <div>
                  <h1 className="text-3xl font-black tracking-tighter uppercase font-quantum text-zinc-900">VeritrustX</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Institutional Truth Protocol</p>
              </div>
          </div>
          <div className="text-right">
              <h2 className="text-4xl font-black text-zinc-900 uppercase">Audit Dossier</h2>
              <p className="text-sm font-bold text-zinc-400 font-mono mt-1">{record.id}</p>
          </div>
        </div>

        {/* Identity Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
           <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-2xl bg-white border-2 border-zinc-200 overflow-hidden shadow-sm p-1">
                  <img 
                    src={record.photoUrl ?? `https://api.dicebear.com/7.x/initials/svg?seed=${record.name}`} 
                    className="w-full h-full object-cover rounded-xl" 
                    alt="Subject"
                  />
               </div>
               <div>
                   <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm mb-2 ${record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {record.status === 'Verified' ? <Check size={10} /> : <Lock size={10} />} {record.status} Identity
                   </span>
                   <h3 className="text-4xl font-black text-zinc-900 tracking-tight">{record.name}</h3>
                   <p className="text-sm font-bold text-zinc-500 mt-1">{record.role}</p>
               </div>
           </div>
           
           <div className="text-right">
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Trust Logic Score</p>
               <div className="flex items-end justify-end gap-2">
                   <span className={`text-6xl font-black tracking-tighter leading-none ${record.trustScore > 80 ? 'text-emerald-500' : 'text-rose-500'}`}>{record.trustScore}</span>
                   <span className="text-2xl font-black text-zinc-300 mb-1">/100</span>
               </div>
           </div>
        </div>

        {/* 🔒 CRYPTOGRAPHIC EVIDENCE CHAIN (DIGITAL DNA) */}
        <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <Fingerprint className="text-indigo-400" />
                <h4 className="text-sm font-black uppercase tracking-widest">Digital DNA Signature (SHA-256)</h4>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 font-mono text-xs break-all relative group z-10">
                 <p className="text-indigo-300 leading-relaxed tracking-wider">{computedHash || "GENERATING_HASH..."}</p>
                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} className="text-zinc-500 cursor-pointer hover:text-white" />
                 </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 relative z-10">
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Hash Algorithm</p>
                    <p className="text-sm font-bold mt-1">SHA-256 (NIST Standard)</p>
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Timestamp Anchor</p>
                    <p className="text-sm font-bold mt-1">{new Date(record.created_at).toUTCString()}</p>
                </div>
            </div>
        </div>

        {/* Report Body */}
        <div className="space-y-4">
             <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-4">Neural Forensic Analysis</h4>
             <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] text-zinc-600 text-sm font-medium leading-relaxed whitespace-pre-wrap shadow-sm">
               {record.report || "The VeritrustX Neural Mesh has completed a multi-vector audit of the subject's professional footprint."}
             </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-zinc-100 pt-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <p>Generated via VeritrustX Institutional Protocol</p>
            <p>Non-Repudiable Audit Node #001</p>
        </div>
      </div>
    </div>
  );
};

export default ProofPortal;
