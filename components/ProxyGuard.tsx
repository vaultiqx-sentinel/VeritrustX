import React, { useState, useRef, useEffect } from 'react';
import { 
  UserCheck, ShieldAlert, Video, Mic, Eye, Loader2, Binary, 
  CheckCircle2, XCircle, AlertTriangle, Scan, Search, Maximize2, 
  Fingerprint, Volume2, UserMinus, Link2, Camera, X, Globe
} from 'lucide-react';

export interface ProxyGuardProps {
  onFraudDetected?: (name: string, role: string, score: number, verdict: string) => void;
}

const ProxyGuard: React.FC<ProxyGuardProps> = ({ onFraudDetected }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeChecks, setActiveChecks] = useState({
    face: 'idle',
    voice: 'idle',
    sync: 'idle'
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 📷 ACTIVATE LOCAL SENSORS (For Demo Purposes)
  const startLocalCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setActiveChecks({ face: 'scanning', voice: 'scanning', sync: 'scanning' });
      }
    } catch (err) {
      alert("Forensic Access Denied: Please enable camera permissions.");
    }
  };

  const stopCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
      setActiveChecks({ face: 'idle', voice: 'idle', sync: 'idle' });
    }
  };

  const handleRunAudit = async () => {
    if (!isCameraActive) {
        alert("Please initiate Forensic Video Link first.");
        return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate multi-vector biometric analysis reasoning
    setTimeout(() => {
      const verdict = `
[VERITRUST FORENSIC VERDICT: IDENTITY FRACTURE DETECTED]
-------------------------------------------------------
ALARM: UNAUTHORIZED PROXY DETECTED

1. BIOMETRIC MISMATCH: Facial geometry variance exceeds 40% 
   threshold compared to Stage 1 Grounding.
2. SYNCHRONIZATION ANOMALY: Lip-sync latency detected at 145ms. 
   High probability of external audio routing.
3. COGNITIVE SHADOW: Gaze tracking identifies secondary screen 
   usage (Teleprompter Protocol detected).

VERDICT: SUBJECT IS UTILIZING A PROXY EXPERT.
      `;
      setAnalysisResult(verdict);
      setIsAnalyzing(false);
      setActiveChecks({ face: 'fail', voice: 'fail', sync: 'fail' });

      if (onFraudDetected) {
        onFraudDetected("Subject ID #9021", "Technical Lead Candidate", 12, verdict);
      }
    }, 4000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-zinc-100 pb-8">
        <div className="max-w-xl">
           <h2 className="text-5xl font-black text-zinc-900 tracking-tighter mb-4 font-quantum">
            Proxy <span className="accent-text">Guard</span>
           </h2>
           <p className="text-zinc-500 font-medium leading-relaxed italic">
             "Ensuring the person you interview is the person you hire via real-time Biometric Continuity."
           </p>
        </div>
        <div className="flex flex-col gap-3">
           <div className="px-6 py-3 bg-rose-50 border border-rose-100 rounded-xl text-[10px] font-black uppercase text-rose-600 tracking-widest flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              Biometric Sentinel: ARMED
           </div>
           <p className="text-[9px] font-bold text-center text-zinc-400 uppercase tracking-widest">Node ID: VX-SENTINEL-01</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
         <div className="bg-white p-10 rounded-[3.5rem] border-2 border-zinc-100 space-y-8 relative overflow-hidden shadow-sm">
            
            {/* 🔗 UPLINK CONFIGURATION */}
            <div className="space-y-4">
               <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Secure Meeting Uplink (Zoom / Meet / Teams)</label>
               <div className="flex gap-3">
                  <div className="relative flex-1">
                     <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                     <input 
                        type="text" 
                        value={meetingUrl}
                        onChange={(e) => setMeetingUrl(e.target.value)}
                        placeholder="https://meet.google.com/abc-defg-hij"
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-indigo-500 font-medium text-sm transition-all"
                     />
                  </div>
                  {!isCameraActive ? (
                      <button onClick={startLocalCapture} className="px-6 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-zinc-900 transition-all shadow-lg">Connect Link</button>
                  ) : (
                      <button onClick={stopCapture} className="px-6 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-rose-600 transition-all shadow-lg"><X size={18} /></button>
                  )}
               </div>
            </div>

            {/* 🎥 FORENSIC VIDEO FRAME */}
            <div className="aspect-video bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 relative overflow-hidden flex items-center justify-center group shadow-inner">
               {isCameraActive ? (
                  <>
                     <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-80" />
                     {/* 🛡️ NEURAL OVERLAY */}
                     <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="w-full h-full border-[1px] border-emerald-500/20 grid grid-cols-6 grid-rows-6 opacity-30">
                           {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-emerald-500/10"></div>)}
                        </div>
                        {/* Scanning Box */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-emerald-500 rounded-full animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded">BIOMETRIC_LOCK</div>
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="text-center space-y-4">
                     <div className="p-8 bg-white/5 rounded-full border-2 border-dashed border-white/10 mx-auto w-fit">
                        <Video className="text-white/20" size={48} />
                     </div>
                     <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.3em]">Awaiting Forensic Handshake</p>
                  </div>
               )}
            </div>

            <div className="grid grid-cols-3 gap-4">
               <StatusMonitor label="Facial Sync" status={activeChecks.face} />
               <StatusMonitor label="Lip-Latency" status={activeChecks.sync} />
               <StatusMonitor label="Vocal DNA" status={activeChecks.voice} />
            </div>

            <button 
               onClick={handleRunAudit}
               disabled={isAnalyzing || !isCameraActive}
               className="w-full py-6 bg-zinc-900 text-white font-black rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-30"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
               {isAnalyzing ? <Loader2 className="animate-spin" /> : <ShieldAlert size={20} className="text-rose-500" />}
               {isAnalyzing ? 'SCANNIG NEURAL HARMONICS...' : 'EXECUTE IMPERSONATION AUDIT'}
            </button>
         </div>

         {/* ⚖️ VERDICT OUTPUT */}
         <div className="space-y-6">
            {analysisResult ? (
               <div className="bg-zinc-950 border-4 border-rose-500/20 rounded-[3.5rem] p-12 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><UserMinus size={120} className="text-rose-500" /></div>
                  <div className="flex items-center justify-between relative z-10">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-900/40"><ShieldAlert size={24} /></div>
                        <h3 className="text-3xl font-black text-white font-quantum uppercase">Forensic Verdict</h3>
                     </div>
                     <span className="px-4 py-1.5 bg-rose-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">Identity Hijack</span>
                  </div>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] relative z-10 shadow-inner">
                     <pre className="text-zinc-300 text-xs font-mono leading-relaxed whitespace-pre-wrap italic">
                        {analysisResult}
                     </pre>
                  </div>
                  <div className="flex gap-4 relative z-10 pt-4">
                     <button onClick={() => alert("Identity Blacklisted globally across VeritrustX nodes.")} className="flex-1 py-5 bg-white text-zinc-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-xl">Blacklist Identity</button>
                     <button className="px-8 py-5 bg-white/5 text-zinc-500 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-white/10">Export Proof</button>
                  </div>
               </div>
            ) : (
               <div className="h-full min-h-[500px] border-4 border-dashed border-zinc-100 rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center bg-zinc-50 group hover:border-emerald-500/20 transition-all">
                  <div className="w-24 h-24 bg-white border-2 border-zinc-100 rounded-[2rem] flex items-center justify-center text-zinc-200 mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                     <Fingerprint size={48} />
                  </div>
                  <h4 className="text-2xl font-black text-zinc-900 font-quantum uppercase">Sentinel Standby</h4>
                  <p className="text-sm font-bold text-zinc-400 max-w-xs mt-4 uppercase tracking-[0.2em] leading-relaxed italic">
                    Uplink the meeting URL and activate capture to begin the biometric scrutinization process.
                  </p>
               </div>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <FraudCard 
           icon={<Volume2 className="text-indigo-500" />} 
           title="Vocal DNA Scan" 
           desc="Hashes the unique vocal harmonics. Detects if a proxy speaker is taking over the technical rounds." 
         />
         <FraudCard 
           icon={<Mic className="text-emerald-500" />} 
           title="Lip-Sync Integrity" 
           desc="Monitors pixel-audio latency. Flags 100ms+ delays common in off-camera coaching scenarios." 
         />
         <FraudCard 
           icon={<Globe className="text-amber-500" />} 
           title="Grounded Continuity" 
           desc="Ensures the biometric profile that passed the bar is the exact same identity that signs the offer." 
         />
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatusMonitor = ({ label, status }: { label: string, status: string }) => {
  const isScanning = status === 'scanning';
  const isFail = status === 'fail';
  return (
    <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-3 ${
      isFail ? 'bg-rose-50 border-rose-200 shadow-md' : 'bg-zinc-50 border-zinc-100 shadow-sm'
    }`}>
       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none">{label}</p>
       <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
             isFail ? 'bg-rose-500 animate-pulse' : 
             isScanning ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'
          }`}></div>
          <span className={`text-[9px] font-black uppercase ${
             isFail ? 'text-rose-600' : 
             isScanning ? 'text-emerald-600' : 'text-zinc-400'
          }`}>
             {isScanning ? 'Tracking' : isFail ? 'Anomaly' : 'Standby'}
          </span>
       </div>
    </div>
  );
};

const FraudCard = ({ icon, title, desc }: any) => (
  <div className="p-10 bg-white rounded-[3.5rem] border-2 border-zinc-100 space-y-6 hover:border-indigo-500 hover:shadow-2xl transition-all group">
     <div className="p-4 bg-zinc-50 rounded-2xl w-fit group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-sm">{icon}</div>
     <h4 className="text-zinc-900 font-black text-xl uppercase tracking-tight">{title}</h4>
     <p className="text-zinc-500 text-sm leading-relaxed font-medium">
        {desc}
     </p>
  </div>
);

export default ProxyGuard;