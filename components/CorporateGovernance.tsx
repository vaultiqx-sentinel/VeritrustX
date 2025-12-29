
import React, { useState } from 'react';
import { ShieldAlert, Scale, Globe2, Lock, EyeOff, ShieldCheck } from 'lucide-react';

const ComplianceItem = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
     <div className="flex items-center gap-3">
        <Lock size={16} className="text-slate-400" />
        <span className="text-sm font-bold text-slate-300">{label}</span>
     </div>
     <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-emerald-500" />
        <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{status}</span>
     </div>
  </div>
);

const CorporateGovernance: React.FC = () => {
  const [neutralMode, setNeutralMode] = useState(false);

  const systemicRisks = [
    { area: "Regional Credential Inflation", risk: "High", trend: "Increasing in Fintech Sector", impact: "Regulatory Fines" },
    { area: "Ghost Entity Proliferation", risk: "Medium", trend: "Stable", impact: "Operational Disruption" },
    { area: "Institutional Bias", risk: "Low", trend: "Decreasing (AI Managed)", impact: "Legal Liability" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">
          Institutional <span className="text-orange-600">Safety & Neutrality</span>
        </h2>
        <p className="text-lg text-slate-400 font-medium leading-relaxed">
          At the enterprise level, verification isn't just a task—it's **Governance**. Protect the organization from systemic fraud while maintaining absolute regulatory neutrality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-10 rounded-[3rem] border-2 transition-all ${neutralMode ? 'bg-slate-900 text-white border-orange-500 shadow-2xl shadow-orange-900/40' : 'bg-white/5 border-white/10 text-white'}`}>
           <div className="flex justify-between items-start mb-8">
              <div className={`p-4 rounded-2xl ${neutralMode ? 'bg-orange-600' : 'bg-white/5 text-slate-400'}`}>
                 <EyeOff size={28} />
              </div>
              <button 
                onClick={() => setNeutralMode(!neutralMode)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${neutralMode ? 'bg-white text-slate-900' : 'bg-orange-600 text-white'}`}
              >
                {neutralMode ? 'Neutrality Active' : 'Activate Neutrality'}
              </button>
           </div>
           <h3 className="text-2xl font-black mb-3">Bias-Free Audit Protocol</h3>
           <p className={`text-sm font-medium leading-relaxed mb-6 ${neutralMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Automatically redacts names, photos, and demographic data. Decisions are forced to be made on **Verification Data** alone.
           </p>
           {neutralMode && (
             <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 animate-pulse">
                <ShieldCheck className="text-emerald-500" size={18} />
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Decision Data Sanitized</span>
             </div>
           )}
        </div>

        <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 text-white shadow-sm space-y-8">
           <h3 className="text-xl font-black flex items-center gap-2">
              <Globe2 className="text-blue-500" /> Regulatory Sovereignty
           </h3>
           <div className="space-y-4">
              <ComplianceItem label="GDPR Right-to-Erasure" status="Compliant" />
              <ComplianceItem label="SOC2 Type II Audit Log" status="Compliant" />
              <ComplianceItem label="ISO 27001 Data Encryption" status="Compliant" />
           </div>
        </div>
      </div>

      <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden border border-white/5">
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[100px] -mr-32 -mt-32"></div>
         <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-4">
               <div className="p-4 bg-emerald-600 rounded-2xl shadow-xl"><ShieldAlert size={28} /></div>
               <div>
                  <h3 className="text-3xl font-black">Systemic Risk Heatmap</h3>
                  <p className="text-slate-400 font-medium">Protect the organization from large-scale fraudulent infiltration.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {systemicRisks.map((risk, i) => (
                 <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{risk.area}</span>
                       <span className={`text-[9px] font-black px-3 py-1 rounded-full bg-orange-500 text-white`}>{risk.risk} Risk</span>
                    </div>
                    <p className="text-lg font-black text-white">{risk.trend}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CorporateGovernance;
