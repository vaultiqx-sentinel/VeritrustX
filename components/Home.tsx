import React from 'react';
import { 
  ShieldCheck, ArrowRight, Globe, Zap, 
  Award, Lock, Cpu, MessageSquare, 
  CheckCircle2, Fingerprint, Quote 
} from 'lucide-react';

interface HomeProps {
  onEnter: () => void;
  onContact: () => void;
}

const Home: React.FC<HomeProps> = ({ onEnter, onContact }) => {
  return (
    <div className="space-y-24 animate-in fade-in duration-1000 pb-20">
      
      {/* 🛡️ HERO SECTION: WHAT WE ARE */}
      <section className="relative py-20 overflow-hidden rounded-[4rem] bg-zinc-950 text-white border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,var(--brand-accent-glow),transparent_70%)] opacity-40"></div>
        <div className="relative z-10 px-12 md:px-20 max-w-4xl space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Institutional Protocol v1.7 Live</span>
           </div>
           <h1 className="text-7xl font-black tracking-tight leading-none font-quantum">
              The Standard <br /> for <span className="accent-text">Institutional</span> Truth.
           </h1>
           <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl">
              VeriTrustX is the world’s first **Neural Verification Mesh**. We protect organizations from the $50B global fraud crisis by converting professional identity into non-repudiable code.
           </p>
           <div className="flex gap-6">
              <button onClick={onEnter} className="px-10 py-5 accent-bg text-white font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-emerald-900/20">
                 Enter Neural Mesh <ArrowRight size={20} />
              </button>
              <button onClick={onContact} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                 Request Demo
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
               <Quote className="absolute -top-10 -left-10 text-indigo-100 opacity-50" size={80} />
               <p className="text-3xl font-black text-zinc-900 leading-tight italic relative z-10">
                  "Traditional background checks are a 20th-century solution to a 21st-century fraud crisis. VeriTrustX was engineered to make 'Trust' an immutable line of logic."
               </p>
            </div>
            <div className="space-y-6 text-lg text-zinc-500 font-medium leading-relaxed">
               <p>
                  Global hiring is facing a <strong>Truth Crisis</strong>. Industrialized resume fraud and AI-voice masking have made standard BGV a bottleneck for growth. 
               </p>
               <p>
                  As Founder, my mission is to move institutional security from human opinion into <strong>Forensic Neural Scrutiny</strong>. We don't just verify claims; we ground identities in absolute reality.
               </p>
            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-zinc-100">
               <div>
                  <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '42px' }} className="text-indigo-600">Challa Aditya</p>
                  <p className="text-sm font-black text-zinc-900 uppercase tracking-tighter">Challa Aditya</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Founder & CEO, VeriTrustX</p>
               </div>
            </div>
         </div>
         <div className="bg-zinc-50 rounded-[4rem] p-12 border-2 border-zinc-100 relative">
            <div className="grid grid-cols-2 gap-6">
               <TrustPillar icon={Zap} title="Zero-Lag" desc="Audits complete in <240 seconds, not weeks." />
               <TrustPillar icon={ShieldCheck} title="Non-Repudiable" desc="Results that hold legal and forensic weight." />
               <TrustPillar icon={Fingerprint} title="Biometric" desc="Ensuring continuity across interview cycles." />
               <TrustPillar icon={Globe} title="Grounded" desc="Verified against global institutional nodes." />
            </div>
         </div>
      </section>

      {/* 🎯 WHY TRUST US? */}
      <section className="text-center space-y-16">
         <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum">Why Organizations <br />Trust the <span className="accent-text">Mesh.</span></h2>
            <p className="text-zinc-500 font-medium italic uppercase text-xs tracking-widest">The Bedrock of Professional Integrity</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
            <FeatureBox title="Logic Matching" desc="Our Gemini-powered core identifies timeline fractures that human auditors miss by analyzing thousands of logic points." />
            <FeatureBox title="Digital DNA" desc="Pixel-level forensic analysis detects document tampering, template manipulation, and metadata forgery instantly." />
            <FeatureBox title="Neural Schema" desc="An evolving database architecture that learns and adapts to new fraud vectors as they appear globally." />
         </div>
      </section>

      {/* 📞 CONTACT QUICK ACCESS */}
      <section className="bg-white border-4 border-zinc-900 rounded-[4rem] p-16 flex flex-col md:flex-row items-center justify-between gap-12 mx-10">
         <div className="space-y-4 text-center md:text-left">
            <h3 className="text-4xl font-black text-zinc-900 font-quantum">Ready to Secure <br />Your Pipeline?</h3>
            <p className="text-lg text-zinc-500 font-medium">Uplink with our Forensic Desk for a private demonstration.</p>
         </div>
         <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex items-center gap-4 p-6 bg-zinc-50 rounded-3xl border-2 border-zinc-100">
               <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600"><MessageSquare size={24} /></div>
               <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Forensic Hotline</p>
                  <p className="text-xl font-black text-zinc-900">+91 96422 76736</p>
               </div>
            </div>
            <button onClick={onContact} className="w-full py-5 bg-zinc-900 text-white font-black rounded-[1.5rem] uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl">
               Initiate Strategic Uplink
            </button>
         </div>
      </section>
    </div>
  );
};

const TrustPillar = ({ icon: Icon, title, desc }: any) => (
  <div className="p-6 bg-white rounded-3xl border-2 border-zinc-100 shadow-sm space-y-3">
     <Icon className="text-emerald-500" size={24} />
     <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">{title}</h4>
     <p className="text-xs text-zinc-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const FeatureBox = ({ title, desc }: any) => (
  <div className="p-12 bg-zinc-50 border-2 border-zinc-100 rounded-[3rem] space-y-6 hover:border-emerald-500 transition-all text-left group">
     <div className="w-12 h-12 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
        <ShieldCheck size={28} />
     </div>
     <h4 className="text-2xl font-black text-zinc-900 font-quantum">{title}</h4>
     <p className="text-zinc-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Home;