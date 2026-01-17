import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, Loader2, Fingerprint, Activity, FileUp, Binary, ScanFace, Gauge, FileText } from 'lucide-react';
import { performQuantumAudit } from '../services/gemini';

const VettingSimulator: React.FC = () => {
  const [resume, setResume] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingSteps = [
    "Deconstructing document layers...",
    "Scanning for pixel artifacts...",
    "Cross-referencing timeline nodes...",
    "Analyzing semantic density...",
    "Calculating fraud probability...",
    "Finalizing forensic verdict..."
  ];

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 1500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setResume(content);
      }
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      setResume(`[PARSED CONTENT FROM ${file.name}]\n\nCandidate Name: Simulated Applicant\nRole: Lead System Architect\nExperience: 12 Years\n\nFull deconstruction follows in the forensic report...`);
    }
  };

  const handleAudit = async () => {
    if (!resume) return;
    setIsAnalyzing(true);
    setRawResponse(null);
    try {
      const result = await performQuantumAudit(resume, "SIMULATION-KEY");
      setRawResponse(result);
    } catch (error: any) {
      console.error(error);
      setRawResponse(`### [SYSTEM ERROR]\n${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
           <div className="p-4 bg-orange-600 rounded-2xl text-white shadow-lg"><Cpu size={28} /></div>
           <div>
              <h3 className="text-2xl font-black text-slate-900">Digital <span className="text-orange-600">DNA</span> Autopsy</h3>
              <p className="text-sm text-slate-500 font-medium">Live AI Forensics: Analyzing document integrity in real-time.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="space-y-4">
              <div className="flex justify-between items-center ml-1">
                <div className="flex items-center gap-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate Document Context</label>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-[9px] font-black text-orange-600 uppercase tracking-widest hover:bg-orange-100 transition-all"
                  >
                    <FileUp size={12} /> Upload Resume
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".txt,.pdf,.doc,.docx"
                  />
                </div>
                {resume && (
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    {resume.length} characters detected
                  </span>
                )}
              </div>
              <textarea 
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste resume text, work history, or academic claims for forensic deconstruction..."
                className="w-full h-80 px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-slate-700 font-medium text-sm resize-none shadow-inner"
              />
              <button 
                onClick={handleAudit}
                disabled={isAnalyzing || !resume}
                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-slate-900/20 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {isAnalyzing ? <Loader2 className="animate-spin" /> : <Binary size={18} />}
                {isAnalyzing ? 'Running Forensics...' : 'Execute Deep Logic Audit'}
              </button>
           </div>

           <div className="space-y-6">
              {isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 p-12">
                   <div className="relative">
                      <div className="w-24 h-24 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                      <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500" size={32} />
                   </div>
                   <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest">
                        <Activity className="text-orange-500 animate-pulse" size={16} />
                        Neural Scrutinizer Active
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-xl px-6 py-3 shadow-sm min-w-[240px]">
                        <p className="text-slate-600 text-xs font-bold animate-in fade-in slide-in-from-bottom-1 duration-500 key={loadingStep}">
                          {loadingSteps[loadingStep]}
                        </p>
                      </div>

                      <div className="flex justify-center gap-1.5 pt-2">
                        {loadingSteps.map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i === loadingStep ? 'bg-orange-500 scale-x-125' : 'bg-slate-200'}`}
                          ></div>
                        ))}
                      </div>
                   </div>
                </div>
              ) : rawResponse ? (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                   <div className="p-8 bg-slate-950 rounded-[2.5rem] text-white overflow-hidden relative border border-white/5 shadow-2xl flex-1 flex flex-col">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-2xl -mr-16 -mt-16"></div>
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <Fingerprint className="text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Forensic Brief #VT-{(Math.random()*10000).toFixed(0)}</span>
                         </div>
                         <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                            <Gauge size={12} className="text-orange-500" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logic Sensitivity: High</span>
                         </div>
                      </div>
                      <div className="prose prose-invert max-w-none flex-1 overflow-hidden">
                         <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium h-[400px] overflow-y-auto custom-scrollbar pr-4 font-mono bg-white/5 p-6 rounded-2xl border border-white/5">
                            {rawResponse}
                         </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Integrity Threshold: 85%</span>
                        </div>
                        <button className="text-[9px] font-black text-orange-500 uppercase hover:text-orange-400 transition-colors flex items-center gap-1">
                          <FileText size={10} /> Export Evidence Packet
                        </button>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center bg-slate-50/30">
                   <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-200 shadow-sm">
                      <ScanFace size={48} />
                   </div>
                   <div className="max-w-xs space-y-2">
                      <h4 className="text-slate-900 font-black text-lg tracking-tight">Ready for Forensic Scrutiny</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">Enter document text or upload a resume on the left. Our Neural Core will deconstruct timelines and detect logical fractures instantly.</p>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default VettingSimulator;