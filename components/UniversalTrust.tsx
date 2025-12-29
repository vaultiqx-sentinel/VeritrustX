
import React, { useState } from 'react';
import { ShieldCheck, Scale, Globe2, Lock, EyeOff, Heart, Users, CheckCircle2, AlertTriangle, Zap, Fingerprint, Award } from 'lucide-react';

const UniversalTrust: React.FC = () => {
  const [neutralMode, setNeutralMode] = useState(false);
  const [orgSize, setOrgSize] = useState<'startup' | 'growing' | 'enterprise'>('startup');

  const marketTrends = [
    { area: "Skill Inflation", status: "Rising", context: "Common in Remote Tech Roles", color: "text-orange-600" },
    { area: "Credential Forgery", status: "Stable", context: "Local University Seals", color: "text-blue-600" },
    { area: "Identity Synthesis", status: "High Risk", context: "AI Generated Profile Photos", color: "text-rose-600" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full mb-4">
           <Heart size={14} className="text-emerald-600 fill-emerald-600" />
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Fairness for Everyone</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
          Universal <span className="text-orange-600">Trust Protocol</span>
        </h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          Truth shouldn't be a luxury. Whether you are a founder of one or a CEO of thousands, our neutrality engine ensures every professional interaction is built on **verified merit**.
        </p>
      </div>

      {/* Profile Selector */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
         <button 
           onClick={() => setOrgSize('startup')}
           className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orgSize === 'startup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Startup / Individual
         </button>
         <button 
           onClick={() => setOrgSize('growing')}
           className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orgSize === 'growing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Growing SME
         </button>
         <button 
           onClick={() => setOrgSize('enterprise')}
           className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orgSize === 'enterprise' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Enterprise
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* The Neutrality Engine */}
        <div className={`p-10 rounded-[3rem] border-2 transition-all ${neutralMode ? 'bg-emerald-950 text-white border-emerald-500 shadow-2xl shadow-emerald-900/40' : 'bg-white border-slate-200 shadow-sm'}`}>
           <div className="flex justify-between items-start mb-8">
              <div className={`p-4 rounded-2xl ${neutralMode ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                 <EyeOff size={28} />
              </div>
              <button 
                onClick={() => setNeutralMode(!neutralMode)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${neutralMode ? 'bg-white text-emerald-900' : 'bg-slate-900 text-white'}`}
              >
                {neutralMode ? 'Neutrality Active' : 'Enable Neutral Mode'}
              </button>
           </div>
           <h3 className="text-2xl font-black mb-3">Merit-First Vetting</h3>
           <p className={`text-sm font-medium leading-relaxed mb-8 ${neutralMode ? 'text-emerald-100/70' : 'text-slate-500'}`}>
              Removes all non-professional identifiers (Name, Age, Gender, Photo) from the dashboard. This ensures your decision is based 100% on **skill verification** and **integrity data**.
           </p>
           
           <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl border ${neutralMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                 <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">Bias Risk</p>
                 <p className="text-sm font-bold">{neutralMode ? 'Eliminated' : 'Moderate'}</p>
              </div>
              <div className={`p-4 rounded-2xl border ${neutralMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                 <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">Legal Safety</p>
                 <p className="text-sm font-bold">Guaranteed</p>
              </div>
           </div>
        </div>

        {/* Market Integrity Radar */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="text-orange-600" /> Market Integrity Radar
           </h3>
           <div className="space-y-4">
              {marketTrends.map((trend, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-orange-200 transition-colors">
                   <div>
                      <p className="text-sm font-bold text-slate-800">{trend.area}</p>
                      <p className="text-[10px] font-medium text-slate-400">{trend.context}</p>
                   </div>
                   <div className="text-right">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${trend.color}`}>{trend.status}</p>
                   </div>
                </div>
              ))}
           </div>
           <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Updates from Global Audit Network</p>
        </div>
      </div>

      {/* Safety Manifesto for All */}
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/10 to-transparent"></div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
               <h3 className="text-3xl font-black">Safety as a Right, <br />Not a Privilege.</h3>
               <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl">
                  In a world of remote work and digital personas, trust is the only currency that matters. VeriTrust gives the "Little Guy" the same forensic tools used by the Fortune 500.
               </p>
               <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl">
                     <Lock className="text-orange-500" size={18} />
                     <span className="text-xs font-bold uppercase tracking-widest">Encryption Standard</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl">
                     <Globe2 className="text-emerald-500" size={18} />
                     <span className="text-xs font-bold uppercase tracking-widest">GDPR Universal</span>
                  </div>
               </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] flex flex-col items-center justify-center text-center">
               <Award className="text-orange-500 mb-4" size={48} />
               <h4 className="text-xl font-black mb-2">Neutral Arbiter</h4>
               <p className="text-xs text-slate-500 leading-relaxed">
                  We stand between the candidate and the business to protect the truth for both.
               </p>
            </div>
         </div>
      </div>

      {/* Universal Trust Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <BenefitCard 
           icon={Users} 
           title="For The Candidate" 
           desc="Your hard-earned skills are verified once and owned by you. No more endless re-proving." 
         />
         <BenefitCard 
           icon={ShieldCheck} 
           title="For The Business" 
           desc="Hire with confidence. Know exactly who is coming into your culture before they sign." 
         />
         <BenefitCard 
           icon={Scale} 
           title="For The World" 
           desc="A fair market where merit beats manipulation. Every single time." 
         />
      </div>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-emerald-200 transition-all">
     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
        <Icon size={24} />
     </div>
     <h4 className="text-lg font-black text-slate-900 mb-2">{title}</h4>
     <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default UniversalTrust;
