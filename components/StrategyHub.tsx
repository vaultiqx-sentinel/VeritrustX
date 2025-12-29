import React, { useState } from 'react';
import { 
  Rocket, Target, Users2, Zap, ArrowRight, DollarSign, MessageSquare, 
  Calculator, Flag, Search, Briefcase, ZapOff, ShieldAlert, 
  Calendar, CheckCircle2, UserCircle, Building2, TrendingUp, 
  Clock, Mail, Copy, MousePointer2, ChevronRight, Handshake,
  AlertCircle, ChevronDown, Check
} from 'lucide-react';

type Persona = 'ceo' | 'hr' | 'vc';
type Priority = 'high' | 'medium' | 'low';

export default function StrategyHub() {
  const [auditsPerMonth, setAuditsPerMonth] = useState(15);
  const [pricePerAudit, setPricePerAudit] = useState(10000);
  const [activePersona, setActivePersona] = useState<Persona>('ceo');
  const [copied, setCopied] = useState(false);
  
  // Task priorities state
  const [taskPriorities, setTaskPriorities] = useState<Record<string, Priority>>({
    "Day 01": "high",
    "Day 03": "high",
    "Day 05": "medium",
    "Day 07": "low"
  });

  const personas = {
    ceo: {
      title: "The Founder / CEO",
      hook: "Equity Protection",
      pain: "Cost of bad hire (₹50L+), culture rot, slow scaling.",
      script: "Hi [Name], your current BGV vendor is a speed bottleneck. Top talent won't wait 15 days for a background check—they'll go to your competitor. VeritrustX delivers forensic truth in 24 hours, protecting your equity from 'Ghost Hires' while accelerating your hiring velocity by 90%."
    },
    hr: {
      title: "HR / Talent Director",
      hook: "Workload Reduction",
      pain: "Manual follow-ups, slow vendors, 'candidate drop-off' risk.",
      script: "Hi [Name], I noticed you're scaling the engineering team. Most BGV vendors are black boxes that take 2 weeks. VeritrustX automates the manual logic checks, eliminating 90% of your team's follow-up workload and ensuring you don't lose candidates during the 'Trust Gap'."
    },
    vc: {
      title: "VC Portfolio Manager",
      hook: "Capital Preservation",
      pain: "Portfolio startups hiring poorly, wasting seed capital.",
      script: "Hi [Name], we've built a Forensic Identity Protocol specifically for high-growth startups. We help your portfolio companies avoid 'Zombies' (falsified skill profiles) that drain capital. Can we set up a white-label verification portal for your founders?"
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(personas[activePersona].script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updatePriority = (day: string, p: Priority) => {
    setTaskPriorities(prev => ({ ...prev, [day]: p }));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
             <Rocket size={14} className="text-indigo-400" />
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Guerilla Growth Engine</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            Client <span className="text-indigo-600">Acquisition</span> Playbook
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mt-2">
            Disrupting the slow, manual BGV industry with speed and forensic logic.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left: Outreach Playbook */}
        <div className="xl:col-span-2 space-y-10">
          <div className="bg-white rounded-[3rem] border border-slate-100 p-10 space-y-8 shadow-xl">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <Calendar className="text-indigo-500" /> 30-Day Execution Strategy
                </h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1.5 text-[8px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded">High Priority</span>
                  <span className="flex items-center gap-1.5 text-[8px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded">Medium</span>
                  <span className="flex items-center gap-1.5 text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">Low</span>
                </div>
             </div>
             
             <div className="relative space-y-8 before:absolute before:left-[1.65rem] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
                <PlaybookStep 
                  day="Day 01" 
                  title="The Vulnerability Hook" 
                  desc="Identify firms hiring for Senior roles. Send a 'Market Risk Report' regarding resume fraud in their specific niche."
                  icon={Target}
                  priority={taskPriorities["Day 01"]}
                  onPriorityChange={(p: Priority) => updatePriority("Day 01", p)}
                />
                <PlaybookStep 
                  day="Day 03" 
                  title="The Speed Arbitrage" 
                  desc="Offer a 'Zero-Lag' audit on their current top 3 candidates. Use the 24-hour turnaround as the primary hook."
                  icon={Zap}
                  priority={taskPriorities["Day 03"]}
                  onPriorityChange={(p: Priority) => updatePriority("Day 03", p)}
                />
                <PlaybookStep 
                  day="Day 05" 
                  title="Forensic Verdict Demo" 
                  desc="Show them the 'Pixel DNA' and 'Logic Fracture' reports. Seeing the truth they missed is the 'Aha' moment."
                  icon={Search}
                  priority={taskPriorities["Day 05"]}
                  onPriorityChange={(p: Priority) => updatePriority("Day 05", p)}
                />
                <PlaybookStep 
                  day="Day 07" 
                  title="Partnership Onboarding" 
                  desc="Move from transactional audits to a subscription 'Trust-as-a-Service' model baked into their ERP."
                  icon={Handshake}
                  priority={taskPriorities["Day 07"]}
                  onPriorityChange={(p: Priority) => updatePriority("Day 07", p)}
                  isLast
                />
             </div>
          </div>

          {/* Persona Pitcher */}
          <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-xl">
             <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <MessageSquare className="text-indigo-500" /> Sniper Outreach Scripts
                </h3>
             </div>
             <div className="p-10 space-y-8">
                <div className="flex flex-wrap gap-4">
                   {(Object.keys(personas) as Persona[]).map((p) => (
                     <button 
                       key={p}
                       onClick={() => setActivePersona(p)}
                       className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                         activePersona === p 
                         ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' 
                         : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'
                       }`}
                     >
                        {personas[p].title}
                     </button>
                   ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Core Strategy</p>
                         <p className="text-lg font-black text-slate-900">{personas[activePersona].hook}</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pain Points Addressed</p>
                         <p className="text-sm font-medium text-slate-600 leading-relaxed">{personas[activePersona].pain}</p>
                      </div>
                   </div>
                   <div className="relative group">
                      <div className="absolute top-4 right-4 z-10">
                         <button 
                           onClick={handleCopy}
                           className="p-3 bg-white/50 backdrop-blur-md rounded-xl text-slate-900 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                         >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                         </button>
                      </div>
                      <textarea 
                         readOnly
                         value={personas[activePersona].script}
                         className="w-full h-full min-h-[200px] bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-slate-700 italic text-sm font-medium leading-relaxed resize-none focus:outline-none"
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Tools & ROI */}
        <div className="space-y-8">
           <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-6">
                 <Calculator size={32} className="opacity-60" />
                 <h3 className="text-2xl font-black">Profit Projection</h3>
                 <div className="space-y-8">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60 mb-3">
                          <span>Audits / Mo</span>
                          <span>{auditsPerMonth}</span>
                       </div>
                       <input 
                         type="range" 
                         min="5" max="200" step="5"
                         value={auditsPerMonth}
                         onChange={(e) => setAuditsPerMonth(parseInt(e.target.value))}
                         className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                       />
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60 mb-3">
                          <span>Fee / Audit (₹)</span>
                          <span>₹{pricePerAudit.toLocaleString()}</span>
                       </div>
                       <input 
                         type="range" 
                         min="5000" max="50000" step="1000"
                         value={pricePerAudit}
                         onChange={(e) => setPricePerAudit(parseInt(e.target.value))}
                         className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                       />
                    </div>
                 </div>
                 <div className="pt-8 border-t border-white/20">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Monthly Potential</p>
                    <p className="text-5xl font-black tracking-tighter">₹{(auditsPerMonth * pricePerAudit).toLocaleString()}</p>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 space-y-6 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                 <TrendingUp className="text-emerald-500" /> Market Intelligence
              </h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-xs font-bold text-slate-500">Avg Market Fee</span>
                    <span className="text-xs font-black text-slate-900">₹15,000</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <span className="text-xs font-bold text-emerald-500">Your Margin</span>
                    <span className="text-xs font-black text-emerald-500">~92%</span>
                 </div>
              </div>
              <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">
                 Traditional vendors pay call center staff. You pay for API tokens. Your operational overhead is effectively zero.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

interface PlaybookStepProps {
  day: string;
  title: string;
  desc: string;
  icon: any;
  isLast?: boolean;
  priority: Priority;
  onPriorityChange: (p: Priority) => void;
}

function PlaybookStep({ day, title, desc, icon: Icon, isLast, priority, onPriorityChange }: PlaybookStepProps) {
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const priorityStyles = {
    high: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  };

  return (
    <div className="flex gap-6 relative group">
      <div className="relative z-10 flex flex-col items-center">
        <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center transition-all ${
          priority === 'high' ? 'text-rose-500 border-rose-200' : priority === 'medium' ? 'text-amber-500 border-amber-200' : 'text-indigo-500'
        } shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="flex-1 pb-10">
        <div className="flex items-center justify-between mb-1">
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{day}</span>
              <h4 className="text-lg font-black text-slate-900">{title}</h4>
           </div>
           
           {/* Priority Selector */}
           <div className="relative">
              <button 
                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest transition-all ${priorityStyles[priority] || priorityStyles.low}`}
              >
                {priority || 'low'} <ChevronDown size={10} />
              </button>
              
              {showPriorityMenu && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setShowPriorityMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-2xl z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          onPriorityChange(p);
                          setShowPriorityMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-[8px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors ${
                          p === 'high' ? 'text-rose-500' : p === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              )}
           </div>
        </div>
        <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">{desc}</p>
        <button className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-500 uppercase tracking-widest transition-colors">
           Execute Task <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}