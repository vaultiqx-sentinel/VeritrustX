
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Loader2, Fingerprint, SearchCode, RefreshCw, Cpu, Terminal, FileCheck, Hash
} from 'lucide-react';
import { performQuantumAudit } from '../services/gemini';
import { VeritrustTheme } from '../types';

export interface IntegrityScannerProps {
  theme?: VeritrustTheme;
  onAuditComplete?: (name: string, role: string, score: number, verdict: string, report: string) => void;
}

const IntegrityScanner: React.FC<IntegrityScannerProps> = ({ theme = 'emerald', onAuditComplete }) => {
  const [profileData, setProfileData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [contentHash, setContentHash] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const isDark = theme === 'onyx';

  // Simulation logs for visual effect
  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setLogs([]);
      const simLogs = [
        "Initializing neural logic shards...",
        "Resolving entity vectors...",
        "Cross-referencing timeline gaps...",
        "Scanning semantic density...",
        "Generating SHA-256 Content Signature...",
        "Finalizing forensic integrity dossier..."
      ];
      let i = 0;
      interval = setInterval(() => {
        if (i < simLogs.length) {
          setLogs(prev => [...prev, simLogs[i]]);
          i++;
        }
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // 🔒 SHA-256 GENERATOR FOR TEXT CONTENT
  const generateTextHash = async (text: string) => {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const handleScan = async () => {
    if (!profileData || profileData.length < 5) return;
    setIsAnalyzing(true);
    setResult(null);
    setContentHash(null);

    // Generate Hash
    const hash = await generateTextHash(profileData);

    try {
      const report = await performQuantumAudit(profileData, "VX-DEMO-KEY");
      setResult(report);
      setContentHash(hash);
      
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
      <div className={`p-10 rounded-[3rem] border relative overflow-hidden shadow-sm ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
           <div className="flex items-center gap-4">
              <div className="p-4 accent-bg rounded-2xl text-white shadow-xl animate-pulse"><Cpu size={28} /></div>
              <div>
                 <h3 className={`text-2xl font-black font-quantum uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>Truth <span className="accent-text">Engine</span></h3>
                 <p className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Neural Forensic Analysis & Timeline Scrutiny</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
           <div className="space-y-6">
              <textarea 
                value={profileData}
                onChange={(e) => setProfileData(e.target.value)}
                placeholder="Paste Candidate CV snippets or LinkedIn Text here for forensic analysis..."
                className={`w-full h-[400px] px-8 py-6 border-2 rounded-[2.5rem] outline-none font-bold text-sm resize-none custom-scrollbar focus:border-indigo-500 transition-colors ${isDark ? 'bg-black border-white/10 text-white placeholder-zinc-600' : 'bg-zinc-50 border-zinc-100 text-zinc-900 placeholder-zinc-400'}`}
              />
              <div className="flex gap-4">
                <button onClick={handleScan} disabled={isAnalyzing || !profileData} className={`flex-1 py-5 font-black rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl hover:scale-[1.02] transition-transform ${isDark ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'}`}>
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : 'EXECUTE NEURAL AUDIT'}
                </button>
                <button onClick={() => {setProfileData(''); setResult(null); setContentHash(null);}} className={`p-5 rounded-2xl ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'}`}><RefreshCw size={20} /></button>
              </div>
           </div>

           <div className="space-y-6">
              {isAnalyzing ? (
                <div className="h-full min-h-[500px] flex flex-col space-y-4 bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 relative overflow-hidden font-mono text-xs">
                   <div className="flex items-center gap-2 text-emerald-500 mb-4">
                      <Terminal size={14} />
                      <span className="uppercase font-black tracking-widest">Neural Kernel Active</span>
                   </div>
                   <div className="space-y-2 relative z-10">
                      {logs.map((log, i) => (
                        <p key={i} className="text-emerald-400/80 animate-in slide-in-from-left-2">&gt; {log}</p>
                      ))}
                      <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse"></span>
                   </div>
                   <Fingerprint className="absolute bottom-10 right-10 text-emerald-500/10" size={120} />
                </div>
              ) : result ? (
                <div className="h-full flex flex-col">
                   <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white overflow-hidden relative border border-white/10 shadow-2xl flex-1 flex flex-col">
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                        {contentHash && (
                            <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                                <div className="flex items-center gap-2 text-indigo-400 text-[9px] font-black uppercase tracking-widest">
                                    <Hash size={12} /> Content Integrity Hash (SHA-256)
                                </div>
                                <p className="font-mono text-[10px] text-zinc-400 break-all leading-relaxed">{contentHash}</p>
                            </div>
                        )}
                        <pre className="text-emerald-400 text-xs leading-relaxed whitespace-pre-wrap font-mono italic p-6 bg-black/50 rounded-2xl border border-white/5">{result}</pre>
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center"><div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Stored in Vault</p></div></div>
                   </div>
                </div>
              ) : (
                <div className={`h-full min-h-[500px] border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-12 text-center ${isDark ? 'border-white/10 bg-white/5' : 'border-zinc-100 bg-zinc-50/50'}`}>
                   <SearchCode size={48} className={isDark ? "text-zinc-600" : "text-zinc-300 mb-6"} />
                   <h4 className={`font-black text-2xl font-quantum uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>Truth Engine Standby</h4>
                   <p className={`text-sm font-medium leading-relaxed px-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Input subject metadata to initiate audit.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrityScanner;
