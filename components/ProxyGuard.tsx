import React, { useState, useRef } from 'react';
import { UserCheck, ShieldAlert, Video, Mic, Eye, Loader2, Binary, CheckCircle2, XCircle, AlertTriangle, Scan, Search, Maximize2, Fingerprint, Volume2, UserMinus } from 'lucide-react';

export interface ProxyGuardProps {
  onFraudDetected?: (name: string, role: string, score: number, verdict: string) => void;
}

const ProxyGuard: React.FC<ProxyGuardProps> = ({ onFraudDetected }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [activeChecks, setActiveChecks] = useState({
    face: 'idle',
    voice: 'idle',
    sync: 'idle'
  });
  
  const handleRunAudit = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setActiveChecks({ face: 'scanning', voice: 'scanning', sync: 'scanning' });

    // Simulate multi-vector biometric analysis
    setTimeout(() => {
      const verdict = `
[VERITRUST FORENSIC VERDICT: PROXY REVEALED]
-------------------------------------------
ALARM: IDENTITY HIJACK DETECTED

1. BIOMETRIC SWITCH: Person in the Round 2 Technical Video (Image_B) does NOT match Round 1 (Image_A). Facial geometry variance: 42%.
2. VENTRILOQUIST FRAUD: Audio source routed through virtual driver. Lip-sync latency is 140ms. Probability of background speaker: 98%.
3. COGNITIVE FORGERY: Candidate's gaze is fixed on teleprompter screen.

CRITICAL: Subject is utilizing a Proxy Expert.
      `;
      setAnalysisResult(verdict);
      setIsAnalyzing(false);
      setActiveChecks({ face: 'fail', voice: 'fail', sync: 'fail' });

      if (onFraudDetected) {
        onFraudDetected("Proxy Subject #902", "External Consultant", 0, verdict);
      }
    }, 4000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="max-w-xl">
           <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-4 font-quantum">
            Proxy <span className="accent-text">Guard</span>
           </h2>
           <p className="text-zinc-500 font-medium leading-relaxed">
             Stopping the "Shadow Expert." VeritrustX ensures the person you interview is the person you hire.
           </p>
        </div>
        <div className="flex gap-4">
           <div className="px-6 py-3 bg-rose-50 border border-rose-100 rounded-xl text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              Biometric Engine: ARMED
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
         <div className="bg-white p-10 rounded-[3rem] border border-zinc-100 space-y-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-transparent"></div>
            
            <div className="aspect-video bg-zinc-900 rounded-[2rem] border border-zinc-200 relative overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10"></div>
               
               <div className="absolute top-8 left-8 z-30 flex gap-2">
                  <div className="px-2 py-1 bg-rose-600 text-[8px] font-black text-white rounded">LIVE FRAME</div>
                  <div className="px-2 py-1 bg-white/10 text-[8px] font-black text-white/50 rounded">FPS: 60</div>
               </div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-rose-500/30 rounded-full z-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 text-[8px] font-black text-rose-500 bg-zinc-900 px-2">FACE TARGET</div>
               </div>
               
               <div className="text-center space-y-4 relative z-20">
                  <div className="p-8 bg-rose-500/10 rounded-full border border-rose-500/20 mx-auto w-fit group-hover:bg-rose-600 transition-all cursor-pointer">
                    <Video className="text-white" size={48} />
                  </div>
                  <p className="text-white/40 font-black text-[10px] uppercase tracking-widest">Connect Forensic Video Link</p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               <StatusMonitor label="Face ID Match" status={activeChecks.face} />
               <StatusMonitor label="Lip-Sync Integrity" status={activeChecks.sync} />
               <StatusMonitor label="VoicePrint DNA" status={activeChecks.voice} />
            </div>

            <button 
               onClick={handleRunAudit}
               disabled={isAnalyzing}
               className="w-full py-5 accent-bg hover:brightness-110 text-white font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               {isAnalyzing ? <Loader2 className="animate-spin" /> : <ShieldAlert size={20} />}
               {isAnalyzing ? 'Detecting Identity Fraud...' : 'Run Impersonation Audit'}
            </button>
         </div>

         <div className="space-y-6">
            {analysisResult ? (
               <div className="bg-zinc-950 border border-rose-500/20 rounded-[3rem] p-10 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <UserMinus className="text-rose-500" size={28} />
                        <h3 className="text-2xl font-black text-white font-quantum">Forensic Verdict</h3>
                     </div>
                     <div className="px-3 py-1 bg-rose-600 text-white text-[10px] font-black rounded uppercase tracking-widest animate-pulse">
                        Identity Stolen
                     </div>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                     <pre className="text-zinc-300 text-xs font-mono leading-relaxed whitespace-pre-wrap">
                        {analysisResult}
                     </pre>
                  </div>
                  <div className="flex gap-4">
                     <button className="flex-1 py-4 bg-white text-zinc-950 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Blacklist Subject</button>
                     <button className="px-8 py-4 bg-white/5 text-zinc-400 font-black rounded-xl text-[10px] uppercase tracking-widest border border-white/10">Export Proof</button>
                  </div>
               </div>
            ) : (
               <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-zinc-50/50">
                  <div className="w-24 h-24 bg-white border border-zinc-100 rounded-full flex items-center justify-center text-zinc-300 mb-6 group hover:accent-bg hover:text-white transition-all shadow-sm">
                     <UserCheck size={48} />
                  </div>
                  <h4 className="text-xl font-black text-zinc-900 font-quantum">Guard Mode Ready</h4>
                  <p className="text-[10px] font-bold text-zinc-500 max-w-xs mt-3 uppercase tracking-[0.2em] leading-relaxed">
                    Analyzing interview video for proxy speakers and biometric switches between interview rounds.
                  </p>
               </div>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <FraudCard 
           icon={<Volume2 className="accent-text" />} 
           title="Vocal Harmonic Scan" 
           desc="Captures the unique 'Voiceprint'. Flags if a different person is doing the technical round vs. the HR round." 
         />
         <FraudCard 
           icon={<Mic className="accent-text" />} 
           title="Lip-Sync Forensic" 
           desc="Analyzes 1/1000th sec latency between lip movement and audio waveform to catch off-camera proxy speakers." 
         />
         <FraudCard 
           icon={<Fingerprint className="accent-text" />} 
           title="Biometric Continuity" 
           desc="Ensures the face that cleared the technical bar is the exact face that showed up in Round 1." 
         />
      </div>
    </div>
  );
};

const StatusMonitor = ({ label, status }: { label: string, status: string }) => {
  const isScanning = status === 'scanning';
  const isFail = status === 'fail';
  return (
    <div className={`p-5 rounded-2xl border transition-all flex flex-col items-center text-center gap-2 ${
      isFail ? 'bg-rose-50 border-rose-100' : 'bg-zinc-50 border-zinc-100'
    }`}>
       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
       <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${
             isFail ? 'bg-rose-500 animate-pulse' : 
             isScanning ? 'bg-amber-500 animate-pulse' : 'bg-zinc-200'
          }`}></div>
          <span className={`text-[9px] font-black uppercase ${
             isFail ? 'text-rose-600' : 
             isScanning ? 'text-amber-600' : 'text-zinc-400'
          }`}>
             {isScanning ? 'Scanning' : isFail ? 'Anomaly' : 'Standby'}
          </span>
       </div>
    </div>
  );
};

const FraudCard = ({ icon, title, desc }: any) => (
  <div className="p-8 bg-white rounded-[3rem] border border-zinc-100 space-y-4 hover:accent-border transition-all group shadow-sm">
     <div className="p-3 bg-zinc-50 rounded-xl w-fit group-hover:accent-bg group-hover:text-white transition-all">{icon}</div>
     <h4 className="text-zinc-900 font-black text-lg">{title}</h4>
     <p className="text-zinc-500 text-sm leading-relaxed font-medium">
        {desc}
     </p>
  </div>
);

export default ProxyGuard;