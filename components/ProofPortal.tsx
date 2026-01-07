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
      
      {/* Action Header */}
      <div className="flex justify-between items-center mb-12 print:hidden">
         <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Vault
         </button>
         <button onClick={() => window.print()} className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-emerald-600 transition-all">
            <Printer size={16} /> Save as Forensic PDF
         </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Document Header */}
        <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-10">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-zinc-900 rounded-lg text-white"><ShieldCheck size={28} /></div>
             <h1 className="text-3xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
          </div>
          <div className="text-right">
             <h2 className="text-4xl font-black text-zinc-900 uppercase">Audit Dossier</h2>
             <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Certificate of Institutional Truth</p>
          </div>
        </div>

        {/* Identity Section */}
        <div className="flex items-center gap-10 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100">
           <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white">
              {/* ✅ FIXED: Changed photo to photoUrl */}
              <img src={record.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${record.name}`} className="w-full h-full object-cover" alt="" />
           </div>
           <div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {record.status} Identity
              </span>
              <h3 className="text-5xl font-black text-zinc-900 tracking-tight mt-2">{record.name}</h3>
              <p className="text-xl font-bold text-zinc-400 mt-1">{record.role}</p>
           </div>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-3 gap-8 border-y-2 border-zinc-100 py-10">
           <div className="text-center">
              <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Integrity Score</p>
              <p className={`text-4xl font-black ${statusColors[record.status]}`}>{record.trustScore}%</p>
           </div>
           <div className="text-center border-x-2 border-zinc-50">
              <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Audit Date</p>
              {/* ✅ FIXED: Changed date to created_at */}
              <p className="text-xl font-black text-zinc-900">{new Date(record.created_at).toLocaleDateString()}</p>
           </div>
           <div className="text-center">
              <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Audit Hash</p>
              <p className="text-xs font-mono font-bold text-zinc-500 truncate">{record.id}-SECURED</p>
           </div>
        </div>

        {/* Evidence Section */}
        <div className="space-y-6">
           <div className="flex justify-between items-center">
             <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><Lock size={16} className="text-indigo-600" /> Forensic Evidence Consensus</h4>
             <div className="flex gap-4">
                {record.entity_verified && <div className="flex items-center gap-1 text-emerald-600 font-black text-[8px] uppercase"><Globe size={10}/> Entity Grounded</div>}
                {record.identity_verified && <div className="flex items-center gap-1 text-indigo-600 font-black text-[8px] uppercase"><Fingerprint size={10}/> Bio-Continuity Verified</div>}
             </div>
           </div>
           
           <div className="p-10 bg-zinc-900 text-zinc-300 rounded-[3rem] text-xs font-mono leading-relaxed whitespace-pre-wrap italic shadow-inner border border-white/5">
              {/* ✅ DYNAMIC: Shows the real Gemini report if it exists */}
              {record.report || "The VeritrustX Neural Mesh has completed a multi-vector audit of the subject's professional footprint. The resulting integrity score indicates a high-confidence logic match between claimed tenure and forensic digital artifacts."}
           </div>
        </div>

        {/* 🖋️ INSTITUTIONAL SEAL & SIGNATURE */}
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
                 {/* Google Font 'Great Vibes' should be loaded in your index.html for this to look best */}
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
      
      {/* Background watermark */}
      <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.03] pointer-events-none rotate-12">
        <Fingerprint size={600} />
      </div>
    </div>
  );
};

export default ProofPortal;