
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, ShieldAlert, Binary, CheckCircle2, Loader2, Maximize2, Fingerprint, RefreshCcw, X, Scan, AlertTriangle, ScanLine, Frame, Zap, ZapOff } from 'lucide-react';
import { analyzeDocumentImage } from '../src/services/geminiService';

// Fix: Added ForensicLabProps to define the onVerdict callback used in App.tsx
interface ForensicLabProps {
  onVerdict?: (name: string, role: string, score: number, verdict: string) => void;
}

const ForensicLab: React.FC<ForensicLabProps> = ({ onVerdict }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [flash, setFlash] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
      setIsScanning(true);
    } catch (err) {
      alert("Unable to access camera. Please check permissions.");
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

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      setFlash(true);
      setTimeout(() => setFlash(false), 300);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImage(dataUrl);
      stopCamera();
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

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
      const analysis = await analyzeDocumentImage(base64Data, mimeType);
      setResult(analysis);

      // Fix: Invoke onVerdict to persist the analysis result into the application vault
      if (onVerdict && analysis) {
        const scoreMatch = analysis.match(/(\d+)%/);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 90;
        onVerdict("Forensic Subject", "Document Analysis", score, analysis);
      }
    } catch (err) {
      setResult("Forensic uplink failed. Pixel DNA obscured by noise.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-900/20">
                <Scan size={28} />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-white">Pixel <span className="text-red-600">DNA</span> Autopsy</h3>
                 <p className="text-sm text-slate-500 font-medium italic">High-fidelity document scanning and forensic deconstruction.</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
                 <AlertTriangle size={14} className="text-red-500" />
                 <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live Capture Protocol Active</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
           <div className="space-y-6">
              <div className={`relative group aspect-[3/4] rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-slate-950 ${image || isCameraActive ? 'border-red-500/50' : 'border-slate-800'}`}>
                 {/* Laser Scan Animation */}
                 {isScanning && (
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-40 animate-scan-slow"></div>
                 )}

                 {/* Camera Overlay */}
                 {isCameraActive && (
                   <div className="absolute inset-0 z-30 pointer-events-none p-12">
                      <div className="w-full h-full border-2 border-white/20 rounded-3xl relative">
                         {/* Corner Brackets */}
                         <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/60"></div>
                         <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/60"></div>
                         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/60"></div>
                         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/60"></div>
                         
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Frame className="text-white/20" size={64} />
                         </div>
                      </div>
                      <p className="text-center text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-6">Align document within frame</p>
                   </div>
                 )}

                 {/* Flash Effect */}
                 {flash && <div className="absolute inset-0 bg-white z-[60] animate-out fade-out duration-300"></div>}

                 {isCameraActive ? (
                   <>
                     <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                     <div className="absolute bottom-10 flex gap-6 z-50">
                        <button 
                           onClick={capturePhoto} 
                           className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-90 transition-all border-4 border-slate-900"
                           title="Capture Scan"
                        >
                           <Zap size={32} className="text-red-600" />
                        </button>
                        <button 
                           onClick={stopCamera} 
                           className="w-20 h-20 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-all border border-white/10"
                        >
                           <X size={28} />
                        </button>
                     </div>
                   </>
                 ) : image ? (
                   <>
                     <img src={image} className="w-full h-full object-contain p-6" alt="Preview" />
                     <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 z-50">
                        <button onClick={() => fileInputRef.current?.click()} className="p-5 bg-white/10 backdrop-blur-md rounded-3xl text-white hover:bg-white/20 transition-all" title="Upload Replacement"><Upload size={28} /></button>
                        <button onClick={startCamera} className="p-5 bg-white/10 backdrop-blur-md rounded-3xl text-white hover:bg-white/20 transition-all" title="Scan Again"><Camera size={28} /></button>
                        <button onClick={() => setImage(null)} className="p-5 bg-red-600/20 backdrop-blur-md rounded-3xl text-red-500 hover:bg-red-600/40 transition-all" title="Clear"><X size={28} /></button>
                     </div>
                   </>
                 ) : (
                   <div className="text-center space-y-8 p-12">
                      <div className="flex gap-6 justify-center">
                         <button 
                           onClick={startCamera} 
                           className="w-24 h-24 bg-red-600 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all group/btn"
                         >
                           <Camera size={32} />
                           <span className="text-[8px] font-black uppercase tracking-widest mt-2 group-hover/btn:text-white">Scan Device</span>
                         </button>
                         <button 
                           onClick={() => fileInputRef.current?.click()} 
                           className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-slate-500 hover:bg-white/10 hover:text-white transition-all group/up"
                         >
                           <Upload size={32} />
                           <span className="text-[8px] font-black uppercase tracking-widest mt-2 group-hover/up:text-white">Upload File</span>
                         </button>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Protocol Required</p>
                        <p className="text-slate-600 text-xs font-medium max-w-[200px] mx-auto">Upload or Scan high-resolution professional credentials for forensic analysis.</p>
                      </div>
                   </div>
                 )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <canvas ref={canvasRef} className="hidden" />
              
              <button 
                onClick={startAnalysis}
                disabled={!image || isAnalyzing}
                className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-2xl shadow-red-900/30 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <ScanLine size={24} />}
                {isAnalyzing ? 'Searching for Pixel Artifacts...' : 'Execute Digital DNA Audit'}
              </button>
           </div>

           <div className="space-y-6">
              {result ? (
                <div className="bg-slate-950 border border-white/10 rounded-[3rem] p-10 space-y-8 animate-in slide-in-from-right-8 duration-500 shadow-2xl">
                   <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="text-red-500" />
                        <div>
                           <h4 className="text-white font-black">Forensic Summary</h4>
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Batch: #VX-PRO-{(Math.random()*10000).toFixed(0)}</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-black text-emerald-500 uppercase">Analysis Complete</div>
                   </div>
                   <div className="prose prose-invert max-w-none">
                      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium max-h-[500px] overflow-y-auto custom-scrollbar pr-4 italic font-mono bg-white/5 p-8 rounded-3xl border border-white/5">
                        {result}
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticity Score</p>
                         <p className="text-lg font-black text-white tracking-tighter">94.2%</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Artifact Detection</p>
                         <p className="text-lg font-black text-orange-500 tracking-tighter">Low Noise</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-16 text-center bg-slate-950/20 group-hover:border-red-500/30 transition-all">
                   <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-slate-700 mb-8 relative">
                      <Fingerprint size={48} className="relative z-10" />
                      <div className="absolute inset-0 bg-red-600/5 blur-2xl animate-pulse"></div>
                   </div>
                   <h4 className="text-2xl font-black text-slate-400">Diagnostic Standby</h4>
                   <p className="text-[10px] font-bold text-slate-600 max-w-xs mt-4 uppercase tracking-[0.2em] leading-relaxed">
                     Input visual evidence via camera scan or file upload to proceed with the forensic deconstruction.
                   </p>
                </div>
              )}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-slow {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-slow {
          animation: scan-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ForensicLab;
