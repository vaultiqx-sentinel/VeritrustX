import React, { useState, useRef } from 'react';
import { 
  Camera, Upload, ShieldAlert, Binary, CheckCircle2, Loader2, Maximize2, 
  Fingerprint, RefreshCcw, X, Scan, AlertTriangle, ScanLine, Frame, 
  Zap, ZapOff, UploadCloud, FileText, Search, Info
} from 'lucide-react';

interface ForensicLabProps {
  onVerdict?: (name: string, role: string, score: number, verdict: string) => void;
}

const ForensicLab: React.FC<ForensicLabProps> = ({ onVerdict }) => {
  // --- CORE STATES ---
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [flash, setFlash] = useState(false);

  // --- TRINITY OF TRUST INPUTS ---
  const [candidateName, setCandidateName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- 📷 UPDATED CAMERA PROTOCOL (Fixed Black Screen) ---
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false 
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Important: Force play and handle metadata
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => console.error("Playback failed", e));
        };
      }
      setIsCameraActive(true);
      setIsScanning(true);
      setResult(null);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Forensic Access Denied: Please enable camera permissions in your browser.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setIsScanning(false);
  };

  // --- 📸 UPDATED CAPTURE PROTOCOL (Fixed Broken Image) ---
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Match canvas to real video resolution
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        
        if (dataUrl && dataUrl.length > 1000) { // Verify data is valid
          setImage(dataUrl);
          stopCamera();
        } else {
          alert("Capture failed: Forensic node signal weak. Try again.");
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 🧠 THE HEART: ANALYSIS ENGINE (Connected to Render) ---
  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
      
      // Update this URL to your Render backend URL for the demo
      const response = await fetch('https://veritrustx.onrender.com/api/forensic-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            base64Data, 
            mimeType, 
            companyName: companyName || "Institutional Audit",
            candidateName: candidateName || "Subject_9021"
        })
      });
      
      if (!response.ok) throw new Error("Backend 401/500 Fault");

      const data = await response.json();
      setResult(data.report);

      if (onVerdict && data.report) {
        const isGrounded = data.report.includes("GROUNDED");
        onVerdict(candidateName || "Subject", companyName || "Exp Audit", isGrounded ? 94 : 18, data.report);
      }
    } catch (err) {
      setResult("Forensic Link Fault: Backend mesh unreachable. Ensure Environment Keys are linked on Render.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-900/20">
                <Scan size={28} />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-white">Pixel <span className="text-red-600">DNA</span> Autopsy</h3>
                 <p className="text-sm text-slate-500 font-medium italic">Deconstructing experience genuineness via Neural Mesh.</p>
              </div>
           </div>
           <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Forensic Protocol Active</span>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
           <div className="space-y-6">
              {/* Identity Inputs */}
              <div className="grid grid-cols-2 gap-4">
                 <input 
                    type="text" placeholder="Candidate Name" 
                    className="bg-slate-950 border border-white/5 p-4 rounded-2xl text-white text-xs outline-none focus:border-red-500 transition-all"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                 />
                 <input 
                    type="text" placeholder="Issuing Company" 
                    className="bg-slate-950 border border-white/5 p-4 rounded-2xl text-white text-xs outline-none focus:border-red-500 transition-all"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                 />
              </div>

              {/* Scanner Frame */}
              <div className={`relative group aspect-[3/4] rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-slate-950 ${image || isCameraActive ? 'border-red-500/50' : 'border-slate-800'}`}>
                 {isScanning && <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-40 animate-scan-slow"></div>}

                 {isCameraActive && (
                   <div className="absolute inset-0 z-30 pointer-events-none p-12">
                      <div className="w-full h-full border-2 border-white/20 rounded-3xl relative">
                         <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/60"></div>
                         <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/60"></div>
                         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/60"></div>
                         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/60"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Frame className="text-white/20" size={64} /></div>
                      </div>
                   </div>
                 )}

                 {flash && <div className="absolute inset-0 bg-white z-[60] animate-out fade-out duration-300"></div>}

                 {isCameraActive ? (
                   <>
                     <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                     <div className="absolute bottom-10 flex gap-6 z-50">
                        <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900 transition-transform active:scale-90"><Zap size={32} className="text-red-600" /></button>
                        <button onClick={stopCamera} className="w-20 h-20 bg-slate-900/80 rounded-full text-white border border-white/10 hover:bg-red-600 transition-all"><X size={28} /></button>
                     </div>
                   </>
                 ) : image ? (
                   <>
                     <img src={image} className="w-full h-full object-contain p-6" alt="Forensic Preview" />
                     <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 z-50">
                        <button onClick={() => fileInputRef.current?.click()} className="p-5 bg-white/10 rounded-3xl text-white hover:bg-white/20 transition-all"><Upload size={28} /></button>
                        <button onClick={() => setImage(null)} className="p-5 bg-red-600/20 rounded-3xl text-red-500 hover:bg-red-600/40 transition-all"><X size={28} /></button>
                     </div>
                   </>
                 ) : (
                   <div className="text-center space-y-8 p-12">
                      <div className="flex gap-6 justify-center">
                         <button onClick={startCamera} className="w-24 h-24 bg-red-600 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform"><Camera size={32} /></button>
                         <button onClick={() => fileInputRef.current?.click()} className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-slate-500 hover:text-white transition-all"><Upload size={32} /></button>
                      </div>
                      <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Awaiting Institutional Input</p>
                   </div>
                 )}
              </div>
              
              <button 
                onClick={startAnalysis} 
                disabled={!image || isAnalyzing} 
                className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-2xl group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <ScanLine size={24} />}
                {isAnalyzing ? 'Searching for Pixel DNA...' : 'Execute Digital DNA Audit'}
              </button>
           </div>

           {/* Forensic Result Section */}
           <div className="space-y-6">
              {result ? (
                <div className="bg-slate-950 border border-white/10 rounded-[3rem] p-10 space-y-8 animate-in slide-in-from-right-8 shadow-2xl">
                   <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="text-red-500" />
                        <h4 className="text-white font-black">Forensic Summary</h4>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-black text-emerald-500 uppercase">Analysis Complete</div>
                   </div>
                   <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-white/5 p-8 rounded-3xl border border-white/5 italic">
                      {result}
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-16 text-center bg-slate-950/20">
                   <Fingerprint size={48} className="text-slate-700 mb-8" />
                   <h4 className="text-2xl font-black text-slate-400">Diagnostic Standby</h4>
                   <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-4">Uplink image for forensic deconstruction</p>
                </div>
              )}
           </div>
        </div>
      </div>
      
      {/* Hidden Elements */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      <canvas ref={canvasRef} className="hidden" />

      <style>{`
        @keyframes scan-slow { 0% { top: 0; } 100% { top: 100%; } }
        .animate-scan-slow { animation: scan-slow 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default ForensicLab;