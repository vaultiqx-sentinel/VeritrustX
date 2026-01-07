import React, { useState, useRef, useEffect } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
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
  
  // AI REAL-TIME STATES
  const [gazeDirection, setGazeDirection] = useState<'CENTER' | 'LEFT' | 'RIGHT'>('CENTER');
  const [isCheatingDetected, setIsCheatingDetected] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  
  const [activeChecks, setActiveChecks] = useState({
    face: 'idle',
    voice: 'idle',
    sync: 'idle'
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 🧠 THE AI BRAIN (Real-time Gaze Tracking)
  useEffect(() => {
    let camera: cam.Camera | null = null;
    let faceMesh: FaceMesh | null = null;

    if (isCameraActive && videoRef.current) {
      faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results) => {
        if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
          setFaceDetected(false);
          return;
        }

        setFaceDetected(true);
        const landmarks = results.multiFaceLandmarks[0];
        
        // Iris landmark 468 (Center of the eye)
        const irisX = landmarks[468].x;

        // Thresholds: AI/Shadow Cheating detection
        if (irisX < 0.44) {
          setGazeDirection('RIGHT');
          setIsCheatingDetected(true);
        } else if (irisX > 0.56) {
          setGazeDirection('LEFT');
          setIsCheatingDetected(true);
        } else {
          setGazeDirection('CENTER');
          setIsCheatingDetected(false);
        }
      });

      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && faceMesh) {
            await faceMesh.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480,
      });
      
      camera.start();
    }

    return () => {
      if (camera) camera.stop();
      if (faceMesh) faceMesh.close();
    };
  }, [isCameraActive]);

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
      setFaceDetected(false);
      setActiveChecks({ face: 'idle', voice: 'idle', sync: 'idle' });
    }
  };

  // 🚀 INTEGRATED BACKEND AUDIT (Supabase + server.js)
  const handleRunAudit = async () => {
    if (!isCameraActive) {
        alert("Please initiate Forensic Video Link first.");
        return;
    }
    setIsAnalyzing(true);

    try {
      // Calling your real backend at port 5000
      const response = await fetch('http://localhost:5000/api/proxy-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            candidateId: "9021",
            name: "Ishita Demo Candidate", 
            role: "Senior Engineering Lead",
            isCheatingDetected, 
            gazeDirection 
        })
      });
      
      const data = await response.json();

      setAnalysisResult(`
[VERITRUST FORENSIC VERDICT: ${data.status}]
-------------------------------------------------------
ALARM: ${data.verdict}

TRUST SCORE: ${data.score}%
DETAILS: ${data.details}

RECOMMENDATION: ${data.recommendation}
      `);
      
      setIsAnalyzing(false);
      setActiveChecks({ 
          face: data.status === 'TERMINATED' ? 'fail' : 'scanning', 
          voice: 'scanning', 
          sync: 'scanning' 
      });

      if (data.status === 'TERMINATED' && onFraudDetected) {
        onFraudDetected("Ishita Demo", "Eng Lead", data.score, data.verdict);
      }

    } catch (error) {
      console.error("Backend connection failed. Check if server.js is running.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header with Sentinel Status */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-zinc-100 pb-8">
        <div className="max-w-xl">
           <h2 className="text-5xl font-black text-zinc-900 tracking-tighter mb-4">
            Proxy <span className="text-indigo-600">Guard</span>
           </h2>
           <p className="text-zinc-500 font-medium leading-relaxed italic">
             "Real-time Biometric Scrutinization & Neural Identity Grounding."
           </p>
        </div>
        <div className="flex flex-col gap-3">
           <div className={`px-6 py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm transition-colors ${faceDetected ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${faceDetected ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              {faceDetected ? 'Biometric Sentinel: LOCKED' : 'Biometric Sentinel: AWAITING FACE'}
           </div>
           <p className="text-[9px] font-bold text-center text-zinc-400 uppercase tracking-widest">Node ID: VX-SENTINEL-01</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
         <div className="bg-white p-10 rounded-[3.5rem] border-2 border-zinc-100 space-y-8 relative overflow-hidden shadow-sm">
            
            {/* Uplink Configuration */}
            <div className="space-y-4">
               <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Secure Meeting Uplink</label>
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
                      <button onClick={stopCapture} className="px-6 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg"><X size={18} /></button>
                  )}
               </div>
            </div>

            {/* Video Frame with AI Neural Overlay */}
            <div className="aspect-video bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 relative overflow-hidden flex items-center justify-center group shadow-inner">
               {isCameraActive ? (
                  <>
                     <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-80" />
                     <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="w-full h-full border-[1px] border-emerald-500/20 grid grid-cols-6 grid-rows-6 opacity-30">
                           {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-emerald-500/10"></div>)}
                        </div>
                        {/* Dynamic Eye Tracker Box */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 rounded-full animate-pulse transition-all duration-300 ${isCheatingDetected ? 'border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6)]' : 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'}`}>
                           <div className={`absolute top-0 left-1/2 -translate-x-1/2 -mt-6 text-white text-[8px] font-black px-2 py-0.5 rounded ${isCheatingDetected ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                             {isCheatingDetected ? `GAZE_ANOMALY: ${gazeDirection}` : 'BIOMETRIC_LOCK'}
                           </div>
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="text-center space-y-4">
                     <Video className="text-white/20 mx-auto" size={48} />
                     <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.3em]">Awaiting Forensic Handshake</p>
                  </div>
               )}
            </div>

            <div className="grid grid-cols-3 gap-4">
               <StatusMonitor label="Facial Sync" status={faceDetected ? 'scanning' : 'idle'} />
               <StatusMonitor label="Iris Tracker" status={isCheatingDetected ? 'fail' : faceDetected ? 'scanning' : 'idle'} />
               <StatusMonitor label="Neural DNA" status={faceDetected ? 'scanning' : 'idle'} />
            </div>

            <button 
               onClick={handleRunAudit}
               disabled={isAnalyzing || !isCameraActive}
               className="w-full py-6 bg-zinc-900 text-white font-black rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-30"
            >
               {isAnalyzing ? <Loader2 className="animate-spin" /> : <ShieldAlert size={20} className="text-rose-500" />}
               {isAnalyzing ? 'UPLINKING TO NEURAL MESH...' : 'EXECUTE FORENSIC AUDIT'}
            </button>
         </div>

         {/* Verdict Output Area */}
         <div className="space-y-6">
            {analysisResult ? (
               <div className={`bg-zinc-950 border-4 rounded-[3.5rem] p-12 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl relative overflow-hidden ${analysisResult.includes('TERMINATED') ? 'border-rose-500/20' : 'border-emerald-500/20'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 text-white rounded-2xl shadow-lg ${analysisResult.includes('TERMINATED') ? 'bg-rose-600' : 'bg-emerald-600'}`}><ShieldAlert size={24} /></div>
                    <h3 className="text-3xl font-black text-white font-quantum uppercase">Forensic Result</h3>
                  </div>
                  <pre className="text-zinc-300 text-xs font-mono leading-relaxed whitespace-pre-wrap italic p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    {analysisResult}
                  </pre>
                  <div className="flex gap-4">
                     <button onClick={() => alert("Identity added to Global Blacklist.")} className="flex-1 py-4 bg-white text-zinc-900 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Blacklist ID</button>
                     <button className="px-6 py-4 bg-white/5 text-zinc-500 font-black rounded-xl text-[10px] border border-white/10 uppercase">Export PDF</button>
                  </div>
               </div>
            ) : (
               <div className="h-full min-h-[500px] border-4 border-dashed border-zinc-100 rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center bg-zinc-50">
                  <Fingerprint size={48} className="text-zinc-200 mb-8" />
                  <h4 className="text-2xl font-black text-zinc-900 uppercase">Sentinel Standby</h4>
                  <p className="text-sm font-bold text-zinc-400 mt-4 uppercase tracking-[0.2em] italic">Connect the meeting uplink to begin scrutinization.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- Sub-component for Status Monitoring ---
const StatusMonitor = ({ label, status }: { label: string, status: string }) => {
  const isScanning = status === 'scanning';
  const isFail = status === 'fail';
  return (
    <div className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-3 ${
      isFail ? 'bg-rose-50 border-rose-200 shadow-md' : isScanning ? 'bg-emerald-50 border-emerald-100 shadow-sm' : 'bg-zinc-50 border-zinc-100'
    }`}>
       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
       <div className={`w-2 h-2 rounded-full ${
          isFail ? 'bg-rose-500 animate-pulse' : isScanning ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'
       }`}></div>
       <span className={`text-[9px] font-black uppercase ${
          isFail ? 'text-rose-600' : isScanning ? 'text-emerald-600' : 'text-zinc-400'
       }`}>
          {isScanning ? 'LOCKED' : isFail ? 'ANOMALY' : 'IDLE'}
       </span>
    </div>
  );
};

export default ProxyGuard;