
import React from 'react';
import { TrendingDown, Clock, ShieldCheck, DollarSign, Target, Zap, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

const BusinessValue: React.FC = () => {
  const roiMetrics = [
    {
      title: "Cost Avoidance",
      value: "₹50L+",
      desc: "Avg loss saved per 'Bad Hire' detection (Salary + Churn + Loss of Equity).",
      icon: DollarSign,
      color: "text-emerald-500"
    },
    {
      title: "Time Compression",
      value: "92%",
      desc: "Reduction in verification lag compared to manual BGV vendors.",
      icon: Clock,
      color: "text-blue-500"
    },
    {
      title: "Detection Rate",
      value: "4.5x",
      desc: "More anomalies found than standard human-led HR phone screening.",
      icon: Target,
      color: "text-red-500"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">
          The <span className="text-red-600">Organization</span> Value Matrix
        </h2>
        <p className="text-lg text-slate-400 font-medium leading-relaxed">
          How VeritrustX transforms recruitment from a "Cost Center" to a "Risk Management" superpower.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roiMetrics.map((m, i) => (
          <div key={i} className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 hover:border-red-500/20 transition-all">
            <div className={`p-4 bg-white/5 rounded-2xl ${m.color} w-fit mb-6`}>
              <m.icon size={28} />
            </div>
            <h4 className="text-3xl font-black text-white mb-2">{m.value}</h4>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{m.title}</p>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 space-y-8">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <ShieldCheck className="text-red-600" /> Operational Outcomes
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1"><CheckCircle2 className="text-red-500" size={18} /></div>
              <div>
                <h4 className="text-lg font-black text-white mb-1">Secure Culture</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Prevent 'Zombies' (falsified skill profiles) from entering your engineering layers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><CheckCircle2 className="text-red-500" size={18} /></div>
              <div>
                <h4 className="text-lg font-black text-white mb-1">Legal Immunity</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Reject fraudulent candidates using objective data points instead of subjective bias.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1"><CheckCircle2 className="text-red-500" size={18} /></div>
              <div>
                <h4 className="text-lg font-black text-white mb-1">Audit Readiness</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Automatically generate SOC2 compliant audit logs for every recruitment decision.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 p-10 rounded-[3rem] border border-red-500/20 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -mr-32 -mt-32"></div>
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <Zap className="text-red-500" /> Use Cases by Role
          </h3>
          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
              <h4 className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">CEO / Founder</h4>
              <p className="text-sm text-slate-300 font-medium leading-relaxed italic">"Protect company equity by ensuring every key hire is who they say they are."</p>
            </div>
            <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5">
              <h4 className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">HR Director</h4>
              <p className="text-sm text-slate-300 font-medium leading-relaxed italic">"Automate 90% of manual verification work. Focus team on 'Human Fit'."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessValue;
