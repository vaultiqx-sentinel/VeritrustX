import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Globe, Zap } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-2">
           <Zap size={14} className="text-emerald-600" />
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">24/7 Forensic Support Uplink</span>
        </div>
        <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum">Connect with <span className="accent-text">VeritrustX</span></h2>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto italic text-lg leading-relaxed">
          "Deploying truth to your organization starts with a conversation. Connect with our neural auditors today."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-2 bg-white border-2 border-zinc-100 rounded-[3.5rem] p-12 shadow-sm hover:border-emerald-200 transition-all">
          {!submitted ? (
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Client Organization</label>
                  <input required type="text" className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-zinc-900 font-bold" placeholder="e.g. Nexus Fintech" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Institutional Email</label>
                  <input required type="email" className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-zinc-900 font-bold" placeholder="admin@organization.io" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Directive / Inquiry Scope</label>
                <textarea required rows={5} className="w-full px-6 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none text-zinc-900 font-bold leading-relaxed" placeholder="Describe your verification requirements or scale needs..."></textarea>
              </div>
              <button type="submit" className="w-full py-6 accent-bg text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] hover:brightness-110 transition-all shadow-xl shadow-emerald-900/10 group">
                Submit Inquiry to Forensic Desk 
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-4 border-emerald-100 animate-pulse shadow-lg">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-zinc-900">Uplink Successful</h3>
                <p className="text-zinc-500 font-medium max-w-xs mt-2">A VeritrustX auditor will contact your organization within 2 business hours.</p>
              </div>
              <button onClick={() => setSubmitted(false)} className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">Submit Another Directive</button>
            </div>
          )}
        </div>

        {/* Right: Hub Information */}
        <div className="space-y-8">
          <div className="bg-zinc-900 text-white p-10 rounded-[3.5rem] space-y-10 shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="space-y-6 relative z-10">
               <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500 border-b border-white/10 pb-4">Institutional Hub</h4>
               
               <div className="flex gap-5">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 h-fit"><MapPin className="text-emerald-500" size={20} /></div>
                 <div>
                    <p className="text-sm font-black">Distributed Infrastructure</p>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      VeritrustX Node 01 <br />
                      Bengaluru Digital Hub <br />
                      Remote-First Neural mesh
                    </p>
                 </div>
               </div>

               <div className="flex gap-5">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 h-fit"><Phone className="text-emerald-500" size={20} /></div>
                 <div>
                    <p className="text-sm font-black">Forensic Hotline</p>
                    <p className="text-lg font-black text-emerald-400 mt-1 tracking-tight">+91 96422 76736</p>
                 </div>
               </div>

               <div className="flex gap-5">
                 <div className="p-3 bg-white/5 rounded-xl border border-white/10 h-fit"><Mail className="text-emerald-500" size={20} /></div>
                 <div>
                    <p className="text-sm font-black">Uplink Address</p>
                    <p className="text-sm font-medium text-zinc-300 mt-1">protocol@veritrustx.io</p>
                 </div>
               </div>
            </div>

            <div className="pt-8 border-t border-white/10 relative z-10 flex items-center gap-3">
               <Globe className="text-zinc-500 animate-spin-slow" size={20} />
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Coverage: Active</p>
            </div>
          </div>

          {/* Secure Handshake Widget */}
          <div className="p-8 bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] space-y-4">
            <div className="flex items-center gap-3">
               <ShieldCheck className="text-emerald-600" size={28} />
               <h4 className="text-sm font-black text-emerald-800 uppercase tracking-widest">Protocol Secure</h4>
            </div>
            <p className="text-[10px] font-bold text-emerald-700/70 leading-relaxed uppercase tracking-widest">
               All communications are encrypted via End-to-End Veritrust logic nodes. Your organizational data residency is guaranteed.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;