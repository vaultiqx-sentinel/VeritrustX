
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Fingerprint, RefreshCcw, X, Scan, AlertTriangle, ScanLine, 
  Zap, Loader2, Hash, Binary
} from 'lucide-react';
import { analyzeDocumentImage, performQuantumAudit } from '../services/gemini';

interface ForensicLabProps {
  onVerdict?: (name: string, role: string, score: number, verdict: string) => void;
}

const ForensicLab: React.FC<ForensicLabProps> = ({ onVerdict }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [digitalDNA, setDigitalDNA] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error("Playback interrupted", e));
    }
  }, [isCameraActive, stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      setIsCameraActive(true);
      setResult(null);
      setDigitalDNA(null);
    } catch (err) {
      alert("Institutional Node Error: Please enable camera permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsCameraActive(false);
  };

  const generateSHA256 = async (base64Input: string) => {
    try {
      // Decode base64 to binary
      const raw = window.atob(base64Input);
      const rawLength = raw.length;
      const array = new Uint8Array(new ArrayBuffer(rawLength));
      for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      
      // Calculate SHA-256
      const hashBuffer = await crypto.subtle.digest('SHA-256', array);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setDigitalDNA(hashHex.toUpperCase());
    } catch (e) {
      console.error("SHA-256 Generation Failed", e);
      setDigitalDNA("ENCRYPTION-ENGINE-ERROR");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImage(dataUrl);
        generateSHA256(dataUrl.split(',')[1]);
        stopCamera();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        setImage(res);
        setResult(null);
        generateSHA256(res.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      let report;
      if (image) {
        const base64Data = image.split(',')[1];
        const mimeType = image.split(';')[0].split(':')[1];
        report = await analyzeDocumentImage(base64Data, mimeType, "VX-FORENSIC-KEY");
      } else {
        // Fallback or text based audit if image absent (unlikely here but handled)
        report = await performQuantumAudit(`${candidateName} - ${companyName}`, "VX-FORENSIC-KEY");
      }
      
      setResult(report);
      
      const isGrounded = report.includes("GROUNDED") || report.includes("VERIFIED");
      const score = isGrounded ? 94 : 45;
      const verdict = isGrounded ? "Verified" : "Flagged";
      
      if (onVerdict) {
        onVerdict(candidateName || "Unknown Subject", companyName || "Audit", score, verdict);
      }
    } catch (err) {
      setResult("Forensic Link Fault: Neural mesh unreachable.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-900/20"><Scan size={28} /></div>
              <div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Pixel <span className="text-red-600">DNA</span> Autopsy</h3>
                 <p className="text-sm text-slate-500 font-medium italic">Deconstructing experience genuineness via Neural Mesh.</p>
              </div>
           </div>
           <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Protocol Active</span>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
           <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="Candidate Name" className="bg-slate-950 border border-white/5 p-4 rounded-2xl text-white text-xs outline-none focus:border-red-500" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
                 <input type="text" placeholder="Issuing Company" className="bg-slate-950 border border-white/5 p-4 rounded-2xl text-white text-xs outline-none focus:border-red-500" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>

              <div className={`relative group aspect-[3/4] rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-slate-950 ${image || isCameraActive ? 'border-red-500/50' : 'border-slate-800'}`}>
                 {isCameraActive ? (
                   <>
                     <video ref={videoRef} playsInline autoPlay muted className="w-full h-full object-cover grayscale opacity-80" />
                     <div className="absolute bottom-10 flex gap-6 z-50">
                        <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-900 active:scale-90 transition-transform"><Zap size={32} className="text-red-600" /></button>
                        <button onClick={stopCamera} className="w-20 h-20 bg-slate-900/80 rounded-full text-white border border-white/10 hover:bg-red-600 transition-all"><X size={28} /></button>
                     </div>
                   </>
                 ) : image ? (
                   <div className="relative w-full h-full">
                     <img src={image} className="w-full h-full object-contain p-6" alt="Preview" />
                     {digitalDNA && (
                        <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-red-500/30">
                           <div className="flex items-center gap-2 mb-2 text-red-500 font-bold uppercase tracking-widest text-[9px]">
                              <Hash size={12} /> Digital DNA (SHA-256)
                           </div>
                           <p className="font-mono text-[9px] text-red-400/80 break-all leading-relaxed tracking-wider">
                              {digitalDNA}
                           </p>
                        </div>
                     )}
                     <button onClick={() => { setImage(null); setDigitalDNA(null); }} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"><RefreshCcw className="text-white" size={48} /></button>
                   </div>
                 ) : (
                   <div className="text-center space-y-8 p-12">
                      <div className="flex gap-6 justify-center">
                         <button onClick={startCamera} className="w-24 h-24 bg-red-600 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform"><Camera size={32} /></button>
                         <button onClick={() => fileInputRef.current?.click()} className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-slate-500 hover:text-white transition-all"><Upload size={32} /></button>
                      </div>
                      <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Awaiting Institutional Input</p>
                   </div>
                 )}
              </div>
              
              <button onClick={startAnalysis} disabled={!image || isAnalyzing} className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl flex items-center justify-center gap-3 disabled:opacity-30 transition-all shadow-2xl">
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <ScanLine size={24} />}
                {isAnalyzing ? 'Searching for Pixel Artifacts...' : 'Execute Digital DNA Audit'}
              </button>
           </div>

           <div className="space-y-6">
              {result ? (
                <div className="bg-slate-950 border border-white/10 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                   <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3"><Fingerprint className="text-red-500" /><h4 className="text-white font-black uppercase">Forensic Summary</h4></div>
                      <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-black text-emerald-500 uppercase tracking-widest">Analysis Complete</div>
                   </div>
                   
                   {/* Evidence Chain Block */}
                   {digitalDNA && (
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                           <Binary size={12} /> Evidence Chain ID
                        </div>
                        <p className="font-mono text-[10px] text-emerald-500 break-all">{digitalDNA}</p>
                     </div>
                   )}

                   <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-white/5 p-8 rounded-3xl border border-white/5 italic">{result}</div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-16 text-center bg-slate-950/20">
                   <Fingerprint size={48} className="text-slate-700 mb-8" />
                   <h4 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Diagnostic Standby</h4>
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-4">Input visual evidence via camera scan or file upload to proceed.</p>
                </div>
              )}
           </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ForensicLab;
