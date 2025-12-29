
import React, { useState } from 'react';
import { Target, MessageSquare, ShieldAlert, BarChart3, Copy, Zap, Users, Search, HelpCircle, ShieldCheck, Scale, AlertTriangle, Coins, ZapOff } from 'lucide-react';

const IntelligenceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'outreach' | 'objections' | 'ceo-logic'>('ceo-logic');

  const ceoObjections = [
    {
      q: "What if your 'Pixel DNA' flags a genius and I lose them?",
      a: "VeriTrust categorizes results. We don't 'Reject'. We provide a 'Forensic Flag' for you to have a 5-minute honest chat with the candidate. If it's a false positive, the audit shows it as 'Inconclusive', not 'Fraud'. You keep the talent; you just lose the risk.",
      benefit: "Talent Retention",
      icon: Target
    },
    {
      q: "Is this report legally defensible if I'm sued?",
      a: "We don't provide character judgments. We provide 'Material Facts'. 'This GST number didn't exist in 2015' is an objective government record. You aren't rejecting them on a 'feeling', but on verifiable data discrepancies.",
      benefit: "Legal Safeguard",
      icon: Scale
    },
    {
      q: "What if they used a poor-quality scanner at a local shop?",
      a: "Our AI distinguishes between 'Uniform Noise' (bad hardware) and 'Local Artifacts' (digital tampering). If a document is just low-quality, it's flagged for 'Manual Verification'. We never cry wolf over a bad scanner.",
      benefit: "Accuracy Guarantee",
      icon: ZapOff
    },
    {
      q: "Why pay ₹15k when my HR calls references for free?",
      a: "Your HR's time isn't free—it's expensive. More importantly, HR catches 'Stories'. We catch 'Systems'. HR can't see if a reference's LinkedIn was created 2 days ago. We save you the ₹50L cost of a bad hire's churn.",
      benefit: "High ROI",
      icon: Coins
    },
    {
      q: "Can't they just have a friend lie for them on the phone?",
      a: "We audit the reference, not just the call. If the 'Manager' and 'Candidate' have a digital footprint of being cousins or best friends that predates the job, our Social Linkage Audit flags the conflict of interest.",
      benefit: "Fraud Prevention",
      icon: Users
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
          Guerilla <span className="text-orange-600">Intelligence</span> Hub
        </h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          The CEO doesn't care about the tool. They care about **Risk, Speed, and the Bottom Line.**
        </p>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
         <button 
           onClick={() => setActiveTab('ceo-logic')}
           className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ceo-logic' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
         >
           CEO Counter-Logic
         </button>
         <button 
           onClick={() => setActiveTab('outreach')}
           className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'outreach' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Sniper Outreach
         </button>
         <button 
           onClick={() => setActiveTab('objections')}
           className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'objections' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Candidate Objections
         </button>
      </div>

      {activeTab === 'ceo-logic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
           <div className="md:col-span-2 bg-orange-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-orange-900/20">
              <div className="p-6 bg-white/20 rounded-3xl shrink-0">
                 <ShieldCheck size={48} />
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black">The "Business Owner" Mindset</h3>
                 <p className="text-orange-100 font-medium leading-relaxed">
                    When a CEO asks "Why?", don't talk about pixels. Talk about **Equity Protection**. A bad hire doesn't just cost a salary; they rot the culture and waste the most precious resource: **Time**.
                 </p>
              </div>
           </div>
           
           {ceoObjections.map((obj, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-orange-200 transition-all flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                      <obj.icon size={24} />
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      {obj.benefit}
                   </span>
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-3">CEO: "{obj.q}"</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 italic">
                   " {obj.a} "
                </p>
                <button className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors">
                   <Copy size={12} /> Copy Script
                </button>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'outreach' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center gap-3 mb-8">
                   <BarChart3 className="text-orange-500" />
                   <h3 className="text-xl font-black">Market Fraud Radar</h3>
                </div>
                <div className="space-y-6">
                   <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div>
                         <p className="text-xs font-black text-slate-500 uppercase tracking-widest">AI Engineering</p>
                         <p className="text-lg font-black mt-1 text-rose-500">+42% Inflation</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-500 uppercase">Risk</p>
                         <p className="text-xs font-black text-white uppercase">High</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-8">
             <div className="flex items-center gap-4">
                <div className="p-4 bg-orange-600 rounded-2xl text-white shadow-xl"><Target size={24} /></div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900">Personalized Scripting</h3>
                   <p className="text-sm text-slate-500 font-medium">Value-first messaging for Series-A founders.</p>
                </div>
             </div>
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ghost Audit Script</p>
                <p className="text-sm font-medium text-slate-700 italic">"Hi [Founder], I noticed you re-posted the [Role] position. In my recent audit of 500+ applicants, I found a 40% overlap in falsified project experience. Want to see the audit data for your industry?"</p>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'objections' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col group">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all mb-6">
                 <Search size={24} />
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-3 leading-tight">"This is a privacy violation."</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                 "Verification is a standard part of the 'Offer' stage. We don't invade privacy; we validate professional public and semi-public claims to ensure organizational safety."
              </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default IntelligenceHub;
