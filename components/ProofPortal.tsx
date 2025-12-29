import React, { useState } from 'react';
import { 
  ShieldCheck, Calendar, Award, CheckCircle2, AlertCircle, Share2, 
  Download, Globe, Lock, Fingerprint, Search, 
  Loader2, ArrowLeft, Printer
} from 'lucide-react';
import { VaultRecord } from '../App';

interface ProofPortalProps {
  record: VaultRecord;
  onClose?: () => void;
}

const ProofPortal: React.FC<ProofPortalProps> = ({ record, onClose }) => {
  const handleExportPDF = () => {
    window.print();
  };

  const statusColors = {
    Verified: 'text-emerald-600',
    Flagged: 'text-amber-600',
    Failed: 'text-rose-600'
  };

  return (
    <div className="min-h-screen bg-white rounded-[4rem] text-slate-700 p-8 md:p-16 animate-in fade-in duration-700 print:p-0 print:m-0 overflow-hidden relative border-2 border-zinc-100 print:border-none">
      
      {/* 🟢 TOP NAV - HIDDEN IN PDF */}
      <div className="flex justify-between items-center mb-12 print:hidden">
         <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-2">
            <ArrowLeft size={14} /> Return to Vault
         </button>
         <div className="flex gap-3">
            <button 
              onClick={handleExportPDF}
              className="px-8 py-4 bg-zinc-900 text-white hover:bg-emerald-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl"
            >
               <Printer size={16} /> Save as Forensic PDF
            </button>
         </div>
      </div>

      {/* 📄 THE ACTUAL DOCUMENT (This is what the client sees in PDF) */}
      <div className="max-w-4xl mx-auto space-y-12 print:space-y-8">
        
        {/* Document Header */}
        <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-zinc-900 rounded-lg text-white"><ShieldCheck size={24} /></div>
               <h1 className="text-3xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Global Integrity Protocol • Node-ID: 8821-X</p>
          </div>
          <div className="text-right">
             <h2 className="text-4xl font-black text-zinc-900 uppercase">Audit Dossier</h2>
             <p className="text-xs font-bold text-zinc-400 mt-1">STATUS: <span className={statusColors[record.status]}>{record.status.toUpperCase()}</span></p>
          </div>
        </div>

        {/* Identity Section */}
        <div className="flex items-center gap-10 bg-zinc-50 p-10 rounded-[3rem] border border-zinc-100 print:bg-white print:border-2">
           <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden print:shadow-none">
              <img src={record.photo || ''} className="w-full h-full object-cover" alt="Subject" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Verified Identity Subject</p>
              <h3 className="text-5xl font-black text-zinc-900 tracking-tight">{record.name}</h3>
              <p className="text-xl font-bold text-zinc-400 mt-1">{record.role}</p>
           </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-3 gap-8 border-y-2 border-zinc-100 py-10">
           <div className="text-center space-y-1">
              <p className="text-[9px] font-black uppercase text-zinc-400">Integrity Score</p>
              <p className={`text-4xl font-black ${statusColors[record.status]}`}>{record.trustScore}%</p>
           </div>
           <div className="text-center border-x-2 border-zinc-50 space-y-1">
              <p className="text-[9px] font-black uppercase text-zinc-400">Audit Timestamp</p>
              <p className="text-xl font-black text-zinc-900">{record.date}</p>
           </div>
           <div className="text-center space-y-1">
              <p className="text-[9px] font-black uppercase text-zinc-400">Verification Hash</p>
              <p className="text-sm font-mono font-bold text-zinc-500">{record.id}-CONFIRMED</p>
           </div>
        </div>

        {/* Forensic Findings */}
        <div className="space-y-6">
           <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Lock size={16} className="text-indigo-600" /> Evidence Consensus
           </h4>
           <div className="p-10 bg-zinc-900 text-zinc-300 rounded-[3rem] text-sm leading-relaxed italic font-medium shadow-inner print:bg-white print:text-zinc-900 print:border-2 print:border-zinc-200">
              "The VeritrustX Neural Mesh has completed a multi-vector audit of the subject's professional claims. 
              By cross-referencing institutional data nodes and performing pixel-level forensic scans of provided credentials, 
              the protocol has reached a {record.trustScore}% confidence consensus. This dossier serves as an official proof of merit."
           </div>
        </div>

        {/* Institutional Sign-off */}
        <div className="flex justify-between items-end pt-10 border-t border-zinc-100">
           <div className="space-y-2">
              <Fingerprint size={40} className="text-zinc-200" />
              <p className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">Protocol Seal: Implicit</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase text-zinc-900">Chief Forensic Officer</p>
              <div className="h-px w-48 bg-zinc-900 mt-8 mb-2"></div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase">VeritrustX Integrity Board</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProofPortal;