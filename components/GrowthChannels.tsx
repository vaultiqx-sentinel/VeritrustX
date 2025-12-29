
import React from 'react';
import { Network, TrendingUp, Search, ShieldCheck, Mail, Users, Rocket, ExternalLink, Briefcase, Zap, AlertCircle } from 'lucide-react';

const GrowthChannels: React.FC = () => {
  const channels = [
    {
      name: "The VC Network",
      icon: Network,
      strategy: "Pitch to Portfolio Support",
      logic: "VCs lose money when startups hire poorly. Position as 'Capital Protection'.",
      impact: "High / Long-term",
      playbook: [
        "Identify mid-tier VC firms on Crunchbase.",
        "Email the 'Head of Talent' or 'Portfolio Support'.",
        "Offer a white-label verification portal for their startups."
      ]
    },
    {
      name: "Wellfound Sniper",
      icon: Briefcase,
      strategy: "Target Hyper-Growth Churn",
      logic: "Startups hiring 5+ senior roles at once are at peak risk for fraud.",
      impact: "Medium / Instant",
      playbook: [
        "Filter Wellfound for companies with 10+ open roles.",
        "Identify the 'Founding Engineer' or CTO.",
        "Send the 'Ghost Audit' for their most critical role."
      ]
    },
    {
      name: "Founder Slacks",
      icon: Users,
      strategy: "Value-First Community Infiltration",
      logic: "Founders trust other founders more than ads.",
      impact: "Very High / Trust-based",
      playbook: [
        "Join niche Slack groups (Founder University, etc.).",
        "Don't sell. Share 'Case Studies' of caught resume fraud.",
        "Wait for the 'How did you catch that?' question."
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
          Beyond <span className="text-orange-600">The Social Noise</span>
        </h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          LinkedIn and Twitter are saturated. These are the **Dark Channels** where the real high-ticket deals are closed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {channels.map((channel, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white mb-8 group-hover:bg-orange-600 transition-colors shadow-lg">
               <channel.icon size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{channel.name}</h3>
            <p className="text-xs font-black text-orange-600 uppercase tracking-widest mb-4">{channel.strategy}</p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">{channel.logic}</p>
            
            <div className="space-y-4">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Playbook</p>
               {channel.playbook.map((step, si) => (
                 <div key={si} className="flex gap-3 text-sm font-bold text-slate-700">
                    <div className="shrink-0 w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] text-slate-400">{si + 1}</div>
                    <p>{step}</p>
                 </div>
               ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Impact: {channel.impact}</span>
               <button className="p-2 bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-xl transition-all">
                  <ExternalLink size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* VC Pitch Tool */}
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] -mr-32 -mt-32"></div>
         <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-500">
                  <Zap size={14} className="fill-orange-500" /> High-Ticket Conversion Engine
               </div>
               <h3 className="text-4xl font-black leading-tight">The "Capital Protection" <br />VC Outreach Logic</h3>
               <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  VCs care about the ROI of their investments. Frame your tool as a risk management protocol that saves them from "Zombies" (Founders who hire friends/liars instead of talent).
               </p>
               <button className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-orange-900/40">
                  Generate Custom VC Email
               </button>
            </div>
            <div className="w-full lg:w-96 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
               <div className="flex items-center gap-3">
                  <AlertCircle className="text-orange-500" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-300">Target Analytics</p>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                     <span className="text-sm font-medium text-slate-500">Conversion Rate</span>
                     <span className="text-sm font-black text-emerald-500">42.5%</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                     <span className="text-sm font-medium text-slate-500">Avg. Contract Value</span>
                     <span className="text-sm font-black text-orange-500">₹4.5L+</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                     <span className="text-sm font-medium text-slate-500">Trust Factor</span>
                     <span className="text-sm font-black text-blue-500">Enterprise</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GrowthChannels;
