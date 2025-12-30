import React from 'react';
import { TrendingDown, Clock, ShieldCheck, DollarSign, Target, Zap, CheckCircle2, AlertTriangle, Users, Award, BarChart3 } from 'lucide-react';

const BusinessValue: React.FC = () => {
  const roiMetrics = [
    {
      title: "Cost Avoidance",
      value: "₹50L+",
      desc: "Avg loss saved per 'Bad Hire' detection (Salary + Churn + Equity).",
      icon: DollarSign,
      color: "text-emerald-400"
    },
    {
      title: "Time Compression",
      value: "92%",
      desc: "Reduction in verification lag compared to manual BGV vendors.",
      icon: Clock,
      color: "text-indigo-400"
    },
    {
      title: "Detection Rate",
      value: "4.5x",
      desc: "More anomalies found than standard human-led HR screening.",
      icon: Target,
      color: "text-rose-400"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
           <BarChart3 size={14} className="text-indigo-400" />
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Institutional ROI Matrix</span>
        </div>
        <h2 className="text-5xl font-black text-zinc-900 tracking-tight leading-tight">
          The <span className="text-indigo-600">Organization</span> <br /> Value Theorem
        </h2>
        <p className="text-lg text-zinc-500 font-medium leading-relaxed italic">
          Quantifying the transition from "Subjective Trust" to "Forensic Logic."
        </p>
      </div>

      {/* 🟢 DARKENED VALUE MATRIX CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roiMetrics.map((m, i) => (
          <div key={i} className="bg-zinc-950 p-10 rounded-[3.5rem] border-2 border-zinc-800 shadow-2xl hover:border-indigo-500 transition-all group">
            <div className={`p-4 bg-white/5 rounded-2xl ${m.color} w-fit mb-8 group-hover:scale-110 transition-transform`}>
              <m.icon size={32} />
            </div>
            <h4 className="text-4xl font-black text-white mb-2">{m.value}</h4>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">{m.title}</p>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* STRATEGIC IMPACT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white border-4 border-zinc-100 p-12 rounded-[4rem] space-y-8 shadow-sm">
          <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-3 font-quantum">
            <ShieldCheck className="text-emerald-500" /> Operational Outcomes
          </h3>
          <div className="space-y-8">
            <OutcomeItem title="Institutional Integrity" desc="Prevent 'Shadow Experts' from entering high-privilege engineering layers." />
            <OutcomeItem title="Legal Immunity" desc="Objective logic-gate audits that replace subjective hiring bias." />
            <OutcomeItem title="Capital Efficiency" desc="Stop the bleed of recruitment marketing spend on fraudulent profiles." />
          </div>
        </div>

        <div className="bg-zinc-900 p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
          <h3 className="text-2xl font-black flex items-center gap-3 font-quantum">
            <Award className="text-indigo-400" /> Strategic Scaling
          </h3>
          <div className="space-y-6 relative z-10">
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">For Founders & CEOs</p>
                <p className="text-lg font-medium leading-relaxed italic text-zinc-300">"Protect your cap table by ensuring every early hire is a verified high-trust asset."</p>
             </div>
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">For HR Directors</p>
                <p className="text-lg font-medium leading-relaxed italic text-zinc-300">"Remove the BGV bottleneck and accelerate hiring velocity by 10x."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OutcomeItem = ({ title, desc }: any) => (
  <div className="flex gap-4 group">
    <div className="mt-1"><CheckCircle2 className="text-emerald-500 group-hover:scale-110 transition-transform" size={20} /></div>
    <div>
      <h4 className="text-lg font-black text-zinc-900 mb-1">{title}</h4>
      <p className="text-sm text-zinc-500 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default BusinessValue;