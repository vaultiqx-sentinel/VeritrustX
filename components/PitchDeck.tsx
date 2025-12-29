import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, ShieldCheck, Zap, AlertTriangle, 
  TrendingDown, Users, CheckCircle2, Presentation, X, BarChart3, 
  Target, Fingerprint, SearchCode, Lock, Clock, Package
} from 'lucide-react';

const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Crisis of Professional Truth",
      subtitle: "Why 'Good Enough' is costing your organization equity.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="p-8 bg-red-600/10 border border-red-500/20 rounded-[2.5rem] shadow-2xl">
               <h4 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                 <AlertTriangle size={14} /> The Systemic Failure
               </h4>
               <p className="text-2xl font-black text-slate-100 italic leading-tight italic">"Ghost hires and resume inflation cost enterprises ₹50L+ per incident."</p>
            </div>
            <div className="space-y-6">
               <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-500"><Target size={20} /></div>
                  <p className="text-slate-400 text-sm font-medium">82% of technical candidates overstate proficiency in GenAI and Architecture.</p>
               </div>
               <div className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-500"><SearchCode size={20} /></div>
                  <p className="text-slate-400 text-sm font-medium">Legacy BGV takes 21 days—costing you top talent while you wait for a call-back.</p>
               </div>
            </div>
          </div>
          <div className="bg-slate-900 p-12 rounded-[4rem] border border-white/10 text-center shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -mr-32 -mt-32"></div>
             <TrendingDown size={64} className="mx-auto text-red-600 mb-8 animate-bounce" />
             <h3 className="text-6xl font-black text-white">₹7,500Cr</h3>
             <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest mt-4">India's Annual Recruitment Loss</p>
          </div>
        </div>
      )
    },
    {
      title: "The VeriTrustX Solution",
      subtitle: "Zero-Lag Forensic Identity Scrutiny.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-10 bg-indigo-600 rounded-[3rem] text-white text-left shadow-2xl shadow-indigo-900/20 group hover:scale-105 transition-all">
              <Zap size={40} className="mb-8 fill-white" />
              <h4 className="text-2xl font-black mb-3">Neural Logic</h4>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed">Cross-referencing global career trajectories using 42 risk vectors in under 2 minutes.</p>
           </div>
           <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-white text-left shadow-xl group hover:scale-105 transition-all">
              <Fingerprint size={40} className="mb-8 text-indigo-500" />
              <h4 className="text-2xl font-black mb-3">Pixel DNA</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Forensic imaging that detects digital tampering in physical scan artifacts instantly.</p>
           </div>
           <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-white text-left shadow-xl group hover:scale-105 transition-all">
              <Lock size={40} className="mb-8 text-indigo-500" />
              <h4 className="text-2xl font-black mb-3">Grounding</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Direct Web-Grounding integration that verifies claims against public & registry traces.</p>
           </div>
        </div>
      )
    },
    {
      title: "A Strategic Release Path",
      subtitle: "Ensuring 100% Protocol Fidelity before scale.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
           <div className="p-10 bg-slate-900 rounded-[3rem] border border-white/10 space-y-6">
              <h4 className="text-xl font-black text-white flex items-center gap-3">
                 <Clock className="text-indigo-500" /> Current Phased Deployment
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                We have successfully architected the core neural engine. We are currently in a **Closed Protocol Phase** with select recruitment firms to calibrate our forensic models.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                    <CheckCircle2 size={14} /> Core Neural Engine: READY
                 </li>
                 <li className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                    <CheckCircle2 size={14} /> BGV Vault Mesh: BETA
                 </li>
                 <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Package size={14} /> Mass Market Release: UPCOMING
                 </li>
              </ul>
           </div>
           <div className="bg-emerald-600/10 p-10 rounded-[3.5rem] border border-emerald-500/20 flex flex-col justify-center space-y-6">
              <h4 className="text-2xl font-black text-white tracking-tight italic">"We prioritize Truth over Speed. Our phased rollout ensures every report is a forensic gold standard."</h4>
              <div className="flex gap-4">
                 <div className="px-4 py-2 bg-slate-950 rounded-xl border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Stage</p>
                    <p className="text-sm font-black text-white">Logic Refinement</p>
                 </div>
                 <div className="px-4 py-2 bg-slate-950 rounded-xl border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Availability</p>
                    <p className="text-sm font-black text-emerald-500">Waitlist Active</p>
                 </div>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "Monetizing Trust",
      subtitle: "Disrupting the slow, manual BGV industry.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="space-y-6">
             <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center gap-6">
                <div className="p-4 bg-indigo-600 rounded-2xl text-white font-black text-2xl">95%</div>
                <div>
                   <h5 className="text-white font-black text-lg">Speed Advantage</h5>
                   <p className="text-xs text-slate-500 font-medium">Verify in minutes, not weeks.</p>
                </div>
             </div>
             <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center gap-6">
                <div className="p-4 bg-emerald-600 rounded-2xl text-white font-black text-2xl">60%</div>
                <div>
                   <h5 className="text-white font-black text-lg">Cost Reduction</h5>
                   <p className="text-xs text-slate-500 font-medium">Eliminate the manual calling overhead.</p>
                </div>
             </div>
          </div>
          <div className="p-12 bg-slate-900 border border-indigo-500/20 rounded-[4rem] flex flex-col justify-center text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16"></div>
             <BarChart3 className="text-indigo-500 mx-auto mb-6" size={48} />
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Enterprise Target ARR</h4>
             <div className="text-7xl font-black text-white tracking-tighter">$1.2M</div>
             <p className="text-xs text-emerald-500 font-bold mt-4 uppercase tracking-[0.2em]">SaaS / TaaS Hybrid Model</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08),transparent_60%)] pointer-events-none"></div>
      
      <div className="w-full max-w-6xl relative z-10 space-y-16">
        <header className="flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-900/40"><ShieldCheck className="text-white" size={24} /></div>
             <span className="text-white font-black tracking-tighter text-2xl font-quantum">VERITRUSTX</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-full">Slide {currentSlide + 1} / {slides.length}</div>
          </div>
        </header>

        <div className="text-center space-y-6">
           <h2 className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none animate-in slide-in-from-top-12 duration-700">{slides[currentSlide].title}</h2>
           <p className="text-2xl md:text-3xl text-slate-500 font-medium italic opacity-80">{slides[currentSlide].subtitle}</p>
        </div>

        <div className="min-h-[500px] flex items-center justify-center animate-in zoom-in-95 duration-500">
           {slides[currentSlide].content}
        </div>

        <footer className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
           <div className="flex gap-4">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-16 bg-indigo-500' : 'w-4 bg-slate-800 hover:bg-slate-700'}`}
                ></button>
              ))}
           </div>
           <div className="flex gap-4">
              <button 
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white disabled:opacity-20 transition-all border border-white/5"
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                className="p-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl disabled:opacity-20 transition-all shadow-xl shadow-indigo-900/20"
                disabled={currentSlide === slides.length - 1}
              >
                <div className="flex items-center gap-2">
                   <span className="text-sm font-black uppercase tracking-widest ml-2">Next Plate</span>
                   <ChevronRight size={28} />
                </div>
              </button>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PitchDeck;