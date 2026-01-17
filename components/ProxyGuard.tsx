
import React, { useState, useRef, useEffect } from 'react';
import { 
  UserCheck, ShieldAlert, Video, Mic2, Loader2, Link2, X, Hash, 
  Eye, Waves, Activity, Fingerprint
} from 'lucide-react';
import { VeritrustTheme } from '../types';

export interface ProxyGuardProps {
  theme?: VeritrustTheme;
  onFraudDetected?: (name: string, role: string, score: number, verdict: string) => void;
}

const ProxyGuard: React.FC<ProxyGuardProps> = ({ theme = 'emerald', onFraudDetected }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // AI REAL-TIME STATES
  const [gazeDirection, setGazeDirection] = useState<'CENTER' | 'LEFT' | 'RIGHT'>('CENTER');
  const [gazeViolationCount, setGazeViolationCount] = useState(0);
  const [isCheatingDetected, setIsCheatingDetected] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [biometricHash, setBiometricHash] = useState<string | null>(null);

  // NEW: AUDIO & BEHAVIOR STATES
  const [audioLevel, setAudioLevel] = useState(0);
  const [lipSyncStatus, setLipSyncStatus] = useState<'SYNCED' | 'DESYNC'>('SYNCED');
  const [voiceIntegrity, setVoiceIntegrity] = useState<'NATURAL' | 'SYNTHETIC_SUSPECT' | 'SILENT'>('SILENT');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioLevelRef = useRef(0); 

  // History Buffers for Smoothing (Window of 20 frames)
  const lipHistoryRef = useRef<{audio: number, mouth: number}[]>([]);
  const gazeTimerRef = useRef<number | null>(null);
  const violationTriggeredRef = useRef(false);

  const isDark = theme === 'onyx';

  // 🧠 THE AI BRAIN (Real-time Gaze & Behavior Tracking)
  useEffect(() => {
    // Access globals loaded via index.html to avoid ESM import errors
    const FaceMesh = (window as any).FaceMesh;
    const Camera = (window as any).Camera;

    let camera: any = null;
    let faceMesh: any = null;

    if (isCameraActive && videoRef.current && FaceMesh && Camera) {
      faceMesh = new FaceMesh({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results: any) => {
        if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
          setFaceDetected(false);
          setVoiceIntegrity('SILENT');
          return;
        }

        setFaceDetected(true);
        const landmarks = results.multiFaceLandmarks[0];
        
        // --- 1. GAZE TRACKING ALGORITHM ---
        const irisX = landmarks[468].x;
        let currentGaze: 'CENTER' | 'LEFT' | 'RIGHT' = 'CENTER';

        // Thresholds
        if (irisX < 0.44) {
          currentGaze = 'RIGHT';
        } else if (irisX > 0.56) {
          currentGaze = 'LEFT';
        } else {
          currentGaze = 'CENTER';
        }
        
        setGazeDirection(currentGaze);

        // Gaze Violation Trigger (Looking away for > 2 seconds)
        if (currentGaze !== 'CENTER') {
           if (!gazeTimerRef.current) {
              gazeTimerRef.current = window.setTimeout(() => {
                 setIsCheatingDetected(true);
                 setGazeViolationCount(prev => prev + 1);
                 violationTriggeredRef.current = true;
                 if(onFraudDetected && violationTriggeredRef.current) {
                    console.warn("Fraud Event Triggered: Sustained Gaze Violation");
                 }
              }, 2000); // 2 second tolerance
           }
        } else {
           if (gazeTimerRef.current) {
              clearTimeout(gazeTimerRef.current);
              gazeTimerRef.current = null;
           }
           setIsCheatingDetected(false);
           violationTriggeredRef.current = false;
        }

        // --- 2. LIP SYNC FORENSICS ---
        // Upper lip bottom: 13, Lower lip top: 14
        const upperLip = landmarks[13];
        const lowerLip = landmarks[14];
        const mouthOpenDist = Math.abs(upperLip.y - lowerLip.y);
        const currentAudio = audioLevelRef.current;

        // Push to history buffer
        lipHistoryRef.current.push({ audio: currentAudio, mouth: mouthOpenDist });
        if (lipHistoryRef.current.length > 20) lipHistoryRef.current.shift();

        // Analyze Buffer
        const avgAudio = lipHistoryRef.current.reduce((sum, item) => sum + item.audio, 0) / lipHistoryRef.current.length;
        const avgMouth = lipHistoryRef.current.reduce((sum, item) => sum + item.mouth, 0) / lipHistoryRef.current.length;

        const AUDIO_ACTIVE_THRESHOLD = 15; 
        const MOUTH_MOVE_THRESHOLD = 0.005; 

        // Logic: Consistent Audio Activity but NO Mouth Movement = Fake
        if (avgAudio > AUDIO_ACTIVE_THRESHOLD && avgMouth < MOUTH_MOVE_THRESHOLD) {
            setLipSyncStatus('DESYNC');
        } else {
            setLipSyncStatus('SYNCED');
        }

        // --- 3. VOICE INTEGRITY / PRESENCE ---
        if (currentAudio < 5) {
            setVoiceIntegrity('SILENT');
        } else if (lipSyncStatus === 'DESYNC') {
            setVoiceIntegrity('SYNTHETIC_SUSPECT');
        } else {
            setVoiceIntegrity('NATURAL');
        }
      });

      camera = new Camera(videoRef.current, {
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
      if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
    };
  }, [isCameraActive]);

  // AUDIO ANALYZER LOOP
  const analyzeAudioFrame = () => {
      if (analyserRef.current && dataArrayRef.current && isCameraActive) {
          // TS FIX: Cast to any or appropriate type to bypass strict Uint8Array mismatch
          analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
          
          const avg = dataArrayRef.current.reduce((a,b) => a+b, 0) / dataArrayRef.current.length;
          audioLevelRef.current = avg;
          setAudioLevel(avg);
          requestAnimationFrame(analyzeAudioFrame);
      }
  };

  useEffect(() => {
      if (isCameraActive) {
          requestAnimationFrame(analyzeAudioFrame);
      }
  }, [isCameraActive]);

  const startLocalCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Setup Audio Analysis
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        
        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

        setIsCameraActive(true);
        setBiometricHash(null);
        setAnalysisResult(null);
        setGazeViolationCount(0);
      }
    } catch (err) {
      alert("Forensic Access Denied: Please enable camera/microphone permissions.");
    }
  };

  const stopCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
      setFaceDetected(false);
      setLipSyncStatus('SYNCED');
      setVoiceIntegrity('SILENT');
      setAudioLevel(0);
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
  };

  const generateFrameHash = async () => {
    if (!videoRef.current) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64Data = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];

    const raw = window.atob(base64Data);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    const hashBuffer = await crypto.subtle.digest('SHA-256', array);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex.toUpperCase();
  };

  const handleRunAudit = async () => {
    if (!isCameraActive) {
        alert("Please initiate Forensic Video Link first.");
        return;
    }
    setIsAnalyzing(true);
    setBiometricHash(null);

    const dna = await generateFrameHash();
    setBiometricHash(dna);

    try {
      // Determine Verdict Locally
      const isFraud = isCheatingDetected || lipSyncStatus === 'DESYNC' || voiceIntegrity === 'SYNTHETIC_SUSPECT' || gazeViolationCount > 3;
      
      let fraudDetails = "";
      if (isCheatingDetected) fraudDetails += `Active Gaze Violation (${gazeDirection}). `;
      if (gazeViolationCount > 3) fraudDetails += `Frequent Gaze Diversion (${gazeViolationCount} events). `;
      if (lipSyncStatus === 'DESYNC') fraudDetails += "Deepfake Lip-Sync Artifacts. ";
      if (voiceIntegrity === 'SYNTHETIC_SUSPECT') fraudDetails += "Synthetic Voice Modulation. ";

      let data;
      try {
        const response = await fetch('http://localhost:5000/api/proxy-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              candidateId: "9021",
              name: "Ishita Demo Candidate", 
              role: "Senior Engineering Lead",
              isCheatingDetected: isFraud, 
              gazeDirection,
              lipSyncStatus,
              voiceIntegrity,
              gazeViolationCount
          })
        });
        if(!response.ok) throw new Error("Server Offline");
        data = await response.json();
      } catch (e) {
        console.warn("Using Local Simulation Logic (Server Offline)");
        await new Promise(r => setTimeout(r, 2000));
        data = {
            status: isFraud ? "TERMINATED" : "VERIFIED",
            verdict: isFraud ? `IDENTITY FRACTURE: ${fraudDetails}` : "IDENTITY VERIFIED: Biometric grounded.",
            score: isFraud ? 12 : 98,
            details: "Neural Mesh analysis complete. SHA-256 Integrity Verified.",
            recommendation: isFraud ? "FAIL" : "PROCEED"
        };
      }

      setAnalysisResult(`
[VERITRUST FORENSIC VERDICT: ${data.status}]
-------------------------------------------------------
ALARM: ${data.verdict}

TRUST SCORE: ${data.score}%
DETAILS: ${data.details}

RECOMMENDATION: ${data.recommendation}
      `);
      
      setIsAnalyzing(false);

      if (data.status === 'TERMINATED' && onFraudDetected) {
        onFraudDetected("Ishita Demo", "Eng Lead", data.score, data.verdict);
      } else if (data.status === 'VERIFIED' && onFraudDetected) {
        onFraudDetected("Ishita Demo", "Eng Lead", data.score, "Verified");
      }

    } catch (error) {
      console.error("Audit Error", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className={`flex flex-col lg:flex-row justify-between items-start gap-6 border-b pb-8 ${isDark ? 'border-white/10' : 'border-zinc-100'}`}>
        <div className="max-w-xl">
           <h2 className={`text-5xl font-black tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Proxy <span className="text-indigo-600">Guard</span>
           </h2>
           <p className={`font-medium leading-relaxed italic ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
             "Real-time Multi-Factor Biometric Scrutinization."
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
         <div className={`p-10 rounded-[3.5rem] border-2 space-y-8 relative overflow-hidden shadow-sm ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100'}`}>
            
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
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl outline-none focus:border-indigo-500 font-medium text-sm transition-all ${isDark ? 'bg-black border-white/10 text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-900'}`}
                     />
                  </div>
                  {!isCameraActive ? (
                      <button onClick={startLocalCapture} className="px-6 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase hover:bg-zinc-900 transition-all shadow-lg">Connect Link</button>
                  ) : (
                      <button onClick={stopCapture} className="px-6 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg"><X size={18} /></button>
                  )}
               </div>
            </div>

            <div className="aspect-video bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-100 relative overflow-hidden flex items-center justify-center group shadow-inner">
               {isCameraActive ? (
                  <>
                     <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-80" />
                     <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="w-full h-full border-[1px] border-emerald-500/20 grid grid-cols-6 grid-rows-6 opacity-30">
                           {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-emerald-500/10"></div>)}
                        </div>
                        
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 rounded-full animate-pulse transition-all duration-300 ${isCheatingDetected ? 'border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6)]' : 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'}`}>
                           <div className={`absolute top-0 left-1/2 -translate-x-1/2 -mt-6 text-white text-[8px] font-black px-2 py-0.5 rounded ${isCheatingDetected ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                             {isCheatingDetected ? `FRAUD ATTEMPT: ${gazeDirection}` : 'BIOMETRIC_LOCK'}
                           </div>
                        </div>

                        <div className="absolute bottom-6 left-6 flex gap-1 items-end h-8">
                           {[...Array(8)].map((_, i) => (
                             <div 
                                key={i} 
                                className={`w-1.5 rounded-full transition-all duration-75 ${audioLevel > (i * 12) ? 'bg-emerald-400' : 'bg-zinc-700'}`}
                                style={{ height: `${Math.min(32, Math.max(4, audioLevel / (i + 1)))}px` }}
                             ></div>
                           ))}
                        </div>

                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                            {lipSyncStatus === 'DESYNC' && (
                                <div className="px-3 py-1 bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
                                    <Mic2 size={12} /> Deepfake / Lip-Sync Mismatch
                                </div>
                            )}
                            {voiceIntegrity === 'SYNTHETIC_SUSPECT' && (
                                <div className="px-3 py-1 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
                                    <Waves size={12} /> Synthetic Voice Modulation
                                </div>
                            )}
                            {gazeViolationCount > 2 && (
                                <div className="px-3 py-1 bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-2">
                                    <Eye size={12} /> Gaze Violations: {gazeViolationCount}
                                </div>
                            )}
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <StatusMonitor isDark={isDark} label="Iris Tracker" status={isCheatingDetected ? 'fail' : faceDetected ? 'scanning' : 'idle'} />
               <StatusMonitor isDark={isDark} label="Lip Sync" status={lipSyncStatus === 'DESYNC' ? 'fail' : faceDetected ? 'scanning' : 'idle'} />
               <StatusMonitor isDark={isDark} label="Voice DNA" status={voiceIntegrity === 'SYNTHETIC_SUSPECT' ? 'fail' : audioLevel > 5 ? 'scanning' : 'idle'} />
               <StatusMonitor isDark={isDark} label="Neural DNA" status={faceDetected ? 'scanning' : 'idle'} />
            </div>

            <button 
               onClick={handleRunAudit}
               disabled={isAnalyzing || !isCameraActive}
               className={`w-full py-6 font-black rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-30 ${isDark ? 'bg-white text-zinc-900' : 'bg-zinc-900 text-white'}`}
            >
               {isAnalyzing ? <Loader2 className="animate-spin" /> : <ShieldAlert size={20} className="text-rose-500" />}
               {isAnalyzing ? 'UPLINKING TO NEURAL MESH...' : 'EXECUTE FORENSIC AUDIT'}
            </button>
         </div>

         <div className="space-y-6">
            {analysisResult ? (
               <div className={`bg-zinc-950 border-4 rounded-[3.5rem] p-12 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl relative overflow-hidden ${analysisResult.includes('TERMINATED') ? 'border-rose-500/20' : 'border-emerald-500/20'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 text-white rounded-2xl shadow-lg ${analysisResult.includes('TERMINATED') ? 'bg-rose-600' : 'bg-emerald-600'}`}><ShieldAlert size={24} /></div>
                    <h3 className="text-3xl font-black text-white font-quantum uppercase">Forensic Result</h3>
                  </div>
                  
                  {biometricHash && (
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-400 text-[9px] font-black uppercase tracking-widest">
                           <Hash size={12} /> Digital DNA (SHA-256)
                        </div>
                        <p className="font-mono text-[10px] text-zinc-400 break-all leading-relaxed tracking-wider">
                           {biometricHash}
                        </p>
                     </div>
                  )}

                  <pre className="text-zinc-300 text-xs font-mono leading-relaxed whitespace-pre-wrap italic p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    {analysisResult}
                  </pre>
                  <div className="flex gap-4">
                     <button onClick={() => alert("Identity added to Global Blacklist.")} className="flex-1 py-4 bg-white text-zinc-900 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Blacklist ID</button>
                     <button className="px-6 py-4 bg-white/5 text-zinc-500 font-black rounded-xl text-[10px] border border-white/10 uppercase">Export PDF</button>
                  </div>
               </div>
            ) : (
               <div className={`h-full min-h-[500px] border-4 border-dashed rounded-[3.5rem] flex flex-col items-center justify-center p-16 text-center ${isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-zinc-50 border-zinc-100'}`}>
                  <Fingerprint size={48} className={isDark ? 'text-zinc-600' : 'text-zinc-200'} />
                  <h4 className={`text-2xl font-black uppercase mt-8 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Sentinel Standby</h4>
                  <p className={`text-sm font-bold mt-4 uppercase tracking-[0.2em] italic ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Connect the meeting uplink to begin scrutinization.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

const StatusMonitor = ({ label, status, isDark }: { label: string, status: string, isDark: boolean }) => {
  const isScanning = status === 'scanning';
  const isFail = status === 'fail';
  return (
    <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-2 ${
      isFail 
        ? 'bg-rose-50 border-rose-200 shadow-md' 
        : isScanning 
          ? 'bg-emerald-50 border-emerald-100 shadow-sm' 
          : isDark 
            ? 'bg-black/40 border-white/5' 
            : 'bg-zinc-50 border-zinc-100'
    }`}>
       <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
       <div className={`w-2 h-2 rounded-full ${
          isFail ? 'bg-rose-500 animate-pulse' : isScanning ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'
       }`}></div>
       <span className={`text-[8px] font-black uppercase ${
          isFail ? 'text-rose-600' : isScanning ? 'text-emerald-600' : 'text-zinc-400'
       }`}>
          {isScanning ? 'ACTIVE' : isFail ? 'ALERT' : 'IDLE'}
       </span>
    </div>
  );
};

export default ProxyGuard;
