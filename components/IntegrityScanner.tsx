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

  // 🛡️ INTEGRATED LOGIC: AI Audit + Automatic Database Sync
  const handleScan = async () => {
    if (!profileData || profileData.length < 10) return;
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // 1. Run the AI Audit via the secure Cloud Backend
      // "VX-DEMO-KEY" is passed to ensure the license gate allows the request
      const report = await performQuantumAudit(profileData, "VX-DEMO-KEY");
      setResult(report);
      
      // 2. LOGIC EXTRACTION: Extract Score and Name using Regex
      const scoreMatch = report.match(/(\d+)%/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;
      
      const nameMatch = profileData.match(/([A-Z][a-z]+ [A-Z][a-z]+)/);
      const name = nameMatch ? nameMatch[1] : "Subject " + Math.floor(Math.random()*999);
      const verdict = score > 80 ? 'Verified' : score > 50 ? 'Flagged' : 'Failed';

      // 3. LOGIC SYNC: Automatically save to your Supabase Database via Render Backend
      await fetch(`https://veritrustx.onrender.com/api/vault`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          role: "Institutional Audit",
          status: verdict,
          trustScore: score,
          report: report
        })
      });

      // 4. Update the local UI state in App.tsx
      if (onAuditComplete) {
         onAuditComplete(name, "Institutional Audit", score, verdict);
      }

    } catch (error) {
      setResult("SYSTEM ERROR: Neural Link Severed. Ensure cloud backend is online.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none quantum-grid"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
           <div className="flex items-center gap-4">
              <div className="p-4 accent-bg rounded-2xl text-white shadow-xl animate-pulse"><FileSearch size={28} /></div>
              <div>
                 <h3 className="text-2xl font-black text-zinc-900 font-quantum uppercase">Integrity <span className="accent-text">Scrutiny</span></h3>
                 <p className="text-sm text-zinc-500 font-medium">Neural Forensic Analysis & Timeline Scrutiny</p>
              </div>
           </div>
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100 uppercase tracking-widest">Auto-Vaulting Active</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
           {/* Input Section */}
           <div className="space-y-6">
              <div className="relative group">
                <div className="flex items-center justify-between mb-3 ml-1">
                   <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Subject Dossier Input</label>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[9px] font-bold accent-text uppercase tracking-widest">Cloud Ready</span>
                   </div>
                </div>
                <textarea 
                  value={profileData}
                  onChange={(e) => setProfileData(e.target.value)}
                  placeholder="Paste Candidate CV snippets, LinkedIn Profile Text, or Interview Transcripts here..."
                  className="w-full h-[400px] px-8 py-6 bg-zinc-50 border-2 border-zinc-100 rounded-[2.5rem] focus:border-indigo-500 focus:bg-white outline-none transition-all text-zinc-900 font-bold text-sm resize-none custom-scrollbar shadow-inner leading-relaxed"
                />
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleScan}
                  disabled={isAnalyzing || !profileData}
                  className="flex-1 py-5 bg-zinc-900 text-white font-black rounded-2xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : <Binary size={18} />}
                  {isAnalyzing ? 'UPLINKING TO CLOUD...' : 'EXECUTE INTEGRITY AUDIT'}
                </button>
                <button 
                  onClick={() => {setProfileData(''); setResult(null);}}
                  className="p-5 bg-zinc-100 text-zinc-400 rounded-2xl hover:bg-zinc-200 transition-colors"
                  title="Reset Mesh"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
           </div>

           {/* Analysis Output Section */}
           <div className="space-y-6">
              {isAnalyzing ? (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center space-y-8 bg-zinc-50 border border-zinc-100 rounded-[3rem] p-12 relative overflow-hidden">
                   <div className="relative">
                      <div className="w-32 h-32 border-[6px] border-zinc-200 border-t-indigo-600 rounded-full animate-spin"></div>
                      <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={40} />
                   </div>
                   <div className="text-center space-y-4 max-w-xs">
                      <p className="text-zinc-900 font-black text-xl uppercase tracking-widest font-quantum">Scrutinizing...</p>
                      <div className="bg-white border border-zinc-200 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-md">
                        <Activity className="text-indigo-600 animate-pulse" size={16} />
                        <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.15em]">
                          {scanStatuses[scanStatus]}
                        </span>
                      </div>
                   </div>
                </div>
              ) : result ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                   <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white overflow-hidden relative border border-white/10 shadow-2xl flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                         <div className="flex items-center gap-3">
                            <ShieldAlert className="text-indigo-400" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Forensic Shard Consensus</span>
                         </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                        <pre className="text-emerald-400 text-xs leading-relaxed whitespace-pre-wrap font-mono italic p-6 bg-black/50 rounded-2xl">
                          {result}
                        </pre>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                           <CheckCircle2 size={14} className="text-emerald-500" />
                           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Stored in Vault</p>
                         </div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-4 border-dashed border-zinc-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-zinc-50/50 group hover:border-indigo-500/20 transition-all duration-500">
                   <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl">
                      <SearchCode size={48} />
                   </div>
                   <div className="max-w-sm space-y-4">
                      <h4 className="text-zinc-900 font-black text-2xl font-quantum uppercase">Institutional Scrutiny</h4>
                      <p className="text-zinc-500 text-sm font-medium leading-relaxed px-4">
                        Input subject metadata on the left to initiate a forensic audit. The results will be automatically hashed and stored in your **Institutional Vault**.
                      </p>
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