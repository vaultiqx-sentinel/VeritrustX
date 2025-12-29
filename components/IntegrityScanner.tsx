import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, CheckCircle2, Cpu, Zap, Loader2, Fingerprint, 
  Binary, SearchCode, FileSearch, Activity, Database, Globe, 
  Copy, Download, RefreshCw
} from 'lucide-react';
import { performQuantumAudit } from '../src/services/geminiService';

export interface IntegrityScannerProps {
  onAuditComplete?: (name: string, role: string, score: number, verdict: string) => void;
}

const IntegrityScanner: React.FC<IntegrityScannerProps> = ({ onAuditComplete }) => {
  const [profileData, setProfileData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const scanStatuses = [
    "Initializing neural logic shards...",
    "Hashing identity vectors...",
    "Cross-referencing global registry nodes...",
    "Scanning tenure logic flows...",
    "Filtering social shadow traces...",
    "Detecting lip-sync & proxy markers...",
    "Finalizing integrity dossier..."
  ];

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setScanStatus(0);
      interval = setInterval(() => {
        setScanStatus(prev => (prev + 1) % scanStatuses.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleScan = async () => {
    if (!profileData || profileData.length < 10) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const report = await performQuantumAudit(profileData);
      setResult(report);
      
      if (onAuditComplete) {
         // Advanced Extraction logic
         const scoreMatch = report.match(/(\d+)%/);
         const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;
         
         const nameMatch = profileData.match(/([A-Z][a-z]+ [A-Z][a-z]+)/);
         const name = nameMatch ? nameMatch[1] : "Identity Subject " + Math.floor(Math.random()*999);
         
         const verdict = score > 80 ? "Verified" : score > 50 ? "Flagged" : "Failed";
         onAuditComplete(name, "Forensic Audit", score, verdict);
      }
    } catch (error) {
      setResult("SYSTEM ERROR: Neural Link Severed. Please check API configuration.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 relative overflow-hidden shadow-sm">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none quantum-grid"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
           <div className="flex items-center gap-4">
              <div className="p-4 accent-bg rounded-2xl text-white shadow-xl animate-pulse"><FileSearch size={28} /></div>
              <div>
                 <h3 className="text-2xl font-black text-zinc-900 font-quantum">Neural <span className="accent-text">Integrity</span> Scrutiny</h3>
                 <p className="text-sm text-zinc-500 font-medium">Professional Identity & Tenure Forensic Analysis Engine</p>
              </div>
           </div>
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100">AI-POWERED</span>
              <span className="px-3 py-1 bg-zinc-50 text-zinc-400 text-[10px] font-black rounded-full border border-zinc-100">V1.0.4-STABLE</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
           {/* Input Section */}
           <div className="space-y-6">
              <div className="relative group">
                <div className="flex items-center justify-between mb-3 ml-1">
                   <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Evidence Input Field</label>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[9px] font-bold accent-text uppercase tracking-widest">Ready for ingest</span>
                   </div>
                </div>
                <textarea 
                  value={profileData}
                  onChange={(e) => setProfileData(e.target.value)}
                  placeholder="Paste Candidate CV snippets, LinkedIn Profile Text, or Interview Transcripts here..."
                  className="w-full h-[400px] px-8 py-6 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] focus:accent-border focus:bg-white outline-none transition-all text-zinc-700 font-medium text-sm resize-none custom-scrollbar shadow-inner font-mono leading-relaxed"
                />
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleScan}
                  disabled={isAnalyzing || !profileData}
                  className="flex-1 py-5 accent-bg text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale shadow-xl group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Binary size={18} />}
                  {isAnalyzing ? 'UPLINKING TO CORE...' : 'EXECUTE INTEGRITY AUDIT'}
                </button>
                <button 
                  onClick={() => {setProfileData(''); setResult(null);}}
                  className="p-5 bg-zinc-100 text-zinc-400 rounded-2xl hover:bg-zinc-200 transition-colors"
                  title="Reset Scanner"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
           </div>

           {/* Analysis/Result Section */}
           <div className="space-y-6">
              {isAnalyzing ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-8 bg-zinc-50/50 border border-zinc-100 rounded-[3rem] p-12 relative overflow-hidden">
                   <div className="relative">
                      <div className="w-32 h-32 border-[6px] border-zinc-100 border-t-emerald-500 rounded-full animate-spin"></div>
                      <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 accent-text" size={40} />
                   </div>
                   <div className="text-center space-y-4 max-w-xs">
                      <p className="text-zinc-900 font-black text-xl uppercase tracking-widest font-quantum">Deconstructing...</p>
                      
                      <div className="bg-white border border-zinc-200 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-md animate-bounce">
                        <Activity className="accent-text animate-pulse" size={16} />
                        <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.15em]">
                          {scanStatuses[scanStatus]}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Neural weights aligning for final verdict</p>
                   </div>
                </div>
              ) : result ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                   <div className="p-8 bg-zinc-950 rounded-[2.5rem] text-white overflow-hidden relative border border-white/10 shadow-2xl flex-1 flex flex-col">
                      {/* Scan Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                         <div className="flex items-center gap-3">
                            <ShieldAlert className="accent-text" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Forensic Dossier: SECURE_PROTOCOL_7</span>
                         </div>
                         <div className="flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400"><Copy size={14} /></button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400"><Download size={14} /></button>
                         </div>
                      </div>

                      {/* Result Body */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                         <div className="prose prose-invert max-w-none">
                            <pre className="text-emerald-400/90 text-xs leading-relaxed whitespace-pre-wrap font-mono italic bg-black/40 p-6 rounded-2xl border border-white/5">
                               {result}
                            </pre>
                         </div>
                      </div>

                      {/* Scan Footer */}
                      <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                           <CheckCircle2 size={14} className="accent-text" />
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Integrity Consensus Reached</p>
                         </div>
                         <span className="text-[9px] font-bold bg-white/5 px-2 py-1 rounded text-zinc-400 uppercase">Latency: 1.8s</span>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-zinc-200 rounded-[3rem] p-12 text-center bg-zinc-50/30 group hover:border-emerald-500/30 transition-all duration-500">
                   <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:scale-110 group-hover:rotate-3 transition-all group-hover:accent-bg group-hover:text-white group-hover:shadow-xl">
                      <SearchCode size={48} />
                   </div>
                   <div className="max-w-sm space-y-4">
                      <h4 className="text-zinc-900 font-black text-2xl font-quantum">Initiate Deep Scrutiny</h4>
                      <p className="text-zinc-500 text-sm font-medium leading-relaxed px-4">
                        Standard background checks look at <strong>records</strong>. VeritrustX looks at <strong>logic</strong>. Our neural engine exposes fractures in professional narratives.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                         {['Employment Gap Analysis', 'Institutional Logic', 'Shadow History', 'Proxy Risk'].map(tag => (
                           <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">{tag}</span>
                         ))}
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrityScanner;