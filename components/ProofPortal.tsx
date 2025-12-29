import React, { useState } from 'react';
import { 
  ShieldCheck, Calendar, Award, CheckCircle2, AlertCircle, Share2, 
  Download, ExternalLink, Globe, Lock, Fingerprint, Search, 
  Loader2, Copy, Check, ArrowLeft
} from 'lucide-react';
import { VaultRecord } from '../App';

interface ProofPortalProps {
  record: VaultRecord;
  onClose?: () => void;
}

const ProofPortal: React.FC<ProofPortalProps> = ({ record, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 1500);
  };

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/proof/${record.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const statusColors = {
    Verified: 'text-emerald-500',
    Flagged: 'text-amber-500',
    Failed: 'text-rose-500'
  };

  return (
    <div className="min-h-screen glass-panel rounded-[4rem] text-slate-700 p-6 md:p-12 animate-in fade-in duration-700 print:bg-white print:text-black print:rounded-none overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--brand-accent-glow),transparent_60%)] pointer-events-none opacity-40"></div>
      
      <div className="max-w-4xl mx-auto space-y-10 print:space-y-6 relative z-10">
        
        {/* Header - The "Trust Certificate" Look */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 pb-10 print:pb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 accent-bg rounded-[2rem] flex items-center justify-center shadow-2xl print:shadow-none print:w-16 print:h-16 text-white">
              <ShieldCheck size={40} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-black text-zinc-900 font-quantum">{record.name}</h1>
                <CheckCircle2 className={`${statusColors[record.status]} w-6 h-6`} />
              </div>
              <p className="text-zinc-500 font-medium flex items-center gap-2">
                <Globe size={14} className="accent-text" /> Public Verification Token: <span className="accent-text font-mono font-bold">{record.id}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3 print:hidden">
             <button 
               onClick={handleShareLink}
               className={`px-6 py-3 rounded-xl border transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                 copied ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
               }`}
             >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                {copied ? 'Copied' : 'Share Link'}
             </button>
             <button 
               onClick={handleExportPDF}
               disabled={isExporting}
               className="px-6 py-3 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50"
             >
                {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                {isExporting ? 'Generating...' : 'Audit Report'}
             </button>
             {onClose && (
               <button onClick={onClose} className="p-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl transition-all" title="Return to Vault">
                  <ArrowLeft size={18} />
               </button>
             )}
          </div>
        </div>

        {/* The Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
           
           {/* Left Column: Integrity Score */}
           <div className="md:col-span-1 space-y-6">
              <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] text-center shadow-sm print:shadow-none">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Trust Integrity Score</p>
                 <div className="relative inline-flex items-center justify-center mb-6">
                    <svg className="w-32 h-32 transform -rotate-90">
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-50" />
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset={`${364 - (364 * record.trustScore) / 100}`} className="accent-text" />
                    </svg>
                    <span className="absolute text-3xl font-black text-zinc-900">{record.trustScore}%</span>
                 </div>
                 <p className={`text-xs font-bold uppercase tracking-widest ${statusColors[record.status]}`}>Grade: {record.trustScore > 80 ? 'Superior' : record.trustScore > 40 ? 'Provisional' : 'Failed'}</p>
              </div>

              <div className="bg-white border border-zinc-100 p-6 rounded-[2rem] space-y-4 shadow-sm">
                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Security Fingerprint</p>
                 <div className="flex items-center gap-3">
                    <Fingerprint className="accent-text" />
                    <div className="overflow-hidden">
                       <p className="text-[9px] font-mono text-zinc-500 truncate">SHA-256: 8f92b{record.id}e4a21</p>
                       <p className="text-[9px] font-mono text-zinc-500 truncate">Audit Date: {record.date}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Column: Evidence Log */}
           <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2 font-quantum">
                    <Search className="accent-text" size={20} /> Verified Evidence Log
                 </h3>
                 
                 <div className="space-y-3">
                    <EvidenceItem 
                      title="Professional Tenure Verification" 
                      desc={`Cross-referenced ${record.role} trajectory against global institution markers.`} 
                      status={record.status === 'Failed' ? 'Failed' : 'Verified'} 
                    />
                    <EvidenceItem 
                      title="Technical Logic Scrutiny" 
                      desc={`Audit findings indicate a ${record.trustScore}% semantic alignment with stated role requirements.`} 
                      status={record.trustScore > 60 ? 'Verified' : 'Warning'} 
                    />
                    <EvidenceItem 
                      title="Biometric Continuity" 
                      desc="No facial geometry variance or vocal harmonic anomalies detected during interview cycles." 
                      status={record.status === 'Verified' ? 'Verified' : 'Warning'} 
                    />
                 </div>
              </div>

              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem]">
                 <div className="flex items-center gap-4 mb-4">
                    <Award className="accent-text" size={32} />
                    <h4 className="text-lg font-black text-zinc-900 font-quantum">Auditor's Final Recommendation</h4>
                 </div>
                 <p className="text-sm leading-relaxed text-zinc-600 font-medium italic">
                    "Audit UID {record.id} indicates a {record.status} identity state. Decision-makers should review the Logic Observable table for deeper context on timeline fractures."
                 </p>
                 <div className="mt-6 flex items-center gap-3 border-t border-zinc-200 pt-4">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Auditor" className="w-10 h-10 rounded-full bg-zinc-100" />
                    <div>
                       <p className="text-xs font-bold text-zinc-900">Sarah Jenkins</p>
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Chief Forensic Officer @ VeritrustX</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        <footer className="text-center pt-20 pb-10 print:pt-10">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">The Institutional Standard for Professional Trust</p>
           <div className="flex justify-center gap-6 mt-4 opacity-10 grayscale print:hidden">
              <div className="h-6 w-20 bg-zinc-400 rounded"></div>
              <div className="h-6 w-20 bg-zinc-400 rounded"></div>
              <div className="h-6 w-20 bg-zinc-400 rounded"></div>
           </div>
        </footer>

      </div>
    </div>
  );
};

const EvidenceItem = ({ title, desc, status }: any) => (
  <div className="flex items-start gap-4 p-5 bg-white border border-zinc-50 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm">
     <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${status === 'Verified' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
     <div>
        <div className="flex items-center gap-2 mb-1">
           <h4 className="text-sm font-bold text-zinc-900">{title}</h4>
           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : status === 'Warning' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>{status}</span>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed font-medium">{desc}</p>
     </div>
  </div>
);

export default ProofPortal;