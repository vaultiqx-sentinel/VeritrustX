import React, { useState } from 'react';
import { 
  Search, Target, Users, TrendingUp, Handshake, 
  DollarSign, Mail, Globe, Filter, Loader2, 
  BarChart3, ShieldAlert, Rocket, ArrowUpRight, 
  Briefcase, Send, ChevronRight
} from 'lucide-react';

const ClientAcquisition: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  const scanForLeads = () => {
    setIsScanning(true);
    setTimeout(() => {
      setLeads([
        { name: "Nexus Fintech", risk: "Critical", potential: "Enterprise", sector: "Payment Processing" },
        { name: "Global EdCore", risk: "High", potential: "Subscription", sector: "Higher Education" },
        { name: "CryptoSafe Nodes", risk: "Extreme", potential: "Whitelabel", sector: "Web3/DeFi" },
      ]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Funding Status Bar */}
      <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-indigo-900/40">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/20 rounded-2xl"><DollarSign size={32} /></div>
          <div>
            <h3 className="text-xl font-black">Pre-Seed Funding Radar</h3>
            <p className="text-sm font-medium text-indigo-100">Project currently seeking strategic "Alpha Partners" for first-round deployment.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 px-6 py-3 rounded-xl border border-white/20 text-center">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Valuation Target</p>
             <p className="text-xl font-black">₹4.5Cr</p>
          </div>
          <button className="px-8 py-3 bg-white text-indigo-600 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
             Pitch Deck
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Lead Generation Radar */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-slate-900/50 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32"></div>
              
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-white">Lead <span className="text-indigo-500">Radar</span></h3>
                    <p className="text-sm text-slate-500 font-medium">Identify high-growth companies with massive BGV vulnerabilities.</p>
                 </div>
                 <button 
                  onClick={scanForLeads}
                  disabled={isScanning}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-500 transition-all disabled:opacity-50"
                 >
                    {isScanning ? <Loader2 className="animate-spin" /> : <Search size={16} />}
                    Scan High-Risk Sectors
                 </button>
              </div>

              {leads.length > 0 ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                   {leads.map((lead, i) => (
                     <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <Briefcase size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-white">{lead.name}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{lead.sector}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Risk Level</p>
                              <p className="text-xs font-black text-red-500">{lead.risk}</p>
                           </div>
                           <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                              <Mail size={16} />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="h-64 border-2 border-dashed border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-center p-12 space-y-4">
                   <Globe size={48} className="text-slate-700" />
                   <p className="text-slate-500 text-sm font-medium">Neural sensors ready. Hit "Scan" to find entities currently hiring aggressively with no BGV protocol.</p>
                </div>
              )}
           </div>

           {/* Outreach Playbook */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900/30 border border-white/5 rounded-[2.5rem] space-y-4">
                 <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <Target className="text-orange-500" /> The VC Bait
                 </h4>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                    "I noticed your portfolio company [Name] is hiring 20+ devs. Legacy BGV will take 15 days. We do it in 2. Want the forensic proof?"
                 </p>
              </div>
              <div className="p-8 bg-slate-900/30 border border-white/5 rounded-[2.5rem] space-y-4">
                 <h4 className="text-lg font-black text-white flex items-center gap-2">
                    <TrendingUp className="text-emerald-500" /> The FOMO Logic
                 </h4>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                    "80% of remote hires in your sector are inflating skills. We are the identity firewall that stops the leakage."
                 </p>
              </div>
           </div>
        </div>

        {/* Right Column: Investor Hub */}
        <div className="space-y-8">
           <div className="p-8 bg-slate-900 border border-white/10 rounded-[3rem] space-y-8">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                 <Users className="text-indigo-500" /> Investor Pipeline
              </h3>
              <div className="space-y-6">
                 <InvestorItem name="Sequoia-Style Lead" status="Intro Required" color="text-slate-500" />
                 <InvestorItem name="Angel List Group" status="Deck Sent" color="text-indigo-400" />
                 <InvestorItem name="GovTech VC Fund" status="Pitch Scheduled" color="text-emerald-500" />
              </div>
              <button className="w-full py-4 border border-white/10 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                 Add Prospect
              </button>
           </div>

           <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-3">
                 <ShieldAlert size={20} className="text-red-500" />
                 <h4 className="text-sm font-black text-white uppercase tracking-widest">Fraud Alert Stats</h4>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-slate-600">Resume Inflation</span>
                    <span className="text-red-500">+42%</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-slate-600">Proxy Interviewing</span>
                    <span className="text-red-500">+12%</span>
                 </div>
                 <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium">Use these stats in your cold emails to trigger decision-maker anxiety.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const InvestorItem = ({ name, status, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-all">
     <div>
        <p className="text-xs font-black text-white">{name}</p>
        <p className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${color}`}>{status}</p>
     </div>
     <ArrowUpRight size={14} className="text-slate-700 group-hover:text-indigo-500" />
  </div>
);

export default ClientAcquisition;