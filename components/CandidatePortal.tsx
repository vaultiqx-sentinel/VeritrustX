import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowRight, Upload, Camera, 
  Fingerprint, CheckCircle2, Lock, FileText, 
  Loader2, AlertCircle, Smartphone, Key
} from 'lucide-react';

const CandidatePortal: React.FC = () => {
  const [step, setStep] = useState<'auth' | 'upload' | 'biometric' | 'success'>('auth');
  const [inviteCode, setInviteCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuth = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('upload');
    }, 1500);
  };

  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 p-10 text-white flex justify-between items-center">
           <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Merit Verification Portal</p>
           </div>
           <div className="p-3 bg-white/10 rounded-2xl"><ShieldCheck size={24} /></div>
        </div>

        <div className="p-12 space-y-8">
           {step === 'auth' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                <div className="space-y-2">
                   <h2 className="text-2xl font-black text-slate-900">Verify Your Identity</h2>
                   <p className="text-sm text-slate-500 font-medium">Please enter the Secure Access Token provided by your prospective employer.</p>
                </div>
                <div className="relative">
                   <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input 
                     type="text" 
                     value={inviteCode}
                     onChange={(e) => setInviteCode(e.target.value)}
                     className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                     placeholder="VX-XXXX-XXXX"
                   />
                </div>
                <button 
                  onClick={handleAuth}
                  disabled={!inviteCode || isProcessing}
                  className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-indigo-900/20"
                >
                   {isProcessing ? <Loader2 className="animate-spin" /> : 'Enter Secure Session'}
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest justify-center">
                   <Lock size={12} /> End-to-End Encrypted Session
                </div>
             </div>
           )}

           {step === 'upload' && (
             <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                   <h2 className="text-2xl font-black text-slate-900">Credential Intake</h2>
                   <p className="text-sm text-slate-500 font-medium">Upload your highest degree and latest experience certificate.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                   <UploadBox label="Educational Certificate" />
                   <UploadBox label="Professional Experience" />
                </div>

                <button 
                  onClick={() => setStep('biometric')}
                  className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl"
                >
                   Continue to Identity Check <ArrowRight size={18} />
                </button>
             </div>
           )}

           {step === 'biometric' && (
             <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                   <h2 className="text-2xl font-black text-slate-900">Final Verification</h2>
                   <p className="text-sm text-slate-500 font-medium">We need a 5-second live capture to ensure biometric continuity.</p>
                </div>

                <div className="aspect-square max-w-[280px] mx-auto bg-slate-900 rounded-full border-8 border-slate-50 overflow-hidden relative group">
                   <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                      <Camera size={48} className="text-white opacity-20" />
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Live Camera Standby</p>
                   </div>
                   <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-scan"></div>
                </div>

                <button 
                  onClick={handleFinish}
                  disabled={isProcessing}
                  className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl"
                >
                   {isProcessing ? <Loader2 className="animate-spin" /> : 'Complete Verification'}
                </button>
             </div>
           )}

           {step === 'success' && (
             <div className="text-center space-y-6 animate-in zoom-in-95 duration-500 py-10">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                   <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                   <h2 className="text-2xl font-black text-slate-900">Verification Submitted</h2>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
                     Your merit data is being processed by the VeritrustX Forensic Engine. Your employer will be notified shortly.
                   </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission ID</p>
                   <p className="text-sm font-mono font-bold text-slate-900">#VX-SUB-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>
             </div>
           )}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

const UploadBox = ({ label }: { label: string }) => (
  <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group cursor-pointer">
     <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-all"><FileText className="text-slate-400 group-hover:text-indigo-600" /></div>
           <p className="text-sm font-bold text-slate-700">{label}</p>
        </div>
        <Upload size={18} className="text-slate-300 group-hover:text-indigo-500" />
     </div>
  </div>
);

export default CandidatePortal;