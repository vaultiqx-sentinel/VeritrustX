import React from 'react';
import { 
  ShieldCheck, Calendar, Award, CheckCircle2, 
  ArrowLeft, Printer, Lock, Fingerprint, Globe
} from 'lucide-react';
import { VaultRecord } from '../App';

interface ProofPortalProps {
  record: VaultRecord;
  onClose?: () => void;
}

const ProofPortal: React.FC<ProofPortalProps> = ({ record, onClose }) => {
  const statusColors = {
    Verified: 'text-emerald-600',
    Flagged: 'text-amber-600',
    Failed: 'text-rose-600'
  };

  return (
    <div className="min-h-screen bg-white rounded-[4rem] text-slate-700 p-8 md:p-16 animate-in fade-in duration-700 print:p-0 print:m-0 overflow-hidden relative border-4 border-zinc-50 print:border-none shadow-2xl">
      
      <div className="flex justify-between items-center mb-12 print:hidden">
         <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Archive
         </button>
         <button onClick={() => window.print()} className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-emerald-600 transition-all">
            <Printer size={16} /> Save as Forensic PDF
         </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-10">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-zinc-900 rounded-lg text-white"><ShieldCheck size={28} /></div>
             <h1 className="text-3xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
          </div>
          <div className="text-right">
             <h2 className="text-4xl font-black text-zinc-900 uppercase">Audit Dossier</h2>
             <p className="text-xs font-bold text-zinc-400 uppercase">Certificate of Professional Merit</p>
          </div>
        </div>

        <div className="flex items-center gap-10 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
           <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden">
              <img src={record.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${record.name}`} className="w-full h-full object-cover" alt="" />
           </div>
           <div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{record.status} Identity</span>
              <h3 className="text-5xl font-black text-zinc-900 tracking-tight mt-2">{record.name}</h3>
              <p className="text-xl font-bold text-zinc-400 mt-1">{record.role}</p>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-8 border-y-2 border-zinc-100 py-10">
           <div className="text-center">
              <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Integrity Score</p>
              <p className={`text-4xl font-black ${statusColors[record.status]}`}>{record.trustScore}%</p>
           </div>
           <div className="text-center border-x-2 border-zinc-50">
              <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Audit Date</p>
              <p className="text-xl font-black text-zinc-900">{record.date}</p>
           </div>
           <div className="text-center">
              <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Audit Hash</p>
              <p className="text-xs font-mono font-bold text-zinc-500">{record.id}-VERIFIED</p>
           </div>
        </div>

        <div className="space-y-6">
           <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Lock size={16} className="text-indigo-600" /> Evidence Consensus</h4>
           <div className="p-10 bg-zinc-900 text-zinc-300 rounded-[3rem] text-sm leading-relaxed italic font-medium shadow-inner">
              "The VeritrustX Neural Mesh has completed a multi-vector audit of the subject's professional footprint. 
              The resulting integrity score indicates a high-confidence logic match between claimed tenure and 
              forensic digital artifacts."
           </div>
        </div>

        {/* 🖋️ FOUNDER SIGNATURE */}
        <div className="mt-20 flex justify-between items-end pt-12 border-t-2 border-zinc-100">
           <div className="space-y-2">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center relative bg-emerald-50/10">
                 <ShieldCheck className="text-emerald-600" size={28} />
                 <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <p className="text-[8px] font-black uppercase text-zinc-400">Institutional Protocol Seal</p>
           </div>
           <div className="text-right">
              <div className="relative inline-block mb-2">
                 <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '48px', color: '#1e1b4b', transform: 'rotate(-3deg)' }}>
                    Challa Aditya
                 </p>
              </div>
              <div className="h-px w-64 bg-zinc-900 ml-auto mb-2"></div>
              <p className="text-sm font-black text-zinc-900 uppercase">Challa Aditya</p>
              <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Founder & CEO, VeritrustX</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProofPortal;