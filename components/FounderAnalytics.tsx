import React from 'react';
import { TrendingUp, DollarSign, Zap, Users, BarChart3, ShieldCheck, ArrowUpRight, Crown } from 'lucide-react';

const FounderAnalytics: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b-4 border-zinc-900 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white rounded-full">
             <Crown size={14} className="text-amber-500" />
             <span className="text-[10px] font-black uppercase tracking-widest font-quantum">Founder Authority Level: 10</span>
          </div>
          <h2 className="text-6xl font-black text-zinc-900 tracking-tighter font-quantum">CEO <span className="text-indigo-600">Command</span></h2>
          <p className="text-lg text-zinc-500 font-bold italic">"Equity, Profit, and Neural Shard Management."</p>
        </div>
        
        <div className="text-right">
           <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '42px' }} className="text-indigo-600">Challa Aditya</p>
           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Owner Signature</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-950 p-10 rounded-[3rem] text-white shadow-2xl border-b-4 border-emerald-500">
           <DollarSign className="text-emerald-500 mb-6" size={32} />
           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Net Founder Profit</p>
           <h4 className="text-5xl font-black mt-2">₹14.7L</h4>
           <p className="text-xs font-bold text-emerald-500 mt-4">+₹1.2L since yesterday</p>
        </div>

        <div className="bg-white border-4 border-zinc-100 p-10 rounded-[3rem] shadow-sm">
           <Zap className="text-indigo-600 mb-6" size={32} />
           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Neural Compute Cost</p>
           <h4 className="text-5xl font-black text-zinc-900 mt-2">₹4,200</h4>
           <p className="text-xs font-bold text-zinc-400 mt-4">0.3% Operational Overhead</p>
        </div>

        <div className="bg-zinc-900 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><BarChart3 size={100} /></div>
           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logic Efficiency</p>
           <h4 className="text-5xl font-black mt-2">99.8%</h4>
           <p className="text-xs font-bold text-indigo-400 mt-4">Autonomous Mesh Stability</p>
        </div>
      </div>

      <div className="bg-white border-4 border-zinc-100 rounded-[4rem] p-12">
         <h3 className="text-xl font-black mb-8 flex items-center gap-3">
            <Users className="text-indigo-600" /> Strategic Client Revenue Pipeline
         </h3>
         <div className="space-y-4">
            <ClientRevenueRow name="Nexus Fintech" plan="Fortress" amount="₹1,99,000" status="Paid" />
            <ClientRevenueRow name="Global Tech Corp" plan="Citadel" amount="₹5,00,000" status="Paid" />
            <ClientRevenueRow name="Tata Digital Hub" plan="Sentinel" amount="₹49,000" status="Awaiting UPI" isPending />
         </div>
      </div>
    </div>
  );
};

const ClientRevenueRow = ({ name, plan, amount, status, isPending }: any) => (
  <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-3xl border-2 border-zinc-100 hover:border-indigo-500 transition-all">
     <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${isPending ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}></div>
        <p className="font-black text-xl text-zinc-900">{name}</p>
     </div>
     <div className="flex gap-12 text-right">
        <div><p className="text-[9px] text-zinc-400 uppercase font-black">Contract</p><p className="text-sm font-bold">{plan}</p></div>
        <div><p className="text-[9px] text-zinc-400 uppercase font-black">Settlement</p><p className="text-sm font-black text-zinc-900">{amount}</p></div>
        <div className="min-w-[100px]"><span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${isPending ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>{status}</span></div>
     </div>
  </div>
);

export default FounderAnalytics;