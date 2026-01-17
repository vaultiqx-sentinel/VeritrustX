
import React from 'react';
import { ShieldCheck, ArrowLeft, Printer, Lock, Globe, Fingerprint } from 'lucide-react';
import { VaultRecord } from '../types';

interface ProofPortalProps {
  record: VaultRecord;
  onClose?: () => void;
}

const ProofPortal: React.FC<ProofPortalProps> = ({ record, onClose }) => {
  return (
    <div className="min-h-screen bg-white rounded-[4rem] text-slate-700 p-8 md:p-16 animate-in fade-in duration-700 border-4 border-zinc-50 shadow-2xl">
      <div className="flex justify-between items-center mb-12">
         <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-2"><ArrowLeft size={14} /> Back to Vault</button>
         <button onClick={() => window.print()} className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl"><Printer size={16} /> Save Forensic PDF</button>
      </div>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-10">
          <div className="flex items-center gap-4"><div className="p-2 bg-zinc-900 rounded-lg text-white"><ShieldCheck size={28} /></div><h1 className="text-3xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1></div>
          <div className="text-right"><h2 className="text-4xl font-black text-zinc-900 uppercase">Audit Dossier</h2></div>
        </div>
        <div className="flex items-center gap-10 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
           <div><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{record.status} Identity</span><h3 className="text-5xl font-black text-zinc-900 tracking-tight mt-2">{record.name}</h3></div>
        </div>
        <div className="p-10 bg-zinc-900 text-zinc-300 rounded-[3rem] text-xs font-mono leading-relaxed whitespace-pre-wrap italic shadow-inner border border-white/5">
          {record.report || "The VeritrustX Neural Mesh has completed a multi-vector audit of the subject's professional footprint."}
        </div>
      </div>
    </div>
  );
};

export default ProofPortal;
