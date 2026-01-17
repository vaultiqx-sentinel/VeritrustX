
import React from 'react';
import { 
  ShieldCheck, ArrowRight, Globe, Zap, 
  Award, Lock, Cpu, MessageSquare, 
  CheckCircle2, Fingerprint, Quote, 
  Sparkles, Mail
} from 'lucide-react';

interface HomeProps {
  onEnter: () => void;
  onContact: () => void;
}

const Home: React.FC<HomeProps> = ({ onEnter, onContact }) => {
  return (
    <div className="space-y-24 animate-in fade-in duration-1000 pb-20">
      
      {/* 🎆 NEW YEAR 2026 PROCLAMATION */}
      <div className="bg-gradient-to-r from-indigo-600 via-emerald-600 to-indigo-600 p-4 rounded-t-[2.5rem] text-center relative overflow-hidden animate-in slide-in-from-top-full duration-1000 shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] relative z-10 flex items-center justify-center gap-3">
          <Sparkles size={14} className="animate-pulse" />
          2026: The Year of Institutional Truth. VeriTrustX Neural Mesh is Online.
          <Sparkles size={14} className="animate-pulse" />
        </p>
      </div>

      {/* 🛡️ HERO SECTION: WHAT WE ARE */}
      <section className="relative py-24 overflow-hidden rounded-[4rem] bg-zinc-950 text-white border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,var(--brand-accent-glow),transparent_70%)] opacity-40"></div>
        <div className="relative z-10 px-12 md:px-20 max-w-5xl space-y-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Institutional Protocol v1.7 Live</span>
           </div>
           <h1 className="text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] font-quantum">
              The Standard <br /> for <span className="accent-text">Institutional</span> Truth.
           </h1>
           <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl">
              VeriTrustX is the world’s first <span className="text-white font-bold border-b-2 border-emerald-500/50">Neural Verification Mesh</span>. We protect organizations from the $50B global fraud crisis by converting professional identity into non-repudiable code.
           </p>
           <div className="flex flex-wrap gap-6">
              <button onClick={onEnter} className="px-10 py-5 accent-bg text-white font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-emerald-900/20 group">
                 Enter Neural Mesh <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onContact} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                 Request Strategic Demo
              </button>
           </div>
        </div>
      </section>

      {/* 🖋️ FOUNDER'S NOTE: THE MANIFESTO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-10">
         <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-zinc-900 rounded-2xl text-white shadow-lg"><Award size={24} /></div>
               <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">Executive Proclamation</h3>
            </div>
            <div className="relative">
               <Quote className="absolute -top-10 -left-10 text-indigo-100 opacity-30" size={80} />
               <p className="text-3xl font-black text-zinc-900 leading-tight italic relative z-10">
                  "The global economy is facing a Truth Crisis. VeriTrustX was engineered to move institutional trust from human opinion into immutable forensic logic."
               </p>
            </div>
            <div className="space-y-6 text-lg text-zinc-500 font-medium leading-relaxed border-l-4 border-zinc-100 pl-8">
               <p>
                  Industrialized resume fraud and AI-voice masking have turned standard Background Verification (BGV) into a dangerous bottleneck. 
               </p>
               <p>
                  As Founder, my mission is to provide organizations with <strong>Forensic Neural Scrutiny</strong>. We don't just verify claims; we ground identities in absolute institutional reality.
               </p>
            </div>
            
            {/* 🖋️ CEO DIGITAL SIGNATURE (EDWARDIAN STYLE) */}
            <div className="flex items-center gap-8 pt-8 border-t border-zinc-100">
               <div className="relative">
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '54px' }} className="text-indigo-600 transform -rotate-2 select-none">
                    Challa Aditya
                  </p>
                  <p className="text-sm font-black text-zinc-900 uppercase tracking-tighter mt-[-10px]">Challa Aditya</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Founder & CEO, VeriTrustX</p>
               </div>
               <div className="h-12 w-px bg-zinc-100"></div>
               <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="text-emerald-500" size={16} />
                     <span className="text-[10px] font-black uppercase text-zinc-900 tracking-widest">Identity Grounded</span>
                  </div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">Audit Authority Node: 001</span>
               </div>
            </div>
         </div>

         <div className="bg-zinc-50 rounded-[4rem] p-12 border-2 border-zinc-100 relative shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <TrustPillar icon={Zap} title="Zero-Lag" desc="Forensic audits complete in under 240 seconds." />
               <TrustPillar icon={ShieldCheck} title="Non-Repudiable" desc="Results that hold legal and forensic weight." />
               <TrustPillar icon={Fingerprint} title="Biometric" desc="Ensuring continuity across interview cycles." />
               <TrustPillar icon={Globe} title="Grounded" desc="Verified against global institutional nodes." />
            </div>
         </div>
      </section>

      {/* 🎯 WHY TRUST US? */}
      <section className="text-center space-y-16 px-10">
         <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum uppercase">Institutional <span className="accent-text">Superiority.</span></h2>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em]">The Bedrock of Professional Integrity</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureBox title="Logic Matching" desc="Our Gemini-powered core identifies timeline fractures that human auditors miss by analyzing 4000+ data points." />
            <FeatureBox title="Digital DNA" desc="Pixel-level forensic analysis detects document tampering, template manipulation, and metadata forgery instantly." />
            <FeatureBox title="Neural Schema" desc="An evolving database architecture that learns and adapts to new fraud vectors as they appear globally." />
         </div>
      </section>

      {/* 📞 CONTACT QUICK ACCESS */}
      <section className="bg-white border-4 border-zinc-950 rounded-[4rem] p-16 flex flex-col xl:flex-row items-center justify-between gap-12 mx-10 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-zinc-900"></div>
         <div className="space-y-4 text-center xl:text-left max-w-xl">
            <h3 className="text-4xl font-black text-zinc-900 font-quantum">Ready to Secure <br />Your Pipeline?</h3>
            <p className="text-lg text-zinc-500 font-medium leading-relaxed">Uplink with our Forensic Desk for a private <span className="text-zinc-900 font-bold">institutional demonstration</span>.</p>
         </div>
         
         <div className="flex flex-col gap-6 w-full xl:w-auto">
            {/* Contact Information Hub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-6 bg-zinc-50 rounded-3xl border-2 border-zinc-100 shadow-sm min-w-fit">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600 border border-zinc-100">
                        <MessageSquare size={24} />
                    </div>
                    <div className="whitespace-nowrap">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Forensic Hotline</p>
                        <p className="text-lg font-black text-zinc-900 tracking-tight">+91 96422 76736</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-zinc-50 rounded-3xl border-2 border-zinc-100 shadow-sm min-w-fit">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600 border border-zinc-100">
                        <Mail size={24} />
                    </div>
                    <div className="whitespace-nowrap">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Protocol Email</p>
                        <p className="text-sm font-black text-zinc-900">veritrustx.protocol@gmail.com</p>
                    </div>
                </div>
            </div>

            <button 
               onClick={onContact} 
               className="w-full py-6 bg-zinc-900 text-white font-black rounded-3xl uppercase text-xs tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-900/20 active:scale-95 flex items-center justify-center gap-3"
            >
               Initiate Strategic Uplink <ArrowRight size={18} />
            </button>
         </div>
      </section>

      <div className="text-center pt-10 border-t border-zinc-100 mx-10">
        <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em]">© 2026 VeriTrustX Protocol • Global Integrity Standard • Intellectual Property of Challa Aditya</p>
      </div>
    </div>
  );
};

const TrustPillar = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 bg-white rounded-[2.5rem] border-2 border-zinc-100 shadow-sm space-y-4 hover:border-emerald-200 transition-colors group">
     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:scale-110 transition-transform"><Icon size={24} /></div>
     <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest">{title}</h4>
     <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const FeatureBox = ({ title, desc }: any) => (
  <div className="p-12 bg-zinc-50 border-2 border-zinc-100 rounded-[3.5rem] space-y-6 hover:border-indigo-500 hover:bg-white transition-all text-left group shadow-sm hover:shadow-xl">
     <div className="w-14 h-14 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
        <ShieldCheck size={32} />
     </div>
     <h4 className="text-2xl font-black text-zinc-900 font-quantum uppercase">{title}</h4>
     <p className="text-sm text-zinc-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;
