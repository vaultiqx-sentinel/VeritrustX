import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Loader2, Fingerprint, SearchCode, RefreshCw, Cpu
} from 'lucide-react';
import { performQuantumAudit } from '../services/gemini';

export interface IntegrityScannerProps {
  onAuditComplete?: (name: string, role: string, score: number, verdict: string, report: string) => void;
}

const IntegrityScanner: React.FC<IntegrityScannerProps> = ({ onAuditComplete }) => {
  const [profileData, setProfileData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState(0);

  const scanStatuses = [
    "Initializing neural logic shards...",
    "Hashing identity vectors...",
    "Cross-referencing global registry nodes...",
    "Scanning tenure logic flows...",
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
    if (!profileData || profileData.length < 5) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const report = await performQuantumAudit(profileData, "VX-DEMO-KEY");
      setResult(report);
      
      const scoreMatch = report.match(/(\d+)%/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;
      const verdict = score > 80 ? 'Verified' : 'Flagged';
      
      if (onAuditComplete) {
         onAuditComplete("Subject Audit", "Institutional Audit", score, verdict, report);
      }
    } catch (error) {
      setResult("SYSTEM ERROR: Neural Link Severed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
           <div className="flex items-center gap-4">
              <div className="p-4 accent-bg rounded-2xl text-white shadow-xl animate-pulse"><Cpu size={28} /></div>
              <div>
                 <h3 className="text-2xl font-black text-zinc-900 font-quantum uppercase">Truth <span className="accent-text">Engine</span></h3>
                 <p className="text-sm text-zinc-500 font-medium">Neural Forensic Analysis & Timeline Scrutiny</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
           <div className="space-y-6">
              <textarea 
                value={profileData}
                onChange={(e) => setProfileData(e.target.value)}
                placeholder="Paste Candidate CV snippets or LinkedIn Text here..."
                className="w-full h-[400px] px-8 py-6 bg-zinc-50 border-2 border-zinc-100 rounded-[2.5rem] outline-none text-zinc-900 font-bold text-sm resize-none custom-scrollbar"
              />
              <div className="flex gap-4">
                <button onClick={handleScan} disabled={isAnalyzing || !profileData} className="flex-1 py-5 bg-zinc-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl">
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : 'EXECUTE NEURAL AUDIT'}
                </button>
                <button onClick={() => {setProfileData(''); setResult(null);}} className="p-5 bg-zinc-100 text-zinc-400 rounded-2xl hover:bg-zinc-200"><RefreshCw size={20} /></button>
              </div>
           </div>

           <div className="space-y-6">
              {isAnalyzing ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-8 bg-zinc-50 border border-zinc-100 rounded-[3rem] p-12 relative">
                   <div className="relative"><div className="w-32 h-32 border-[6px] border-zinc-200 border-t-indigo-600 rounded-full animate-spin"></div><Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={40} /></div>
                   <p className="text-zinc-900 font-black text-xl uppercase tracking-widest font-quantum">{scanStatuses[scanStatus]}</p>
                </div>
              ) : result ? (
                <div className="h-full flex flex-col">
                   <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white overflow-hidden relative border border-white/10 shadow-2xl flex-1 flex flex-col">
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4"><pre className="text-emerald-400 text-xs leading-relaxed whitespace-pre-wrap font-mono italic p-6 bg-black/50 rounded-2xl">{result}</pre></div>
                      <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center"><div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Stored in Vault</p></div></div>
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-4 border-dashed border-zinc-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-zinc-50/50">
                   <SearchCode size={48} className="text-zinc-300 mb-6" />
                   <h4 className="text-zinc-900 font-black text-2xl font-quantum uppercase">Truth Engine Standby</h4>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed px-4">Input subject metadata to initiate audit.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrityScanner;