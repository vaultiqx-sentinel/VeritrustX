
import React from 'react';
import { ShieldCheck, Users, Search, AlertCircle, CheckCircle2, XCircle, Zap, BarChart3, Target, Globe, Timer, ArrowDownWideNarrow, ZapOff, Clock, Info } from 'lucide-react';

const MarketPosition: React.FC = () => {
  const comparison = [
    { feature: "Turnaround Time", legacy: "15 - 21 Days", veritrust: "Instant / < 24 Hours", advantage: "95% Faster", tip: "Legacy vendors rely on manual call centers; VeritrustX uses parallel neural logic." },
    { feature: "Verification Method", legacy: "Manual Phone Calls / Emails", veritrust: "AI Forensic Scrutiny", advantage: "Error-Free", tip: "Humans are prone to social engineering; our AI identifies digital signatures and logic gaps." },
    { feature: "Cost per Audit", legacy: "₹10,000 - ₹25,000", veritrust: "₹5,000 - ₹10,000", advantage: "60% Cheaper", tip: "Operational overhead is reduced by 90%, passing the savings directly to the client." },
    { feature: "Fraud Detection", legacy: "Surface Level (Identity)", veritrust: "Forensic (Logic/Tenure)", advantage: "Deep Logic", tip: "Standard checks miss 'ghost companies'; we audit the registry data and social linkage." },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4 leading-tight">
          The <span className="text-red-600">Liquidation</span> Edge
        </h2>
        <p className="text-lg text-slate-400 font-medium leading-relaxed italic">
          Traditional BGV vendors are using 1990s technology for a 2025 fraud landscape. VeritrustX automates the manual labor, delivering **Truth** at the speed of light.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 space-y-8 relative group" title="Standard BGV vendor workflow involving heavy manual intervention.">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-slate-500 flex items-center gap-2">
                   <Clock className="text-slate-600" /> Legacy BGV Process
                </h3>
                <span className="text-[10px] font-black bg-slate-800 px-2 py-1 rounded text-slate-500">INEFFICIENT</span>
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-600">
                     <span>Manual Reference Calling</span>
                     <span>80% Workload</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                     <div className="w-4/5 h-full bg-slate-600"></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-600">
                     <span>Candidate Wait Time</span>
                     <span>14+ Days</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                     <div className="w-full h-full bg-slate-700"></div>
                  </div>
               </div>
               <div className="pt-4 border-t border-slate-800 text-center opacity-50">
                  <p className="text-2xl font-black text-slate-600">Status: Obsolescent</p>
               </div>
            </div>
         </div>

         <div className="bg-red-600/10 p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden border border-red-500/20 shadow-2xl shadow-red-900/10" title="VeritrustX neural protocol automating the heavy lifting.">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -mr-32 -mt-32"></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="text-xl font-black flex items-center gap-2">
                   <Zap className="text-red-500" /> VeritrustX Mesh
                </h3>
                <span className="text-[10px] font-black bg-red-600/20 px-2 py-1 rounded text-red-400">NEURAL-AUTOMATED</span>
            </div>
            <div className="space-y-6 relative z-10">
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                     <span>Neural Scrutiny (Auto)</span>
                     <span>92% Efficiency</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-[92%] h-full bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                     <span>Auditor Verification</span>
                     <span>8% Review</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-[8%] h-full bg-white"></div>
                  </div>
               </div>
               <div className="pt-4 border-t border-white/10 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ArrowDownWideNarrow className="text-emerald-500" />
                    <p className="text-2xl font-black text-emerald-500 uppercase tracking-tight">Zero-Lag Integrity</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-slate-900/50 rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-0 overflow-x-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Comparison Metric</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Legacy BGV</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-red-500">VeritrustX</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-emerald-500 text-right">Yield Advantage</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {comparison.map((row, i) => (
                   <tr key={i} className="hover:bg-white/5 transition-colors group cursor-help" title={row.tip}>
                      <td className="px-10 py-6 text-sm font-black text-white flex items-center gap-3">
                        {row.feature}
                        <Info size={12} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                      <td className="px-10 py-6 text-sm text-slate-500 font-medium">{row.legacy}</td>
                      <td className="px-10 py-6 text-sm font-black text-white flex items-center gap-2">
                         <div className="w-1 h-4 bg-red-600 rounded-full"></div> {row.veritrust}
                      </td>
                      <td className="px-10 py-6 text-right">
                         <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 uppercase tracking-widest">{row.advantage}</span>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-12 bg-red-600 rounded-[3rem] text-white shadow-2xl shadow-red-900/20">
         <div className="space-y-2">
            <h4 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Zap size={24} className="fill-white" /> The Revenue Arbiter
            </h4>
            <p className="font-medium text-red-100 max-w-xl leading-relaxed">
               Traditional firms overcharge for slow, manual processes. By automating the verification logic, you can deliver reports for 50% less while retaining a massive profit margin.
            </p>
         </div>
         <div className="px-10 py-6 bg-slate-950 rounded-[2rem] text-center border border-white/10 shadow-xl">
            <span className="text-4xl font-black text-white">90%</span>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mt-1">Margin Potential</p>
         </div>
      </div>
    </div>
  );
};

export default MarketPosition;
